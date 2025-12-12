'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import { Board } from '@/components/Board';
import { Scoreboard } from '@/components/Scoreboard';

import { derive, defaultState, loadState, saveState } from '@/lib/state';
import { listen } from '@/lib/sync';
import type { GameState } from '@/lib/types';

const derived = derive();

export default function DisplayPage() {
  const [state, setState] = useState<GameState | null>(null);

  useEffect(() => {
    const s = loadState() ?? defaultState(3);
    setState(s);

    // Keep a local copy so refresh doesn't blank.
    saveState(s);

    const un = listen((next) => setState(next));
    return () => un();
  }, []);

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

  const showRefs = state.settings.showRefsOnDisplay;

  return (
    <main className="container">
      <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <div className="badge">📺 Display</div>
          <h1 className="h1" style={{marginTop: 10}}>{state.title}</h1>
          <p className="p">Audience view (read‑only). Powered by host updates.</p>
        </div>
        <div className="row">
          <Link className="btn" href="/">Home</Link>
          <Link className="btn" href="/host">Host</Link>
        </div>
      </div>

      <div className="hr" />

      {state.phase === 'final' ? (
        <div className="card" style={{padding: 18}}>
          <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <div className="badge">⭐ Final Jeopardy</div>
              <h2 className="h2" style={{marginTop: 10}}>{state.final.category}</h2>
              {showRefs ? <div className="small">Reference: {state.final.ref}</div> : null}
            </div>
            <div className="badge">Wagers are private</div>
          </div>

          <div className="hr" />

          <div className="bigclue">{state.final.clue}</div>
          {state.final.showAnswer ? <div className="biganswer">{state.final.answer}</div> : null}

          <div className="hr" />
          <h2 className="h2">Scores</h2>
          <Scoreboard teams={state.teams} />
        </div>
      ) : state.phase === 'clue' && selectedClue ? (
        <div className="card" style={{padding: 22}}>
          <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
            <div className="badge">🧩 {selectedClue.category} • ${selectedClue.value}</div>
            {showRefs ? <div className="small">{selectedClue.ref}</div> : null}
          </div>

          <div className="hr" />

          <div className="bigclue" style={{fontSize: 44}}>{selectedClue.clue}</div>
          {state.showAnswer ? (
            <div className="biganswer" style={{fontSize: 38}}>{selectedClue.answer}</div>
          ) : null}

          <div className="hr" />
          <h2 className="h2">Scores</h2>
          <Scoreboard teams={state.teams} />
        </div>
      ) : (
        <div className="row" style={{alignItems:'flex-start'}}>
          <div style={{flex:'1 1 760px', minWidth: 320}}>
            <div className="card" style={{padding: 18}}>
              <Board derived={derived} state={state} readonly={true} />
            </div>
          </div>
          <div style={{flex:'0 1 380px', minWidth: 300}}>
            <div className="card" style={{padding: 18}}>
              <h2 className="h2">Scores</h2>
              <Scoreboard teams={state.teams} />
              <div style={{height: 10}} />
              <div className="small">Waiting on host…</div>
            </div>
          </div>
        </div>
      )}

      <div style={{height: 18}} />
      <div className="small">If the display looks stale, refresh this tab (it reads the latest state from localStorage).</div>
    </main>
  );
}
