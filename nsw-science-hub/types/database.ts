// Supabase database types

export interface User {
  id: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;

  // Progress
  current_stage: number;
  completed_stages: number[];
  is_completed: boolean;

  // Game Stats
  xp: number;
  level: number;
  streak: number;
  max_streak: number;
  questions_answered: number;
  correct_answers: number;

  // Timestamps
  started_at: string;
  completed_at: string | null;
  last_accessed_at: string;
}

export interface LessonEvent {
  id: string;
  user_id: string;
  lesson_id: string;
  event_type: 'question_answered' | 'stage_completed' | 'xp_earned' | 'lesson_started' | 'lesson_completed';
  event_data: Record<string, any>;
  created_at: string;
}

// Database response types
export type Database = {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<User, 'id' | 'created_at'>>;
      };
      lesson_progress: {
        Row: LessonProgress;
        Insert: Omit<LessonProgress, 'id' | 'started_at' | 'last_accessed_at'>;
        Update: Partial<Omit<LessonProgress, 'id' | 'user_id' | 'lesson_id' | 'started_at'>>;
      };
      lesson_events: {
        Row: LessonEvent;
        Insert: Omit<LessonEvent, 'id' | 'created_at'>;
        Update: never;
      };
    };
  };
};
