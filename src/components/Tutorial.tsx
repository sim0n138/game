import React from 'react';
import './Tutorial.css';

interface TutorialProps {
  title: string;
  description: string;
  tutorial?: string;
}

const Tutorial: React.FC<TutorialProps> = ({ title, description, tutorial }) => {
  return (
    <div className="tutorial">
      <h2>{title}</h2>
      <p className="description">{description}</p>
      {tutorial && (
        <div className="tutorial-hint">
          <strong>💡 Hint:</strong> {tutorial}
        </div>
      )}
      <div className="available-commands">
        <h4>Available Commands:</h4>
        <ul>
          <li><code>moveForward</code> - Move the robot forward one step</li>
          <li><code>turnLeft</code> - Turn the robot left (90°)</li>
          <li><code>turnRight</code> - Turn the robot right (90°)</li>
        </ul>
        <h4>Conditions:</h4>
        <ul>
          <li><code>canMoveForward</code> - Check if the robot can move forward</li>
          <li><code>atGoal</code> - Check if the robot is at the goal</li>
        </ul>
        <h4>Control Structures:</h4>
        <ul>
          <li><code>if(condition) {'{ ... }'}</code> - Execute code if condition is true</li>
          <li><code>while(condition) {'{ ... }'}</code> - Repeat code while condition is true</li>
        </ul>
      </div>
    </div>
  );
};

export default Tutorial;
