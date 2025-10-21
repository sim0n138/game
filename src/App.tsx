import React, { useState, useEffect } from 'react';
import './App.css';
import GameCanvas from './components/GameCanvas';
import CodeEditor from './components/CodeEditor';
import ControlPanel from './components/ControlPanel';
import LevelSelector from './components/LevelSelector';
import Leaderboard from './components/Leaderboard';
import Tutorial from './components/Tutorial';
import { levels } from './data/levels';
import { Lexer, Parser, Interpreter } from './engine/interpreter';
import { Direction, Position, LeaderboardEntry } from './types/game';

function App() {
  const [currentLevelId, setCurrentLevelId] = useState(1);
  const [code, setCode] = useState('// Напишите ваш код здесь\nmoveForward\nmoveForward');
  const [robotPosition, setRobotPosition] = useState<Position>({ x: 1, y: 1 });
  const [robotDirection, setRobotDirection] = useState<Direction>(Direction.RIGHT);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentLine, setCurrentLine] = useState<number | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [executionSteps, setExecutionSteps] = useState<any[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  const currentLevel = levels.find(l => l.id === currentLevelId) || levels[0];

  // Load data from localStorage
  useEffect(() => {
    const savedCompletedLevels = localStorage.getItem('completedLevels');
    if (savedCompletedLevels) {
      setCompletedLevels(JSON.parse(savedCompletedLevels));
    }

    const savedLeaderboard = localStorage.getItem('leaderboard');
    if (savedLeaderboard) {
      setLeaderboard(JSON.parse(savedLeaderboard));
    }
  }, []);

  // Reset when level changes
  useEffect(() => {
    setRobotPosition(currentLevel.startPosition);
    setRobotDirection(currentLevel.startDirection);
    setIsRunning(false);
    setIsCompleted(false);
    setCurrentLine(undefined);
    setError(undefined);
    setExecutionSteps([]);
    setCurrentStepIndex(0);
  }, [currentLevelId, currentLevel]);

  const handleReset = () => {
    setRobotPosition(currentLevel.startPosition);
    setRobotDirection(currentLevel.startDirection);
    setIsRunning(false);
    setIsCompleted(false);
    setCurrentLine(undefined);
    setError(undefined);
    setExecutionSteps([]);
    setCurrentStepIndex(0);
  };

  const countCommands = (code: string): number => {
    const lines = code.split('\n');
    let count = 0;
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('//') && !trimmed.match(/^[{}()]/)) {
        if (trimmed.match(/^(moveForward|turnLeft|turnRight)/)) {
          count++;
        }
      }
    }
    return count;
  };

  const handleRun = () => {
    setError(undefined);
    setIsRunning(true);
    setCurrentStepIndex(0);

    try {
      const lexer = new Lexer(code);
      const tokens = lexer.tokenize();
      const parser = new Parser(tokens);
      const commands = parser.parse();

      const interpreter = new Interpreter(
        currentLevel.grid,
        currentLevel.startPosition,
        currentLevel.startDirection,
        currentLevel.goalPosition
      );

      const result = interpreter.execute(commands);

      if (result.error) {
        setError(result.error);
        setIsRunning(false);
        return;
      }

      setExecutionSteps(result.steps);

      // Animate through steps
      let stepIdx = 0;
      const interval = setInterval(() => {
        if (stepIdx < result.steps.length) {
          const step = result.steps[stepIdx];
          setRobotPosition(step.robotPosition);
          setRobotDirection(step.robotDirection);
          setCurrentLine(step.line);
          stepIdx++;
        } else {
          clearInterval(interval);
          setIsRunning(false);
          setCurrentLine(undefined);

          if (result.success) {
            setIsCompleted(true);
            
            // Update completed levels
            if (!completedLevels.includes(currentLevelId)) {
              const newCompleted = [...completedLevels, currentLevelId];
              setCompletedLevels(newCompleted);
              localStorage.setItem('completedLevels', JSON.stringify(newCompleted));
            }

            // Update leaderboard
            const commandCount = countCommands(code);
            const newEntry: LeaderboardEntry = {
              levelId: currentLevelId,
              commands: commandCount,
              date: new Date().toISOString()
            };
            const newLeaderboard = [...leaderboard, newEntry];
            setLeaderboard(newLeaderboard);
            localStorage.setItem('leaderboard', JSON.stringify(newLeaderboard));
          }
        }
      }, 500);
    } catch (err) {
      setError((err as Error).message);
      setIsRunning(false);
    }
  };

  const handleStep = () => {
    if (executionSteps.length === 0) {
      // First time stepping - parse and prepare
      setError(undefined);
      try {
        const lexer = new Lexer(code);
        const tokens = lexer.tokenize();
        const parser = new Parser(tokens);
        const commands = parser.parse();

        const interpreter = new Interpreter(
          currentLevel.grid,
          currentLevel.startPosition,
          currentLevel.startDirection,
          currentLevel.goalPosition
        );

        const result = interpreter.execute(commands);

        if (result.error) {
          setError(result.error);
          return;
        }

        setExecutionSteps(result.steps);
        setCurrentStepIndex(0);
      } catch (err) {
        setError((err as Error).message);
        return;
      }
    } else if (currentStepIndex < executionSteps.length) {
      const step = executionSteps[currentStepIndex];
      setRobotPosition(step.robotPosition);
      setRobotDirection(step.robotDirection);
      setCurrentLine(step.line);
      setCurrentStepIndex(currentStepIndex + 1);

      if (currentStepIndex + 1 >= executionSteps.length) {
        // Check if completed
        const lastStep = executionSteps[executionSteps.length - 1];
        if (
          lastStep.robotPosition.x === currentLevel.goalPosition.x &&
          lastStep.robotPosition.y === currentLevel.goalPosition.y
        ) {
          setIsCompleted(true);
          
          // Update completed levels
          if (!completedLevels.includes(currentLevelId)) {
            const newCompleted = [...completedLevels, currentLevelId];
            setCompletedLevels(newCompleted);
            localStorage.setItem('completedLevels', JSON.stringify(newCompleted));
          }

          // Update leaderboard
          const commandCount = countCommands(code);
          const newEntry: LeaderboardEntry = {
            levelId: currentLevelId,
            commands: commandCount,
            date: new Date().toISOString()
          };
          const newLeaderboard = [...leaderboard, newEntry];
          setLeaderboard(newLeaderboard);
          localStorage.setItem('leaderboard', JSON.stringify(newLeaderboard));
        }
      }
    }
  };

  const handleSelectLevel = (levelId: number) => {
    setCurrentLevelId(levelId);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🤖 Головоломка программирования робота</h1>
        <p>Программируйте робота для прохождения лабиринтов!</p>
      </header>
      
      <div className="game-container">
        <div className="left-panel">
          <LevelSelector
            levels={levels}
            currentLevelId={currentLevelId}
            onSelectLevel={handleSelectLevel}
            completedLevels={completedLevels}
          />
          <Leaderboard
            entries={leaderboard}
            currentLevelId={currentLevelId}
          />
        </div>

        <div className="main-panel">
          <Tutorial
            title={currentLevel.name}
            description={currentLevel.description}
            tutorial={currentLevel.tutorial}
          />
          
          <div className="game-area">
            <div className="canvas-container">
              <GameCanvas
                grid={currentLevel.grid}
                robotPosition={robotPosition}
                robotDirection={robotDirection}
                goalPosition={currentLevel.goalPosition}
              />
            </div>

            <div className="editor-container">
              <CodeEditor
                value={code}
                onChange={setCode}
                currentLine={currentLine}
                error={error}
              />
            </div>
          </div>

          <ControlPanel
            onRun={handleRun}
            onStep={handleStep}
            onReset={handleReset}
            isRunning={isRunning}
            isCompleted={isCompleted}
            canStep={executionSteps.length > 0 && currentStepIndex < executionSteps.length}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
