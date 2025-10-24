import { useState, useCallback, useEffect } from 'react';
import { SudokuBoard, Difficulty, SudokuPuzzle, BOARD_SIZE } from '../types/sudoku';
import { generatePuzzle, copyBoard, isBoardComplete, isBoardCorrect, hasErrors } from '../engine/sudokuGenerator';

interface UseGameStateCallbacks {
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
  onInfo?: (message: string) => void;
  onConfirm?: (message: string, onConfirmed: () => void) => void;
}

interface UseGameStateReturn {
  puzzle: SudokuPuzzle | null;
  board: SudokuBoard;
  selectedCell: { row: number; col: number } | null;
  errors: boolean[][];
  isCompleted: boolean;
  difficulty: Difficulty;
  handleCellClick: (row: number, col: number) => void;
  handleNumberInput: (num: number) => void;
  handleClearCell: () => void;
  handleNewGame: () => void;
  handleCheckSolution: () => void;
  handleHint: () => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setSelectedCell: (cell: { row: number; col: number } | null) => void;
}

export function useGameState(callbacks?: UseGameStateCallbacks): UseGameStateReturn {
  const [difficulty, setDifficultyState] = useState<Difficulty>(Difficulty.EASY);
  const [puzzle, setPuzzle] = useState<SudokuPuzzle | null>(null);
  const [board, setBoard] = useState<SudokuBoard>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [errors, setErrors] = useState<boolean[][]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // Создание новой игры
  const createNewPuzzle = useCallback((diff: Difficulty) => {
    const newPuzzle = generatePuzzle(Date.now(), diff);
    setPuzzle(newPuzzle);
    setBoard(copyBoard(newPuzzle.board));
    setSelectedCell(null);
    setErrors(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(false)));
    setIsCompleted(false);
  }, []);

  // Инициализация игры при первой загрузке
  useEffect(() => {
    createNewPuzzle(difficulty);
  }, [difficulty, createNewPuzzle]);

  // Обработка клика на ячейку
  const handleCellClick = useCallback((row: number, col: number) => {
    if (puzzle && puzzle.board[row][col] === null && !isCompleted) {
      setSelectedCell({ row, col });
    }
  }, [puzzle, isCompleted]);

  // Обработка ввода числа - используем функциональную форму setState
  const handleNumberInput = useCallback((num: number) => {
    if (!selectedCell || isCompleted) return;

    setBoard(prevBoard => {
      const newBoard = copyBoard(prevBoard);
      newBoard[selectedCell.row][selectedCell.col] = num;

      // Проверка ошибок
      const newErrors = hasErrors(newBoard);
      setErrors(newErrors);

      // Проверка завершения
      if (isBoardComplete(newBoard) && isBoardCorrect(newBoard)) {
        setIsCompleted(true);
      }

      return newBoard;
    });
  }, [selectedCell, isCompleted]);

  // Очистка ячейки - используем функциональную форму setState
  const handleClearCell = useCallback(() => {
    if (!selectedCell || isCompleted) return;

    setBoard(prevBoard => {
      const newBoard = copyBoard(prevBoard);
      newBoard[selectedCell.row][selectedCell.col] = null;

      // Обновление ошибок
      const newErrors = hasErrors(newBoard);
      setErrors(newErrors);

      return newBoard;
    });
  }, [selectedCell, isCompleted]);

  // Проверка решения
  const handleCheckSolution = useCallback(() => {
    if (isBoardComplete(board)) {
      if (isBoardCorrect(board)) {
        callbacks?.onSuccess?.('Отлично! Решение правильное!');
        setIsCompleted(true);
      } else {
        callbacks?.onError?.('В решении есть ошибки. Попробуйте еще раз!');
      }
    } else {
      callbacks?.onInfo?.('Головоломка еще не завершена!');
    }
  }, [board, callbacks]);

  // Подсказка
  const handleHint = useCallback(() => {
    if (!puzzle || !selectedCell || isCompleted) return;

    const solution = puzzle.solution[selectedCell.row][selectedCell.col];
    if (solution !== null) {
      setBoard(prevBoard => {
        const newBoard = copyBoard(prevBoard);
        newBoard[selectedCell.row][selectedCell.col] = solution;

        // Обновление ошибок
        const newErrors = hasErrors(newBoard);
        setErrors(newErrors);

        return newBoard;
      });
    }
  }, [puzzle, selectedCell, isCompleted]);

  // Новая игра
  const handleNewGame = useCallback(() => {
    const startNewGame = () => createNewPuzzle(difficulty);

    if (callbacks?.onConfirm) {
      callbacks.onConfirm('Начать новую игру? Текущий прогресс будет потерян.', startNewGame);
    } else {
      // Fallback на window.confirm если callback не передан
      if (window.confirm('Начать новую игру? Текущий прогресс будет потерян.')) {
        startNewGame();
      }
    }
  }, [difficulty, createNewPuzzle, callbacks]);

  // Изменение сложности - убран setTimeout, заменён на декларативный useEffect
  const setDifficulty = useCallback((newDifficulty: Difficulty) => {
    setDifficultyState(newDifficulty);
  }, []);

  return {
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
  };
}
