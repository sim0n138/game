import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import SudokuGrid from './components/SudokuGrid';
import DifficultySelector from './components/DifficultySelector';
import NumberPad from './components/NumberPad';
import GameControls from './components/GameControls';
import GameStats from './components/GameStats';
import { SudokuBoard, Difficulty, SudokuPuzzle, GameStats as Stats } from './types/sudoku';
import { generatePuzzle, copyBoard, isBoardComplete, isBoardCorrect, hasErrors } from './engine/sudokuGenerator';

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const [puzzle, setPuzzle] = useState<SudokuPuzzle | null>(null);
  const [board, setBoard] = useState<SudokuBoard>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [errors, setErrors] = useState<boolean[][]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [stats, setStats] = useState<Stats>({
    puzzlesCompleted: 0,
    bestTime: null,
    lastPlayed: null
  });

  // Загрузка статистики из localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('sudokuStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  // Создание новой игры
  const createNewGame = useCallback(() => {
    const newPuzzle = generatePuzzle(Date.now(), difficulty);
    setPuzzle(newPuzzle);
    setBoard(copyBoard(newPuzzle.board));
    setSelectedCell(null);
    setErrors(Array(9).fill(null).map(() => Array(9).fill(false)));
    setIsCompleted(false);
    setStartTime(Date.now());
    setElapsedTime(0);
  }, [difficulty]);

  // Инициализация игры при первой загрузке
  useEffect(() => {
    createNewGame();
  }, [createNewGame]);

  // Таймер
  useEffect(() => {
    if (startTime && !isCompleted) {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime, isCompleted]);

  // Обработка нажатия на ячейку
  const handleCellClick = (row: number, col: number) => {
    if (puzzle && puzzle.board[row][col] === null && !isCompleted) {
      setSelectedCell({ row, col });
    }
  };

  // Обработка ввода числа
  const handleNumberClick = useCallback((num: number) => {
    if (selectedCell && !isCompleted) {
      const newBoard = copyBoard(board);
      newBoard[selectedCell.row][selectedCell.col] = num;
      setBoard(newBoard);

      // Проверка ошибок
      const newErrors = hasErrors(newBoard);
      setErrors(newErrors);

      // Проверка завершения
      if (isBoardComplete(newBoard) && isBoardCorrect(newBoard)) {
        setIsCompleted(true);

        // Обновление статистики
        const newStats = {
          puzzlesCompleted: stats.puzzlesCompleted + 1,
          bestTime: stats.bestTime === null || elapsedTime < stats.bestTime
            ? elapsedTime
            : stats.bestTime,
          lastPlayed: new Date().toISOString()
        };
        setStats(newStats);
        localStorage.setItem('sudokuStats', JSON.stringify(newStats));
      }
    }
  }, [selectedCell, isCompleted, board, stats, elapsedTime]);

  // Очистка ячейки
  const handleClear = useCallback(() => {
    if (selectedCell && !isCompleted) {
      const newBoard = copyBoard(board);
      newBoard[selectedCell.row][selectedCell.col] = null;
      setBoard(newBoard);

      // Обновление ошибок
      const newErrors = hasErrors(newBoard);
      setErrors(newErrors);
    }
  }, [selectedCell, isCompleted, board]);

  // Проверка решения
  const handleCheckSolution = () => {
    if (isBoardComplete(board)) {
      if (isBoardCorrect(board)) {
        alert('Отлично! Решение правильное!');
        setIsCompleted(true);
      } else {
        alert('В решении есть ошибки. Попробуйте еще раз!');
      }
    } else {
      alert('Головоломка еще не завершена!');
    }
  };

  // Подсказка
  const handleHint = () => {
    if (puzzle && selectedCell && !isCompleted) {
      const solution = puzzle.solution[selectedCell.row][selectedCell.col];
      if (solution !== null) {
        const newBoard = copyBoard(board);
        newBoard[selectedCell.row][selectedCell.col] = solution;
        setBoard(newBoard);

        // Обновление ошибок
        const newErrors = hasErrors(newBoard);
        setErrors(newErrors);
      }
    }
  };

  // Новая игра
  const handleNewGame = () => {
    if (window.confirm('Начать новую игру? Текущий прогресс будет потерян.')) {
      createNewGame();
    }
  };

  // Изменение сложности
  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    setTimeout(() => {
      const newPuzzle = generatePuzzle(Date.now(), newDifficulty);
      setPuzzle(newPuzzle);
      setBoard(copyBoard(newPuzzle.board));
      setSelectedCell(null);
      setErrors(Array(9).fill(null).map(() => Array(9).fill(false)));
      setIsCompleted(false);
      setStartTime(Date.now());
      setElapsedTime(0);
    }, 0);
  };

  // Обработка клавиш
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedCell || isCompleted) return;

      // Числовые клавиши
      if (e.key >= '1' && e.key <= '9') {
        handleNumberClick(parseInt(e.key));
      }

      // Удаление
      if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
        handleClear();
      }

      // Навигация стрелками
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        const newRow = selectedCell.row + (e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0);
        const newCol = selectedCell.col + (e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0);

        if (newRow >= 0 && newRow < 9 && newCol >= 0 && newCol < 9) {
          setSelectedCell({ row: newRow, col: newCol });
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedCell, isCompleted, handleNumberClick, handleClear]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!puzzle) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🧩 Sudoku</h1>
        <p>Классическая игра-головоломка</p>
      </header>

      <div className="game-container">
        <div className="left-panel">
          <DifficultySelector
            currentDifficulty={difficulty}
            onSelectDifficulty={handleDifficultyChange}
          />

          <div className="timer">
            <h3>Время</h3>
            <div className="timer-display">{formatTime(elapsedTime)}</div>
          </div>

          <GameStats stats={stats} />
        </div>

        <div className="main-panel">
          <SudokuGrid
            board={board}
            initialBoard={puzzle.board}
            selectedCell={selectedCell}
            errors={errors}
            onCellClick={handleCellClick}
          />

          <NumberPad
            onNumberClick={handleNumberClick}
            onClear={handleClear}
          />

          <GameControls
            onNewGame={handleNewGame}
            onCheckSolution={handleCheckSolution}
            onHint={handleHint}
            isCompleted={isCompleted}
          />
        </div>

        <div className="right-panel">
          <div className="instructions">
            <h3>Как играть</h3>
            <ul>
              <li>Заполните сетку 9×9 числами от 1 до 9</li>
              <li>В каждой строке не должно быть повторяющихся чисел</li>
              <li>В каждом столбце не должно быть повторяющихся чисел</li>
              <li>В каждом квадрате 3×3 не должно быть повторяющихся чисел</li>
            </ul>

            <h4>Управление</h4>
            <ul>
              <li>Кликните на ячейку и выберите число</li>
              <li>Используйте клавиши 1-9 для ввода</li>
              <li>Backspace/Delete для очистки</li>
              <li>Стрелки для навигации</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
