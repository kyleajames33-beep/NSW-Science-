'use client';

import { MissionSelectActivity, MissionTier } from '@/types/lesson';
import { useState } from 'react';

interface MissionSelectActivityProps {
  activity: MissionSelectActivity;
  onAnswerQuestion: (isCorrect: boolean) => void;
  onAddXP: (amount: number) => void;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export function MissionSelectActivityComponent({
  activity,
  onAnswerQuestion,
  onAddXP,
  colorScheme,
}: MissionSelectActivityProps) {
  const [selectedTier, setSelectedTier] = useState<'Bronze' | 'Silver' | 'Gold' | null>(null);
  const [currentMission, setCurrentMission] = useState<MissionTier | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [completedTiers, setCompletedTiers] = useState<Set<string>>(new Set());

  const getTierColor = (tier: 'Bronze' | 'Silver' | 'Gold') => {
    switch (tier) {
      case 'Bronze':
        return { bg: '#cd7f32', light: '#f4e4d7' };
      case 'Silver':
        return { bg: '#c0c0c0', light: '#f0f0f0' };
      case 'Gold':
        return { bg: '#ffd700', light: '#fffacd' };
    }
  };

  const handleSelectTier = (tier: 'Bronze' | 'Silver' | 'Gold') => {
    const mission = activity.tiers.find((t) => t.difficulty === tier);
    if (mission) {
      setSelectedTier(tier);
      setCurrentMission(mission);
      setSelectedAnswer(null);
      setHasAnswered(false);
    }
  };

  const handleSelectAnswer = (index: number) => {
    if (!hasAnswered) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer !== null && currentMission && !hasAnswered) {
      setHasAnswered(true);
      const isCorrect = selectedAnswer === currentMission.correctIndex;

      if (isCorrect) {
        onAddXP(currentMission.xp);
        onAnswerQuestion(true);
        const newCompleted = new Set(completedTiers);
        newCompleted.add(currentMission.difficulty);
        setCompletedTiers(newCompleted);
      } else {
        onAnswerQuestion(false);
      }
    }
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setHasAnswered(false);
  };

  const handleBackToSelect = () => {
    setCurrentMission(null);
    setSelectedTier(null);
    setSelectedAnswer(null);
    setHasAnswered(false);
  };

