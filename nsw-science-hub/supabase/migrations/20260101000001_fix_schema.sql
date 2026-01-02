-- NSW Science Hub Database Schema - Fixed Migration
-- This migration safely creates or updates the schema

-- Enable UUID extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table if not exists
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create lesson_progress table if not exists
CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,

  -- Progress tracking
  current_stage INTEGER NOT NULL DEFAULT 1 CHECK (current_stage BETWEEN 1 AND 5),
  completed_stages INTEGER[] NOT NULL DEFAULT '{}',
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,

  -- Game statistics
  xp INTEGER NOT NULL DEFAULT 0 CHECK (xp >= 0),
  level INTEGER NOT NULL DEFAULT 1 CHECK (level >= 1),
  streak INTEGER NOT NULL DEFAULT 0 CHECK (streak >= 0),
  max_streak INTEGER NOT NULL DEFAULT 0 CHECK (max_streak >= 0),
  questions_answered INTEGER NOT NULL DEFAULT 0 CHECK (questions_answered >= 0),
  correct_answers INTEGER NOT NULL DEFAULT 0 CHECK (correct_answers >= 0),

  -- Timestamps
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  last_accessed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Constraints
  UNIQUE(user_id, lesson_id),
  CHECK (correct_answers <= questions_answered),
  CHECK (max_streak >= streak)
);

-- Create lesson_events table if not exists
CREATE TABLE IF NOT EXISTS public.lesson_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN (
    'lesson_started',
    'lesson_completed',
    'stage_completed',
    'question_answered',
    'xp_earned',
    'level_up',
    'streak_achieved'
  )),
  event_data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_lesson_progress_user_id') THEN
    CREATE INDEX idx_lesson_progress_user_id ON public.lesson_progress(user_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_lesson_progress_lesson_id') THEN
    CREATE INDEX idx_lesson_progress_lesson_id ON public.lesson_progress(lesson_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_lesson_progress_user_lesson') THEN
    CREATE INDEX idx_lesson_progress_user_lesson ON public.lesson_progress(user_id, lesson_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_lesson_events_user_id') THEN
    CREATE INDEX idx_lesson_events_user_id ON public.lesson_events(user_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_lesson_events_lesson_id') THEN
    CREATE INDEX idx_lesson_events_lesson_id ON public.lesson_events(lesson_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_lesson_events_event_type') THEN
    CREATE INDEX idx_lesson_events_event_type ON public.lesson_events(event_type);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_lesson_events_created_at') THEN
    CREATE INDEX idx_lesson_events_created_at ON public.lesson_events(created_at DESC);
  END IF;
END $$;

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_events ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DO $$
BEGIN
  -- Users table policies
  DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
  CREATE POLICY "Users can view own profile"
    ON public.users FOR SELECT
    USING (auth.uid() = id);

  DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
  CREATE POLICY "Users can update own profile"
    ON public.users FOR UPDATE
    USING (auth.uid() = id);

  -- Lesson progress policies
  DROP POLICY IF EXISTS "Users can view own progress" ON public.lesson_progress;
  CREATE POLICY "Users can view own progress"
    ON public.lesson_progress FOR SELECT
    USING (auth.uid() = user_id);

  DROP POLICY IF EXISTS "Users can insert own progress" ON public.lesson_progress;
  CREATE POLICY "Users can insert own progress"
    ON public.lesson_progress FOR INSERT
    WITH CHECK (auth.uid() = user_id);

  DROP POLICY IF EXISTS "Users can update own progress" ON public.lesson_progress;
  CREATE POLICY "Users can update own progress"
    ON public.lesson_progress FOR UPDATE
    USING (auth.uid() = user_id);

  DROP POLICY IF EXISTS "Users can delete own progress" ON public.lesson_progress;
  CREATE POLICY "Users can delete own progress"
    ON public.lesson_progress FOR DELETE
    USING (auth.uid() = user_id);

  -- Lesson events policies
  DROP POLICY IF EXISTS "Users can view own events" ON public.lesson_events;
  CREATE POLICY "Users can view own events"
    ON public.lesson_events FOR SELECT
    USING (auth.uid() = user_id);

  DROP POLICY IF EXISTS "Users can insert own events" ON public.lesson_events;
  CREATE POLICY "Users can insert own events"
    ON public.lesson_events FOR INSERT
    WITH CHECK (auth.uid() = user_id);
END $$;

-- Create or replace function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop and recreate trigger for users table
DROP TRIGGER IF EXISTS set_updated_at ON public.users;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create or replace function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, role)
  VALUES (NEW.id, NEW.email, 'student')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop and recreate trigger to create profile when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create or replace function to update last_accessed_at
CREATE OR REPLACE FUNCTION public.update_lesson_access()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_accessed_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop and recreate trigger for lesson_progress updates
DROP TRIGGER IF EXISTS update_access_time ON public.lesson_progress;
CREATE TRIGGER update_access_time
  BEFORE UPDATE ON public.lesson_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.update_lesson_access();

-- Add comments for documentation
COMMENT ON TABLE public.users IS 'User profiles extending Supabase auth';
COMMENT ON TABLE public.lesson_progress IS 'Student progress tracking for each lesson';
COMMENT ON TABLE public.lesson_events IS 'Analytics events for teacher dashboards';
COMMENT ON COLUMN public.lesson_progress.lesson_id IS 'Lesson identifier (e.g., y7-u1-l01)';
COMMENT ON COLUMN public.lesson_progress.completed_stages IS 'Array of completed stage numbers (1-5)';
