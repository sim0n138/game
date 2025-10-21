// Game types and interfaces

export interface Position {
  x: number;
  y: number;
}

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

export enum CellType {
  EMPTY = 'EMPTY',
  WALL = 'WALL',
  START = 'START',
  GOAL = 'GOAL',
  TRAP = 'TRAP'
}

export interface Cell {
  type: CellType;
  position: Position;
}

export interface Robot {
  position: Position;
  direction: Direction;
}

export interface Level {
  id: number;
  name: string;
  description: string;
  grid: CellType[][];
  startPosition: Position;
  startDirection: Direction;
  goalPosition: Position;
  maxCommands?: number;
  tutorial?: string;
}

export interface GameState {
  robot: Robot;
  level: Level;
  isRunning: boolean;
  isCompleted: boolean;
  stepIndex: number;
  errors: string[];
}

export enum TokenType {
  COMMAND = 'COMMAND',
  NUMBER = 'NUMBER',
  IF = 'IF',
  WHILE = 'WHILE',
  FUNCTION = 'FUNCTION',
  OPEN_BRACE = 'OPEN_BRACE',
  CLOSE_BRACE = 'CLOSE_BRACE',
  OPEN_PAREN = 'OPEN_PAREN',
  CLOSE_PAREN = 'CLOSE_PAREN',
  IDENTIFIER = 'IDENTIFIER',
  NEWLINE = 'NEWLINE',
  EOF = 'EOF'
}

export interface Token {
  type: TokenType;
  value: string;
  line: number;
}

export interface ExecutionStep {
  robotPosition: Position;
  robotDirection: Direction;
  line: number;
  action: string;
}

export interface LeaderboardEntry {
  levelId: number;
  commands: number;
  date: string;
}
