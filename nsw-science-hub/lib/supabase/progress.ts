import { supabase } from './client';
import { GameState } from '@/types/lesson';
import { LessonProgress } from '@/types/database';

/**
 * Load lesson progress from Supabase
 */
export async function loadLessonProgress(
  userId: string,
  lessonId: string
): Promise<GameState | null> {
  try {
    const { data, error } = await supabase
      .from('lesson_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .single();

    if (error) {
      // If no progress exists, return null
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }

    if (!data) return null;

    // Convert database record to GameState
    return {
      xp: (data as any).xp,
      level: (data as any).level,
      currentStage: (data as any).current_stage,
      completedStages: (data as any).completed_stages,
      streak: (data as any).streak,
      maxStreak: (data as any).max_streak,
      questionsAnswered: (data as any).questions_answered,
      correctAnswers: (data as any).correct_answers,
    };
  } catch (error) {
    console.error('Error loading progress:', error);
    return null;
  }
}

/**
 * Save lesson progress to Supabase
 */
export async function saveLessonProgress(
  userId: string,
  lessonId: string,
  gameState: GameState
): Promise<boolean> {
  try {
    const progressData = {
      user_id: userId,
      lesson_id: lessonId,
      current_stage: gameState.currentStage,
      completed_stages: gameState.completedStages,
      is_completed: gameState.completedStages.length === 5,
      xp: gameState.xp,
      level: gameState.level,
      streak: gameState.streak,
      max_streak: gameState.maxStreak,
      questions_answered: gameState.questionsAnswered,
      correct_answers: gameState.correctAnswers,
      last_accessed_at: new Date().toISOString(),
      ...(gameState.completedStages.length === 5 && {
        completed_at: new Date().toISOString(),
      }),
    };

    const { error } = await supabase
      .from('lesson_progress')
      .upsert(progressData as any, {
        onConflict: 'user_id,lesson_id',
      });

    if (error) throw error;

    return true;
  } catch (error) {
    console.error('Error saving progress:', error);
    return false;
  }
}

/**
 * Log a lesson event for analytics
 */
export async function logLessonEvent(
  userId: string,
  lessonId: string,
  eventType: 'lesson_started' | 'lesson_completed' | 'stage_completed' | 'question_answered' | 'xp_earned' | 'level_up' | 'streak_achieved',
  eventData?: any
): Promise<void> {
  try {
    const { error } = await supabase.from('lesson_events').insert({
      user_id: userId,
      lesson_id: lessonId,
      event_type: eventType,
      event_data: eventData || {},
    } as any);

    if (error) throw error;
  } catch (error) {
    console.error('Error logging event:', error);
  }
}
