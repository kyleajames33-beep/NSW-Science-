'use client';

import { SkillRatingActivity } from '@/types/lesson';
import { useState } from 'react';

interface SkillRatingActivityProps {
  activity: SkillRatingActivity;
  onAnswerQuestion: (isCorrect: boolean) => void;
  onAddXP: (amount: number) => void;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

type Grade = 'S' | 'A' | 'B' | 'C' | 'D' | 'F';

export function SkillRatingActivityComponent({
  activity,
  colorScheme,
}: SkillRatingActivityProps) {
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [reflection, setReflection] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const grades: Grade[] = ['S', 'A', 'B', 'C', 'D', 'F'];

  const getGradeColor = (grade: Grade) => {
    switch (grade) {
      case 'S':
        return { bg: '#8b5cf6', light: '#ede9fe' }; // Purple
      case 'A':
        return { bg: '#10b981', light: '#d1fae5' }; // Green
      case 'B':
        return { bg: '#3b82f6', light: '#dbeafe' }; // Blue
      case 'C':
        return { bg: '#f59e0b', light: '#fef3c7' }; // Amber
      case 'D':
        return { bg: '#f97316', light: '#ffedd5' }; // Orange
      case 'F':
        return { bg: '#ef4444', light: '#fee2e2' }; // Red
    }
  };

  const handleSelectGrade = (grade: Grade) => {
    if (!hasSubmitted) {
      setSelectedGrade(grade);
    }
  };

  const handleSubmit = () => {
    if (selectedGrade && reflection.trim()) {
      setHasSubmitted(true);
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
          ⭐ Skill Self-Assessment
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Rate Your Skill: {activity.skillName}</h3>
        <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-r-lg">
          <p className="text-sm font-semibold text-indigo-900">
            Be honest with yourself! This helps you track your growth and identify what to focus on next.
          </p>
        </div>
      </div>

      {/* Grade Selection */}
      <div className="mb-8">
        <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">
          How would you rate yourself?
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {grades.map((grade) => {
            const isSelected = selectedGrade === grade;
            const colors = getGradeColor(grade);

            return (
              <button
                key={grade}
                onClick={() => handleSelectGrade(grade)}
                disabled={hasSubmitted}
                className={`p-6 rounded-xl border-2 transition-all ${
                  hasSubmitted ? 'cursor-not-allowed opacity-60' : 'hover:shadow-lg transform hover:-translate-y-1'
                }`}
                style={
                  isSelected
                    ? {
                        borderColor: colors.bg,
                        backgroundColor: colors.light,
                      }
                    : {
                        borderColor: '#e5e7eb',
                        backgroundColor: 'white',
                      }
                }
              >
                <div className="text-center">
                  <div
                    className="text-3xl font-bold mb-2"
                    style={{ color: isSelected ? colors.bg : '#6b7280' }}
                  >
                    {grade}
                  </div>
                  {isSelected && (
                    <svg className="w-5 h-5 mx-auto" style={{ color: colors.bg }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Criteria Display */}
      {selectedGrade && (
        <div className="mb-6 p-6 rounded-xl border-2" style={{ borderColor: getGradeColor(selectedGrade).bg, backgroundColor: getGradeColor(selectedGrade).light }}>
          <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide">
            {selectedGrade} Grade Criteria:
          </h4>
          <p className="text-gray-800 leading-relaxed">{activity.criteria[selectedGrade]}</p>
        </div>
      )}

      {/* All Criteria Reference */}
      <div className="mb-8 p-6 bg-gray-50 rounded-xl">
        <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">
          Full Grading Criteria:
        </h4>
        <div className="space-y-3">
          {grades.map((grade) => {
            const colors = getGradeColor(grade);
            return (
              <div key={grade} className="flex gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: colors.bg }}
                >
                  {grade}
                </div>
                <p className="text-sm text-gray-700 flex-1 pt-2">{activity.criteria[grade]}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reflection */}
      <div className="mb-6">
        <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">
          Reflection:
        </h4>
        <p className="text-gray-700 mb-3">{activity.reflection}</p>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          disabled={hasSubmitted}
          placeholder="Write your reflection here..."
          rows={5}
          className={`w-full p-4 border-2 rounded-xl focus:outline-none transition-all ${
            hasSubmitted ? 'bg-gray-100 cursor-not-allowed' : 'focus:ring-2'
          }`}
          style={
            hasSubmitted
              ? { borderColor: '#e5e7eb' }
              : {
                  borderColor: '#e5e7eb',
                  '--tw-ring-color': colorScheme.primary,
                } as React.CSSProperties
          }
        />
        <p className="text-sm text-gray-500 mt-2">
          {reflection.length} characters {reflection.length < 50 && '(aim for at least 50)'}
        </p>
      </div>

      {/* Submit Button */}
      {!hasSubmitted && (
        <button
          onClick={handleSubmit}
          disabled={!selectedGrade || reflection.length < 50}
          className={`w-full py-4 rounded-xl font-bold text-white transition-all ${
            !selectedGrade || reflection.length < 50
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
          style={{
            background:
              selectedGrade && reflection.length >= 50
                ? `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})`
                : '#d1d5db',
          }}
        >
          Submit Self-Assessment
        </button>
      )}

      {/* Completion State */}
      {hasSubmitted && selectedGrade && (
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
              <p className="font-semibold text-green-900 mb-1">
                Self-Assessment Complete! Grade: {selectedGrade}
              </p>
              <p className="text-sm text-green-700 mb-3">
                Your honest reflection helps you grow. Keep track of how your skills improve over time!
              </p>
              <div className="p-4 bg-white rounded-lg border-2 border-green-200">
                <p className="text-sm font-semibold text-gray-900 mb-2">Your Reflection:</p>
                <p className="text-sm text-gray-700 italic">{reflection}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
