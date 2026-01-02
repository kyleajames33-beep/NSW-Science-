'use client';

import { Stage, LessonMetadata } from '@/types/lesson';

interface StageNavigatorProps {
  stages: Stage[];
  currentStage: number;
  completedStages: number[];
  onStageClick: (stageNumber: number) => void;
  lessonMetadata: LessonMetadata;
}

export function StageNavigator({
  stages,
  currentStage,
  completedStages,
  onStageClick,
  lessonMetadata,
}: StageNavigatorProps) {
  return (
    <aside
      className="fixed left-0 top-16 w-80 text-white p-6 overflow-y-auto"
      style={{
        height: 'calc(100vh - 4rem)',
        background: `linear-gradient(180deg, ${lessonMetadata.colorScheme.primary}, ${lessonMetadata.colorScheme.primary}dd)`,
      }}
    >
      {/* Lesson Header - Simplified since it's in navbar now */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-1">{lessonMetadata.title}</h2>
        <p className="text-xs opacity-85">{lessonMetadata.subtitle}</p>
      </div>

      {/* Stages List */}
      <nav>
        <ul className="space-y-2">
          {stages.map((stage) => {
            const isActive = stage.stageNumber === currentStage;
            const isCompleted = completedStages.includes(stage.stageNumber);
            const isLocked = stage.stageNumber > 1 && !completedStages.includes(stage.stageNumber - 1);

            return (
              <li key={stage.stageNumber}>
                <button
                  onClick={() => !isLocked && onStageClick(stage.stageNumber)}
                  disabled={isLocked}
                  className={`
                    w-full flex items-center gap-3 p-4 rounded-xl transition-all
                    ${isActive ? 'bg-white text-gray-900 shadow-lg' : ''}
                    ${!isActive && !isLocked ? 'hover:bg-white hover:bg-opacity-15' : ''}
                    ${isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  {/* Stage Number/Icon */}
                  <div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 transition-all
                      ${isActive ? 'bg-gradient-to-br shadow-md text-white' : 'bg-white bg-opacity-25 text-white'}
                      ${isCompleted && !isActive ? 'bg-white bg-opacity-30 text-white' : ''}
                    `}
                    style={
                      isActive
                        ? {
                            background: `linear-gradient(135deg, ${lessonMetadata.colorScheme.primary}, ${lessonMetadata.colorScheme.secondary})`,
                          }
                        : {}
                    }
                  >
                    {isCompleted && !isActive ? '✓' : (stage.stageIcon || stage.stageNumber)}
                  </div>

                  {/* Stage Info */}
                  <div className="flex-1 text-left">
                    <div className={`font-bold ${isActive ? 'text-gray-900' : 'text-white'}`}>
                      {stage.stageName}
                    </div>
                    {isLocked && (
                      <div className={`text-xs mt-1 ${isActive ? 'text-gray-600' : 'text-white text-opacity-80'}`}>
                        🔒 Complete previous stage
                      </div>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Outcomes */}
      <div className="mt-8 pt-6 border-t border-white border-opacity-30">
        <div className="text-xs font-bold uppercase tracking-wider mb-3 text-white opacity-90">
          NSW Outcomes
        </div>
        <div className="space-y-2">
          {lessonMetadata.outcomes.map((outcome) => (
            <div
              key={outcome}
              className="font-mono text-sm px-3 py-2 rounded-lg text-white font-medium"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
            >
              {outcome}
            </div>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="mt-4 flex items-center gap-2 text-sm bg-white bg-opacity-15 px-3 py-2 rounded-lg text-white">
        <span>⏱️</span>
        <span className="font-semibold">{lessonMetadata.duration}</span>
      </div>
    </aside>
  );
}
