import React, { memo } from 'react';
import { GameStats as Stats } from '../types/sudoku';
import styles from './GameStats.module.css';

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
    <div className={styles.stats}>
      <h3>Статистика</h3>
      <div className={styles.item}>
        <span className={styles.label}>Решено:</span>
        <span className={styles.value}>{stats.puzzlesCompleted}</span>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>Лучшее время:</span>
        <span className={styles.value}>{formatTime(stats.bestTime)}</span>
      </div>
    </div>
  );
});

GameStats.displayName = 'GameStats';

export default GameStats;
