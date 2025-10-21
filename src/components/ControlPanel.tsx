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
        ▶ Run
      </button>
      <button
        className="control-button step-button"
        onClick={onStep}
        disabled={!canStep || isCompleted}
      >
        ⏯ Step
      </button>
      <button
        className="control-button reset-button"
        onClick={onReset}
      >
        ↺ Reset
      </button>
      {isCompleted && (
        <div className="completion-message">
          ✓ Level Complete!
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
