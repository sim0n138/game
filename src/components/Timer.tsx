import React, { useState, useEffect, memo } from 'react';
import styles from './Timer.module.css';

interface TimerProps {
  isRunning: boolean;
  onTimeUpdate?: (seconds: number) => void;
}

// Изолированный компонент Timer для предотвращения ре-рендера родителя
const Timer: React.FC<TimerProps> = memo(({ isRunning, onTimeUpdate }) => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (isRunning && startTime === null) {
      setStartTime(Date.now());
    } else if (!isRunning) {
      setStartTime(null);
      setElapsedTime(0);
    }
  }, [isRunning, startTime]);

  useEffect(() => {
    if (startTime && isRunning) {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));

      const interval = setInterval(() => {
        const newElapsedTime = Math.floor((Date.now() - startTime) / 1000);
        setElapsedTime(newElapsedTime);

        // Вызываем callback если передан
        if (onTimeUpdate) {
          onTimeUpdate(newElapsedTime);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime, isRunning, onTimeUpdate]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.timer}>
      <h3>Время</h3>
      <div className={styles.display}>{formatTime(elapsedTime)}</div>
    </div>
  );
});

Timer.displayName = 'Timer';

export default Timer;
