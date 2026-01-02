'use client';

import { useState, useEffect } from 'react';
import { MatchingActivity as MatchingActivityType } from '@/types/lesson';

interface MatchingActivityProps {
  activity: MatchingActivityType;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  onXPEarned: (xp: number) => void;
}

export function MatchingActivity({ activity, colorScheme, onXPEarned }: MatchingActivityProps) {
  const [shuffledTerms, setShuffledTerms] = useState<string[]>([]);
  const [shuffledDefinitions, setShuffledDefinitions] = useState<string[]>([]);
  const [matches, setMatches] = useState<Map<string, string>>(new Map());
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedDefinition, setSelectedDefinition] = useState<string | null>(null);
  const [correctMatches, setCorrectMatches] = useState<Set<string>>(new Set());
  const [incorrectAttempt, setIncorrectAttempt] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Shuffle terms and definitions
    const terms = activity.pairs.map(p => p.term);
    const definitions = activity.pairs.map(p => p.definition);

    setShuffledTerms([...terms].sort(() => Math.random() - 0.5));
    setShuffledDefinitions([...definitions].sort(() => Math.random() - 0.5));
  }, [activity.pairs]);

  const handleTermClick = (term: string) => {
    if (correctMatches.has(term)) return;
    setSelectedTerm(term);
    setIncorrectAttempt(false);
  };

  const handleDefinitionClick = (definition: string) => {
    if (Array.from(matches.values()).includes(definition)) return;
    setSelectedDefinition(definition);
    setIncorrectAttempt(false);
  };

  useEffect(() => {
    if (selectedTerm && selectedDefinition) {
      // Check if match is correct
      const correctPair = activity.pairs.find(
        p => p.term === selectedTerm && p.definition === selectedDefinition
      );

      if (correctPair) {
        // Correct match!
        const newMatches = new Map(matches);
        newMatches.set(selectedTerm, selectedDefinition);
        setMatches(newMatches);

        const newCorrectMatches = new Set(correctMatches);
        newCorrectMatches.add(selectedTerm);
        setCorrectMatches(newCorrectMatches);

        onXPEarned(activity.xpPerPair);

        // Check if all matched
        if (newCorrectMatches.size === activity.pairs.length) {
          setIsCompleted(true);
        }
      } else {
        // Incorrect match
        setIncorrectAttempt(true);
      }

      // Reset selections
      setTimeout(() => {
        setSelectedTerm(null);
        setSelectedDefinition(null);
        setIncorrectAttempt(false);
      }, incorrectAttempt ? 1000 : 300);
    }
  }, [selectedTerm, selectedDefinition]);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div
        className="h-1.5"
        style={{
          background: `linear-gradient(90deg, ${colorScheme.primary}, ${colorScheme.secondary})`,
        }}
      />
      <div className="p-8">
        <div className="flex items-start gap-5 mb-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${colorScheme.primary}15, ${colorScheme.secondary}15)`,
            }}
          >
            🔗
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2 text-gray-900">{activity.title}</h3>
            <p className="text-gray-600">{activity.instructions}</p>
          </div>
        </div>

        {isCompleted ? (
          <div
            className="text-center p-8 rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${colorScheme.primary}15, ${colorScheme.secondary}15)`,
            }}
          >
            <div className="text-6xl mb-4">🎉</div>
            <div className="text-2xl font-bold mb-2" style={{ color: colorScheme.primary }}>
              Perfect Match!
            </div>
            <div className="text-gray-600">
              You matched all {activity.pairs.length} pairs correctly!
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {/* Terms Column */}
            <div>
              <div className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
                Terms
              </div>
              <div className="space-y-3">
                {shuffledTerms.map((term) => {
                  const isMatched = correctMatches.has(term);
                  const isSelected = selectedTerm === term;

                  return (
                    <button
                      key={term}
                      onClick={() => handleTermClick(term)}
                      disabled={isMatched}
                      className={`
                        w-full p-4 rounded-xl text-left font-medium transition-all
                        ${isMatched ? 'bg-green-50 border-2 border-green-300 text-green-700 cursor-default' : ''}
                        ${isSelected && !isMatched ? 'ring-4 border-2' : ''}
                        ${!isSelected && !isMatched ? 'bg-gray-50 border-2 border-gray-200 hover:bg-gray-100 hover:border-gray-300 cursor-pointer' : ''}
                      `}
                      style={
                        isSelected && !isMatched
                          ? {
                              '--tw-ring-color': colorScheme.primary,
                              borderColor: colorScheme.primary,
                              backgroundColor: `${colorScheme.primary}20`,
                              color: colorScheme.primary
                            } as React.CSSProperties
                          : {}
                      }
                    >
                      {isMatched && <span className="mr-2">✓</span>}
                      {term}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Definitions Column */}
            <div>
              <div className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
                Definitions
              </div>
              <div className="space-y-3">
                {shuffledDefinitions.map((definition) => {
                  const isMatched = Array.from(matches.values()).includes(definition);
                  const isSelected = selectedDefinition === definition;
                  const showIncorrect = incorrectAttempt && isSelected;

                  return (
                    <button
                      key={definition}
                      onClick={() => handleDefinitionClick(definition)}
                      disabled={isMatched}
                      className={`
                        w-full p-4 rounded-xl text-left font-medium transition-all
                        ${isMatched ? 'bg-green-50 border-2 border-green-300 text-green-700 cursor-default' : ''}
                        ${isSelected && !isMatched && !showIncorrect ? 'ring-4 border-2' : ''}
                        ${showIncorrect ? 'bg-red-50 border-2 border-red-300 text-red-700' : ''}
                        ${!isSelected && !isMatched ? 'bg-gray-50 border-2 border-gray-200 hover:bg-gray-100 hover:border-gray-300 cursor-pointer' : ''}
                      `}
                      style={
                        isSelected && !isMatched && !showIncorrect
                          ? {
                              '--tw-ring-color': colorScheme.secondary,
                              borderColor: colorScheme.secondary,
                              backgroundColor: `${colorScheme.secondary}20`,
                              color: colorScheme.secondary
                            } as React.CSSProperties
                          : {}
                      }
                    >
                      {isMatched && <span className="mr-2">✓</span>}
                      {definition}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        {!isCompleted && (
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{correctMatches.size} / {activity.pairs.length} matched</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(correctMatches.size / activity.pairs.length) * 100}%`,
                  background: `linear-gradient(90deg, ${colorScheme.primary}, ${colorScheme.secondary})`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
