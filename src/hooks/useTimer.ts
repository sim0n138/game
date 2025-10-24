import { useState, useEffect, useCallback, useRef } from 'react';

interface UseTimerReturn {
  elapsedTime: number;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  isRunning: boolean;
}

export function useTimer(): UseTimerReturn {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    setStartTime(Date.now());
    setIsRunning(true);
  }, []);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(() => {
    stopTimer();
    setStartTime(null);
  }, [stopTimer]);

  // Используем отдельный хук для вычисления elapsed time
  // Это позволяет изолировать частые обновления
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (startTime && isRunning) {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));

      intervalRef.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [startTime, isRunning]);

  return {
    elapsedTime,
    startTimer,
    stopTimer,
    resetTimer,
    isRunning
  };
}
