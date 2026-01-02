'use client';

import { PredictionChallengeActivity } from '@/types/lesson';
import { useState } from 'react';

interface PredictionChallengeActivityProps {
  activity: PredictionChallengeActivity;
  onAnswerQuestion: (isCorrect: boolean) => void;
  onAddXP: (amount: number) => void;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  onStorePrediction?: (answer: number) => void;
}

export function PredictionChallengeActivityComponent({
  activity,
  onAddXP,
  colorScheme,
  onStorePrediction,
}: PredictionChallengeActivityProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasCommitted, setHasCommitted] = useState(false);

  const handleSelectAnswer = (index: number) => {
    if (!hasCommitted) {
      setSelectedAnswer(index);
    }
  };

  const handleCommit = () => {
    if (selectedAnswer !== null && !hasCommitted) {
      setHasCommitted(true);
      onAddXP(activity.xp);
      if (onStorePrediction) {
        onStorePrediction(selectedAnswer);
      }
    }
  };

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
          🤔 Prediction Challenge
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg mb-6">
          <p className="text-sm font-semibold text-amber-900">
            Make your best prediction! Don't worry about being right or wrong - this helps you learn.
          </p>
        </div>
      </div>

      {/* Scenario */}
      <div className="mb-6 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-bold text-gray-900 mb-3 text-lg">Scenario:</h3>
        <p className="text-gray-700 text-base leading-relaxed">{activity.scenario}</p>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="font-bold text-gray-900 text-lg mb-4">{activity.question}</h3>
      </div>

      {/* Answer Options */}
      <div className="space-y-3 mb-6">
        {activity.options.map((option, index) => {
          const isSelected = selectedAnswer === index;

          return (
            <button
              key={index}
              onClick={() => handleSelectAnswer(index)}
              disabled={hasCommitted}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                hasCommitted
                  ? 'opacity-60 cursor-not-allowed'
                  : 'hover:shadow-md cursor-pointer'
              }`}
              style={
                isSelected
                  ? {
                      borderColor: colorScheme.primary,
                      backgroundColor: `${colorScheme.primary}10`,
                    }
                  : {
                      borderColor: '#e5e7eb',
                      backgroundColor: 'white',
                    }
              }
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all`}
                  style={
                    isSelected
                      ? {
                          borderColor: colorScheme.primary,
                          backgroundColor: colorScheme.primary,
                        }
                      : {
                          borderColor: '#d1d5db',
                          backgroundColor: 'white',
                        }
                  }
                >
                  {isSelected && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
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

      {/* Commit Button */}
      {!hasCommitted && (
        <button
          onClick={handleCommit}
          disabled={selectedAnswer === null}
          className={`w-full py-4 rounded-xl font-bold text-white transition-all ${
            selectedAnswer === null
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
          style={{
            background:
              selectedAnswer !== null
                ? `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})`
                : '#d1d5db',
          }}
        >
          Commit to Your Prediction (+{activity.xp} XP)
        </button>
      )}

      {/* Committed State */}
      {hasCommitted && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="font-semibold text-green-900 mb-1">Prediction Recorded! +{activity.xp} XP</p>
              <p className="text-sm text-green-700">
                We'll reveal the answer at the end of the lesson. For now, let's explore and learn!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
