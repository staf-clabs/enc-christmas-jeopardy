'use client';

import type { Team } from '@/lib/types';

export function Scoreboard({ teams }: { teams: Team[] }) {
  return (
    <div className="scoregrid">
      {teams.map(t => (
        <div key={t.id} className="card teamcard">
          <div className="teamname">{t.name}</div>
          <div className="teamscore">{t.score}</div>
        </div>
      ))}
    </div>
  );
}
