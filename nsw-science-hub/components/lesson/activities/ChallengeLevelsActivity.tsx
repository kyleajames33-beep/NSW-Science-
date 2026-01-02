'use client';

import { useState } from 'react';
import { ChallengeLevelsActivity as ChallengeLevelsActivityType } from '@/types/lesson';

interface ChallengeLevelsActivityProps {
  activity: ChallengeLevelsActivityType;
  onAnswerQuestion: (isCorrect: boolean) => void;
  onAddXP: (amount: number) => void;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export function ChallengeLevelsActivity({
  activity,
  onAnswerQuestion,
  onAddXP,
  colorScheme,
}: ChallengeLevelsActivityProps) {
  const [activeLevelIndex, setActiveLevelIndex] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());
  const [levelScores, setLevelScores] = useState<Map<number, { correct: number; total: number }>>(new Map());

  const startLevel = (levelIndex: number) => {
    setActiveLevelIndex(levelIndex);
    setCurrentQuestionIndex(0);
  };

  const closeLevel = () => {
    setActiveLevelIndex(null);
    setCurrentQuestionIndex(0);
  };

  const handleAnswer = (optionIndex: number) => {
    if (activeLevelIndex === null) return;

    const level = activity.levels[activeLevelIndex];
    const question = level.questions[currentQuestionIndex];
    const questionKey = `${activeLevelIndex}-${currentQuestionIndex}`;

    if (answeredQuestions.has(questionKey)) return;

    const isCorrect = optionIndex === question.correctIndex;

    setAnsweredQuestions(new Set([...answeredQuestions, questionKey]));
    onAnswerQuestion(isCorrect);

    // Update level score
    const currentScore = levelScores.get(activeLevelIndex) || { correct: 0, total: 0 };
    const newScore = {
      correct: currentScore.correct + (isCorrect ? 1 : 0),
      total: currentScore.total + 1,
    };
    setLevelScores(new Map(levelScores.set(activeLevelIndex, newScore)));

    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex < level.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Level complete
        if (!completedLevels.has(activeLevelIndex)) {
          setCompletedLevels(new Set([...completedLevels, activeLevelIndex]));
          onAddXP(level.xp);
        }
      }
    }, 2000);
  };

  return (
    <div>
      {/* Level Cards */}
      {activeLevelIndex === null && (
        <div className="grid grid-cols-2 gap-4">
          {activity.levels.map((level, index) => {
            const isCompleted = completedLevels.has(index);
            const score = levelScores.get(index);

            return (
              <div
                key={index}
                onClick={() => startLevel(index)}
                className={`
                  relative bg-white rounded-2xl p-6 border-2 cursor-pointer transition-all hover:shadow-lg
                  ${isCompleted ? 'border-green-500 bg-green-50' : 'border-gray-300'}
                `}
              >
                {/* Top bar indicator */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl transition-all"
                  style={{
                    background: isCompleted
                      ? `linear-gradient(90deg, ${colorScheme.secondary}, ${colorScheme.accent})`
                      : 'transparent',
                  }}
                />

                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold" style={{ color: colorScheme.primary }}>
                    Level {level.level}
                  </h3>
                  <div
                    className="px-3 py-1 rounded-full font-bold text-sm"
                    style={{
                      backgroundColor: `${colorScheme.accent}20`,
                      color: colorScheme.accent,
                    }}
                  >
                    +{level.xp} XP
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{level.description}</p>

                {isCompleted && score && (
                  <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <span className="text-xl">✓</span>
                    <span>
                      Completed: {score.correct}/{score.total} correct
                    </span>
                  </div>
                )}

                {!isCompleted && (
                  <button
                    className="w-full py-2 rounded-lg font-bold text-white transition-all"
                    style={{
                      background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})`,
                    }}
                  >
                    Start Challenge
                  </button>
                )}

                {isCompleted && (
                  <button
                    className="w-full py-2 rounded-lg font-bold border-2 transition-all"
                    style={{
                      borderColor: colorScheme.secondary,
                      color: colorScheme.secondary,
                    }}
                  >
                    Retry Challenge
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Active Challenge Modal */}
      {activeLevelIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-8 z-50">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 relative">
            <button
              onClick={closeLevel}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold text-xl transition-all"
            >
              ×
            </button>

            <h2 className="text-3xl font-bold mb-6" style={{ color: colorScheme.primary }}>
              Challenge Level {activity.levels[activeLevelIndex].level}
            </h2>

            {currentQuestionIndex < activity.levels[activeLevelIndex].questions.length ? (
              <div>
                <div className="mb-4 text-gray-500 font-semibold">
                  Question {currentQuestionIndex + 1} of {activity.levels[activeLevelIndex].questions.length}
                </div>

                {(() => {
                  const question = activity.levels[activeLevelIndex].questions[currentQuestionIndex];
                  const questionKey = `${activeLevelIndex}-${currentQuestionIndex}`;
                  const isAnswered = answeredQuestions.has(questionKey);

                  return (
                    <>
                      <h3 className="text-xl font-bold mb-6">{question.question}</h3>

                      <div className="space-y-3">
                        {question.options.map((option, oIndex) => {
                          const isCorrect = oIndex === question.correctIndex;
                          const showAsCorrect = isAnswered && isCorrect;
                          const showAsIncorrect = isAnswered && !isCorrect;

                          return (
                            <button
                              key={oIndex}
                              onClick={() => handleAnswer(oIndex)}
                              disabled={isAnswered}
                              className={`
                                w-full text-left p-4 rounded-xl border-2 transition-all font-medium
                                ${!isAnswered ? 'hover:border-gray-400 hover:bg-gray-50 cursor-pointer' : 'cursor-default'}
                                ${showAsCorrect ? 'border-green-500 bg-green-50' : ''}
                                ${showAsIncorrect ? 'border-red-500 bg-red-50' : ''}
                                ${!isAnswered ? 'border-gray-300' : ''}
                              `}
                            >
                              <div className="flex items-center justify-between">
                                <span>{option}</span>
                                {showAsCorrect && <span className="text-green-600 font-bold text-xl">✓</span>}
                                {showAsIncorrect && <span className="text-red-600 font-bold text-xl">✗</span>}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {isAnswered && (
                        <div
                          className="mt-6 p-4 rounded-xl border-2"
                          style={{
                            backgroundColor: `${colorScheme.secondary}15`,
                            borderColor: colorScheme.secondary,
                          }}
                        >
                          <div className="flex items-start gap-2">
                            <span className="text-xl">💡</span>
                            <div>
                              <div className="font-bold mb-1" style={{ color: colorScheme.secondary }}>
                                Feedback:
                              </div>
                              <p className="text-gray-700">{question.feedback}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: colorScheme.secondary }}>
                  Challenge Complete!
                </h3>
                <p className="text-xl mb-2">
                  Score: {levelScores.get(activeLevelIndex)?.correct || 0} /{' '}
                  {activity.levels[activeLevelIndex].questions.length}
                </p>
                <p className="text-2xl font-bold mb-6" style={{ color: colorScheme.accent }}>
                  +{activity.levels[activeLevelIndex].xp} XP
                </p>
                <button
                  onClick={closeLevel}
                  className="px-8 py-3 rounded-lg font-bold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})`,
                  }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
