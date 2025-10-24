export type CellValue = number | null;
export type SudokuBoard = CellValue[][];

export interface Cell {
  row: number;
  col: number;
  value: CellValue;
  isFixed: boolean;
  isError: boolean;
  isHighlighted: boolean;
}

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
