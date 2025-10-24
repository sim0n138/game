import React, { memo } from 'react';
import { SudokuBoard } from '../types/sudoku';
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
  const isFixed = (row: number, col: number): boolean => {
    return initialBoard[row][col] !== null;
  };

  const getCellClass = (row: number, col: number): string => {
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

      const selectedBoxRow = Math.floor(selectedCell.row / 3);
      const selectedBoxCol = Math.floor(selectedCell.col / 3);
      const cellBoxRow = Math.floor(row / 3);
      const cellBoxCol = Math.floor(col / 3);

      if (selectedBoxRow === cellBoxRow && selectedBoxCol === cellBoxCol) {
        classes.push(styles.highlighted);
      }
    }

    // Добавляем классы для границ квадратов 3x3
    if (col % 3 === 2 && col < 8) {
      classes.push(styles.rightBorder);
    }

    if (row % 3 === 2 && row < 8) {
      classes.push(styles.bottomBorder);
    }

    return classes.join(' ');
  };

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
