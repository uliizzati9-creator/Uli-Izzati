export interface StudentProfile {
  id: string;
  name: string;
  className: string;
  studentNumber: string;
  schoolName: string;
  avatarId: string;
  joinedAt: string;
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface Question {
  id: string;
  title: string;
  scenario: string;
  dialogue?: { speaker: string; text: string; role?: string }[];
  type: 'multiple_choice' | 'order_puzzle' | 'text_analysis';
  options: QuestionOption[];
  puzzleItems?: { id: string; text: string; correctOrder: number; label: string }[];
  points: number;
  clue: string;
}

export interface InvestigationCase {
  id: string;
  caseNumber: number;
  codeName: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  targetCompetency: string;
  maxPoints: number;
  questions: Question[];
}

export interface StudentAnecdote {
  id: string;
  studentName: string;
  className: string;
  title: string;
  topic: string;
  abstraction: string;
  orientation: string;
  crisis: string;
  reaction: string;
  coda: string;
  linguisticCheck: {
    hasTemporalConjunction: boolean;
    hasRhetoricalQuestion: boolean;
    hasActionVerb: boolean;
    hasSatire: boolean;
  };
  createdAt: string;
  likes: number;
}

export interface ScoreAssessment {
  studentName: string;
  className: string;
  studentNumber: string;
  pointsEarned: number;
  maxPoints: number;
  knowledgeScore: number; // 0 - 100
  kktp: number; // default 75
  isAchieved: boolean;
  caseBreakdown: { [caseId: string]: number };
  evaluatedAt: string;
}

export interface AssessmentConfig {
  maxPointsBenchmark: number; // e.g. 200 or 170
  kktp: number; // default 75
  allowBonusPoints: boolean;
}
