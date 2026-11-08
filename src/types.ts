export interface QuestionOption {
  a: string;
  b: string;
  c: string;
}

export type OptionKey = 'a' | 'b' | 'c';

export interface Question {
  id: number;
  q: string;
  opts: QuestionOption;
  ans: OptionKey;
  category: 'Huruf Vokal' | 'Huruf Konsonan' | 'Suku Kata' | 'Merangkai Kata';
  explanation: string;
  hint?: string;
  icon?: string;
}

export interface StudentInfo {
  name: string;
  classInfo: string;
  schoolName?: string;
  avatarId?: string;
}

export type ScreenType = 'welcome' | 'instructions' | 'quiz' | 'result' | 'review';

export interface QuizResult {
  score: number;
  correctCount: number;
  totalQuestions: number;
  percentage: number;
  timestamp: string;
}