  // Mission Selection View
  if (!currentMission) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        {/* Activity Header */}
        <div className="mb-6">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-bold text-xs uppercase tracking-wide mb-4"
            style={{
              background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})`,
            }}
          >
            🎯 {activity.title}
          </div>
          <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-r-lg">
            <p className="text-sm font-semibold text-indigo-900">
              Choose your challenge level! Start with Bronze to build confidence, or jump straight to Gold if you're feeling brave.
            </p>
          </div>
        </div>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activity.tiers.map((tier, index) => {
            const colors = getTierColor(tier.difficulty);
            const isCompleted = completedTiers.has(tier.difficulty);

            return (
              <button
                key={index}
                onClick={() => handleSelectTier(tier.difficulty)}
                className="relative p-6 rounded-xl border-2 transition-all hover:shadow-lg transform hover:-translate-y-1 text-left"
                style={{
                  borderColor: colors.bg,
                  backgroundColor: isCompleted ? colors.light : 'white',
                }}
              >
                {isCompleted && (
                  <div className="absolute top-3 right-3">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}

                <div className="text-4xl mb-3">
                  {tier.difficulty === 'Bronze' && '🥉'}
                  {tier.difficulty === 'Silver' && '🥈'}
                  {tier.difficulty === 'Gold' && '🥇'}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.difficulty} Mission</h3>
                <p className="text-sm text-gray-600 mb-3">{tier.scenario}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500 uppercase">Reward</span>
                  <span className="text-lg font-bold" style={{ color: colors.bg }}>
                    {tier.xp} XP
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Mission Question View
  const colors = getTierColor(currentMission.difficulty);
  const isCorrect = hasAnswered && selectedAnswer === currentMission.correctIndex;
  const misconception = hasAnswered && !isCorrect && selectedAnswer !== null
    ? currentMission.feedback.misconceptions[selectedAnswer]
    : null;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
      {/* Mission Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-bold text-xs uppercase tracking-wide"
            style={{ backgroundColor: colors.bg }}
          >
            {currentMission.difficulty === 'Bronze' && '🥉'}
            {currentMission.difficulty === 'Silver' && '🥈'}
            {currentMission.difficulty === 'Gold' && '🥇'}
            {currentMission.difficulty} Mission
          </div>
          <button
            onClick={handleBackToSelect}
            className="text-sm text-gray-600 hover:text-gray-900 font-medium"
          >
            ← Back to Selection
          </button>
        </div>
      </div>

      {/* Scenario */}
      <div className="mb-6 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide">Scenario:</h3>
        <p className="text-gray-700 leading-relaxed">{currentMission.scenario}</p>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="font-bold text-gray-900 text-lg mb-4">{currentMission.question}</h3>
      </div>

      {/* Answer Options */}
      <div className="space-y-3 mb-6">
        {currentMission.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectAnswer = index === currentMission.correctIndex;
          const showAsCorrect = hasAnswered && isCorrectAnswer;
          const showAsWrong = hasAnswered && isSelected && !isCorrect;

          return (
            <button
              key={index}
              onClick={() => handleSelectAnswer(index)}
              disabled={hasAnswered}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                hasAnswered ? 'cursor-not-allowed' : 'hover:shadow-md cursor-pointer'
              }`}
              style={
                showAsCorrect
                  ? { borderColor: '#10b981', backgroundColor: '#d1fae5' }
                  : showAsWrong
                  ? { borderColor: '#ef4444', backgroundColor: '#fee2e2' }
                  : isSelected
                  ? { borderColor: colors.bg, backgroundColor: colors.light }
                  : { borderColor: '#e5e7eb', backgroundColor: 'white' }
              }
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0`}
                  style={
                    showAsCorrect
                      ? { borderColor: '#10b981', backgroundColor: '#10b981' }
                      : showAsWrong
                      ? { borderColor: '#ef4444', backgroundColor: '#ef4444' }
                      : isSelected
                      ? { borderColor: colors.bg, backgroundColor: colors.bg }
                      : { borderColor: '#d1d5db', backgroundColor: 'white' }
                  }
                >
                  {(showAsCorrect || (isSelected && !hasAnswered)) && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {showAsWrong && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-gray-900 font-medium">{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Submit Button */}
      {!hasAnswered && (
        <button
          onClick={handleSubmitAnswer}
          disabled={selectedAnswer === null}
          className={`w-full py-4 rounded-xl font-bold text-white transition-all ${
            selectedAnswer === null
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
          style={{
            backgroundColor: selectedAnswer !== null ? colors.bg : '#d1d5db',
          }}
        >
          Submit Answer
        </button>
      )}

      {/* Feedback */}
      {hasAnswered && isCorrect && (
        <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
          <div className="flex items-start gap-3 mb-3">
            <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold text-green-900 mb-1">Correct! +{currentMission.xp} XP</p>
              <p className="text-sm text-green-800">{currentMission.feedback.correct}</p>
            </div>
          </div>
          <button
            onClick={handleBackToSelect}
            className="mt-4 w-full py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
          >
            Try Another Mission
          </button>
        </div>
      )}

      {hasAnswered && misconception && (
        <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg">
          <div className="flex items-start gap-3 mb-4">
            <svg className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold text-orange-900 mb-2">Not Quite!</p>
              <p className="text-sm text-orange-800 mb-3">
                <span className="font-semibold">Common Mistake:</span> {misconception.issue}
              </p>
              <p className="text-sm text-orange-800 mb-3">
                <span className="font-semibold">Hint:</span> {misconception.hint}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleRetry}
              className="flex-1 py-3 rounded-lg font-semibold transition-colors"
              style={{
                backgroundColor: colors.bg,
                color: 'white',
              }}
            >
              Try Again
            </button>
            <button
              onClick={handleBackToSelect}
              className="flex-1 py-3 rounded-lg border-2 font-semibold transition-colors"
              style={{
                borderColor: colors.bg,
                color: colors.bg,
                backgroundColor: 'white',
              }}
            >
              Choose Different Mission
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
