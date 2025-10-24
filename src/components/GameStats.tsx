import React, { memo } from 'react';
import { GameStats as Stats } from '../types/sudoku';

interface GameStatsProps {
  stats: Stats;
}

const GameStats: React.FC<GameStatsProps> = memo(({ stats }) => {
  const formatTime = (seconds: number | null): string => {
    if (seconds === null) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="game-stats">
      <h3>Статистика</h3>
      <div className="stat-item">
        <span className="stat-label">Решено:</span>
        <span className="stat-value">{stats.puzzlesCompleted}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Лучшее время:</span>
        <span className="stat-value">{formatTime(stats.bestTime)}</span>
      </div>
    </div>
  );
});

GameStats.displayName = 'GameStats';

export default GameStats;
