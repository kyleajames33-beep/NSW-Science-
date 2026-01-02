// TypeScript types for lesson content schema

export interface LessonMetadata {
  id: string;
  year: number;
  unit: number;
  lessonNumber: number;
  title: string;
  subtitle: string;
  duration: string;
  totalXP: number;
  outcomes: string[];
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

// HSC-specific metadata (extends base metadata for Preliminary and HSC lessons)
export interface HSCLessonMetadata extends LessonMetadata {
  module: number; // 1-4 for HSC (replaces "unit" for HSC context)
  totalMarks: number; // Total assessment marks available
  syllabusDotPoints: string[]; // Specific NESA syllabus references
  priorKnowledge: string[]; // Prerequisites for this lesson
  keyVocabulary: string[]; // Essential scientific terms
  examFocus: {
    multipleChoice: number;
    shortAnswer: number;
    extendedResponse: number;
    graphAnalysis: boolean;
    experimentalDesign: boolean;
  };
}

export type StageName = 'Introduction' | 'Explore' | 'Learn' | 'Practice' | 'Summary';
export type HSCStageName = 'Introduction' | 'Explore' | 'Learn' | 'Analyze' | 'Practice' | 'Synthesize' | 'Summary';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  feedback: string;
}

export interface HookActivity {
  type: 'hook';
  title: string;
  icon: string;
  content: string;
}

export interface InfoCardActivity {
  type: 'infoCard';
  title: string;
  icon: string;
  content: string;
}

export interface QuizActivity {
  type: 'quiz';
  xpPerQuestion: number;
  questions: QuizQuestion[];
}

export interface DragDropZone {
  id: string;
  label: string;
  color: string;
}

export interface DragDropItem {
  id: string;
  text: string;
  correctZone: string;
}

export interface DragDropActivity {
  type: 'dragDrop';
  title: string;
  instructions: string;
  xpPerCorrect: number;
  zones: DragDropZone[];
  items: DragDropItem[];
}

export interface ChallengeLevel {
  level: number;
  xp: number;
  description: string;
  questions: QuizQuestion[];
}

export interface ChallengeLevelsActivity {
  type: 'challengeLevels';
  levels: ChallengeLevel[];
}

export interface CopyToBookActivity {
  type: 'copyToBook';
  title: string;
  content: string;
}

export interface MasteryChecklistActivity {
  type: 'masteryChecklist';
  items: string[];
}

export interface MatchPair {
  id: string;
  term: string;
  definition: string;
}

export interface MatchingActivity {
  type: 'matching';
  title: string;
  instructions: string;
  xpPerPair: number;
  pairs: MatchPair[];
}

export interface FillInBlankQuestion {
  id: string;
  text: string; // Use {{blank}} to indicate blank positions
  answer: string;
  hint?: string;
}

export interface FillInBlankActivity {
  type: 'fillInBlank';
  title: string;
  instructions: string;
  xpPerQuestion: number;
  questions: FillInBlankQuestion[];
}

export interface ScenarioChoice {
  text: string;
  consequence: string;
  isCorrect: boolean;
}

export interface ScenarioActivity {
  type: 'scenario';
  title: string;
  situation: string;
  question: string;
  xp: number;
  choices: ScenarioChoice[];
}

export interface ImageLabel {
  id: string;
  x: number; // percentage position
  y: number; // percentage position
  label: string;
}

export interface ImageLabelActivity {
  type: 'imageLabel';
  title: string;
  instructions: string;
  imageUrl: string;
  xpPerLabel: number;
  labels: ImageLabel[];
  labelOptions: string[]; // shuffled options for students to choose from
}

export interface VideoActivity {
  type: 'video';
  title: string;
  videoUrl: string;
  description?: string;
  questions?: QuizQuestion[]; // optional comprehension questions after video
  xpOnComplete: number;
}

// NEW ACTIVITY TYPES FOR INTEL MISSION LOOP

export interface PredictionChallengeActivity {
  type: 'predictionChallenge';
  scenario: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  revealTiming: 'end'; // Always reveal at end in Debrief
  xp: number;
}

export interface ErrorLocation {
  location?: string;
  errorText?: string; // Alternative to location
  issue?: string;
  correction?: string; // Alternative to fix
  fix?: string;
  misconception?: string; // Additional context
  id?: number;
}

