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
    try {
      const savedStats = localStorage.getItem(STORAGE_KEY);
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
    } catch (error) {
      console.error('Failed to load stats from localStorage:', error);
      // Продолжаем с дефолтной статистикой
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

      // Сохраняем в localStorage с обработкой ошибок
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newStats));
      } catch (error) {
        console.error('Failed to save stats to localStorage:', error);
        // Продолжаем работу даже если не удалось сохранить
      }

      return newStats;
    });
  }, []);

  return {
    stats,
    recordCompletion
  };
}
