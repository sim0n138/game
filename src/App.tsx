import React, { useRef, useEffect, useState, useCallback } from 'react';
import styles from './App.module.css';
import SudokuGrid from './components/SudokuGrid';
import DifficultySelector from './components/DifficultySelector';
import NumberPad from './components/NumberPad';
import GameControls from './components/GameControls';
import GameStats from './components/GameStats';
import Timer from './components/Timer';
import Toast from './components/Toast';
import ConfirmDialog from './components/ConfirmDialog';
import { useGameState } from './hooks/useGameState';
import { useGameStats } from './hooks/useGameStats';
import { useKeyboardControls } from './hooks/useKeyboardControls';
import { useToast } from './hooks/useToast';

function App() {
  const { stats, recordCompletion } = useGameStats();
  const elapsedTimeRef = useRef(0);
  const { toasts, showToast, removeToast } = useToast();
  const [confirmDialog, setConfirmDialog] = useState<{
    message: string;
    onConfirm: () => void;
  } | null>(null);

  // Callbacks для useGameState
  const onSuccess = useCallback((message: string) => showToast(message, 'success'), [showToast]);
  const onError = useCallback((message: string) => showToast(message, 'error'), [showToast]);
  const onInfo = useCallback((message: string) => showToast(message, 'info'), [showToast]);
  const onConfirm = useCallback((message: string, onConfirmed: () => void) => {
    setConfirmDialog({ message, onConfirm: onConfirmed });
  }, []);

  const gameCallbacks = { onSuccess, onError, onInfo, onConfirm };

  const {
    puzzle,
    board,
    selectedCell,
    errors,
    isCompleted,
    difficulty,
    handleCellClick,
    handleNumberInput,
    handleClearCell,
    handleNewGame,
    handleCheckSolution,
    handleHint,
    setDifficulty,
    setSelectedCell
  } = useGameState(gameCallbacks);

  // Обработчик обновления времени из Timer
  const handleTimeUpdate = (seconds: number) => {
    elapsedTimeRef.current = seconds;
  };

  // Отслеживаем завершение игры и записываем статистику
  useEffect(() => {
    if (isCompleted) {
      recordCompletion(elapsedTimeRef.current);
    }
  }, [isCompleted, recordCompletion]);

  // Хук управления клавиатурой
  useKeyboardControls({
    selectedCell,
    isCompleted,
    onNumberInput: handleNumberInput,
    onClear: handleClearCell,
    onMove: (row, col) => setSelectedCell({ row, col })
  });

  if (!puzzle) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={styles.app}>
      {/* Toast уведомления */}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      {/* Диалог подтверждения */}
      {confirmDialog && (
        <ConfirmDialog
          message={confirmDialog.message}
          onConfirm={() => {
            confirmDialog.onConfirm();
            setConfirmDialog(null);
          }}
          onCancel={() => setConfirmDialog(null)}
        />
      )}

      <header className={styles.header}>
        <h1>🧩 Sudoku</h1>
        <p>Классическая игра-головоломка</p>
      </header>

      <div className={styles.gameContainer}>
        <div className={styles.leftPanel}>
          <DifficultySelector
            currentDifficulty={difficulty}
            onSelectDifficulty={setDifficulty}
          />

          <Timer
            isRunning={!isCompleted}
            onTimeUpdate={handleTimeUpdate}
          />

          <GameStats stats={stats} />
        </div>

        <div className={styles.mainPanel}>
          <SudokuGrid
            board={board}
            initialBoard={puzzle.board}
            selectedCell={selectedCell}
            errors={errors}
            onCellClick={handleCellClick}
          />

          <NumberPad
            onNumberClick={handleNumberInput}
            onClear={handleClearCell}
          />

          <GameControls
            onNewGame={handleNewGame}
            onCheckSolution={handleCheckSolution}
            onHint={handleHint}
            isCompleted={isCompleted}
          />
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.instructions}>
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
