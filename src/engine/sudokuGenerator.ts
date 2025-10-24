import { SudokuBoard, SudokuPuzzle, Difficulty } from '../types/sudoku';

// Создает пустую доску 9x9
export function createEmptyBoard(): SudokuBoard {
  return Array(9).fill(null).map(() => Array(9).fill(null));
}

// Копирует доску
export function copyBoard(board: SudokuBoard): SudokuBoard {
  return board.map(row => [...row]);
}

// Проверяет, можно ли поставить число в ячейку
export function isValidMove(board: SudokuBoard, row: number, col: number, num: number): boolean {
  // Проверка строки
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) {
      return false;
    }
  }

  // Проверка столбца
  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num) {
      return false;
    }
  }

  // Проверка квадрата 3x3
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) {
        return false;
      }
    }
  }

  return true;
}

// Заполняет доску (генерирует решение)
function fillBoard(board: SudokuBoard): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null) {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        // Перемешиваем числа для случайности
        for (let i = numbers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }

        for (const num of numbers) {
          if (isValidMove(board, row, col, num)) {
            board[row][col] = num;

            if (fillBoard(board)) {
              return true;
            }

            board[row][col] = null;
          }
        }

        return false;
      }
    }
  }
  return true;
}

// Подсчитывает количество решений (используется для проверки уникальности)
function countSolutions(board: SudokuBoard, limit: number = 2): number {
  const tempBoard = copyBoard(board);
  let count = 0;

  function solve(): boolean {
    if (count >= limit) return true;

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (tempBoard[row][col] === null) {
          for (let num = 1; num <= 9; num++) {
            if (isValidMove(tempBoard, row, col, num)) {
              tempBoard[row][col] = num;

              if (solve()) {
                tempBoard[row][col] = null;
                return true;
              }

              tempBoard[row][col] = null;
            }
          }
          return false;
        }
      }
    }

    count++;
    return count < limit;
  }

  solve();

  return count;
}

// Удаляет числа из заполненной доски для создания головоломки
function removeNumbers(board: SudokuBoard, difficulty: Difficulty): SudokuBoard {
  const puzzle = copyBoard(board);

  // Количество ячеек для удаления в зависимости от сложности
  const cellsToRemove = {
    [Difficulty.EASY]: 30,
    [Difficulty.MEDIUM]: 40,
    [Difficulty.HARD]: 50,
    [Difficulty.EXPERT]: 60
  };

  const toRemove = cellsToRemove[difficulty];
  let removed = 0;

  while (removed < toRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);

    if (puzzle[row][col] !== null) {
      const backup = puzzle[row][col];
      puzzle[row][col] = null;

      // Проверяем, что решение остается уникальным
      const testBoard = copyBoard(puzzle);
      if (countSolutions(testBoard, 2) === 1) {
        removed++;
      } else {
        // Возвращаем число обратно
        puzzle[row][col] = backup;
      }
    }
  }

  return puzzle;
}

// Генерирует новую головоломку
export function generatePuzzle(id: number, difficulty: Difficulty): SudokuPuzzle {
  const solution = createEmptyBoard();
  fillBoard(solution);

  const board = removeNumbers(solution, difficulty);

  return {
    id,
    difficulty,
    board,
    solution
  };
}

// Проверяет, заполнена ли доска полностью
export function isBoardComplete(board: SudokuBoard): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null) {
        return false;
      }
    }
  }
  return true;
}

// Проверяет правильность решения
export function isBoardCorrect(board: SudokuBoard): boolean {
  // Проверка строк
  for (let row = 0; row < 9; row++) {
    const seen = new Set<number>();
    for (let col = 0; col < 9; col++) {
      const val = board[row][col];
      if (val === null) return false;
      if (seen.has(val)) return false;
      seen.add(val);
    }
  }

  // Проверка столбцов
  for (let col = 0; col < 9; col++) {
    const seen = new Set<number>();
    for (let row = 0; row < 9; row++) {
      const val = board[row][col];
      if (val === null) return false;
      if (seen.has(val)) return false;
      seen.add(val);
    }
  }

  // Проверка квадратов 3x3
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const seen = new Set<number>();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const row = boxRow * 3 + i;
          const col = boxCol * 3 + j;
          const val = board[row][col];
          if (val === null) return false;
          if (seen.has(val)) return false;
          seen.add(val);
        }
      }
    }
  }

  return true;
}

// Проверяет наличие ошибок в текущей доске
export function hasErrors(board: SudokuBoard): boolean[][] {
  const errors: boolean[][] = Array(9).fill(null).map(() => Array(9).fill(false));

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const val = board[row][col];
      if (val !== null) {
        // Временно убираем значение для проверки
        board[row][col] = null;
        if (!isValidMove(board, row, col, val)) {
          errors[row][col] = true;
        }
        board[row][col] = val;
      }
    }
  }

  return errors;
}
