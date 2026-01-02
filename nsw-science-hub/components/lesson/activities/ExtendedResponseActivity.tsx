'use client';

import { useState } from 'react';
import { ExtendedResponseActivity as ExtendedResponseActivityType } from '@/types/lesson';

interface ExtendedResponseActivityProps {
  activity: ExtendedResponseActivityType;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  onMarksEarned: (marks: number) => void;
  onXPEarned: (xp: number) => void;
}

export function ExtendedResponseActivity({
  activity,
  colorScheme,
  onMarksEarned,
  onXPEarned
}: ExtendedResponseActivityProps) {
  const [answer, setAnswer] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [showRubric, setShowRubric] = useState(false);

  const handleAnswerChange = (value: string) => {
    setAnswer(value);
    const words = value.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleShowModelAnswer = () => {
    if (!showModelAnswer) {
      setShowModelAnswer(true);
      // Award full marks when viewing model answer (self-assessment)
      onMarksEarned(activity.marks);
      onXPEarned(activity.xpOnCompletion);
    }
  };

  const getWordCountColor = () => {
    if (wordCount < activity.wordsRecommended * 0.8) return 'text-orange-600';
    if (wordCount > activity.wordsRecommended * 1.2) return 'text-orange-600';
    return 'text-green-600';
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
            ✨
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2 text-gray-900">{activity.title}</h3>
            <div className="flex gap-3 text-sm">
              <span
                className="px-3 py-1 rounded-full font-semibold"
                style={{
                  backgroundColor: `${colorScheme.primary}20`,
                  color: colorScheme.primary
                }}
              >
                {activity.marks} marks
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-semibold">
                ~{activity.wordsRecommended} words recommended
              </span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-6">
          <p className="text-sm font-semibold text-blue-900 mb-2">
            📚 Extended Response Question
          </p>
          <p className="text-xs text-blue-800 mb-2">
            This is an {activity.marks}-mark question requiring a comprehensive, well-structured response.
            Take your time to plan your answer before writing.
          </p>
          <p className="text-xs text-blue-800">
            <strong>Assessed outcomes:</strong> {activity.assessedOutcomes.join(', ')}
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

        {/* Stimulus Material */}
        {activity.stimulusMaterial && activity.stimulusMaterial.length > 0 && (
          <div className="space-y-4 mb-6">
            {activity.stimulusMaterial.map((stimulus, index) => (
              <div
                key={index}
                className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6"
              >
                <h4 className="font-bold text-purple-900 mb-3">
                  Stimulus Material {stimulus.type === 'text' ? '' : `(${stimulus.type})`}
                </h4>
                {stimulus.type === 'text' ? (
                  <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {stimulus.content}
                  </div>
                ) : (
                  <div className="text-gray-600 italic">
                    [{stimulus.type.toUpperCase()} would be displayed here]
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Question */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-300 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-3 mb-4">
            <div
              className="px-4 py-2 rounded-lg font-bold text-white"
              style={{ backgroundColor: colorScheme.primary }}
            >
              Question ({activity.marks} marks)
            </div>
          </div>
          <div className="text-lg font-semibold text-gray-900 whitespace-pre-wrap leading-relaxed">
            {activity.question}
          </div>
        </div>

        {/* Rubric button */}
        <div className="mb-6">
          <button
            onClick={() => setShowRubric(!showRubric)}
            className="px-6 py-3 rounded-lg font-semibold transition-all border-2"
            style={{
              borderColor: colorScheme.secondary,
              color: showRubric ? '#fff' : colorScheme.secondary,
              backgroundColor: showRubric ? colorScheme.secondary : 'transparent'
            }}
          >
            {showRubric ? '✓ Hide' : '📊 View'} Marking Rubric
          </button>
        </div>

        {/* Rubric (expandable) */}
        {showRubric && (
          <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 mb-6 space-y-6">
            <div>
              <h4 className="font-bold text-blue-900 text-lg mb-4">Assessment Criteria</h4>
              <div className="space-y-3">
                {activity.rubric.criteria.map((criteria, index) => (
                  <div key={index} className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-bold text-gray-900">{criteria.name}</h5>
                      <span
                        className="px-3 py-1 rounded-full text-sm font-bold text-white"
                        style={{ backgroundColor: colorScheme.primary }}
                      >
                        {criteria.marksAvailable} marks
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">{criteria.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-blue-900 text-lg mb-4">Marking Standards</h4>
              <div className="space-y-3">
                {activity.rubric.markingStandards.map((standard, index) => (
                  <div key={index} className="bg-white rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="px-4 py-1 rounded-lg font-bold text-white"
                        style={{ backgroundColor: colorScheme.secondary }}
                      >
                        {standard.range}
                      </span>
                      <span className="font-semibold text-gray-900">{standard.descriptor}</span>
                    </div>
                    <ul className="space-y-1 ml-4">
                      {standard.keyFeatures.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex gap-2">
                          <span className="text-blue-600">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Answer area */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-bold text-gray-900">Your Answer</h4>
            <div className="flex items-center gap-4 text-sm">
              <span className={`font-semibold ${getWordCountColor()}`}>
                {wordCount} / ~{activity.wordsRecommended} words
              </span>
              {wordCount > 0 && (
                <span className="text-gray-500">
                  ({Math.round((wordCount / activity.wordsRecommended) * 100)}%)
                </span>
              )}
            </div>
          </div>
          <textarea
            value={answer}
            onChange={(e) => handleAnswerChange(e.target.value)}
            disabled={submitted}
            rows={16}
            className="w-full p-6 border-2 border-gray-300 rounded-xl text-sm leading-relaxed resize-none focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-700"
            placeholder="Begin writing your extended response here. Remember to:
• Address all parts of the question
• Use specific examples and evidence
• Make connections between concepts
• Write clearly and logically
• Use scientific terminology correctly"
          />
        </div>

        {/* Submit button */}
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={wordCount < 50}
            className="px-8 py-4 rounded-lg font-bold text-white text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: wordCount >= 50 ? colorScheme.primary : '#9CA3AF'
            }}
          >
            Submit Response
          </button>
        ) : (
          <div className="space-y-4">
            {!showModelAnswer && (
              <button
                onClick={handleShowModelAnswer}
                className="px-8 py-4 rounded-lg font-bold text-white text-lg transition-all"
                style={{ backgroundColor: colorScheme.secondary }}
              >
                View Model Answer & Assessment
              </button>
            )}

            {showModelAnswer && (
              <div className="space-y-6">
                {/* Model answer */}
                <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">✓</span>
                    <h4 className="font-bold text-green-900 text-xl">Model Answer</h4>
                  </div>
                  <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {activity.modelAnswer}
                  </div>
                </div>

                {/* Common issues */}
                {activity.commonIssues.length > 0 && (
                  <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
                    <h4 className="font-bold text-yellow-900 mb-4 text-lg">
                      ⚠️ What Students Often Miss:
                    </h4>
                    <ul className="space-y-2">
                      {activity.commonIssues.map((issue, index) => (
                        <li key={index} className="flex gap-3 text-gray-800">
                          <span className="text-yellow-600 flex-shrink-0">•</span>
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Self-assessment prompt */}
                <div
                  className="border-2 rounded-xl p-6"
                  style={{ borderColor: colorScheme.accent }}
                >
                  <h4 className="font-bold text-gray-900 mb-3 text-lg">Self-Assessment</h4>
                  <p className="text-gray-700 mb-4">
                    Compare your answer to the model answer and rubric above. Consider:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700 mb-4">
                    <li>• Did you address all parts of the question?</li>
                    <li>• Did you use specific examples and evidence?</li>
                    <li>• Did you make connections between concepts?</li>
                    <li>• Was your response well-structured and logical?</li>
                    <li>• Did you use appropriate scientific terminology?</li>
                  </ul>
                  <div
                    className="text-center p-4 rounded-lg font-bold text-white text-lg"
                    style={{ backgroundColor: colorScheme.accent }}
                  >
                    +{activity.marks} marks earned · +{activity.xpOnCompletion} XP
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
