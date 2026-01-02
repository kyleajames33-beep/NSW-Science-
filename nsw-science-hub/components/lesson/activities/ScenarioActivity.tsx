'use client';

import { useState } from 'react';
import { ScenarioActivity as ScenarioActivityType } from '@/types/lesson';

interface ScenarioActivityProps {
  activity: ScenarioActivityType;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  onXPEarned: (xp: number) => void;
}

export function ScenarioActivity({ activity, colorScheme, onXPEarned }: ScenarioActivityProps) {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleChoiceClick = (index: number) => {
    if (hasSubmitted) return;
    setSelectedChoice(index);
  };

  const handleSubmit = () => {
    if (selectedChoice === null) return;
    setHasSubmitted(true);

    const choice = activity.choices[selectedChoice];
    if (choice.isCorrect) {
      onXPEarned(activity.xp);
    }
  };

  const handleTryAgain = () => {
    setSelectedChoice(null);
    setHasSubmitted(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div
        className="h-1.5"
        style={{
          background: `linear-gradient(90deg, ${colorScheme.primary}, ${colorScheme.secondary})`,
        }}
      />
      <div className="p-8">
        <div className="flex items-start gap-5 mb-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${colorScheme.primary}15, ${colorScheme.secondary}15)`,
            }}
          >
            🎭
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900">{activity.title}</h3>
          </div>
        </div>

        {/* Scenario Situation */}
        <div className="mb-6 p-6 bg-gray-50 rounded-2xl border-2 border-gray-100">
          <div className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">
            Scenario
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">{activity.situation}</p>
        </div>

        {/* Question */}
        <div className="mb-6">
          <div className="text-lg font-bold text-gray-900 mb-4">{activity.question}</div>
        </div>

        {/* Choices */}
        <div className="space-y-3 mb-6">
          {activity.choices.map((choice, index) => {
            const isSelected = selectedChoice === index;
            const showResult = hasSubmitted && isSelected;
            const isCorrect = choice.isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleChoiceClick(index)}
                disabled={hasSubmitted}
                className={`
                  w-full p-5 rounded-xl text-left transition-all
                  ${!hasSubmitted && !isSelected ? 'bg-gray-50 border-2 border-gray-200 hover:bg-gray-100 hover:border-gray-300 cursor-pointer' : ''}
                  ${!hasSubmitted && isSelected ? 'border-2 ring-4' : ''}
                  ${showResult && isCorrect ? 'bg-green-50 border-2 border-green-300' : ''}
                  ${showResult && !isCorrect ? 'bg-red-50 border-2 border-red-300' : ''}
                  ${hasSubmitted && !isSelected ? 'opacity-50' : ''}
                `}
                style={
                  !hasSubmitted && isSelected
                    ? {
                        '--tw-ring-color': colorScheme.primary,
                        borderColor: colorScheme.primary,
                        backgroundColor: `${colorScheme.primary}15`
                      } as React.CSSProperties
                    : {}
                }
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm
                      ${!hasSubmitted && !isSelected ? 'bg-gray-200 text-gray-600' : ''}
                      ${!hasSubmitted && isSelected ? 'text-white' : ''}
                      ${showResult && isCorrect ? 'bg-green-500 text-white' : ''}
                      ${showResult && !isCorrect ? 'bg-red-500 text-white' : ''}
                    `}
                    style={
                      !hasSubmitted && isSelected ? { backgroundColor: colorScheme.primary } : {}
                    }
                  >
                    {showResult ? (isCorrect ? '✓' : '✗') : String.fromCharCode(65 + index)}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{choice.text}</div>
                    {showResult && (
                      <div className={`mt-3 text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                        {choice.consequence}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        {!hasSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedChoice === null}
            className="w-full py-4 rounded-xl font-bold text-white text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background:
                selectedChoice !== null
                  ? `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})`
                  : '#9ca3af',
            }}
          >
            Submit Answer
          </button>
        ) : (
          <div className="space-y-3">
            {selectedChoice !== null && activity.choices[selectedChoice].isCorrect ? (
              <div
                className="text-center p-6 rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${colorScheme.primary}15, ${colorScheme.secondary}15)`,
                }}
              >
                <div className="text-5xl mb-3">🎉</div>
                <div className="text-xl font-bold" style={{ color: colorScheme.primary }}>
                  Excellent choice!
                </div>
                <div className="text-gray-600 mt-2">
                  +{activity.xp} XP earned
                </div>
              </div>
            ) : (
              <button
                onClick={handleTryAgain}
                className="w-full py-4 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all border-2 border-gray-200"
              >
                Try Again
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
