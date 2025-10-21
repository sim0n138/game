import React from 'react';
import { LeaderboardEntry } from '../types/game';
import './Leaderboard.css';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentLevelId: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ entries, currentLevelId }) => {
  const levelEntries = entries
    .filter(e => e.levelId === currentLevelId)
    .sort((a, b) => a.commands - b.commands)
    .slice(0, 5);

  if (levelEntries.length === 0) {
    return (
      <div className="leaderboard">
        <h3>🏆 Best Solutions</h3>
        <p className="no-records">No records yet. Complete the level to set a record!</p>
      </div>
    );
  }

  return (
    <div className="leaderboard">
      <h3>🏆 Best Solutions</h3>
      <div className="leaderboard-entries">
        {levelEntries.map((entry, idx) => (
          <div key={idx} className={`leaderboard-entry ${idx === 0 ? 'top-entry' : ''}`}>
            <span className="rank">#{idx + 1}</span>
            <span className="commands">{entry.commands} commands</span>
            <span className="date">{new Date(entry.date).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
