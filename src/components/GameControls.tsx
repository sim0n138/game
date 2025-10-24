import React from 'react';

interface GameControlsProps {
  onNewGame: () => void;
  onCheckSolution: () => void;
  onHint: () => void;
  isCompleted: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  onNewGame,
  onCheckSolution,
  onHint,
  isCompleted
}) => {
  return (
    <div className="game-controls">
      <button className="control-button new-game" onClick={onNewGame}>
        Новая игра
      </button>
      <button className="control-button check" onClick={onCheckSolution}>
        Проверить
      </button>
      <button className="control-button hint" onClick={onHint}>
        Подсказка
      </button>

      {isCompleted && (
        <div className="completion-message">
          <span className="success-icon">✓</span>
          <span>Поздравляем! Головоломка решена!</span>
        </div>
      )}
    </div>
  );
};

export default GameControls;
