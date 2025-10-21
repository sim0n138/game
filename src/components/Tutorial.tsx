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
          <strong>💡 Подсказка:</strong> {tutorial}
        </div>
      )}
      <div className="available-commands">
        <h4>Доступные команды:</h4>
        <ul>
          <li><code>moveForward</code> - Переместить робота вперёд на один шаг</li>
          <li><code>turnLeft</code> - Повернуть робота налево (90°)</li>
          <li><code>turnRight</code> - Повернуть робота направо (90°)</li>
        </ul>
        <h4>Условия:</h4>
        <ul>
          <li><code>canMoveForward</code> - Проверить, может ли робот двигаться вперёд</li>
          <li><code>atGoal</code> - Проверить, достиг ли робот цели</li>
        </ul>
        <h4>Управляющие конструкции:</h4>
        <ul>
          <li><code>if(condition) {'{ ... }'}</code> - Выполнить код, если условие истинно</li>
          <li><code>while(condition) {'{ ... }'}</code> - Повторять код, пока условие истинно</li>
        </ul>
      </div>
    </div>
  );
};

export default Tutorial;
