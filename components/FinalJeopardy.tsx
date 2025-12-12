'use client';

import { useMemo } from 'react';
import type { GameState } from '@/lib/types';

export function FinalJeopardy({
  state,
  setState,
}: {
  state: GameState;
  setState: (next: GameState) => void;
}) {
  const teams = state.teams;

  const totalWagers = useMemo(() => {
    return teams.reduce((sum, t) => sum + (state.final.wagers[t.id] ?? 0), 0);
  }, [state.final.wagers, teams]);

  function setWager(teamId: string, value: number) {
    setState({
      ...state,
      final: {
        ...state.final,
        wagers: { ...state.final.wagers, [teamId]: Math.max(0, Math.floor(value)) },
      },
    });
  }

  function setResponse(teamId: string, value: string) {
    setState({
      ...state,
      final: {
        ...state.final,
        responses: { ...state.final.responses, [teamId]: value },
      },
    });
  }

  function resolve(teamId: string, verdict: 'correct' | 'wrong') {
    setState({
      ...state,
      final: {
        ...state.final,
        resolved: { ...state.final.resolved, [teamId]: verdict },
      },
    });
  }

  function applyFinalScores() {
    const nextTeams = state.teams.map(t => {
      const w = state.final.wagers[t.id] ?? 0;
      const r = state.final.resolved[t.id] ?? 'pending';
      if (r === 'correct') return { ...t, score: t.score + w };
      if (r === 'wrong') return { ...t, score: t.score - w };
      return t;
    });

    setState({ ...state, teams: nextTeams, phase: 'ended' });
  }

  return (
    <div className="card" style={{padding: 18}}>
      <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <div className="badge">⭐ Final Jeopardy</div>
          <h2 className="h2" style={{marginTop: 10}}>{state.final.category}</h2>
          <div className="small">Reference: {state.final.ref}</div>
        </div>
        <div className="row">
          <button className="btn" onClick={() => setState({ ...state, final: { ...state.final, showAnswer: !state.final.showAnswer } })}>
            {state.final.showAnswer ? 'Hide Answer' : 'Reveal Answer'}
          </button>
          <button className="btn primary" onClick={applyFinalScores}>Apply Final Scores</button>
          <button className="btn" onClick={() => setState({ ...state, phase: 'board' })}>Back to Board</button>
        </div>
      </div>

      <div className="hr" />

      <div className="bigclue">{state.final.clue}</div>
      {state.final.showAnswer ? (
        <div className="biganswer">{state.final.answer}</div>
      ) : (
        <div className="small" style={{marginTop: 12}}>Collect wagers + responses first, then reveal.</div>
      )}

      <div className="hr" />

      <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
        <div className="small">Total wagers entered: {totalWagers}</div>
        <div className="badge">Rules: correct +wager, wrong −wager</div>
      </div>

      <div style={{height: 12}} />

      <div className="scoregrid">
        {teams.map(t => (
          <div key={t.id} className="card teamcard" style={{display:'grid', gap: 10}}>
            <div className="row" style={{justifyContent:'space-between', alignItems:'baseline'}}>
              <div>
                <div className="teamname">{t.name}</div>
                <div className="small">Current: {t.score}</div>
              </div>
              <span className="badge">Wager: {state.final.wagers[t.id] ?? 0}</span>
            </div>

            <div className="row" style={{alignItems:'center'}}>
              <label className="small">Wager</label>
              <input
                type="number"
                min={0}
                value={state.final.wagers[t.id] ?? 0}
                onChange={(e) => setWager(t.id, parseInt(e.target.value || '0', 10))}
                style={{width: 140}}
              />
            </div>

            <div style={{display:'grid', gap: 8}}>
              <label className="small">Team response</label>
              <textarea
                value={state.final.responses[t.id] ?? ''}
                onChange={(e) => setResponse(t.id, e.target.value)}
                rows={3}
                placeholder="Type their response here…"
              />
            </div>

            <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
              <div className="small">Verdict: <b>{state.final.resolved[t.id] ?? 'pending'}</b></div>
              <div className="row" style={{gap: 10}}>
                <button className="btn ok" onClick={() => resolve(t.id, 'correct')}>Correct</button>
                <button className="btn danger" onClick={() => resolve(t.id, 'wrong')}>Wrong</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{height: 12}} />
      <div className="small">Tip: After applying scores, you can take a victory lap on the Display screen 🎉</div>
    </div>
  );
}
