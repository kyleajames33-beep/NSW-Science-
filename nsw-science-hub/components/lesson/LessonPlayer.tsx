'use client';

import { useState, useEffect, useRef } from 'react';
import { Lesson, GameState, Stage } from '@/types/lesson';
import { GameHUD } from './GameHUD';
import { StageNavigator } from './StageNavigator';
import { LessonNavbar } from './LessonNavbar';
import { ActivityRenderer } from './ActivityRenderer';
import { loadLessonProgress, saveLessonProgress, logLessonEvent } from '@/lib/supabase/progress';

interface LessonPlayerProps {
  lesson: Lesson;
  userId?: string;
}

export function LessonPlayer({ lesson, userId }: LessonPlayerProps) {
  // Check if this is an HSC lesson (has totalMarks in metadata)
  const isHSCLesson = 'totalMarks' in lesson.metadata;

  const [gameState, setGameState] = useState<GameState>({
    xp: 0,
    level: 1,
    currentStage: 1,
    completedStages: [],
    streak: 0,
    maxStreak: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    // Initialize HSC marks tracking if HSC lesson
    ...(isHSCLesson && {
      marksEarned: 0,
      totalMarksAvailable: (lesson.metadata as any).totalMarks || 0,
      marksByStage: [],
      marksByQuestionType: {
        multipleChoice: { earned: 0, available: 0 },
        shortAnswer: { earned: 0, available: 0 },
        extendedResponse: { earned: 0, available: 0 },
        dataAnalysis: { earned: 0, available: 0 },
        graphAnalysis: { earned: 0, available: 0 },
      },
    }),
  });

  const [isLoading, setIsLoading] = useState(true);
  const previousStageRef = useRef(gameState.currentStage);

  // Load progress from database
  useEffect(() => {
    async function loadProgress() {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const progress = await loadLessonProgress(userId, lesson.metadata.id);
        if (progress) {
          setGameState(progress);
        } else {
          // First time visiting this lesson - log event
          await logLessonEvent(userId, lesson.metadata.id, 'lesson_started');
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading progress:', error);
        setIsLoading(false);
      }
    }

    loadProgress();
  }, [userId, lesson.metadata.id]);

  // Scroll to stage content after stage changes
  useEffect(() => {
    if (previousStageRef.current !== gameState.currentStage) {
      previousStageRef.current = gameState.currentStage;
      // Wait for DOM to update, then scroll
      setTimeout(() => {
        window.scrollTo({ top: 200, behavior: 'smooth' });
      }, 100);
    }
  }, [gameState.currentStage]);

  // Save progress to database
  const saveProgress = async (newState: GameState) => {
    if (!userId) return;

    try {
      await saveLessonProgress(userId, lesson.metadata.id, newState);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  // Add XP with streak multiplier
  const addXP = (amount: number) => {
    setGameState((prevState) => {
      const multiplier = prevState.streak >= 5 ? 3 : prevState.streak >= 3 ? 2 : 1;
      const total = amount * multiplier;

      const newXP = prevState.xp + total;
      const newLevel = Math.floor(newXP / 100) + 1;

      const newState = {
        ...prevState,
        xp: newXP,
        level: newLevel,
      };

      saveProgress(newState);

      // Show level up toast if leveled up
      if (newLevel > prevState.level && userId) {
        // TODO: Show toast notification
        console.log(`🎉 Level ${newLevel}!`);
        logLessonEvent(userId, lesson.metadata.id, 'level_up', { level: newLevel, xp: newXP });
      }
      if (userId) {
        logLessonEvent(userId, lesson.metadata.id, 'xp_earned', { amount: total, multiplier });
      }

      return newState;
    });
  };

  // Add marks (HSC lessons only)
  const addMarks = (amount: number) => {
    if (!isHSCLesson) return;

    setGameState((prevState) => {
      const newMarksEarned = (prevState.marksEarned || 0) + amount;

      const newState = {
        ...prevState,
        marksEarned: newMarksEarned,
      };

      saveProgress(newState);

      if (userId) {
        logLessonEvent(userId, lesson.metadata.id, 'marks_earned', {
          amount,
          total: newMarksEarned,
          totalAvailable: prevState.totalMarksAvailable
        });
      }

      return newState;
    });
  };

  // Update streak
  const updateStreak = (correct: boolean) => {
    setGameState((prevState) => {
      if (correct) {
        const newStreak = prevState.streak + 1;
        const newMaxStreak = Math.max(newStreak, prevState.maxStreak);

        const newState = {
          ...prevState,
          streak: newStreak,
          maxStreak: newMaxStreak,
        };

        saveProgress(newState);

        // Show streak notifications
        if (newStreak === 3) {
          console.log('🔥 2x XP Streak!');
          if (userId) logLessonEvent(userId, lesson.metadata.id, 'streak_achieved', { streak: 3, multiplier: 2 });
        } else if (newStreak === 5) {
          console.log('🔥🔥 3x XP Streak!');
          if (userId) logLessonEvent(userId, lesson.metadata.id, 'streak_achieved', { streak: 5, multiplier: 3 });
        }

        return newState;
      } else {
        const newState = {
          ...prevState,
          streak: 0,
        };

        saveProgress(newState);
        return newState;
      }
    });
  };

  // Answer question
  const answerQuestion = (isCorrect: boolean) => {
    setGameState((prevState) => {
      const newState = {
        ...prevState,
        questionsAnswered: prevState.questionsAnswered + 1,
        correctAnswers: isCorrect ? prevState.correctAnswers + 1 : prevState.correctAnswers,
      };

      saveProgress(newState);

      if (userId) {
        logLessonEvent(userId, lesson.metadata.id, 'question_answered', { isCorrect });
      }

      return newState;
    });

    updateStreak(isCorrect);
  };

  // Complete stage
  const completeStage = (stageNumber: number) => {
    const currentStageData = lesson.stages.find(s => s.stageNumber === stageNumber);
    const xpReward = currentStageData?.xpOnComplete || 0;

    // Check if stage is already completed (to decide whether to award XP)
    const isAlreadyCompleted = gameState.completedStages.includes(stageNumber);

    // Always advance to next stage, but only add to completed list if not already there
    const newCompletedStages = isAlreadyCompleted
      ? gameState.completedStages
      : [...gameState.completedStages, stageNumber];

    const newState = {
      ...gameState,
      completedStages: newCompletedStages,
      currentStage: Math.min(stageNumber + 1, 5),
    };

    setGameState(newState);
    saveProgress(newState);

    // Only log and award XP if this is the first time completing the stage
    if (!isAlreadyCompleted) {
      if (userId) {
        logLessonEvent(userId, lesson.metadata.id, 'stage_completed', { stageNumber });

        // Check if lesson is complete
        if (stageNumber === 5) {
          logLessonEvent(userId, lesson.metadata.id, 'lesson_completed', {
            finalXP: newState.xp,
            finalLevel: newState.level,
            accuracy: newState.questionsAnswered > 0
              ? Math.round((newState.correctAnswers / newState.questionsAnswered) * 100)
              : 0,
          });
        }
      }

      if (xpReward > 0) {
        addXP(xpReward);
      }
    }
    // Scroll will happen automatically via useEffect watching currentStage
  };

  // Go to stage
  const goToStage = (stageNumber: number) => {
    // Check if stage is unlocked
    if (stageNumber > 1 && !gameState.completedStages.includes(stageNumber - 1)) {
      // TODO: Show toast "Complete previous stage first"
      console.log('⚠️ Complete the previous stage first!');
      return;
    }

    const newState = {
      ...gameState,
      currentStage: stageNumber,
    };

    setGameState(newState);
    saveProgress(newState);
  };

  const currentStageData = lesson.stages.find(s => s.stageNumber === gameState.currentStage);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading lesson...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <LessonNavbar
        lessonMetadata={lesson.metadata}
        colorScheme={lesson.metadata.colorScheme}
      />

      {/* Sidebar Navigator */}
      <StageNavigator
        stages={lesson.stages}
        currentStage={gameState.currentStage}
        completedStages={gameState.completedStages}
        onStageClick={goToStage}
        lessonMetadata={lesson.metadata}
      />

      {/* Main Content */}
      <main className="flex-1 px-8 py-10 ml-80 mt-16">
        <div className="max-w-5xl mx-auto">
          {/* Game HUD */}
          <GameHUD
            gameState={gameState}
            totalXP={lesson.metadata.totalXP}
            totalMarks={isHSCLesson ? (lesson.metadata as any).totalMarks : undefined}
            colorScheme={lesson.metadata.colorScheme}
          />

          {/* Stage Content */}
          {currentStageData && (
            <div className="mt-10">
              <div className="mb-8 bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-bold text-xs uppercase tracking-wide mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${lesson.metadata.colorScheme.primary}, ${lesson.metadata.colorScheme.secondary})`,
                  }}
                >
                  Stage {currentStageData.stageNumber}: {currentStageData.stageName}
                </div>
                <h1 className="text-5xl font-bold mb-3 text-gray-900">{currentStageData.title}</h1>
                <p className="text-xl text-gray-600">{currentStageData.description}</p>
              </div>

              {/* Render Activities */}
              <div className="space-y-8">
                {currentStageData.activities.map((activity, index) => (
                  <ActivityRenderer
                    key={index}
                    activity={activity}
                    onAnswerQuestion={answerQuestion}
                    onAddXP={addXP}
                    onMarksEarned={isHSCLesson ? addMarks : undefined}
                    colorScheme={lesson.metadata.colorScheme}
                  />
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8 pt-8 border-t-2">
                {gameState.currentStage > 1 && (
                  <button
                    onClick={() => goToStage(gameState.currentStage - 1)}
                    className="px-6 py-3 border-2 rounded-lg font-bold hover:bg-gray-100 transition"
                  >
                    ← Previous
                  </button>
                )}

                {gameState.currentStage < 5 && (
                  <button
                    onClick={() => completeStage(gameState.currentStage)}
                    className="flex-1 px-6 py-3 rounded-lg font-bold text-white hover:opacity-90 transition"
                    style={{
                      background: `linear-gradient(135deg, ${lesson.metadata.colorScheme.primary}, ${lesson.metadata.colorScheme.secondary})`,
                    }}
                  >
                    Continue →
                  </button>
                )}

                {gameState.currentStage === 5 && (
                  <button
                    className="flex-1 px-6 py-3 rounded-lg font-bold text-white hover:opacity-90 transition"
                    style={{
                      background: `linear-gradient(135deg, ${lesson.metadata.colorScheme.primary}, ${lesson.metadata.colorScheme.secondary})`,
                    }}
                  >
                    Complete Lesson 🎉
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
