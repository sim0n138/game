import React, { memo, useMemo, useCallback } from 'react';
import { SudokuBoard, BOX_SIZE } from '../types/sudoku';
import styles from './SudokuGrid.module.css';

interface SudokuGridProps {
  board: SudokuBoard;
  initialBoard: SudokuBoard;
  selectedCell: { row: number; col: number } | null;
  errors: boolean[][];
  onCellClick: (row: number, col: number) => void;
}

const SudokuGrid: React.FC<SudokuGridProps> = memo(({
  board,
  initialBoard,
  selectedCell,
  errors,
  onCellClick
}) => {
  // Мемоизируем функцию проверки фиксированных ячеек
  const isFixed = useCallback((row: number, col: number): boolean => {
    return initialBoard[row][col] !== null;
  }, [initialBoard]);

  // Мемоизируем функцию генерации классов для ячейки
  const getCellClass = useMemo(() => (row: number, col: number): string => {
    const classes = [styles.cell];

    if (isFixed(row, col)) {
      classes.push(styles.fixed);
    }

    if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
      classes.push(styles.selected);
    }

    if (errors[row][col]) {
      classes.push(styles.error);
    }

    // Подсветка связанных ячеек
    if (selectedCell) {
      if (selectedCell.row === row || selectedCell.col === col) {
        classes.push(styles.highlighted);
      }

      const selectedBoxRow = Math.floor(selectedCell.row / BOX_SIZE);
      const selectedBoxCol = Math.floor(selectedCell.col / BOX_SIZE);
      const cellBoxRow = Math.floor(row / BOX_SIZE);
      const cellBoxCol = Math.floor(col / BOX_SIZE);

      if (selectedBoxRow === cellBoxRow && selectedBoxCol === cellBoxCol) {
        classes.push(styles.highlighted);
      }
    }

    // Добавляем классы для границ квадратов 3x3
    if (col % BOX_SIZE === BOX_SIZE - 1 && col < 8) {
      classes.push(styles.rightBorder);
    }

    if (row % BOX_SIZE === BOX_SIZE - 1 && row < 8) {
      classes.push(styles.bottomBorder);
    }

    return classes.join(' ');
  }, [isFixed, selectedCell, errors]);

  return (
    <div className={styles.grid}>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={getCellClass(rowIndex, colIndex)}
              onClick={() => onCellClick(rowIndex, colIndex)}
            >
              {cell !== null ? cell : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
});

SudokuGrid.displayName = 'SudokuGrid';

export default SudokuGrid;
