import React from 'react';
import { SudokuBoard } from '../types/sudoku';

interface SudokuGridProps {
  board: SudokuBoard;
  initialBoard: SudokuBoard;
  selectedCell: { row: number; col: number } | null;
  errors: boolean[][];
  onCellClick: (row: number, col: number) => void;
}

const SudokuGrid: React.FC<SudokuGridProps> = ({
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
    const classes = ['sudoku-cell'];

    if (isFixed(row, col)) {
      classes.push('fixed');
    }

    if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
      classes.push('selected');
    }

    if (errors[row][col]) {
      classes.push('error');
    }

    // Подсветка связанных ячеек
    if (selectedCell) {
      if (selectedCell.row === row || selectedCell.col === col) {
        classes.push('highlighted');
      }

      const selectedBoxRow = Math.floor(selectedCell.row / 3);
      const selectedBoxCol = Math.floor(selectedCell.col / 3);
      const cellBoxRow = Math.floor(row / 3);
      const cellBoxCol = Math.floor(col / 3);

      if (selectedBoxRow === cellBoxRow && selectedBoxCol === cellBoxCol) {
        classes.push('highlighted');
      }
    }

    // Добавляем классы для границ квадратов 3x3
    if (col % 3 === 2 && col < 8) {
      classes.push('right-border');
    }

    if (row % 3 === 2 && row < 8) {
      classes.push('bottom-border');
    }

    return classes.join(' ');
  };

  return (
    <div className="sudoku-grid">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="sudoku-row">
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
};

export default SudokuGrid;
