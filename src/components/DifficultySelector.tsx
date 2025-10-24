import React from 'react';
import { Difficulty } from '../types/sudoku';

interface DifficultySelectorProps {
  currentDifficulty: Difficulty;
  onSelectDifficulty: (difficulty: Difficulty) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
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
    <div className="difficulty-selector">
      <h3>Уровень сложности</h3>
      <div className="difficulty-buttons">
        {difficulties.map(({ value, label }) => (
          <button
            key={value}
            className={`difficulty-button ${currentDifficulty === value ? 'active' : ''}`}
            onClick={() => onSelectDifficulty(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;
