'use client';

import { useState } from 'react';
import { DragDropActivity as DragDropActivityType } from '@/types/lesson';

interface DragDropActivityProps {
  activity: DragDropActivityType;
  onAnswerQuestion: (isCorrect: boolean) => void;
  onAddXP: (amount: number) => void;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

interface DroppedItem {
  itemId: string;
  text: string;
  correctZone: string;
  droppedInZone: string;
}

export function DragDropActivity({ activity, onAnswerQuestion, onAddXP, colorScheme }: DragDropActivityProps) {
  const [remainingItems, setRemainingItems] = useState(activity.items);
  const [droppedItems, setDroppedItems] = useState<DroppedItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<typeof activity.items[0] | null>(null);

  const handleDragStart = (item: typeof activity.items[0]) => {
    setDraggedItem(item);
  };

  const handleDrop = (zoneId: string) => {
    if (!draggedItem) return;

    const isCorrect = draggedItem.correctZone === zoneId;

    // Add to dropped items
    const newDroppedItem: DroppedItem = {
      itemId: draggedItem.id,
      text: draggedItem.text,
      correctZone: draggedItem.correctZone,
      droppedInZone: zoneId,
    };

    setDroppedItems([...droppedItems, newDroppedItem]);

    // Remove from remaining items
    setRemainingItems(remainingItems.filter(item => item.id !== draggedItem.id));

    // Update game state
    onAnswerQuestion(isCorrect);
    if (isCorrect) {
      onAddXP(activity.xpPerCorrect);
    }

    setDraggedItem(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const allItemsPlaced = remainingItems.length === 0;
  const correctCount = droppedItems.filter(item => item.correctZone === item.droppedInZone).length;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div
        className="h-2"
        style={{
          background: `linear-gradient(90deg, ${colorScheme.primary}, ${colorScheme.secondary})`,
        }}
      />
      <div className="p-8">
        <div className="flex items-start gap-5 mb-8">
          <div
            className="text-4xl flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${colorScheme.primary}15, ${colorScheme.secondary}15)`,
            }}
          >
            🎯
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-3 text-gray-900">
              {activity.title}
            </h3>
            <p className="text-lg text-gray-600">{activity.instructions}</p>
          </div>
        </div>

        {/* Items to Drag */}
        {remainingItems.length > 0 && (
          <div className="mb-8">
            <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide mb-4">Drag these items:</h4>
            <div className="flex flex-wrap gap-3">
            {remainingItems.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(item)}
                className="px-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl cursor-move hover:bg-gray-100 hover:border-gray-300 hover:shadow-md transition-all font-medium text-gray-800"
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Drop Zones */}
      <div className="grid grid-cols-2 gap-6">
        {activity.zones.map((zone) => {
          const itemsInZone = droppedItems.filter(item => item.droppedInZone === zone.id);

          return (
            <div
              key={zone.id}
              onDrop={() => handleDrop(zone.id)}
              onDragOver={handleDragOver}
              className="border-3 border-dashed rounded-2xl p-6 min-h-[240px] transition-all hover:border-opacity-70"
              style={{
                borderColor: zone.color,
                backgroundColor: `${zone.color}08`,
                borderWidth: '3px',
              }}
            >
              <h4 className="font-bold text-lg mb-4 text-center" style={{ color: zone.color }}>
                {zone.label}
              </h4>

              <div className="space-y-3">
                {itemsInZone.map((item) => {
                  const isCorrect = item.correctZone === item.droppedInZone;

                  return (
                    <div
                      key={item.itemId}
                      className={`
                        px-4 py-3 rounded-xl border-2 font-medium flex items-center justify-between shadow-sm
                        ${isCorrect ? 'bg-emerald-50 border-emerald-400 text-emerald-900' : 'bg-red-50 border-red-400 text-red-900'}
                      `}
                    >
                      <span>{item.text}</span>
                      <span className="text-xl font-bold">
                        {isCorrect ? '✓' : '✗'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

        {/* Results */}
        {allItemsPlaced && (
          <div
            className="mt-8 p-6 rounded-2xl text-center border-2"
            style={{
              background: `linear-gradient(135deg, ${colorScheme.secondary}10, ${colorScheme.accent}10)`,
              borderColor: colorScheme.secondary,
            }}
          >
            <div className="text-3xl font-bold mb-2" style={{ color: colorScheme.secondary }}>
              Complete! {correctCount} / {activity.items.length} Correct
            </div>
            <p className="text-lg text-gray-700">
              {correctCount === activity.items.length
                ? '🎉 Perfect score! You\'ve mastered this concept!'
                : 'Good effort! Review the correct placements above.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
