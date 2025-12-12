'use client';

import { useEffect, useMemo, useState } from 'react';
import type { GameState, Team } from '@/lib/types';
import type { Clue } from '@/lib/gameData';

type Props = {
  open: boolean;
  onClose: () => void;
  clue: Clue | null;
  state: GameState;
  setState: (next: GameState) => void;
};

export function ClueModal({ open, onClose, clue, state, setState }: Props) {
  const [activeTeam, setActiveTeam] = useState<string>('');
  const [wager, setWager] = useState<number>(0);

  const isDailyDouble = useMemo(() => {
    if (!clue) return false;
    return state.dailyDoubleIds.includes(clue.id);
  }, [clue, state.dailyDoubleIds]);

  useEffect(() => {
    if (!open) return;
    setActiveTeam(state.teams[0]?.id ?? '');
    setWager(clue?.value ?? 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, clue?.id]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === 'Escape') onClose();
      if (e.key.toLowerCase() === 'a') {
        // toggle answer
        setState({ ...state, showAnswer: !state.showAnswer });
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, setState, state]);

  if (!open || !clue) return null;

  function markUsed() {
    if (state.usedClueIds.includes(clue.id)) return;
    setState({
      ...state,
      usedClueIds: [...state.usedClueIds, clue.id],
      selectedClueId: undefined,
      phase: 'board',
      showAnswer: false,
    });
    onClose();
  }

  function award(teamId: string, delta: number) {
    setState({
      ...state,
      teams: state.teams.map(t => t.id === teamId ? { ...t, score: t.score + delta } : t),
    });
  }

  function renderTeamButtons(team: Team) {
    const val = clue.value;
    const penalize = state.settings.penalizeWrong;

    if (!isDailyDouble) {
      return (
        <div className="row" style={{gap: 10}}>
          <button className="btn ok" onClick={() => award(team.id, val)}>+{val}</button>
          {penalize ? <button className="btn danger" onClick={() => award(team.id, -val)}>-{val}</button> : null}
        </div>
      );
    }

    const w = Math.max(0, Math.floor(Number.isFinite(wager) ? wager : 0));
    return (
      <div className="row" style={{gap: 10}}>
        <button className="btn ok" onClick={() => award(team.id, w)}>+{w}</button>
        <button className="btn danger" onClick={() => award(team.id, -w)}>-{w}</button>
      </div>
    );
  }

  return (
    <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
          <div style={{display:'flex', flexDirection:'column', gap: 8}}>
            <div className="badge">🧩 {clue.category} • ${clue.value} {isDailyDouble ? '• Daily Double' : ''}</div>
            <div className="small">{state.settings.showRefsOnDisplay ? `Reference: ${clue.ref}` : ''}</div>
          </div>
          <div className="row" style={{justifyContent:'flex-end'}}>
            <button className="btn" onClick={() => setState({ ...state, showAnswer: !state.showAnswer })}>
              {state.showAnswer ? 'Hide Answer (A)' : 'Reveal Answer (A)'}
            </button>
            <button className="btn primary" onClick={markUsed}>Mark Used & Close</button>
            <button className="btn" onClick={onClose}>Close</button>
          </div>
        </div>

        <div className="hr" />

        <div className="bigclue">{clue.clue}</div>
        {state.showAnswer ? (
          <>
            <div className="biganswer">{clue.answer}</div>
            <div className="small">Ref: {clue.ref}</div>
          </>
        ) : (
          <div className="small" style={{marginTop: 12}}>Tip: press <span className="kbd">A</span> to toggle the answer.</div>
        )}

        <div className="hr" />

        {isDailyDouble ? (
          <div className="card" style={{padding: 14, marginBottom: 12}}>
            <div className="row" style={{alignItems:'center', justifyContent:'space-between'}}>
              <div>
                <div style={{fontWeight: 900}}>Daily Double controls</div>
                <div className="small">Select a team and set a wager (then score with + / -).</div>
              </div>
              <div className="badge">💡 Standard Jeopardy rules</div>
            </div>

            <div style={{height: 10}} />
            <div className="row" style={{alignItems:'center'}}>
              <label className="small">Buzzed team</label>
              <select value={activeTeam} onChange={(e)=>setActiveTeam(e.target.value)}>
                {state.teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
              <label className="small">Wager</label>
              <input
                type="number"
                value={wager}
                min={0}
                onChange={(e)=>setWager(parseInt(e.target.value || '0', 10))}
                style={{width: 140}}
              />
            </div>

            <div style={{height: 10}} />
            <div className="row" style={{alignItems:'center', justifyContent:'space-between'}}>
              <div className="small">Award points to the selected team:</div>
              <div className="row" style={{gap: 10}}>
                {renderTeamButtons(state.teams.find(t => t.id === activeTeam) ?? state.teams[0])}
              </div>
            </div>
          </div>
        ) : null}

        <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
          <div className="small">Scoring quick buttons</div>
          <div className="row" style={{alignItems:'center'}}>
            <span className="badge">Wrong-answer penalties: {state.settings.penalizeWrong ? 'ON' : 'OFF'}</span>
          </div>
        </div>

        <div style={{height: 10}} />

        <div className="scoregrid">
          {state.teams.map(team => (
            <div key={team.id} className="card teamcard" style={{display:'grid', gap: 10}}>
              <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
                <div>
                  <div className="teamname">{team.name}</div>
                  <div className="small">Score: {team.score}</div>
                </div>
                <div className="badge">{isDailyDouble && team.id === activeTeam ? 'Selected' : ' '}</div>
              </div>
              {renderTeamButtons(team)}
            </div>
          ))}
        </div>

        <div style={{height: 12}} />
        <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
          <div className="small">Host shortcuts: <span className="kbd">A</span> toggle answer • <span className="kbd">Esc</span> close</div>
          <button className="btn danger" onClick={() => {
            // quick undo: reopen the clue
            setState({
              ...state,
              usedClueIds: state.usedClueIds.filter(id => id !== clue.id),
            });
          }}>Un-use this clue</button>
        </div>
      </div>
    </div>
  );
}
