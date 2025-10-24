export type CellValue = number | null;
export type SudokuBoard = CellValue[][];

// Константы Sudoku
export const BOARD_SIZE = 9;
export const BOX_SIZE = 3;
export const MIN_VALUE = 1;
export const MAX_VALUE = 9;

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXPERT = 'expert'
}

export interface SudokuPuzzle {
  id: number;
  difficulty: Difficulty;
  board: SudokuBoard;
  solution: SudokuBoard;
}

export interface GameStats {
  puzzlesCompleted: number;
  bestTime: number | null;
  lastPlayed: string | null;
}
