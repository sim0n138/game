import React, { memo } from 'react';
import { Difficulty } from '../types/sudoku';
import styles from './DifficultySelector.module.css';

interface DifficultySelectorProps {
  currentDifficulty: Difficulty;
  onSelectDifficulty: (difficulty: Difficulty) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = memo(({
  currentDifficulty,
  onSelectDifficulty
}) => {
  const difficulties = [
    { value: Difficulty.EASY, label: 'Легко' },
    { value: Difficulty.MEDIUM, label: 'Средне' },
    { value: Difficulty.HARD, label: 'Сложно' },
    { value: Difficulty.EXPERT, label: 'Эксперт' }
  ];

  return (
    <div className={styles.selector}>
      <h3>Уровень сложности</h3>
      <div className={styles.buttons}>
        {difficulties.map(({ value, label }) => (
          <button
            key={value}
            className={`${styles.button} ${currentDifficulty === value ? styles.active : ''}`}
            onClick={() => onSelectDifficulty(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
});

DifficultySelector.displayName = 'DifficultySelector';

export default DifficultySelector;
