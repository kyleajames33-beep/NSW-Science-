'use client';

import { SimulationActivity, SimulationControl } from '@/types/lesson';
import { useState } from 'react';

interface SimulationActivityProps {
  activity: SimulationActivity;
  onAnswerQuestion: (isCorrect: boolean) => void;
  onAddXP: (amount: number) => void;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export function SimulationActivityComponent({
  activity,
  onAddXP,
  colorScheme,
}: SimulationActivityProps) {
  const [controlValues, setControlValues] = useState<Record<string, number | string>>({});
  const [hasExperimented, setHasExperimented] = useState(false);
  const [experimentCount, setExperimentCount] = useState(0);
  const [hasCompletedPattern, setHasCompletedPattern] = useState(false);
  const [showPattern, setShowPattern] = useState(false);

  const handleControlChange = (controlName: string, value: number | string) => {
    setControlValues({ ...controlValues, [controlName]: value });
  };

  const handleRunExperiment = () => {
    if (!hasExperimented) {
      setHasExperimented(true);
      onAddXP(activity.xp / 2); // Half XP for first experiment
    }
    setExperimentCount(experimentCount + 1);

    // Award full XP after 3+ experiments
    if (experimentCount === 2) {
      onAddXP(activity.xp / 2);
    }
  };

  const handleRevealPattern = () => {
    setShowPattern(true);
    if (!hasCompletedPattern) {
      setHasCompletedPattern(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
      {/* Activity Header */}
      <div className="mb-6">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-bold text-xs uppercase tracking-wide mb-4"
          style={{
            background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})`,
          }}
        >
          🔬 Interactive Simulation
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{activity.title}</h3>
        <p className="text-gray-600">{activity.description}</p>
      </div>

      {/* Instruction Banner */}
      <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg mb-6">
        <p className="text-sm font-semibold text-purple-900 mb-2">
          🎮 How this works: Adjust the controls and click "Run Experiment" to see what scientists observe.
        </p>
        <p className="text-xs text-purple-800">
          💡 Your goal: Run at least 3 experiments with different settings, then discover the pattern!
        </p>
      </div>

      {/* Simulation Controls */}
      <div className="mb-6 p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
        <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Controls:</h4>
        <div className="space-y-6">
          {activity.controls.map((control) => (
            <div key={control.name}>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                {control.name}
                {control.unit && (
                  <span className="text-gray-500 font-normal ml-1">({control.unit})</span>
                )}
              </label>

              {control.type === 'slider' && control.range && (
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={control.range[0]}
                    max={control.range[1]}
                    value={controlValues[control.name] || control.range[0]}
                    onChange={(e) => handleControlChange(control.name, parseFloat(e.target.value))}
                    className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, ${colorScheme.primary} 0%, ${colorScheme.secondary} 100%)`,
                    }}
                  />
                  <span className="text-lg font-bold text-gray-900 min-w-[60px] text-right">
                    {controlValues[control.name] || control.range[0]}
                  </span>
                </div>
              )}

              {control.type === 'toggle' && control.options && (
                <div className="flex gap-2">
                  {control.options.map((option) => {
                    const isSelected = controlValues[control.name] === option;
                    return (
                      <button
                        key={option}
                        onClick={() => handleControlChange(control.name, option)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all border-2`}
                        style={
                          isSelected
                            ? {
                                borderColor: colorScheme.primary,
                                backgroundColor: colorScheme.primary,
                                color: 'white',
                              }
                            : {
                                borderColor: '#e5e7eb',
                                backgroundColor: 'white',
                                color: '#374151',
                              }
                        }
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Run Experiment Button */}
        <button
          onClick={handleRunExperiment}
          className="w-full mt-6 py-3 rounded-xl font-bold text-white transition-all hover:shadow-lg transform hover:-translate-y-0.5"
          style={{
            background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})`,
          }}
        >
          Run Experiment {experimentCount > 0 && `(${experimentCount})`}
        </button>
      </div>

      {/* Observations */}
      {hasExperimented && (
        <div className="mb-6 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
          <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">
            📊 Scientific Observations (All Patterns):
          </h4>
          <p className="text-xs text-blue-800 mb-3 italic">
            Below are all the patterns scientists have discovered. Try different control settings and see which observations match!
          </p>
          <ul className="space-y-2">
            {activity.observables.map((observable, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>{observable}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Experiment Counter */}
      {experimentCount > 0 && (
        <div className="mb-6 flex items-center justify-between p-4 bg-gray-100 rounded-lg">
          <span className="text-sm font-semibold text-gray-700">
            Experiments Run: {experimentCount}
          </span>
          <span className="text-sm font-semibold" style={{ color: colorScheme.primary }}>
            {experimentCount === 1 ? `+${activity.xp / 2} XP` : `+${activity.xp} XP`}
          </span>
        </div>
      )}

      {/* Pattern Reveal */}
      {experimentCount >= 3 && !showPattern && (
        <button
          onClick={handleRevealPattern}
          className="w-full py-3 rounded-xl font-bold transition-all border-2"
          style={{
            borderColor: colorScheme.accent,
            color: colorScheme.accent,
            backgroundColor: 'white',
          }}
        >
          Ready to See the Pattern?
        </button>
      )}

      {showPattern && (
        <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
          <h4 className="font-bold text-green-900 mb-2 text-lg">The Pattern:</h4>
          <p className="text-gray-800 leading-relaxed">{activity.revealPattern}</p>
        </div>
      )}

      {/* Completion State */}
      {hasExperimented && experimentCount >= 3 && (
        <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="font-semibold text-green-900 mb-1">
                Great Experimenting! +{activity.xp} XP
              </p>
              <p className="text-sm text-green-700">
                You've discovered the pattern through hands-on exploration!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
