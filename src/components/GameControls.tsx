import React, { memo } from 'react';
import styles from './GameControls.module.css';

interface GameControlsProps {
  onNewGame: () => void;
  onCheckSolution: () => void;
  onHint: () => void;
  isCompleted: boolean;
}

const GameControls: React.FC<GameControlsProps> = memo(({
  onNewGame,
  onCheckSolution,
  onHint,
  isCompleted
}) => {
  return (
    <div className={styles.controls}>
      <button className={`${styles.button} ${styles.newGame}`} onClick={onNewGame}>
        Новая игра
      </button>
      <button className={`${styles.button} ${styles.check}`} onClick={onCheckSolution}>
        Проверить
      </button>
      <button className={`${styles.button} ${styles.hint}`} onClick={onHint}>
        Подсказка
      </button>

      {isCompleted && (
        <div className={styles.completionMessage}>
          <span className={styles.successIcon}>✓</span>
          <span>Поздравляем! Головоломка решена!</span>
        </div>
      )}
    </div>
  );
});

GameControls.displayName = 'GameControls';

export default GameControls;
