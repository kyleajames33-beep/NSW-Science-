'use client';

import { GameState } from '@/types/lesson';

interface GameHUDProps {
  gameState: GameState;
  totalXP: number;
  totalMarks?: number; // NEW: For HSC lessons
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export function GameHUD({ gameState, totalXP, totalMarks, colorScheme }: GameHUDProps) {
  const accuracy = gameState.questionsAnswered > 0
    ? Math.round((gameState.correctAnswers / gameState.questionsAnswered) * 100)
    : 0;

  const progress = Math.min((gameState.xp / totalXP) * 100, 100);
  const isHSCLesson = totalMarks !== undefined;
  const marksPercentage = isHSCLesson && totalMarks > 0
    ? Math.round(((gameState.marksEarned || 0) / totalMarks) * 100)
    : 0;

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
      <div className={`grid ${isHSCLesson ? 'grid-cols-5' : 'grid-cols-4'} gap-6 mb-6`}>
        {/* XP */}
        <div className="text-center">
          <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">XP</div>
          <div className="text-4xl font-bold" style={{ color: colorScheme.primary }}>
            {gameState.xp}
          </div>
        </div>

        {/* Level */}
        <div className="text-center">
          <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">Level</div>
          <div className="text-4xl font-bold" style={{ color: colorScheme.secondary }}>
            {gameState.level}
          </div>
        </div>

        {/* Marks (HSC lessons only) */}
        {isHSCLesson && (
          <div className="text-center">
            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">Marks</div>
            <div className="text-4xl font-bold" style={{ color: colorScheme.accent }}>
              {gameState.marksEarned || 0}/{totalMarks}
            </div>
            <div className="text-xs text-gray-600 mt-1">
              {marksPercentage}%
            </div>
          </div>
        )}

        {/* Streak */}
        <div className="text-center">
          <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">Streak</div>
          <div className="text-4xl font-bold flex items-center justify-center gap-1" style={{ color: colorScheme.accent }}>
            {gameState.streak} {gameState.streak > 0 && '🔥'}
          </div>
        </div>

        {/* Accuracy */}
        <div className="text-center">
          <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">Accuracy</div>
          <div className="text-4xl font-bold" style={{ color: colorScheme.primary }}>
            {accuracy}%
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex justify-between text-sm font-semibold text-gray-700 mb-3">
          <span>Lesson Progress</span>
          <span>
            {gameState.xp} / {totalXP} XP
          </span>
        </div>
        <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${colorScheme.secondary}, ${colorScheme.accent})`,
            }}
          />
        </div>
      </div>

      {/* Streak Multiplier Indicator */}
      {gameState.streak >= 3 && (
        <div className="mt-6 text-center">
          <div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-sm shadow-lg"
            style={{
              background: gameState.streak >= 5
                ? `linear-gradient(135deg, ${colorScheme.accent}, #ef4444)`
                : `linear-gradient(135deg, ${colorScheme.secondary}, ${colorScheme.accent})`,
            }}
          >
            {gameState.streak >= 5 ? '🔥🔥 3x XP STREAK! 🔥🔥' : '🔥 2x XP Streak! 🔥'}
          </div>
        </div>
      )}
    </div>
  );
}
