'use client';

import { InfoCardActivity as InfoCardActivityType } from '@/types/lesson';

interface InfoCardActivityProps {
  activity: InfoCardActivityType;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export function InfoCardActivity({ activity, colorScheme }: InfoCardActivityProps) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div
        className="h-1.5"
        style={{
          background: `linear-gradient(90deg, ${colorScheme.primary}, ${colorScheme.secondary})`,
        }}
      />
      <div className="p-8">
        <div className="flex items-start gap-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${colorScheme.primary}15, ${colorScheme.secondary}15)`,
            }}
          >
            {activity.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              {activity.title}
            </h3>
            <div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: activity.content
                  .replace(/\n\n/g, '</p><p class="mt-4">')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/• /g, '<li>')
                  .replace(/\n/g, '</li>'),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
