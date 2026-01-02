'use client';

import { useRouter } from 'next/navigation';
import { LessonMetadata } from '@/types/lesson';

interface LessonNavbarProps {
  lessonMetadata: LessonMetadata;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export function LessonNavbar({ lessonMetadata, colorScheme }: LessonNavbarProps) {
  const router = useRouter();

  const handleBackToDashboard = () => {
    router.push('/dashboard/student');
  };

  const handlePreviousLesson = () => {
    if (lessonMetadata.lessonNumber > 1) {
      const prevLessonId = `y${lessonMetadata.year}-u${lessonMetadata.unit}-l${String(lessonMetadata.lessonNumber - 1).padStart(2, '0')}`;
      router.push(`/lesson/${prevLessonId}`);
    }
  };

  const handleNextLesson = () => {
    const nextLessonId = `y${lessonMetadata.year}-u${lessonMetadata.unit}-l${String(lessonMetadata.lessonNumber + 1).padStart(2, '0')}`;
    router.push(`/lesson/${nextLessonId}`);
  };

  const hasPreviousLesson = lessonMetadata.lessonNumber > 1;
  const hasNextLesson = lessonMetadata.lessonNumber < 10; // Assuming 10 lessons per unit

  return (
    <nav
      className="fixed top-0 left-80 right-0 h-16 bg-white border-b border-gray-200 shadow-sm z-40"
    >
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left side - Back to Dashboard */}
        <button
          onClick={handleBackToDashboard}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="font-semibold">Dashboard</span>
        </button>

        {/* Center - Current Lesson Info */}
        <div className="flex items-center gap-3">
          <div
            className="px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wide"
            style={{
              background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})`,
            }}
          >
            Year {lessonMetadata.year} • Unit {lessonMetadata.unit}
          </div>
          <div className="text-gray-900 font-semibold">
            Lesson {lessonMetadata.lessonNumber}: {lessonMetadata.title}
          </div>
        </div>

        {/* Right side - Lesson Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePreviousLesson}
            disabled={!hasPreviousLesson}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors
              ${
                hasPreviousLesson
                  ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  : 'text-gray-300 cursor-not-allowed'
              }
            `}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </button>

          <button
            onClick={handleNextLesson}
            disabled={!hasNextLesson}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors
              ${
                hasNextLesson
                  ? 'text-white hover:opacity-90'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
            style={
              hasNextLesson
                ? {
                    background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})`,
                  }
                : {}
            }
          >
            Next
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
