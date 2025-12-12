'use client';

import type { GameState, Derived } from '@/lib/types';
import { allClues } from '@/lib/gameData';

function buildLookup() {
  const m: Record<string, string> = {};
  allClues.forEach(c => {
    m[`${c.category}::${c.value}`] = c.id;
  });
  return m;
}
const lookup = buildLookup();

export function Board({
  derived,
  state,
  onSelectClue,
  readonly,
  showDailyDoubleBadges,
}: {
  derived: Derived;
  state: GameState;
  onSelectClue?: (clueId: string) => void;
  readonly: boolean;
  showDailyDoubleBadges?: boolean;
}) {
  const { categories, values } = derived;

  return (
    <div style={{display:'grid', gap: 10}}>
      <div className="grid">
        {categories.map(cat => (
          <div key={cat} className="cat">{cat}</div>
        ))}
      </div>

      {values.map(val => (
        <div key={val} className="grid">
          {categories.map(cat => {
            const id = lookup[`${cat}::${val}`];
            const used = state.usedClueIds.includes(id);
            const isDD = state.dailyDoubleIds.includes(id);
            const label = `$${val}`;

            return (
              <div
                key={id}
                className={`tile ${used ? 'used' : ''}`}
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (readonly || used) return;
                  onSelectClue?.(id);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (readonly || used) return;
                    onSelectClue?.(id);
                  }
                }}
                aria-disabled={readonly || used}
              >
                {showDailyDoubleBadges && isDD && !used ? <span className="dd">DD</span> : null}
                {used ? '' : label}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
