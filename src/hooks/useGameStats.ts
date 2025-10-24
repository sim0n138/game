import { useState, useEffect, useCallback } from 'react';
import { GameStats } from '../types/sudoku';

const STORAGE_KEY = 'sudokuStats';

interface UseGameStatsReturn {
  stats: GameStats;
  recordCompletion: (elapsedTime: number) => void;
}

export function useGameStats(): UseGameStatsReturn {
  const [stats, setStats] = useState<GameStats>({
    puzzlesCompleted: 0,
    bestTime: null,
    lastPlayed: null
  });

  // Загрузка статистики при монтировании
  useEffect(() => {
    const savedStats = localStorage.getItem(STORAGE_KEY);
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  // Запись завершения головоломки - используем функциональную форму setState
  const recordCompletion = useCallback((elapsedTime: number) => {
    setStats(prev => {
      const newStats = {
        puzzlesCompleted: prev.puzzlesCompleted + 1,
        bestTime: prev.bestTime === null || elapsedTime < prev.bestTime
          ? elapsedTime
          : prev.bestTime,
        lastPlayed: new Date().toISOString()
      };

      // Сохраняем в localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newStats));

      return newStats;
    });
  }, []);

  return {
    stats,
    recordCompletion
  };
}
