'use client';

import { useState } from 'react';
import { ShortAnswerActivity as ShortAnswerActivityType } from '@/types/lesson';

interface ShortAnswerActivityProps {
  activity: ShortAnswerActivityType;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  onMarksEarned: (marks: number) => void;
  onXPEarned: (xp: number) => void;
}

export function ShortAnswerActivity({
  activity,
  colorScheme,
  onMarksEarned,
  onXPEarned
}: ShortAnswerActivityProps) {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState<{ [key: string]: boolean }>({});
  const [showModelAnswer, setShowModelAnswer] = useState<{ [key: string]: boolean }>({});
  const [totalMarksEarned, setTotalMarksEarned] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswerChange = (questionNumber: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionNumber]: value
    }));
  };

  const handleSubmitAnswer = (questionNumber: string) => {
    setSubmitted(prev => ({
      ...prev,
      [questionNumber]: true
    }));
  };

  const handleShowModel = (questionNumber: string, marks: number) => {
    if (!showModelAnswer[questionNumber]) {
      setShowModelAnswer(prev => ({
        ...prev,
        [questionNumber]: true
      }));

      // Award marks when student views model answer (self-assessment)
      const newTotal = totalMarksEarned + marks;
      setTotalMarksEarned(newTotal);
      onMarksEarned(marks);

      // Check if all questions are completed
      const allQuestionsViewed = activity.questions.every(
        q => showModelAnswer[q.questionNumber] || q.questionNumber === questionNumber
      );

      if (allQuestionsViewed && !isCompleted) {
        setIsCompleted(true);
        onXPEarned(activity.xpOnCompletion);
      }
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
        <div className="flex items-start gap-5 mb-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${colorScheme.primary}15, ${colorScheme.secondary}15)`,
            }}
          >
            ✍️
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2 text-gray-900">{activity.title}</h3>
            {activity.context && (
              <div className="text-gray-600 mb-4 whitespace-pre-wrap">{activity.context}</div>
            )}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <p className="text-sm font-semibold text-blue-900 mb-2">
                📝 Instructions: Answer each question in the space provided.
              </p>
              <p className="text-xs text-blue-800">
                Write your answer, then submit to see the model answer and marking criteria. You'll earn marks for comparing your answer to the model.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {activity.questions.map((question, index) => (
            <div
              key={question.questionNumber}
              className="border-2 border-gray-200 rounded-2xl p-6 bg-gray-50"
            >
              <div className="flex items-start gap-3 mb-4">
                <div
                  className="px-3 py-1 rounded-lg font-bold text-white text-sm"
                  style={{ backgroundColor: colorScheme.primary }}
                >
                  Q{question.questionNumber}
                </div>
                <div className="flex-1">
                  <div className="text-gray-900 font-medium mb-1">
                    {question.question}
                  </div>
                  <div className="text-sm text-gray-600">
                    ({question.marks} {question.marks === 1 ? 'mark' : 'marks'})
                  </div>
                </div>
              </div>

              {/* Answer input area */}
              <div className="mb-4">
                {question.answerSpace === 'lines' ? (
                  <textarea
                    value={answers[question.questionNumber] || ''}
                    onChange={(e) => handleAnswerChange(question.questionNumber, e.target.value)}
                    disabled={submitted[question.questionNumber]}
                    rows={question.linesProvided || 4}
                    className="w-full p-4 border-2 border-gray-300 rounded-lg font-mono text-sm resize-none focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-700"
                    placeholder="Type your answer here..."
                    style={{
                      lineHeight: '1.8',
                    }}
                  />
                ) : (
                  <textarea
                    value={answers[question.questionNumber] || ''}
                    onChange={(e) => handleAnswerChange(question.questionNumber, e.target.value)}
                    disabled={submitted[question.questionNumber]}
                    rows={6}
                    className="w-full p-4 border-2 border-gray-300 rounded-lg font-mono text-sm resize-none focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-700"
                    placeholder="Type your answer here..."
                  />
                )}
              </div>

              {/* Submit button */}
              {!submitted[question.questionNumber] ? (
                <button
                  onClick={() => handleSubmitAnswer(question.questionNumber)}
                  disabled={!answers[question.questionNumber]?.trim()}
                  className="px-6 py-3 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: answers[question.questionNumber]?.trim()
                      ? colorScheme.primary
                      : '#9CA3AF'
                  }}
                >
                  Submit Answer
                </button>
              ) : (
                <div className="space-y-4">
                  {/* Show model answer button */}
                  {!showModelAnswer[question.questionNumber] && (
                    <button
                      onClick={() => handleShowModel(question.questionNumber, question.marks)}
                      className="px-6 py-3 rounded-lg font-semibold text-white transition-all"
                      style={{ backgroundColor: colorScheme.secondary }}
                    >
                      View Model Answer & Marking Criteria
                    </button>
                  )}

                  {/* Model answer and marking criteria */}
                  {showModelAnswer[question.questionNumber] && (
                    <div className="space-y-4">
                      <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">✓</span>
                          <h4 className="font-bold text-green-900 text-lg">Model Answer</h4>
                        </div>
                        <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                          {question.modelAnswer}
                        </div>
                      </div>

                      {/* Marking criteria */}
                      <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
                        <h4 className="font-bold text-blue-900 mb-3 text-lg">Marking Criteria</h4>
                        <div className="space-y-2">
                          {question.markingCriteria.map((criteria, idx) => (
                            <div key={idx} className="flex gap-3">
                              <div
                                className="px-2 py-1 rounded font-bold text-white text-sm flex-shrink-0"
                                style={{ backgroundColor: colorScheme.primary }}
                              >
                                {criteria.mark} {criteria.mark === 1 ? 'mark' : 'marks'}
                              </div>
                              <div className="text-gray-800 text-sm">
                                {criteria.descriptor}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Key terms required */}
                      {question.keyTermsRequired.length > 0 && (
                        <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-6">
                          <h4 className="font-bold text-purple-900 mb-3">Key Terms to Include:</h4>
                          <div className="flex flex-wrap gap-2">
                            {question.keyTermsRequired.map((term, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-purple-200 text-purple-900 rounded-full text-sm font-medium"
                              >
                                {term}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Common mistakes */}
                      {question.commonMistakes && question.commonMistakes.length > 0 && (
                        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
                          <h4 className="font-bold text-yellow-900 mb-3">⚠️ Common Mistakes:</h4>
                          <ul className="space-y-2 text-sm text-gray-800">
                            {question.commonMistakes.map((mistake, idx) => (
                              <li key={idx} className="flex gap-2">
                                <span className="text-yellow-600">•</span>
                                <span>{mistake}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Marks awarded */}
                      <div
                        className="text-center p-4 rounded-xl font-bold text-white"
                        style={{ backgroundColor: colorScheme.accent }}
                      >
                        +{question.marks} {question.marks === 1 ? 'mark' : 'marks'} earned
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress summary */}
        <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-gray-900">Progress</span>
            <span className="text-gray-600">
              {Object.keys(showModelAnswer).length} / {activity.questions.length} completed
            </span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(Object.keys(showModelAnswer).length / activity.questions.length) * 100}%`,
                background: `linear-gradient(90deg, ${colorScheme.primary}, ${colorScheme.secondary})`,
              }}
            />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Marks Earned:</span>
            <span className="font-bold" style={{ color: colorScheme.primary }}>
              {totalMarksEarned} / {activity.totalMarks}
            </span>
          </div>
        </div>

        {/* Completion message */}
        {isCompleted && (
          <div
            className="mt-6 text-center p-6 rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${colorScheme.primary}15, ${colorScheme.secondary}15)`,
            }}
          >
            <div className="text-5xl mb-3">🎉</div>
            <div className="text-2xl font-bold mb-2" style={{ color: colorScheme.primary }}>
              All Questions Completed!
            </div>
            <div className="text-gray-600">
              You've earned {totalMarksEarned} marks and {activity.xpOnCompletion} XP
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
