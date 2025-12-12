import type { Clue } from './gameData';

export type Team = { id: string; name: string; score: number };

export type GamePhase = 'board' | 'clue' | 'final' | 'ended';

export type GameSettings = {
  penalizeWrong: boolean;
  showRefsOnDisplay: boolean;
};

export type FinalState = {
  wagers: Record<string, number>;
  responses: Record<string, string>;
  resolved: Record<string, 'pending' | 'correct' | 'wrong'>;
  showAnswer: boolean;
};

export type GameState = {
  title: string;
  phase: GamePhase;
  teams: Team[];
  usedClueIds: string[];
  dailyDoubleIds: string[];
  selectedClueId?: string;
  showAnswer: boolean;
  settings: GameSettings;
  final: {
    category: string;
    clue: string;
    answer: string;
    ref: string;
  } & FinalState;
  lastUpdated: number;
};

export type Derived = {
  clues: Clue[];
  clueById: Record<string, Clue>;
  categories: string[];
  values: number[];
};
