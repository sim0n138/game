import React from 'react';
import './ControlPanel.css';

interface ControlPanelProps {
  onRun: () => void;
  onStep: () => void;
  onReset: () => void;
  isRunning: boolean;
  isCompleted: boolean;
  canStep: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onRun,
  onStep,
  onReset,
  isRunning,
  isCompleted,
  canStep
}) => {
  return (
    <div className="control-panel">
      <button
        className="control-button run-button"
        onClick={onRun}
        disabled={isRunning || isCompleted}
      >
        ▶ Запустить
      </button>
      <button
        className="control-button step-button"
        onClick={onStep}
        disabled={!canStep || isCompleted}
      >
        ⏯ Шаг
      </button>
      <button
        className="control-button reset-button"
        onClick={onReset}
      >
        ↺ Сброс
      </button>
      {isCompleted && (
        <div className="completion-message">
          ✓ Уровень пройден!
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
