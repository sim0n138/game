// Simplified programming language interpreter

import { Token, TokenType, Direction, Position, CellType } from '../types/game';

export class Lexer {
  private code: string;
  private position: number = 0;
  private line: number = 1;

  constructor(code: string) {
    this.code = code;
  }

  tokenize(): Token[] {
    const tokens: Token[] = [];
    
    while (this.position < this.code.length) {
      const char = this.code[this.position];
      
      // Skip whitespace (except newlines)
      if (char === ' ' || char === '\t' || char === '\r') {
        this.position++;
        continue;
      }
      
      // Handle newlines
      if (char === '\n') {
        tokens.push({ type: TokenType.NEWLINE, value: '\n', line: this.line });
        this.line++;
        this.position++;
        continue;
      }
      
      // Skip comments
      if (char === '/' && this.code[this.position + 1] === '/') {
        while (this.position < this.code.length && this.code[this.position] !== '\n') {
          this.position++;
        }
        continue;
      }
      
      // Handle braces
      if (char === '{') {
        tokens.push({ type: TokenType.OPEN_BRACE, value: '{', line: this.line });
        this.position++;
        continue;
      }
      
      if (char === '}') {
        tokens.push({ type: TokenType.CLOSE_BRACE, value: '}', line: this.line });
        this.position++;
        continue;
      }
      
      if (char === '(') {
        tokens.push({ type: TokenType.OPEN_PAREN, value: '(', line: this.line });
        this.position++;
        continue;
      }
      
      if (char === ')') {
        tokens.push({ type: TokenType.CLOSE_PAREN, value: ')', line: this.line });
        this.position++;
        continue;
      }
      
      // Handle numbers
      if (/\d/.test(char)) {
        let num = '';
        while (this.position < this.code.length && /\d/.test(this.code[this.position])) {
          num += this.code[this.position];
          this.position++;
        }
        tokens.push({ type: TokenType.NUMBER, value: num, line: this.line });
        continue;
      }
      
      // Handle identifiers and keywords
      if (/[a-zA-Z_]/.test(char)) {
        let word = '';
        while (this.position < this.code.length && /[a-zA-Z_]/.test(this.code[this.position])) {
          word += this.code[this.position];
          this.position++;
        }
        
        const commandKeywords = ['moveForward', 'turnLeft', 'turnRight'];
        
        let tokenType = TokenType.IDENTIFIER;
        if (word === 'if') tokenType = TokenType.IF;
        else if (word === 'while') tokenType = TokenType.WHILE;
        else if (word === 'function') tokenType = TokenType.FUNCTION;
        else if (commandKeywords.includes(word)) tokenType = TokenType.COMMAND;
        
        tokens.push({ type: tokenType, value: word, line: this.line });
        continue;
      }
      
      // Unknown character
      this.position++;
    }
    
    tokens.push({ type: TokenType.EOF, value: '', line: this.line });
    return tokens;
  }
}

export interface Command {
  type: 'move' | 'turnLeft' | 'turnRight' | 'if' | 'while' | 'block';
  condition?: string;
  body?: Command[];
  line: number;
}

export class Parser {
  private tokens: Token[];
  private position: number = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens.filter(t => t.type !== TokenType.NEWLINE);
  }

  parse(): Command[] {
    const commands: Command[] = [];
    
    while (!this.isAtEnd()) {
      const cmd = this.parseCommand();
      if (cmd) commands.push(cmd);
    }
    
    return commands;
  }

  private parseCommand(): Command | null {
    const token = this.current();
    
    if (!token || token.type === TokenType.EOF) {
      return null;
    }
    
    if (token.type === TokenType.COMMAND) {
      const line = token.line;
      this.advance();
      
      if (token.value === 'moveForward') {
        return { type: 'move', line };
      } else if (token.value === 'turnLeft') {
        return { type: 'turnLeft', line };
      } else if (token.value === 'turnRight') {
        return { type: 'turnRight', line };
      }
    }
    
    if (token.type === TokenType.IF) {
      const line = token.line;
      this.advance();
      
      // Expect (
      if (this.current()?.type !== TokenType.OPEN_PAREN) {
        throw new Error(`Expected '(' after 'if' at line ${line}`);
      }
      this.advance();
      
      // Get condition
      const condition = this.current()?.value || '';
      this.advance();
      
      // Expect )
      if (this.current()?.type !== TokenType.CLOSE_PAREN) {
        throw new Error(`Expected ')' after condition at line ${line}`);
      }
      this.advance();
      
      // Expect {
      if (this.current()?.type !== TokenType.OPEN_BRACE) {
        throw new Error(`Expected '{' after if condition at line ${line}`);
      }
      this.advance();
      
      // Parse body
      const body: Command[] = [];
      while (this.current()?.type !== TokenType.CLOSE_BRACE && !this.isAtEnd()) {
        const cmd = this.parseCommand();
        if (cmd) body.push(cmd);
      }
      
      // Expect }
      if (this.current()?.type !== TokenType.CLOSE_BRACE) {
        throw new Error(`Expected '}' to close if block at line ${line}`);
      }
      this.advance();
      
      return { type: 'if', condition, body, line };
    }
    
    if (token.type === TokenType.WHILE) {
      const line = token.line;
      this.advance();
      
      // Expect (
      if (this.current()?.type !== TokenType.OPEN_PAREN) {
        throw new Error(`Expected '(' after 'while' at line ${line}`);
      }
      this.advance();
      
      // Get condition
      const condition = this.current()?.value || '';
      this.advance();
      
      // Expect )
      if (this.current()?.type !== TokenType.CLOSE_PAREN) {
        throw new Error(`Expected ')' after condition at line ${line}`);
      }
      this.advance();
      
      // Expect {
      if (this.current()?.type !== TokenType.OPEN_BRACE) {
        throw new Error(`Expected '{' after while condition at line ${line}`);
      }
      this.advance();
      
      // Parse body
      const body: Command[] = [];
      while (this.current()?.type !== TokenType.CLOSE_BRACE && !this.isAtEnd()) {
        const cmd = this.parseCommand();
        if (cmd) body.push(cmd);
      }
      
      // Expect }
      if (this.current()?.type !== TokenType.CLOSE_BRACE) {
        throw new Error(`Expected '}' to close while block at line ${line}`);
      }
      this.advance();
      
      return { type: 'while', condition, body, line };
    }
    
    this.advance();
    return null;
  }

  private current(): Token | undefined {
    return this.tokens[this.position];
  }

  private advance(): void {
    if (!this.isAtEnd()) {
      this.position++;
    }
  }

  private isAtEnd(): boolean {
    return this.position >= this.tokens.length || this.current()?.type === TokenType.EOF;
  }
}

