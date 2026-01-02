'use client';

import { useState } from 'react';
import { CopyToBookActivity as CopyToBookActivityType } from '@/types/lesson';

interface CopyToBookActivityProps {
  activity: CopyToBookActivityType;
}

export function CopyToBookActivity({ activity }: CopyToBookActivityProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activity.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-500">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📓</span>
          <h3 className="text-xl font-bold text-purple-700">
            {activity.title || 'Copy to Your Science Book'}
          </h3>
        </div>
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
        >
          {copied ? '✓ Copied!' : '📋 Copy'}
        </button>
      </div>

      <div
        className="bg-white p-6 rounded-xl font-mono text-sm leading-relaxed whitespace-pre-wrap"
        dangerouslySetInnerHTML={{
          __html: activity.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
        }}
      />
    </div>
  );
}
