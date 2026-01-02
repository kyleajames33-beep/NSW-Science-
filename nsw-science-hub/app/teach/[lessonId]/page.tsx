import { TeacherLessonView } from '@/components/lesson/TeacherLessonView';
import { Lesson } from '@/types/lesson';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';

interface Props {
  params: Promise<{
    lessonId: string;
  }>;
}

async function getLesson(lessonId: string): Promise<Lesson | null> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'lessons', `${lessonId}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error loading lesson:', error);
    return null;
  }
}

export default async function TeachLessonPage({ params }: Props) {
  const { lessonId } = await params;
  const lesson = await getLesson(lessonId);

  if (!lesson) {
    notFound();
  }

  return <TeacherLessonView lesson={lesson} />;
}
