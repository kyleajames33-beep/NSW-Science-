'use client';

import { Lesson } from '@/types/lesson';
import { ActivityRenderer } from './ActivityRenderer';
import Link from 'next/link';

interface TeacherLessonViewProps {
  lesson: Lesson;
}

export function TeacherLessonView({ lesson }: TeacherLessonViewProps) {
  // Empty functions for interactive elements (still work, just no XP tracking)
  const onAnswerQuestion = () => {};
  const onAddXP = () => {};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/dashboard/teacher" className="text-2xl font-bold">
                <span className="text-blue-600">NSW</span>{' '}
                <span className="text-purple-600">Science Hub</span>
              </Link>
              <Link
                href="/dashboard/teacher"
                className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Lessons
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Teacher Mode</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Lesson Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-bold text-xs uppercase tracking-wide mb-4"
            style={{
              background: `linear-gradient(135deg, ${lesson.metadata.colorScheme.primary}, ${lesson.metadata.colorScheme.secondary})`,
            }}
          >
            Year {lesson.metadata.year} • Unit {lesson.metadata.unit} • Lesson {lesson.metadata.lessonNumber}
          </div>
          <h1 className="text-5xl font-bold mb-3 text-gray-900">{lesson.metadata.title}</h1>
          <p className="text-xl text-gray-600 mb-4">{lesson.metadata.subtitle}</p>
          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {lesson.metadata.duration}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {lesson.stages.length} Stages
            </span>
          </div>
          {lesson.metadata.outcomes && lesson.metadata.outcomes.length > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-2">Learning Outcomes:</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                {lesson.metadata.outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">•</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* All Stages - Continuous Scroll */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {lesson.stages.map((stage, stageIndex) => (
          <div key={stage.stageNumber} className="mb-16" id={`stage-${stage.stageNumber}`}>
            {/* Stage Header */}
            <div className="mb-8 bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-bold text-xs uppercase tracking-wide mb-4"
                style={{
                  background: `linear-gradient(135deg, ${lesson.metadata.colorScheme.primary}, ${lesson.metadata.colorScheme.secondary})`,
                }}
              >
                {stage.stageIcon && <span>{stage.stageIcon}</span>}
                Stage {stage.stageNumber}: {stage.stageName}
              </div>
              <h2 className="text-4xl font-bold mb-3 text-gray-900">{stage.title}</h2>
              <p className="text-xl text-gray-600">{stage.description}</p>
            </div>

            {/* Stage Activities */}
            <div className="space-y-8">
              {stage.activities.map((activity, activityIndex) => (
                <ActivityRenderer
                  key={activityIndex}
                  activity={activity}
                  onAnswerQuestion={onAnswerQuestion}
                  onAddXP={onAddXP}
                  colorScheme={lesson.metadata.colorScheme}
                />
              ))}
            </div>

            {/* Stage Divider */}
            {stageIndex < lesson.stages.length - 1 && (
              <div className="mt-12 pt-12 border-t-4 border-dashed border-gray-300"></div>
            )}
          </div>
        ))}

        {/* End of Lesson */}
        <div className="mt-16 text-center py-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">End of Lesson</h2>
          <p className="text-gray-600 mb-8">
            {lesson.metadata.title} - Year {lesson.metadata.year}
          </p>
          <Link
            href="/dashboard/teacher"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Lessons
          </Link>
        </div>
      </div>

      {/* Quick Navigation Sidebar */}
      <div className="fixed right-8 top-32 bg-white rounded-xl shadow-lg border border-gray-200 p-4 max-w-xs hidden xl:block">
        <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Quick Navigate</h3>
        <div className="space-y-2">
          {lesson.stages.map((stage) => (
            <a
              key={stage.stageNumber}
              href={`#stage-${stage.stageNumber}`}
              className="block px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
              style={{
                borderLeft: `3px solid ${lesson.metadata.colorScheme.primary}`,
              }}
            >
              <div className="font-semibold text-gray-900 flex items-center gap-2">
                {stage.stageIcon && <span>{stage.stageIcon}</span>}
                {stage.stageName}
              </div>
              <div className="text-xs text-gray-600 mt-1">{stage.title}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
