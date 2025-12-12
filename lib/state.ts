import { allClues, gameData } from './gameData';
import type { GameState, Team, Derived } from './types';

export const STORAGE_KEY = 'enc-jeopardy-state-v1';

export function derive(): Derived {
  const round = gameData.rounds[0];
  const categories = round.categories.map(c => c.name);
  const values = round.dollars;
  const clueById: Record<string, any> = {};
  allClues.forEach(c => (clueById[c.id] = c));
  return { clues: allClues, clueById, categories, values };
}

export function makeDefaultTeams(n = 3): Team[] {
  const names = ['Team Joy', 'Team Peace', 'Team Hope', 'Team Light', 'Team Noel'];
  return Array.from({ length: n }).map((_, i) => ({
    id: `t${i + 1}`,
    name: names[i] ?? `Team ${i + 1}`,
    score: 0,
  }));
}

export function pickDailyDoubles(): string[] {
  // Pick 2 random clues (non-final) as Daily Doubles.
  const ids = allClues.map(c => c.id);
  const shuffled = [...ids].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 2);
}

export function defaultState(teamCount = 3): GameState {
  const dd = pickDailyDoubles();
  const final = gameData.final;
  const teams = makeDefaultTeams(teamCount);
  const wagers: Record<string, number> = {};
  const responses: Record<string, string> = {};
  const resolved: Record<string, 'pending' | 'correct' | 'wrong'> = {};
  teams.forEach(t => {
    wagers[t.id] = 0;
    responses[t.id] = '';
    resolved[t.id] = 'pending';
  });

  return {
    title: gameData.title,
    phase: 'board',
    teams,
    usedClueIds: [],
    dailyDoubleIds: dd,
    selectedClueId: undefined,
    showAnswer: false,
    settings: {
      penalizeWrong: false,
      showRefsOnDisplay: true,
    },
    final: {
      category: final.category,
      clue: final.clue,
      answer: final.answer,
      ref: final.ref,
      wagers,
      responses,
      resolved,
      showAnswer: false,
    },
    lastUpdated: Date.now(),
  };
}

export function safeParseState(raw: string | null): GameState | null {
  if (!raw) return null;
  try {
    const obj = JSON.parse(raw);
    if (!obj || typeof obj !== 'object') return null;
    return obj as GameState;
  } catch {
    return null;
  }
}

export function loadState(): GameState | null {
  if (typeof window === 'undefined') return null;
  return safeParseState(window.localStorage.getItem(STORAGE_KEY));
}

export function saveState(state: GameState) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, lastUpdated: Date.now() }));
}

export function resetFinalForTeams(state: GameState): GameState {
  const wagers: Record<string, number> = {};
  const responses: Record<string, string> = {};
  const resolved: Record<string, 'pending' | 'correct' | 'wrong'> = {};
  state.teams.forEach(t => {
    wagers[t.id] = 0;
    responses[t.id] = '';
    resolved[t.id] = 'pending';
  });
  return {
    ...state,
    final: { ...state.final, wagers, responses, resolved, showAnswer: false },
  };
}
