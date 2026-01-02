'use client';

import { ErrorAnalysisActivity, ErrorLocation } from '@/types/lesson';
import { useState } from 'react';

interface ErrorAnalysisActivityProps {
  activity: ErrorAnalysisActivity;
  onAnswerQuestion: (isCorrect: boolean) => void;
  onAddXP: (amount: number) => void;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export function ErrorAnalysisActivityComponent({
  activity,
  onAddXP,
  colorScheme,
}: ErrorAnalysisActivityProps) {
  const [foundErrors, setFoundErrors] = useState<Set<number>>(new Set());
  const [showingError, setShowingError] = useState<number | null>(null);
  const [hasCompleted, setHasCompleted] = useState(false);

  const handleMarkError = (errorIndex: number) => {
    if (!foundErrors.has(errorIndex)) {
      const newFoundErrors = new Set(foundErrors);
      newFoundErrors.add(errorIndex);
      setFoundErrors(newFoundErrors);
      onAddXP(activity.xpPerError);
      setShowingError(errorIndex);

      // Check if all errors found
      if (newFoundErrors.size === activity.errors.length) {
        setHasCompleted(true);
      }
    } else {
      setShowingError(errorIndex);
    }
  };

  const progress = (foundErrors.size / activity.errors.length) * 100;

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
          🔍 Error Analysis
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{activity.title}</h3>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <p className="text-sm font-semibold text-blue-900 mb-2">
            📋 Your Task: Read the student's work below and find {activity.errors.length} mistakes.
          </p>
          <p className="text-xs text-blue-800">
            💡 Tip: Click on each error button below to reveal what's wrong and how to fix it. You'll earn {activity.xpPerError} XP for each error you identify!
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">
            Errors Found: {foundErrors.size} / {activity.errors.length}
          </span>
          <span className="text-sm font-semibold" style={{ color: colorScheme.primary }}>
            {foundErrors.size * activity.xpPerError} XP
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${colorScheme.primary}, ${colorScheme.secondary})`,
            }}
          />
        </div>
      </div>

      {/* Student Work */}
      <div className="mb-6 p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
        <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">
          Student's Work:
        </h4>
        <div className="text-gray-800 whitespace-pre-wrap font-mono text-sm leading-relaxed">
          {activity.studentWork || activity.scenario}
        </div>
      </div>

      {/* Error Locations */}
      <div className="space-y-3 mb-6">
        {activity.errors.map((error, index) => {
          const isFound = foundErrors.has(index);
          const isShowing = showingError === index;

          return (
            <div key={index}>
              <button
                onClick={() => handleMarkError(index)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  isFound ? 'cursor-pointer' : 'hover:shadow-md cursor-pointer'
                }`}
                style={
                  isFound
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
                <div className="flex items-start gap-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all`}
                    style={
                      isFound
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
                    {isFound && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">
                      Error Location: {error.location || error.errorText}
                    </div>
                    {isFound && (
                      <div className="text-sm text-gray-600 mt-1">
                        Click to {isShowing ? 'hide' : 'show'} details
                      </div>
                    )}
                  </div>
                  {isFound && (
                    <div className="text-sm font-bold" style={{ color: colorScheme.primary }}>
                      +{activity.xpPerError} XP
                    </div>
                  )}
                </div>
              </button>

              {/* Error Details (expand when clicked) */}
              {isFound && isShowing && (
                <div className="mt-2 ml-10 p-4 bg-white rounded-lg border-2" style={{ borderColor: colorScheme.primary }}>
                  {(error.issue || error.misconception) && (
                    <div className="mb-3">
                      <span className="text-sm font-bold text-gray-900">Issue:</span>
                      <p className="text-sm text-gray-700 mt-1">{error.issue || error.misconception}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-sm font-bold text-gray-900">How to Fix:</span>
                    <p className="text-sm text-gray-700 mt-1">{error.fix || error.correction}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion State */}
      {hasCompleted && (
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
              <p className="font-semibold text-green-900 mb-1">
                All Errors Found! +{activity.errors.length * activity.xpPerError} XP
              </p>
              <p className="text-sm text-green-700">
                Great detective work! Understanding common mistakes helps you avoid them.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