export interface ErrorAnalysisActivity {
  type: 'errorAnalysis';
  title: string;
  studentWork?: string; // The flawed example
  scenario?: string; // Alternative to studentWork
  task?: string; // Additional instruction
  errors: ErrorLocation[];
  xpPerError: number;
}

export interface SimulationControl {
  name: string;
  type: 'slider' | 'toggle';
  options?: string[]; // For toggle
  range?: [number, number]; // For slider
  unit?: string;
}

export interface SimulationActivity {
  type: 'simulation';
  title: string;
  description: string;
  controls: SimulationControl[];
  observables: string[];
  revealPattern: string;
  xp: number;
}

export interface MissionTier {
  difficulty: 'Bronze' | 'Silver' | 'Gold';
  scenario: string;
  question: string;
  options: string[];
  correctIndex: number;
  feedback: {
    correct: string;
    misconceptions: {
      [optionIndex: number]: {
        issue: string;
        hint: string;
        tagId: string; // For tracking
      };
    };
  };
  xp: number;
}

export interface MissionSelectActivity {
  type: 'missionSelect';
  title: string;
  tiers: MissionTier[];
}

export interface SkillRatingCriteria {
  S: string;
  A: string;
  B: string;
  C: string;
  D: string;
  F: string;
}

export interface SkillRatingActivity {
  type: 'skillRating';
  skillName: string;
  criteria: SkillRatingCriteria;
  reflection: string; // One reflection question
}

export interface StructuredNotesSection {
  heading: string;
  content: string;
  keyTerm?: {
    term: string;
    definition: string;
    example: string;
  };
  diagram?: any;
  table?: any;
  [key: string]: any;
}

export interface StructuredNotesActivity {
  type: 'structuredNotes';
  title: string;
  structure?: StructuredNotesSection; // Old format
  sections?: StructuredNotesSection[]; // New format
  studentTask?: string;
  visualModel?: string; // Optional image path
}

// HSC-SPECIFIC ACTIVITY TYPES

export interface GraphQuestion {
  questionNumber: string; // e.g., "1(a)"
  question: string;
  questionType: 'identify' | 'calculate' | 'describe' | 'explain';
  marks: number;
  modelAnswer: string;
  markingCriteria: {
    mark: number;
    descriptor: string;
  }[];
  commonMistakes?: string[];
  hints?: string[];
}

export interface GraphAnalysisActivity {
  type: 'graphAnalysis';
  title: string;
  context: string;
  graphType: 'line' | 'bar' | 'scatter' | 'column' | 'pie';
  graphData: {
    imageUrl?: string;
    dataPoints?: any[];
    title: string;
    xAxisLabel: string;
    yAxisLabel: string;
    legend?: string[];
  };
  questions: GraphQuestion[];
  totalMarks: number;
  xpOnCompletion: number;
}

export interface ShortAnswerQuestion {
  questionNumber: string;
  question: string;
  marks: number;
  answerSpace: 'lines' | 'box';
  linesProvided?: number;
  modelAnswer: string;
  markingCriteria: {
    mark: number;
    descriptor: string;
  }[];
  keyTermsRequired: string[];
  commonMistakes?: string[];
  hints?: string[];
}

export interface ShortAnswerActivity {
  type: 'shortAnswer';
  title: string;
  context?: string;
  questions: ShortAnswerQuestion[];
  totalMarks: number;
  xpOnCompletion: number;
}

export interface ExtendedResponseRubric {
  criteria: {
    name: string;
    description: string;
    marksAvailable: number;
  }[];
  markingStandards: {
    range: string;
    descriptor: string;
    keyFeatures: string[];
  }[];
}

export interface ExtendedResponseActivity {
  type: 'extendedResponse';
  title: string;
  context: string;
  stimulusMaterial?: {
    type: 'text' | 'image' | 'graph' | 'table';
    content: string | any;
  }[];
  question: string;
  marks: number;
  wordsRecommended: number;
  assessedOutcomes: string[];
  rubric: ExtendedResponseRubric;
  modelAnswer: string;
  commonIssues: string[];
  xpOnCompletion: number;
}

export interface HSCMCQuestion {
  questionNumber: string;
  stem: string;
  options: string[];
  correctIndex: number;
  marks: 1;
  difficulty: 'easy' | 'medium' | 'hard';
  syllabusDotPoint: string;
  feedback: {
    correct: string;
    distractorExplanations: {
      [optionIndex: number]: string;
    };
  };
  source?: string;
}

