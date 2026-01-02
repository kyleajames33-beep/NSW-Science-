'use client';

import { useState } from 'react';
import { QuizActivity as QuizActivityType } from '@/types/lesson';

interface QuizActivityProps {
  activity: QuizActivityType;
  onAnswerQuestion: (isCorrect: boolean) => void;
  onAddXP: (amount: number) => void;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export function QuizActivity({ activity, onAnswerQuestion, onAddXP, colorScheme }: QuizActivityProps) {
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());

  const handleAnswer = (questionIndex: number, optionIndex: number) => {
    if (answeredQuestions.has(questionIndex)) return;

    const question = activity.questions[questionIndex];
    const isCorrect = optionIndex === question.correctIndex;

    setAnsweredQuestions(new Set([...answeredQuestions, questionIndex]));
    onAnswerQuestion(isCorrect);

    if (isCorrect) {
      onAddXP(activity.xpPerQuestion);
    }
  };

  return (
    <div className="space-y-6">
      {activity.questions.map((question, qIndex) => {
        const isAnswered = answeredQuestions.has(qIndex);

        return (
          <div key={qIndex} className="bg-white rounded-2xl p-6 border-2 shadow-sm">
            <div className="mb-4">
              <div className="text-sm font-semibold text-gray-500 mb-2">
                Question {qIndex + 1} of {activity.questions.length}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{question.question}</h3>
            </div>

            <div className="space-y-3">
              {question.options.map((option, oIndex) => {
                const isSelected = isAnswered;
                const isCorrect = oIndex === question.correctIndex;
                const showAsCorrect = isAnswered && isCorrect;
                const showAsIncorrect = isAnswered && !isCorrect && isSelected;

                return (
                  <button
                    key={oIndex}
                    onClick={() => handleAnswer(qIndex, oIndex)}
                    disabled={isAnswered}
                    className={`
                      w-full text-left p-4 rounded-xl border-2 transition-all font-medium
                      ${!isAnswered ? 'hover:border-gray-400 hover:bg-gray-50 cursor-pointer' : 'cursor-default'}
                      ${showAsCorrect ? 'border-green-500 bg-green-50' : ''}
                      ${showAsIncorrect ? 'border-red-500 bg-red-50' : ''}
                      ${!isAnswered && !showAsCorrect && !showAsIncorrect ? 'border-gray-300' : ''}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showAsCorrect && <span className="text-green-600 font-bold">✓</span>}
                      {showAsIncorrect && <span className="text-red-600 font-bold">✗</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div
                className="mt-4 p-4 rounded-xl border-2"
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
          </div>
        );
      })}
    </div>
  );
}
