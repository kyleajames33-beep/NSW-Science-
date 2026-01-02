'use client';

import { useState } from 'react';
import { FillInBlankActivity as FillInBlankActivityType } from '@/types/lesson';

interface FillInBlankActivityProps {
  activity: FillInBlankActivityType;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  onXPEarned: (xp: number) => void;
}

export function FillInBlankActivity({ activity, colorScheme, onXPEarned }: FillInBlankActivityProps) {
  const [answers, setAnswers] = useState<Map<string, string>>(new Map());
  const [submitted, setSubmitted] = useState<Map<string, boolean>>(new Map());
  const [correct, setCorrect] = useState<Set<string>>(new Set());

  const handleInputChange = (questionId: string, value: string) => {
    const newAnswers = new Map(answers);
    newAnswers.set(questionId, value);
    setAnswers(newAnswers);
  };

  const handleSubmit = (questionId: string, correctAnswer: string) => {
    const userAnswer = answers.get(questionId)?.trim().toLowerCase() || '';
    const isCorrect = userAnswer === correctAnswer.trim().toLowerCase();

    const newSubmitted = new Map(submitted);
    newSubmitted.set(questionId, true);
    setSubmitted(newSubmitted);

    if (isCorrect) {
      const newCorrect = new Set(correct);
      newCorrect.add(questionId);
      setCorrect(newCorrect);
      onXPEarned(activity.xpPerQuestion);
    }
  };

  const renderQuestion = (question: FillInBlankActivityType['questions'][0]) => {
    const parts = question.text.split('{{blank}}');
    const isSubmitted = submitted.get(question.id);
    const isCorrect = correct.has(question.id);
    const userAnswer = answers.get(question.id) || '';

    return (
      <div key={question.id} className="mb-6 last:mb-0">
        <div className="flex flex-wrap items-center gap-2 text-lg">
          {parts.map((part, index) => (
            <span key={index}>
              {part}
              {index < parts.length - 1 && (
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => handleInputChange(question.id, e.target.value)}
                  disabled={isSubmitted}
                  className={`
                    inline-block mx-2 px-4 py-2 rounded-lg border-2 font-medium min-w-[120px] text-center
                    ${isSubmitted && isCorrect ? 'bg-green-50 border-green-300 text-green-700' : ''}
                    ${isSubmitted && !isCorrect ? 'bg-red-50 border-red-300 text-red-700' : ''}
                    ${!isSubmitted ? 'bg-gray-50 border-gray-200 focus:ring-2 outline-none' : ''}
                  `}
                  style={
                    !isSubmitted
                      ? {
                          '--tw-ring-color': colorScheme.primary,
                          borderColor: userAnswer ? colorScheme.primary : undefined,
                        } as React.CSSProperties
                      : {}
                  }
                  placeholder="Type here..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !isSubmitted) {
                      handleSubmit(question.id, question.answer);
                    }
                  }}
                />
              )}
            </span>
          ))}
        </div>

        {question.hint && !isSubmitted && (
          <div className="mt-3 text-sm text-gray-500 italic flex items-start gap-2">
            <span>💡</span>
            <span>{question.hint}</span>
          </div>
        )}

        {!isSubmitted ? (
          <button
            onClick={() => handleSubmit(question.id, question.answer)}
            disabled={!userAnswer.trim()}
            className="mt-3 px-6 py-2 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: userAnswer.trim()
                ? `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})`
                : '#9ca3af',
            }}
          >
            Check Answer
          </button>
        ) : (
          <div className="mt-3 flex items-center gap-2">
            {isCorrect ? (
              <span className="text-green-600 font-semibold flex items-center gap-2">
                ✓ Correct!
              </span>
            ) : (
              <div className="space-y-2">
                <span className="text-red-600 font-semibold flex items-center gap-2">
                  ✗ Not quite. The correct answer is: <strong>{question.answer}</strong>
                </span>
                <button
                  onClick={() => {
                    const newSubmitted = new Map(submitted);
                    newSubmitted.delete(question.id);
                    setSubmitted(newSubmitted);
                    setAnswers(new Map(answers));
                  }}
                  className="text-sm px-4 py-1 rounded-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const completedCount = correct.size;
  const totalCount = activity.questions.length;
  const allCompleted = completedCount === totalCount;

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
            ✏️
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2 text-gray-900">{activity.title}</h3>
            <p className="text-gray-600">{activity.instructions}</p>
          </div>
        </div>

        <div className="space-y-8">
          {activity.questions.map((question) => renderQuestion(question))}
        </div>

        {allCompleted && (
          <div
            className="mt-8 text-center p-6 rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${colorScheme.primary}15, ${colorScheme.secondary}15)`,
            }}
          >
            <div className="text-5xl mb-3">🎉</div>
            <div className="text-xl font-bold" style={{ color: colorScheme.primary }}>
              All correct! Great work!
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{completedCount} / {totalCount} completed</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(completedCount / totalCount) * 100}%`,
                background: `linear-gradient(90deg, ${colorScheme.primary}, ${colorScheme.secondary})`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
