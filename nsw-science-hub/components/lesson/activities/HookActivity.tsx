'use client';

import { HookActivity as HookActivityType } from '@/types/lesson';

interface HookActivityProps {
  activity: HookActivityType;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export function HookActivity({ activity, colorScheme }: HookActivityProps) {
  // Format content with basic HTML
  const formattedContent = activity.content
    ? activity.content
        .replace(/\n\n/g, '</p><p class="mt-4">')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    : '';

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div
        className="h-2"
        style={{
          background: `linear-gradient(90deg, ${colorScheme.primary}, ${colorScheme.secondary})`,
        }}
      />
      <div className="p-8">
        <div className="flex items-start gap-5">
          <div
            className="text-5xl flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${colorScheme.primary}20, ${colorScheme.secondary}20)`,
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
                __html: formattedContent,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
