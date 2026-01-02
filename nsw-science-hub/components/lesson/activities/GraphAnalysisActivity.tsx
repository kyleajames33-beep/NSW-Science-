'use client';

import { useState } from 'react';
import { GraphAnalysisActivity as GraphAnalysisActivityType } from '@/types/lesson';

interface GraphAnalysisActivityProps {
  activity: GraphAnalysisActivityType;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  onMarksEarned: (marks: number) => void;
  onXPEarned: (xp: number) => void;
}

export function GraphAnalysisActivity({
  activity,
  colorScheme,
  onMarksEarned,
  onXPEarned
}: GraphAnalysisActivityProps) {
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

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case 'identify': return 'Identify';
      case 'calculate': return 'Calculate';
      case 'describe': return 'Describe';
      case 'explain': return 'Explain';
      default: return type;
    }
  };

  const getQuestionTypeColor = (type: string) => {
    switch (type) {
      case 'identify': return 'bg-blue-100 text-blue-800';
      case 'calculate': return 'bg-purple-100 text-purple-800';
      case 'describe': return 'bg-green-100 text-green-800';
      case 'explain': return 'bg-orange-100 text-orange-800';
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
            📊
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
                📈 {activity.graphType.charAt(0).toUpperCase() + activity.graphType.slice(1)} Graph
              </span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-6">
          <p className="text-sm font-semibold text-blue-900 mb-2">
            📊 Graph Analysis Task
          </p>
          <p className="text-xs text-blue-800">
            Analyze the graph carefully before answering the questions. Show your working for calculations.
          </p>
        </div>

        {/* Context */}
        {activity.context && (
          <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 mb-6">
            <h4 className="font-bold text-gray-900 mb-3">Context</h4>
            <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
              {activity.context}
            </div>
          </div>
        )}

        {/* Graph Display */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300 rounded-xl p-8 mb-6">
          <div className="bg-white rounded-lg p-6 shadow-inner">
            <h4 className="font-bold text-gray-900 text-center mb-4 text-lg">
              {activity.graphData.title}
            </h4>

            {activity.graphData.imageUrl ? (
              <div className="flex justify-center">
                <img
                  src={activity.graphData.imageUrl}
                  alt={activity.graphData.title}
                  className="max-w-full h-auto rounded-lg border border-gray-200"
                />
              </div>
            ) : (
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <div className="text-6xl mb-4">📈</div>
                <p className="text-gray-600 font-semibold">{activity.graphType.toUpperCase()} GRAPH</p>
                <p className="text-sm text-gray-500 mt-2">
                  X-axis: {activity.graphData.xAxisLabel}
                </p>
                <p className="text-sm text-gray-500">
                  Y-axis: {activity.graphData.yAxisLabel}
                </p>
                {activity.graphData.legend && (
                  <div className="mt-4 flex justify-center gap-4 flex-wrap">
                    {activity.graphData.legend.map((item, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white rounded-full text-xs font-medium border border-gray-300">
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="mt-4 text-center text-xs text-gray-600">
              <strong>Figure:</strong> {activity.graphData.title}
            </div>
          </div>
        </div>

        {/* Questions */}
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
                  {question.questionNumber}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getQuestionTypeColor(question.questionType)}`}>
                      {getQuestionTypeLabel(question.questionType)}
                    </span>
                    <span className="text-sm text-gray-600">
                      ({question.marks} {question.marks === 1 ? 'mark' : 'marks'})
                    </span>
                  </div>
                  <div className="text-gray-900 font-medium">
                    {question.question}
                  </div>
                </div>
              </div>

              {/* Hints (if available) */}
              {question.hints && question.hints.length > 0 && !submitted[question.questionNumber] && (
                <div className="mb-4 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r">
                  <p className="text-xs font-semibold text-yellow-900 mb-1">💡 Hints:</p>
                  <ul className="text-xs text-yellow-800 space-y-1">
                    {question.hints.map((hint, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span>•</span>
                        <span>{hint}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Answer input area */}
              <div className="mb-4">
                <textarea
                  value={answers[question.questionNumber] || ''}
                  onChange={(e) => handleAnswerChange(question.questionNumber, e.target.value)}
                  disabled={submitted[question.questionNumber]}
                  rows={question.questionType === 'calculate' ? 6 : 4}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg font-mono text-sm resize-none focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-700"
                  placeholder={question.questionType === 'calculate'
                    ? "Show your working here...\n\nStep 1:\nStep 2:\nFinal answer:"
                    : "Type your answer here..."}
                />
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
                        <div className="text-gray-800 whitespace-pre-wrap leading-relaxed font-mono text-sm">
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
              Graph Analysis Complete!
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
