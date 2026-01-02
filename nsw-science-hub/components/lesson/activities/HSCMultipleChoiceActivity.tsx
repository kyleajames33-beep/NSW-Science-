'use client';

import { useState } from 'react';
import { HSCMultipleChoiceActivity as HSCMultipleChoiceActivityType } from '@/types/lesson';

interface HSCMultipleChoiceActivityProps {
  activity: HSCMultipleChoiceActivityType;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  onMarksEarned: (marks: number) => void;
  onXPEarned: (xp: number) => void;
}

export function HSCMultipleChoiceActivity({
  activity,
  colorScheme,
  onMarksEarned,
  onXPEarned
}: HSCMultipleChoiceActivityProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<{ [key: string]: boolean }>({});
  const [correctCount, setCorrectCount] = useState(0);
  const [totalMarksEarned, setTotalMarksEarned] = useState(0);

  const optionLabels = ['A', 'B', 'C', 'D', 'E'];

  const handleSelectAnswer = (questionNumber: string, optionIndex: number) => {
    if (!submittedAnswers[questionNumber]) {
      setSelectedAnswers(prev => ({
        ...prev,
        [questionNumber]: optionIndex
      }));
    }
  };

  const handleSubmitAnswer = (questionNumber: string, correctIndex: number) => {
    if (submittedAnswers[questionNumber]) return;

    const isCorrect = selectedAnswers[questionNumber] === correctIndex;

    setSubmittedAnswers(prev => ({
      ...prev,
      [questionNumber]: true
    }));

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      setTotalMarksEarned(prev => prev + 1);
      onMarksEarned(1);
      onXPEarned(activity.xpPerCorrect);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
        {/* Header */}
        <div className="flex items-start gap-5 mb-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${colorScheme.primary}15, ${colorScheme.secondary}15)`,
            }}
          >
            📝
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2 text-gray-900">{activity.title}</h3>
            <div className="flex gap-3 text-sm flex-wrap">
              <span
                className="px-3 py-1 rounded-full font-semibold"
                style={{
                  backgroundColor: `${colorScheme.primary}20`,
                  color: colorScheme.primary
                }}
              >
                {activity.questions.length} questions · {activity.totalMarks} marks
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-semibold">
                ⏱️ {activity.timeRecommended}
              </span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-6">
          <p className="text-sm font-semibold text-blue-900 mb-2">
            📋 HSC-Style Multiple Choice
          </p>
          <p className="text-xs text-blue-800">
            Select the best answer for each question, then submit to see detailed feedback.
            Each question is worth 1 mark. Read all options carefully before choosing.
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-8">
          {activity.questions.map((question, index) => {
            const isSubmitted = submittedAnswers[question.questionNumber];
            const selectedIndex = selectedAnswers[question.questionNumber];
            const isCorrect = isSubmitted && selectedIndex === question.correctIndex;
            const isIncorrect = isSubmitted && selectedIndex !== question.correctIndex;

            return (
              <div
                key={question.questionNumber}
                className="border-2 rounded-2xl p-6"
                style={{
                  borderColor: isSubmitted
                    ? isCorrect ? '#10b981' : '#ef4444'
                    : '#e5e7eb',
                  backgroundColor: isSubmitted
                    ? isCorrect ? '#f0fdf4' : '#fef2f2'
                    : '#fafafa'
                }}
              >
                {/* Question header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="px-3 py-1 rounded-lg font-bold text-white"
                      style={{ backgroundColor: colorScheme.primary }}
                    >
                      Q{question.questionNumber}
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getDifficultyColor(question.difficulty)}`}>
                      {question.difficulty.toUpperCase()}
                    </span>
                    {question.source && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-semibold">
                        {question.source}
                      </span>
                    )}
                  </div>
                  {isSubmitted && (
                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <>
                          <span className="text-2xl">✓</span>
                          <span className="font-bold text-green-700">Correct (+1 mark)</span>
                        </>
                      ) : (
                        <>
                          <span className="text-2xl">✗</span>
                          <span className="font-bold text-red-700">Incorrect (0 marks)</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Question stem */}
                <div className="mb-6 text-gray-900 leading-relaxed">
                  {question.stem}
                </div>

                {/* Options */}
                <div className="space-y-3 mb-6">
                  {question.options.map((option, optionIndex) => {
                    const isSelected = selectedIndex === optionIndex;
                    const isThisCorrect = optionIndex === question.correctIndex;
                    const showAsCorrect = isSubmitted && isThisCorrect;
                    const showAsIncorrect = isSubmitted && isSelected && !isThisCorrect;

                    return (
                      <button
                        key={optionIndex}
                        onClick={() => handleSelectAnswer(question.questionNumber, optionIndex)}
                        disabled={isSubmitted}
                        className="w-full text-left p-4 rounded-xl border-2 transition-all disabled:cursor-default"
                        style={{
                          borderColor: showAsCorrect
                            ? '#10b981'
                            : showAsIncorrect
                            ? '#ef4444'
                            : isSelected
                            ? colorScheme.primary
                            : '#e5e7eb',
                          backgroundColor: showAsCorrect
                            ? '#d1fae5'
                            : showAsIncorrect
                            ? '#fee2e2'
                            : isSelected
                            ? `${colorScheme.primary}10`
                            : '#ffffff'
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0"
                            style={{
                              backgroundColor: showAsCorrect
                                ? '#10b981'
                                : showAsIncorrect
                                ? '#ef4444'
                                : isSelected
                                ? colorScheme.primary
                                : '#e5e7eb',
                              color: showAsCorrect || showAsIncorrect || isSelected ? '#ffffff' : '#6b7280'
                            }}
                          >
                            {showAsCorrect ? '✓' : showAsIncorrect ? '✗' : optionLabels[optionIndex]}
                          </div>
                          <span className="text-gray-900 font-medium pt-1">{option}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Submit button */}
                {!isSubmitted && (
                  <button
                    onClick={() => handleSubmitAnswer(question.questionNumber, question.correctIndex)}
                    disabled={selectedIndex === undefined}
                    className="px-6 py-3 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: selectedIndex !== undefined ? colorScheme.primary : '#9ca3af'
                    }}
                  >
                    Submit Answer
                  </button>
                )}

                {/* Feedback */}
                {isSubmitted && (
                  <div className="mt-6 space-y-4">
                    {/* Correct answer feedback */}
                    {isCorrect && (
                      <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4">
                        <h5 className="font-bold text-green-900 mb-2">✓ Correct!</h5>
                        <p className="text-gray-800 text-sm">{question.feedback.correct}</p>
                      </div>
                    )}

                    {/* Incorrect answer feedback */}
                    {isIncorrect && (
                      <div className="space-y-3">
                        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4">
                          <h5 className="font-bold text-red-900 mb-2">✗ Incorrect</h5>
                          <p className="text-gray-800 text-sm mb-3">
                            <strong>Why option {optionLabels[selectedIndex]} is wrong:</strong>
                          </p>
                          <p className="text-gray-800 text-sm">
                            {question.feedback.distractorExplanations[selectedIndex]}
                          </p>
                        </div>
                        <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4">
                          <h5 className="font-bold text-green-900 mb-2">
                            ✓ Correct answer: {optionLabels[question.correctIndex]}
                          </h5>
                          <p className="text-gray-800 text-sm">{question.feedback.correct}</p>
                        </div>
                      </div>
                    )}

                    {/* Syllabus reference */}
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-xs text-gray-600">
                        <strong>Syllabus:</strong> {question.syllabusDotPoint}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress summary */}
        <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-gray-900">Progress</span>
            <span className="text-gray-600">
              {Object.keys(submittedAnswers).length} / {activity.questions.length} attempted
            </span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(Object.keys(submittedAnswers).length / activity.questions.length) * 100}%`,
                background: `linear-gradient(90deg, ${colorScheme.primary}, ${colorScheme.secondary})`,
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Correct:</span>
              <span className="ml-2 font-bold text-green-600">{correctCount}</span>
            </div>
            <div>
              <span className="text-gray-600">Incorrect:</span>
              <span className="ml-2 font-bold text-red-600">
                {Object.keys(submittedAnswers).length - correctCount}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Marks:</span>
              <span className="ml-2 font-bold" style={{ color: colorScheme.primary }}>
                {totalMarksEarned} / {activity.totalMarks}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Percentage:</span>
              <span className="ml-2 font-bold" style={{ color: colorScheme.accent }}>
                {Object.keys(submittedAnswers).length > 0
                  ? Math.round((correctCount / Object.keys(submittedAnswers).length) * 100)
                  : 0}%
              </span>
            </div>
          </div>
        </div>

        {/* Completion message */}
        {Object.keys(submittedAnswers).length === activity.questions.length && (
          <div
            className="mt-6 text-center p-6 rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${colorScheme.primary}15, ${colorScheme.secondary}15)`,
            }}
          >
            <div className="text-5xl mb-3">
              {correctCount === activity.questions.length ? '🎉' : '📊'}
            </div>
            <div className="text-2xl font-bold mb-2" style={{ color: colorScheme.primary }}>
              {correctCount === activity.questions.length
                ? 'Perfect Score!'
                : 'Quiz Complete'}
            </div>
            <div className="text-gray-600">
              You scored {totalMarksEarned}/{activity.totalMarks} marks (
              {Math.round((correctCount / activity.questions.length) * 100)}%)
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
