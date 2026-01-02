import { LessonPlayer } from '@/components/lesson/LessonPlayer';
import lessonData from '@/data/lessons/y7-u1-l01.json';
import { Lesson } from '@/types/lesson';

export default function TestLessonPage() {
  const lesson = lessonData as Lesson;

  return (
    <div>
      <LessonPlayer lesson={lesson} />
    </div>
  );
}
