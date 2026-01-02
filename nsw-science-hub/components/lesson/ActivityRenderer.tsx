'use client';

import { Activity } from '@/types/lesson';
import { HookActivity } from './activities/HookActivity';
import { InfoCardActivity } from './activities/InfoCardActivity';
import { QuizActivity } from './activities/QuizActivity';
import { DragDropActivity } from './activities/DragDropActivity';
import { ChallengeLevelsActivity } from './activities/ChallengeLevelsActivity';
import { CopyToBookActivity } from './activities/CopyToBookActivity';
import { MasteryChecklistActivity } from './activities/MasteryChecklistActivity';
import { MatchingActivity } from './activities/MatchingActivity';
import { FillInBlankActivity } from './activities/FillInBlankActivity';
import { ScenarioActivity } from './activities/ScenarioActivity';
import { VideoActivity } from './activities/VideoActivity';
import { PredictionChallengeActivityComponent } from './activities/PredictionChallengeActivity';
import { ErrorAnalysisActivityComponent } from './activities/ErrorAnalysisActivity';
import { SimulationActivityComponent } from './activities/SimulationActivity';
import { MissionSelectActivityComponent } from './activities/MissionSelectActivity';
import { SkillRatingActivityComponent } from './activities/SkillRatingActivity';
import { StructuredNotesActivityComponent } from './activities/StructuredNotesActivity';
// HSC Activity Components
import { ShortAnswerActivity } from './activities/ShortAnswerActivity';
import { ExtendedResponseActivity } from './activities/ExtendedResponseActivity';
import { HSCMultipleChoiceActivity } from './activities/HSCMultipleChoiceActivity';
import { GraphAnalysisActivity } from './activities/GraphAnalysisActivity';

interface ActivityRendererProps {
  activity: Activity;
  onAnswerQuestion: (isCorrect: boolean) => void;
  onAddXP: (amount: number) => void;
  onMarksEarned?: (marks: number) => void; // NEW: For HSC lessons
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export function ActivityRenderer({
  activity,
  onAnswerQuestion,
  onAddXP,
  colorScheme,
}: ActivityRendererProps) {
  switch (activity.type) {
    case 'hook':
      return <HookActivity activity={activity} colorScheme={colorScheme} />;

    case 'infoCard':
      return <InfoCardActivity activity={activity} colorScheme={colorScheme} />;

    case 'quiz':
      return (
        <QuizActivity
          activity={activity}
          onAnswerQuestion={onAnswerQuestion}
          onAddXP={onAddXP}
          colorScheme={colorScheme}
        />
      );

    case 'dragDrop':
      return (
        <DragDropActivity
          activity={activity}
          onAnswerQuestion={onAnswerQuestion}
          onAddXP={onAddXP}
          colorScheme={colorScheme}
        />
      );

    case 'challengeLevels':
      return (
        <ChallengeLevelsActivity
          activity={activity}
          onAnswerQuestion={onAnswerQuestion}
          onAddXP={onAddXP}
          colorScheme={colorScheme}
        />
      );

    case 'copyToBook':
      return <CopyToBookActivity activity={activity} />;

    case 'masteryChecklist':
      return <MasteryChecklistActivity activity={activity} colorScheme={colorScheme} />;

    case 'matching':
      return (
        <MatchingActivity
          activity={activity}
          onXPEarned={onAddXP}
          colorScheme={colorScheme}
        />
      );

    case 'fillInBlank':
      return (
        <FillInBlankActivity
          activity={activity}
          onXPEarned={onAddXP}
          colorScheme={colorScheme}
        />
      );

    case 'scenario':
      return (
        <ScenarioActivity
          activity={activity}
          onXPEarned={onAddXP}
          colorScheme={colorScheme}
        />
      );

    case 'video':
      return (
        <VideoActivity
          activity={activity}
          onXPEarned={onAddXP}
          colorScheme={colorScheme}
        />
      );

    case 'predictionChallenge':
      return (
        <PredictionChallengeActivityComponent
          activity={activity}
          onAnswerQuestion={onAnswerQuestion}
          onAddXP={onAddXP}
          colorScheme={colorScheme}
        />
      );

    case 'errorAnalysis':
      return (
        <ErrorAnalysisActivityComponent
          activity={activity}
          onAnswerQuestion={onAnswerQuestion}
          onAddXP={onAddXP}
          colorScheme={colorScheme}
        />
      );

    case 'simulation':
      return (
        <SimulationActivityComponent
          activity={activity}
          onAnswerQuestion={onAnswerQuestion}
          onAddXP={onAddXP}
          colorScheme={colorScheme}
        />
      );

    case 'missionSelect':
      return (
        <MissionSelectActivityComponent
          activity={activity}
          onAnswerQuestion={onAnswerQuestion}
          onAddXP={onAddXP}
          colorScheme={colorScheme}
        />
      );

    case 'skillRating':
      return (
        <SkillRatingActivityComponent
          activity={activity}
          onAnswerQuestion={onAnswerQuestion}
          onAddXP={onAddXP}
          colorScheme={colorScheme}
        />
      );

    case 'structuredNotes':
      return (
        <StructuredNotesActivityComponent
          activity={activity}
          onAnswerQuestion={onAnswerQuestion}
          onAddXP={onAddXP}
          colorScheme={colorScheme}
        />
      );

    case 'shortAnswer':
      return (
        <ShortAnswerActivity
          activity={activity}
          onMarksEarned={onMarksEarned || (() => {})}
          onXPEarned={onAddXP}
          colorScheme={colorScheme}
        />
      );

    case 'extendedResponse':
      return (
        <ExtendedResponseActivity
          activity={activity}
          onMarksEarned={onMarksEarned || (() => {})}
          onXPEarned={onAddXP}
          colorScheme={colorScheme}
        />
      );

    case 'hscMultipleChoice':
      return (
        <HSCMultipleChoiceActivity
          activity={activity}
          onMarksEarned={onMarksEarned || (() => {})}
          onXPEarned={onAddXP}
          colorScheme={colorScheme}
        />
      );

    case 'graphAnalysis':
      return (
        <GraphAnalysisActivity
          activity={activity}
          onMarksEarned={onMarksEarned || (() => {})}
          onXPEarned={onAddXP}
          colorScheme={colorScheme}
        />
      );

    default:
      return (
        <div className="bg-red-100 border border-red-400 p-4 rounded-lg">
          <p className="text-red-700">Unknown activity type: {(activity as any).type}</p>
        </div>
      );
  }
}