export class Interpreter {
  private grid: CellType[][];
  private robotPos: Position;
  private robotDir: Direction;
  private goalPos: Position;
  private maxIterations: number = 1000;

  constructor(grid: CellType[][], startPos: Position, startDir: Direction, goalPos: Position) {
    this.grid = grid;
    this.robotPos = { ...startPos };
    this.robotDir = startDir;
    this.goalPos = goalPos;
  }

  execute(commands: Command[]): { success: boolean; steps: any[]; error?: string } {
    const steps: any[] = [];
    let iterations = 0;
    
    try {
      this.executeCommands(commands, steps, () => {
        iterations++;
        if (iterations > this.maxIterations) {
          throw new Error('Too many iterations - possible infinite loop');
        }
      });
      
      const success = this.robotPos.x === this.goalPos.x && this.robotPos.y === this.goalPos.y;
      return { success, steps };
    } catch (error) {
      return { success: false, steps, error: (error as Error).message };
    }
  }

  private executeCommands(commands: Command[], steps: any[], checkIterations: () => void): void {
    for (const cmd of commands) {
      checkIterations();
      
      if (cmd.type === 'move') {
        this.moveForward(steps, cmd.line);
      } else if (cmd.type === 'turnLeft') {
        this.turnLeft(steps, cmd.line);
      } else if (cmd.type === 'turnRight') {
        this.turnRight(steps, cmd.line);
      } else if (cmd.type === 'if') {
        if (this.evaluateCondition(cmd.condition!)) {
          this.executeCommands(cmd.body!, steps, checkIterations);
        }
      } else if (cmd.type === 'while') {
        while (this.evaluateCondition(cmd.condition!)) {
          checkIterations();
          this.executeCommands(cmd.body!, steps, checkIterations);
        }
      }
    }
  }

  private moveForward(steps: any[], line: number): void {
    const newPos = this.getForwardPosition();
    
    if (!this.isValidPosition(newPos)) {
      throw new Error(`Cannot move forward - wall or boundary at line ${line}`);
    }
    
    if (this.grid[newPos.y][newPos.x] === CellType.TRAP) {
      throw new Error(`Hit a trap at line ${line}`);
    }
    
    this.robotPos = newPos;
    steps.push({
      robotPosition: { ...this.robotPos },
      robotDirection: this.robotDir,
      line,
      action: 'move'
    });
  }

  private turnLeft(steps: any[], line: number): void {
    const dirOrder = [Direction.UP, Direction.LEFT, Direction.DOWN, Direction.RIGHT];
    const currentIndex = dirOrder.indexOf(this.robotDir);
    this.robotDir = dirOrder[(currentIndex + 1) % 4];
    
    steps.push({
      robotPosition: { ...this.robotPos },
      robotDirection: this.robotDir,
      line,
      action: 'turnLeft'
    });
  }

  private turnRight(steps: any[], line: number): void {
    const dirOrder = [Direction.UP, Direction.RIGHT, Direction.DOWN, Direction.LEFT];
    const currentIndex = dirOrder.indexOf(this.robotDir);
    this.robotDir = dirOrder[(currentIndex + 1) % 4];
    
    steps.push({
      robotPosition: { ...this.robotPos },
      robotDirection: this.robotDir,
      line,
      action: 'turnRight'
    });
  }

  private evaluateCondition(condition: string): boolean {
    if (condition === 'canMoveForward') {
      const newPos = this.getForwardPosition();
      return this.isValidPosition(newPos);
    }
    if (condition === 'atGoal') {
      return this.robotPos.x === this.goalPos.x && this.robotPos.y === this.goalPos.y;
    }
    return false;
  }

  private getForwardPosition(): Position {
    const { x, y } = this.robotPos;
    
    switch (this.robotDir) {
      case Direction.UP:
        return { x, y: y - 1 };
      case Direction.DOWN:
        return { x, y: y + 1 };
      case Direction.LEFT:
        return { x: x - 1, y };
      case Direction.RIGHT:
        return { x: x + 1, y };
    }
  }

  private isValidPosition(pos: Position): boolean {
    if (pos.y < 0 || pos.y >= this.grid.length || pos.x < 0 || pos.x >= this.grid[0].length) {
      return false;
    }
    
    return this.grid[pos.y][pos.x] !== CellType.WALL;
  }
}
