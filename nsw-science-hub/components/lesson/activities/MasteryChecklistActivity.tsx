'use client';

import { useState } from 'react';
import { MasteryChecklistActivity as MasteryChecklistActivityType } from '@/types/lesson';

interface MasteryChecklistActivityProps {
  activity: MasteryChecklistActivityType;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export function MasteryChecklistActivity({ activity, colorScheme }: MasteryChecklistActivityProps) {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedItems(newChecked);
  };

  const allChecked = checkedItems.size === activity.items.length;

  return (
    <div className="bg-white rounded-2xl p-6 border-2 shadow-sm">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2" style={{ color: colorScheme.primary }}>
          🎯 Mastery Checklist
        </h3>
        <p className="text-gray-600">
          Check off each skill you've mastered in this lesson
        </p>
      </div>

      <div className="space-y-3">
        {activity.items.map((item, index) => {
          const isChecked = checkedItems.has(index);

          return (
            <div
              key={index}
              onClick={() => toggleItem(index)}
              className={`
                flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all
                ${isChecked ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-gray-300 hover:border-gray-400'}
              `}
            >
              <div
                className={`
                  w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all
                  ${isChecked ? 'bg-green-500 border-green-500' : 'border-gray-400'}
                `}
              >
                {isChecked && <span className="text-white text-sm font-bold">✓</span>}
              </div>
              <div className="flex-1 font-medium text-gray-900">{item}</div>
            </div>
          );
        })}
      </div>

      {allChecked && (
        <div
          className="mt-6 p-4 rounded-xl text-center font-bold"
          style={{
            background: `linear-gradient(135deg, ${colorScheme.secondary}20, ${colorScheme.accent}20)`,
            color: colorScheme.secondary,
          }}
        >
          🎉 Excellent! You've mastered all the skills in this lesson!
        </div>
      )}
    </div>
  );
}
