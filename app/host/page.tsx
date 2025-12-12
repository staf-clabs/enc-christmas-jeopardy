'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import { Board } from '@/components/Board';
import { ClueModal } from '@/components/ClueModal';
import { FinalJeopardy } from '@/components/FinalJeopardy';
import { Scoreboard } from '@/components/Scoreboard';

import { derive, defaultState, loadState, saveState, resetFinalForTeams } from '@/lib/state';
import { broadcastState } from '@/lib/sync';
import type { GameState } from '@/lib/types';

const derived = derive();

export default function HostPage() {
  const [state, setState] = useState<GameState | null>(null);

  useEffect(() => {
    const loaded = loadState();
    setState(loaded ?? defaultState(3));
  }, []);

  useEffect(() => {
    if (!state) return;
    saveState(state);
    broadcastState(state);
  }, [state]);

  const selectedClue = useMemo(() => {
    if (!state?.selectedClueId) return null;
    return derived.clueById[state.selectedClueId] ?? null;
  }, [state?.selectedClueId]);

  if (!state) {
    return (
      <main className="container">
        <div className="card" style={{padding: 22}}>Loading…</div>
      </main>
    );
  }

  function openClue(clueId: string) {
    setState({ ...state, selectedClueId: clueId, phase: 'clue', showAnswer: false });
  }

  function updateTeamName(teamId: string, name: string) {
    setState({
      ...state,
      teams: state.teams.map(t => t.id === teamId ? { ...t, name } : t),
    });
  }

  function addTeam() {
    if (state.teams.length >= 5) return;
    const nextId = `t${state.teams.length + 1}`;
    const nextName = `Team ${state.teams.length + 1}`;
    const teams = [...state.teams, { id: nextId, name: nextName, score: 0 }];
    const next: GameState = resetFinalForTeams({ ...state, teams });
    setState(next);
  }

  function removeTeam(teamId: string) {
    if (state.teams.length <= 2) return;
    const teams = state.teams.filter(t => t.id !== teamId);
    const next: GameState = resetFinalForTeams({ ...state, teams });
    setState(next);
  }

  async function logout() {
    await fetch('/api/logout', { method: 'POST' });
    window.location.href = '/host/login';
  }

  function resetGame() {
    if (!confirm('Reset the whole game board + scores?')) return;
    setState(defaultState(Math.min(5, Math.max(2, state.teams.length))));
  }

  const allUsed = state.usedClueIds.length >= derived.clues.length;

  return (
    <main className="container">
      <div className="row" style={{alignItems:'flex-start'}}>
        <div style={{flex:'1 1 780px', minWidth: 320}}>
          <div className="card" style={{padding: 18}}>
            <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
              <div>
                <div className="badge">🎤 Host Console</div>
                <h1 className="h1" style={{marginTop: 10}}>{state.title}</h1>
                <p className="p">Click a dollar amount to open a clue. Toggle the answer, then score a team.</p>
              </div>
              <div className="row" style={{justifyContent:'flex-end'}}>
                <Link className="btn" href="/display" target="_blank">Open Display</Link>
                <button className="btn" onClick={logout}>Logout</button>
              </div>
            </div>

            <div className="hr" />

            {state.phase === 'final' ? (
              <FinalJeopardy state={state} setState={setState} />
            ) : (
              <>
                <Board
                  derived={derived}
                  state={state}
                  readonly={false}
                  onSelectClue={openClue}
                  showDailyDoubleBadges
                />
                <div style={{height: 14}} />
                <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
                  <div className="row">
                    <button className="btn primary" onClick={() => setState({ ...state, phase: 'final' })}>Go to Final Jeopardy</button>
                    <button className="btn" onClick={() => setState({ ...state, usedClueIds: [] })}>Re-open all clues</button>
                    <button className="btn danger" onClick={resetGame}>Full Reset</button>
                  </div>
                  <div className="badge">{state.usedClueIds.length}/{derived.clues.length} clues used</div>
                </div>

                {allUsed ? (
                  <div className="small" style={{marginTop: 10}}>All clues used — time for Final Jeopardy ⭐</div>
                ) : null}
              </>
            )}
          </div>
        </div>

        <div style={{flex:'0 1 380px', minWidth: 300}}>
          <div className="card" style={{padding: 18}}>
            <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
              <h2 className="h2">Teams & Settings</h2>
              <span className="badge">2–5 teams</span>
            </div>

            <div style={{display:'grid', gap: 10}}>
              {state.teams.map(t => (
                <div key={t.id} className="card" style={{padding: 12}}>
                  <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
                    <input
                      value={t.name}
                      onChange={(e) => updateTeamName(t.id, e.target.value)}
                      style={{flex: 1}}
                    />
                    <button className="btn danger" onClick={() => removeTeam(t.id)} disabled={state.teams.length <= 2}>Remove</button>
                  </div>
                  <div className="small" style={{marginTop: 8}}>Score: <b>{t.score}</b></div>
                </div>
              ))}
              <button className="btn" onClick={addTeam} disabled={state.teams.length >= 5}>+ Add team</button>
            </div>

            <div className="hr" />

            <div style={{display:'grid', gap: 10}}>
              <label className="row" style={{alignItems:'center', justifyContent:'space-between'}}>
                <span className="small">Penalize wrong answers (−value)</span>
                <input
                  type="checkbox"
                  checked={state.settings.penalizeWrong}
                  onChange={(e) => setState({ ...state, settings: { ...state.settings, penalizeWrong: e.target.checked } })}
                />
              </label>

              <label className="row" style={{alignItems:'center', justifyContent:'space-between'}}>
                <span className="small">Show scripture refs on display</span>
                <input
                  type="checkbox"
                  checked={state.settings.showRefsOnDisplay}
                  onChange={(e) => setState({ ...state, settings: { ...state.settings, showRefsOnDisplay: e.target.checked } })}
                />
              </label>

              <div className="small">
                Daily Doubles are hidden from the audience until you open them. They’re marked “DD” on the host board.
              </div>
            </div>

            <div className="hr" />

            <h2 className="h2">Scoreboard preview</h2>
            <Scoreboard teams={state.teams} />

            <div style={{height: 12}} />
            <div className="small">Tip: Keep one tab open on <span className="kbd">/host</span> and another tab/window on <span className="kbd">/display</span>.</div>
          </div>
        </div>
      </div>

      <ClueModal
        open={state.phase === 'clue' && !!selectedClue}
        onClose={() => setState({ ...state, phase: 'board', selectedClueId: undefined, showAnswer: false })}
        clue={selectedClue}
        state={state}
        setState={setState}
      />
    </main>
  );
}