export interface HSCMultipleChoiceActivity {
  type: 'hscMultipleChoice';
  title: string;
  questionsPerSet: number;
  timeRecommended: string;
  questions: HSCMCQuestion[];
  totalMarks: number;
  xpPerCorrect: number;
  showAnswersImmediately: boolean;
}

export interface DataQuestion {
  questionNumber: string;
  question: string;
  questionType: 'extract' | 'calculate' | 'trend' | 'compare' | 'evaluate';
  marks: number;
  modelAnswer: string;
  markingCriteria: {
    mark: number;
    descriptor: string;
  }[];
  calculationRequired: boolean;
  showWorkingRequired: boolean;
}

export interface DataInterpretationActivity {
  type: 'dataInterpretation';
  title: string;
  context: string;
  dataSource: {
    type: 'table' | 'dataset' | 'graph' | 'chart';
    data: any;
    caption: string;
  };
  questions: DataQuestion[];
  totalMarks: number;
  xpOnCompletion: number;
}

export interface ExperimentQuestion {
  questionNumber: string;
  question: string;
  questionType: 'hypothesis' | 'variables' | 'method' | 'controls' | 'safety' | 'results' | 'conclusion';
  marks: number;
  modelAnswer: string;
  markingCriteria: {
    mark: number;
    descriptor: string;
  }[];
  scaffolding?: string[];
}

export interface ExperimentalDesignActivity {
  type: 'experimentalDesign';
  title: string;
  scenario: string;
  researchQuestion: string;
  scaffoldingQuestions: ExperimentQuestion[];
  totalMarks: number;
  xpOnCompletion: number;
}

export interface PastPaperPart {
  partLetter: string;
  question: string;
  marks: number;
  answerType: 'mc' | 'short' | 'extended';
  modelAnswer: string;
  markingGuidelines: string;
  commonIssues: string[];
}

export interface PastPaperQuestionActivity {
  type: 'pastPaper';
  title: string;
  source: string;
  year: number;
  questionNumber: string;
  context: string;
  stimulusMaterial?: any[];
  parts: PastPaperPart[];
  totalMarks: number;
  xpOnCompletion: number;
}

export type Activity =
  | HookActivity
  | InfoCardActivity
  | QuizActivity
  | DragDropActivity
  | ChallengeLevelsActivity
  | CopyToBookActivity
  | MasteryChecklistActivity
  | MatchingActivity
  | FillInBlankActivity
  | ScenarioActivity
  | ImageLabelActivity
  | VideoActivity
  | PredictionChallengeActivity
  | ErrorAnalysisActivity
  | SimulationActivity
  | MissionSelectActivity
  | SkillRatingActivity
  | StructuredNotesActivity
  | GraphAnalysisActivity
  | ShortAnswerActivity
  | ExtendedResponseActivity
  | HSCMultipleChoiceActivity
  | DataInterpretationActivity
  | ExperimentalDesignActivity
  | PastPaperQuestionActivity;

export interface Stage {
  stageNumber: number;
  stageName: StageName | HSCStageName;
  stageIcon?: string;
  title: string;
  description: string;
  xpOnComplete: number;
  marksOnComplete?: number; // NEW: For HSC lessons
  activities: Activity[];
}

export interface Lesson {
  metadata: LessonMetadata | HSCLessonMetadata;
  stages: Stage[];
}

// Game state types
export interface GameState {
  xp: number;
  level: number;
  currentStage: number;
  completedStages: number[];
  streak: number;
  maxStreak: number;
  questionsAnswered: number;
  correctAnswers: number;
  predictionAnswer?: number; // Store prediction from Hook for reveal in Debrief
  // HSC-specific marks tracking
  marksEarned?: number;
  totalMarksAvailable?: number;
  marksByStage?: {
    stageNumber: number;
    marksEarned: number;
    marksAvailable: number;
  }[];
  marksByQuestionType?: {
    multipleChoice: { earned: number; available: number };
    shortAnswer: { earned: number; available: number };
    extendedResponse: { earned: number; available: number };
    dataAnalysis: { earned: number; available: number };
    graphAnalysis: { earned: number; available: number };
  };
}
