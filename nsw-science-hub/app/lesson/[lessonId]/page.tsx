'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { LessonPlayer } from '@/components/lesson/LessonPlayer';
import { Lesson } from '@/types/lesson';

// Import lessons (will expand as we add more)
import y7u1l01 from '@/data/lessons/y7-u1-l01.json';
import y7u1l02 from '@/data/lessons/y7-u1-l02.json';
import y7u1l03 from '@/data/lessons/y7-u1-l03.json';
import y7u1l04 from '@/data/lessons/y7-u1-l04.json';
import y8u1l01 from '@/data/lessons/y8-u1-l01.json';
import y8u1l02 from '@/data/lessons/y8-u1-l02.json';
import y8u1l03 from '@/data/lessons/y8-u1-l03.json';
import y8u1l04 from '@/data/lessons/y8-u1-l04.json';
import y8u1l05 from '@/data/lessons/y8-u1-l05.json';
import y9u1l01 from '@/data/lessons/y9-u1-l01.json';
import y9u1l02 from '@/data/lessons/y9-u1-l02.json';
import y9u1l03 from '@/data/lessons/y9-u1-l03.json';
import y9u1l04 from '@/data/lessons/y9-u1-l04.json';

const LESSONS: { [key: string]: Lesson } = {
  'y7-u1-l01': y7u1l01 as Lesson,
  'y7-u1-l02': y7u1l02 as Lesson,
  'y7-u1-l03': y7u1l03 as Lesson,
  'y7-u1-l04': y7u1l04 as Lesson,
  'y8-u1-l01': y8u1l01 as Lesson,
  'y8-u1-l02': y8u1l02 as Lesson,
  'y8-u1-l03': y8u1l03 as Lesson,
  'y8-u1-l04': y8u1l04 as Lesson,
  'y8-u1-l05': y8u1l05 as Lesson,
  'y9-u1-l01': y9u1l01 as Lesson,
  'y9-u1-l02': y9u1l02 as Lesson,
  'y9-u1-l03': y9u1l03 as Lesson,
  'y9-u1-l04': y9u1l04 as Lesson,
};

export default function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { lessonId } = use(params);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/auth/login');
        return;
      }

      setUserId(user.id);
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-2xl font-bold text-gray-600">Loading lesson...</div>
      </div>
    );
  }

  const lesson = LESSONS[lessonId];

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
          <p className="text-gray-600 mb-6">The lesson "{lessonId}" doesn't exist yet.</p>
          <button
            onClick={() => router.push('/dashboard/student')}
            className="px-6 py-3 rounded-xl bg-cyan-500 text-white font-semibold hover:bg-cyan-600"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return <LessonPlayer lesson={lesson} userId={userId ?? undefined} />;
}
