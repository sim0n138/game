import React from 'react';
import { Level } from '../types/game';
import './LevelSelector.css';

interface LevelSelectorProps {
  levels: Level[];
  currentLevelId: number;
  onSelectLevel: (levelId: number) => void;
  completedLevels: number[];
}

const LevelSelector: React.FC<LevelSelectorProps> = ({
  levels,
  currentLevelId,
  onSelectLevel,
  completedLevels
}) => {
  return (
    <div className="level-selector">
      <h3>Levels</h3>
      <div className="level-list">
        {levels.map(level => (
          <button
            key={level.id}
            className={`level-button ${level.id === currentLevelId ? 'active' : ''} ${
              completedLevels.includes(level.id) ? 'completed' : ''
            }`}
            onClick={() => onSelectLevel(level.id)}
          >
            <span className="level-number">{level.id}</span>
            <span className="level-name">{level.name}</span>
            {completedLevels.includes(level.id) && <span className="check-mark">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LevelSelector;
