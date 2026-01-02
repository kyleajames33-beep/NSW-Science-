'use client';

import { useState } from 'react';
import { VideoActivity as VideoActivityType } from '@/types/lesson';

interface VideoActivityProps {
  activity: VideoActivityType;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  onXPEarned: (xp: number) => void;
}

export function VideoActivity({ activity, colorScheme, onXPEarned }: VideoActivityProps) {
  const [hasWatched, setHasWatched] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleVideoEnd = () => {
    if (!hasWatched) {
      setHasWatched(true);
      if (!activity.questions || activity.questions.length === 0) {
        onXPEarned(activity.xpOnComplete);
      }
    }
  };

  const handleAnswer = (optionIndex: number) => {
    if (showFeedback || !activity.questions) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
    setShowFeedback(true);

    const question = activity.questions[currentQuestion];
    const isCorrect = optionIndex === question.correctIndex;

    if (isCorrect) {
      onXPEarned(activity.xpOnComplete / activity.questions.length);
    }
  };

  const handleNext = () => {
    if (!activity.questions) return;

    if (currentQuestion < activity.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.includes('youtube.com/watch?v=')
      ? url.split('v=')[1]?.split('&')[0]
      : url.split('youtu.be/')[1]?.split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const isYouTubeUrl = activity.videoUrl.includes('youtube.com') || activity.videoUrl.includes('youtu.be');

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
            🎬
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2 text-gray-900">{activity.title}</h3>
            {activity.description && (
              <p className="text-gray-600">{activity.description}</p>
            )}
          </div>
        </div>

        {/* Video Player */}
        <div className="mb-6 rounded-2xl overflow-hidden bg-black aspect-video">
          {isYouTubeUrl ? (
            <iframe
              src={getYouTubeEmbedUrl(activity.videoUrl)}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => {
                // YouTube videos don't have a reliable onEnded event via iframe
                // So we'll rely on user interaction for XP
              }}
            />
          ) : (
            <video
              src={activity.videoUrl}
              controls
              className="w-full h-full"
              onEnded={handleVideoEnd}
            />
          )}
        </div>

        {/* Manual completion button for YouTube videos */}
        {isYouTubeUrl && !hasWatched && (!activity.questions || activity.questions.length === 0) && (
          <button
            onClick={handleVideoEnd}
            className="w-full py-3 rounded-xl font-semibold text-white transition-all mb-6"
            style={{
              background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})`,
            }}
          >
            Mark as Watched
          </button>
        )}

        {/* Comprehension Questions */}
        {activity.questions && activity.questions.length > 0 && hasWatched && !quizCompleted && (
          <div>
            <div className="mb-4 flex justify-between items-center">
              <div className="text-sm font-bold uppercase tracking-wider text-gray-500">
                Question {currentQuestion + 1} of {activity.questions.length}
              </div>
              <div className="text-sm text-gray-600">
                {answers.filter((a, i) => a === activity.questions![i].correctIndex).length} /{' '}
                {currentQuestion + 1} correct
              </div>
            </div>

            <div className="mb-6 p-5 bg-gray-50 rounded-2xl">
              <div className="font-semibold text-lg text-gray-900">
                {activity.questions[currentQuestion].question}
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {activity.questions[currentQuestion].options.map((option, index) => {
                const isSelected = answers[currentQuestion] === index;
                const isCorrect = index === activity.questions![currentQuestion].correctIndex;
                const showResult = showFeedback && isSelected;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showFeedback}
                    className={`
                      w-full p-4 rounded-xl text-left transition-all font-medium
                      ${!showFeedback && !isSelected ? 'bg-gray-50 border-2 border-gray-200 hover:bg-gray-100 hover:border-gray-300 cursor-pointer' : ''}
                      ${!showFeedback && isSelected ? 'bg-blue-50 border-2 border-blue-300' : ''}
                      ${showResult && isCorrect ? 'bg-green-50 border-2 border-green-300 text-green-700' : ''}
                      ${showResult && !isCorrect ? 'bg-red-50 border-2 border-red-300 text-red-700' : ''}
                      ${showFeedback && !isSelected ? 'opacity-50' : ''}
                    `}
                  >
                    {showResult && isCorrect && '✓ '}
                    {showResult && !isCorrect && '✗ '}
                    {option}
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div>
                <div
                  className={`mb-4 p-4 rounded-xl ${
                    answers[currentQuestion] === activity.questions[currentQuestion].correctIndex
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {activity.questions[currentQuestion].feedback}
                </div>

                <button
                  onClick={handleNext}
                  className="w-full py-3 rounded-xl font-semibold text-white transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})`,
                  }}
                >
                  {currentQuestion < activity.questions.length - 1 ? 'Next Question' : 'Complete'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Completion State */}
        {((activity.questions && quizCompleted) || (!activity.questions && hasWatched)) && (
          <div
            className="text-center p-6 rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${colorScheme.primary}15, ${colorScheme.secondary}15)`,
            }}
          >
            <div className="text-5xl mb-3">🎉</div>
            <div className="text-xl font-bold mb-2" style={{ color: colorScheme.primary }}>
              Video Complete!
            </div>
            {activity.questions && (
              <div className="text-gray-600">
                You got {answers.filter((a, i) => a === activity.questions![i].correctIndex).length} out of{' '}
                {activity.questions.length} questions correct
              </div>
            )}
          </div>
        )}

        {/* Watch prompt */}
        {!hasWatched && activity.questions && activity.questions.length > 0 && (
          <div className="text-center p-6 bg-gray-50 rounded-2xl">
            <div className="text-4xl mb-3">👆</div>
            <div className="text-gray-600">
              Watch the video to unlock comprehension questions
            </div>
            {isYouTubeUrl && (
              <button
                onClick={() => setHasWatched(true)}
                className="mt-4 px-6 py-2 rounded-lg font-semibold text-white transition-all"
                style={{
                  background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})`,
                }}
              >
                I've Watched the Video
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
