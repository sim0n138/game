import { useEffect } from 'react';

interface UseKeyboardControlsOptions {
  selectedCell: { row: number; col: number } | null;
  isCompleted: boolean;
  onNumberInput: (num: number) => void;
  onClear: () => void;
  onMove: (row: number, col: number) => void;
}

export function useKeyboardControls({
  selectedCell,
  isCompleted,
  onNumberInput,
  onClear,
  onMove
}: UseKeyboardControlsOptions): void {
  useEffect(() => {
    if (!selectedCell || isCompleted) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      // Числовые клавиши
      if (e.key >= '1' && e.key <= '9') {
        onNumberInput(parseInt(e.key));
        return;
      }

      // Удаление
      if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
        onClear();
        return;
      }

      // Навигация стрелками
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();

        const newRow = selectedCell.row + (e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0);
        const newCol = selectedCell.col + (e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0);

        if (newRow >= 0 && newRow < 9 && newCol >= 0 && newCol < 9) {
          onMove(newRow, newCol);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedCell, isCompleted, onNumberInput, onClear, onMove]);
}
