'use client';

import { StructuredNotesActivity } from '@/types/lesson';
import { useState } from 'react';

interface StructuredNotesActivityProps {
  activity: StructuredNotesActivity;
  onAnswerQuestion: (isCorrect: boolean) => void;
  onAddXP: (amount: number) => void;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export function StructuredNotesActivityComponent({
  activity,
  colorScheme,
}: StructuredNotesActivityProps) {
  const [hasAcknowledged, setHasAcknowledged] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleAcknowledge = () => {
    setHasAcknowledged(true);
  };

  const renderStructureValue = (value: any): React.ReactNode => {
    if (typeof value === 'string') {
      return <p className="text-gray-700 leading-relaxed">{value}</p>;
    }

    if (Array.isArray(value)) {
      return (
        <ul className="space-y-2">
          {value.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-700">
              <span style={{ color: colorScheme.primary }} className="mt-0.5 flex-shrink-0">
                •
              </span>
              <span>{typeof item === 'string' ? item : JSON.stringify(item)}</span>
            </li>
          ))}
        </ul>
      );
    }

    if (typeof value === 'object' && value !== null) {
      return (
        <div className="space-y-3 pl-4 border-l-2" style={{ borderColor: colorScheme.primary }}>
          {Object.entries(value).map(([subKey, subValue]) => (
            <div key={subKey}>
              <h5 className="font-semibold text-gray-900 mb-1 text-sm">{subKey}:</h5>
              {renderStructureValue(subValue)}
            </div>
          ))}
        </div>
      );
    }

    return <p className="text-gray-700">{String(value)}</p>;
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
          📝 {activity.title}
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <p className="text-sm font-semibold text-blue-900">
            Copy these notes into your science book. Organized notes help you study and remember key concepts!
          </p>
        </div>
      </div>

      {/* Student Task */}
      <div className="mb-6 p-4 bg-amber-50 rounded-xl border-2 border-amber-200">
        <h4 className="font-bold text-amber-900 mb-2 text-sm uppercase tracking-wide">Your Task:</h4>
        <p className="text-amber-900">{activity.studentTask}</p>
      </div>

      {/* Toggle Expand/Collapse */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full mb-4 px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-between"
        style={{
          backgroundColor: `${colorScheme.primary}15`,
          color: colorScheme.primary,
        }}
      >
        <span>{isExpanded ? 'Hide' : 'Show'} Notes Structure</span>
        <svg
          className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Notes Structure */}
      {isExpanded && (
        <div className="mb-6 p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
          <div className="space-y-6">
            {activity.sections ? (
              // New format: array of sections
              activity.sections.map((section, index) => (
                <div key={index} className="space-y-3">
                  <h4
                    className="font-bold text-lg mb-3 pb-2 border-b-2"
                    style={{ color: colorScheme.primary, borderColor: colorScheme.primary }}
                  >
                    {section.heading}
                  </h4>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {section.content}
                  </div>
                  {section.keyTerm && (
                    <div className="mt-3 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                      <div className="font-bold text-blue-900 mb-1">📘 {section.keyTerm.term}</div>
                      <div className="text-sm text-blue-800 mb-2">{section.keyTerm.definition}</div>
                      <div className="text-xs text-blue-700">
                        <strong>Example:</strong> {section.keyTerm.example}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : activity.structure ? (
              // Old format: object with keys
              Object.entries(activity.structure).map(([key, value]) => (
                <div key={key}>
                  <h4
                    className="font-bold text-lg mb-3 pb-2 border-b-2"
                    style={{ color: colorScheme.primary, borderColor: colorScheme.primary }}
                  >
                    {key}
                  </h4>
                  {renderStructureValue(value)}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No notes structure available</p>
            )}
          </div>
        </div>
      )}

      {/* Visual Model (if provided) */}
      {activity.visualModel && (
        <div className="mb-6 p-6 bg-white rounded-xl border-2" style={{ borderColor: colorScheme.accent }}>
          <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">
            Visual Model:
          </h4>
          <div className="flex items-center justify-center p-8 bg-gray-100 rounded-lg">
            <img
              src={activity.visualModel}
              alt="Visual model for notes"
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Include this diagram in your notes to help visualize the concept
          </p>
        </div>
      )}

      {/* Tips for Note-Taking */}
      <div className="mb-6 p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
        <h4 className="font-bold text-purple-900 mb-2 text-sm uppercase tracking-wide flex items-center gap-2">
          💡 Note-Taking Tips:
        </h4>
        <ul className="space-y-2 text-sm text-purple-900">
          <li className="flex items-start gap-2">
            <span className="flex-shrink-0">1.</span>
            <span>Use headings and subheadings to organize information</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="flex-shrink-0">2.</span>
            <span>Write in your own words to help understanding</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="flex-shrink-0">3.</span>
            <span>Include diagrams and visual models</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="flex-shrink-0">4.</span>
            <span>Use bullet points for lists and key facts</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="flex-shrink-0">5.</span>
            <span>Highlight or underline key terms and definitions</span>
          </li>
        </ul>
      </div>

      {/* Acknowledgment */}
      {!hasAcknowledged && (
        <button
          onClick={handleAcknowledge}
          className="w-full py-4 rounded-xl font-bold text-white transition-all hover:shadow-lg transform hover:-translate-y-0.5"
          style={{
            background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})`,
          }}
        >
          I've Copied the Notes
        </button>
      )}

      {/* Completion State */}
      {hasAcknowledged && (
        <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
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
              <p className="font-semibold text-green-900 mb-1">Notes Copied!</p>
              <p className="text-sm text-green-700">
                Great job! These organized notes will be super helpful when you're studying.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
