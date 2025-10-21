// Level definitions

import { Level, CellType, Direction } from '../types/game';

const E = CellType.EMPTY;
const W = CellType.WALL;
const S = CellType.START;
const G = CellType.GOAL;
const T = CellType.TRAP;

export const levels: Level[] = [
  // Level 1: Simple forward movement
  {
    id: 1,
    name: 'First Steps',
    description: 'Move the robot forward to reach the goal',
    tutorial: 'Use the moveForward command to move the robot one step forward.',
    grid: [
      [W, W, W, W, W],
      [W, S, E, G, W],
      [W, W, W, W, W]
    ],
    startPosition: { x: 1, y: 1 },
    startDirection: Direction.RIGHT,
    goalPosition: { x: 3, y: 1 },
    maxCommands: 10
  },
  
  // Level 2: Turning
  {
    id: 2,
    name: 'Learning to Turn',
    description: 'Turn and move to reach the goal',
    tutorial: 'Use turnRight and turnLeft to change direction, then moveForward.',
    grid: [
      [W, W, W, W, W],
      [W, S, E, W, W],
      [W, E, E, W, W],
      [W, G, W, W, W],
      [W, W, W, W, W]
    ],
    startPosition: { x: 1, y: 1 },
    startDirection: Direction.RIGHT,
    goalPosition: { x: 1, y: 3 },
    maxCommands: 15
  },
  
  // Level 3: Simple maze
  {
    id: 3,
    name: 'Simple Maze',
    description: 'Navigate through a simple corridor',
    tutorial: 'Combine movements and turns to navigate the maze.',
    grid: [
      [W, W, W, W, W, W, W],
      [W, S, E, E, E, E, W],
      [W, W, W, W, W, E, W],
      [W, G, E, E, E, E, W],
      [W, W, W, W, W, W, W]
    ],
    startPosition: { x: 1, y: 1 },
    startDirection: Direction.RIGHT,
    goalPosition: { x: 1, y: 3 },
    maxCommands: 20
  },
  
  // Level 4: Introduction to conditions
  {
    id: 4,
    name: 'Smart Movement',
    description: 'Use if statements to check if you can move forward',
    tutorial: 'Use if(canMoveForward) { moveForward } to avoid walls.',
    grid: [
      [W, W, W, W, W, W],
      [W, S, E, E, G, W],
      [W, W, W, W, W, W]
    ],
    startPosition: { x: 1, y: 1 },
    startDirection: Direction.RIGHT,
    goalPosition: { x: 4, y: 1 },
    maxCommands: 15
  },
  
  // Level 5: Conditional maze
  {
    id: 5,
    name: 'Conditional Navigation',
    description: 'Navigate using conditional movements',
    tutorial: 'Check if you can move forward, otherwise turn.',
    grid: [
      [W, W, W, W, W, W, W],
      [W, S, E, W, E, E, W],
      [W, E, E, W, E, W, W],
      [W, W, E, E, E, G, W],
      [W, W, W, W, W, W, W]
    ],
    startPosition: { x: 1, y: 1 },
    startDirection: Direction.RIGHT,
    goalPosition: { x: 5, y: 3 },
    maxCommands: 30
  },
  
  // Level 6: Introduction to loops
  {
    id: 6,
    name: 'Repeating Actions',
    description: 'Use while loops to repeat actions',
    tutorial: 'Use while(canMoveForward) { moveForward } to move until hitting a wall.',
    grid: [
      [W, W, W, W, W, W, W, W, W],
      [W, S, E, E, E, E, E, G, W],
      [W, W, W, W, W, W, W, W, W]
    ],
    startPosition: { x: 1, y: 1 },
    startDirection: Direction.RIGHT,
    goalPosition: { x: 7, y: 1 },
    maxCommands: 10
  },
  
  // Level 7: Loop with turns
  {
    id: 7,
    name: 'Loop Around',
    description: 'Combine loops with turning',
    tutorial: 'Use loops to move and turn repeatedly.',
    grid: [
      [W, W, W, W, W, W, W],
      [W, S, E, E, E, E, W],
      [W, E, W, W, W, E, W],
      [W, E, E, E, E, E, W],
      [W, W, W, W, W, G, W],
      [W, W, W, W, W, W, W]
    ],
    startPosition: { x: 1, y: 1 },
    startDirection: Direction.RIGHT,
    goalPosition: { x: 5, y: 4 },
    maxCommands: 25
  },
  
  // Level 8: Complex maze with loops
  {
    id: 8,
    name: 'Loop Maze',
    description: 'Navigate a complex maze using loops',
    tutorial: 'Efficiently use loops to navigate.',
    grid: [
      [W, W, W, W, W, W, W, W, W],
      [W, S, E, W, E, E, E, E, W],
      [W, W, E, W, E, W, W, E, W],
      [W, E, E, W, E, E, E, E, W],
      [W, E, W, W, W, W, W, E, W],
      [W, E, E, E, E, E, E, E, W],
      [W, W, W, W, W, W, W, G, W],
      [W, W, W, W, W, W, W, W, W]
    ],
    startPosition: { x: 1, y: 1 },
    startDirection: Direction.RIGHT,
    goalPosition: { x: 7, y: 6 },
    maxCommands: 40
  },
  
  // Level 9: Traps introduction
  {
    id: 9,
    name: 'Avoiding Traps',
    description: 'Avoid traps while reaching the goal',
    tutorial: 'Carefully navigate around traps (red cells).',
    grid: [
      [W, W, W, W, W, W, W],
      [W, S, E, T, E, G, W],
      [W, E, E, E, E, E, W],
      [W, W, W, W, W, W, W]
    ],
    startPosition: { x: 1, y: 1 },
    startDirection: Direction.RIGHT,
    goalPosition: { x: 5, y: 1 },
    maxCommands: 20
  },
  
  // Level 10: Complex trap navigation
  {
    id: 10,
    name: 'Trap Maze',
    description: 'Navigate through a maze with multiple traps',
    tutorial: 'Plan your path carefully to avoid all traps.',
    grid: [
      [W, W, W, W, W, W, W, W],
      [W, S, E, E, E, T, E, W],
      [W, W, W, W, E, W, E, W],
      [W, T, E, E, E, W, E, W],
      [W, E, W, W, E, E, E, W],
      [W, E, T, E, E, W, G, W],
      [W, W, W, W, W, W, W, W]
    ],
    startPosition: { x: 1, y: 1 },
    startDirection: Direction.RIGHT,
    goalPosition: { x: 6, y: 5 },
    maxCommands: 50
  },
  
  // Level 11: Advanced conditionals
  {
    id: 11,
    name: 'Smart Navigation',
    description: 'Use advanced conditional logic',
    tutorial: 'Combine if statements with loops for optimal solutions.',
    grid: [
      [W, W, W, W, W, W, W, W, W, W],
      [W, S, E, E, W, E, E, E, E, W],
      [W, E, W, E, W, E, W, W, E, W],
      [W, E, W, E, E, E, W, E, E, W],
      [W, E, E, E, W, E, E, E, W, W],
      [W, W, W, E, W, W, W, E, G, W],
      [W, W, W, W, W, W, W, W, W, W]
    ],
    startPosition: { x: 1, y: 1 },
    startDirection: Direction.RIGHT,
    goalPosition: { x: 8, y: 5 },
    maxCommands: 60
  },
  
  // Level 12: Spiral maze
  {
    id: 12,
    name: 'The Spiral',
    description: 'Navigate through a spiral pattern',
    tutorial: 'Use efficient loops to traverse the spiral.',
    grid: [
      [W, W, W, W, W, W, W, W, W],
      [W, S, E, E, E, E, E, E, W],
      [W, W, W, W, W, W, W, E, W],
      [W, E, E, E, E, E, W, E, W],
      [W, E, W, W, W, E, W, E, W],
      [W, E, E, E, E, E, W, E, W],
      [W, W, W, W, W, W, W, E, W],
      [W, G, E, E, E, E, E, E, W],
      [W, W, W, W, W, W, W, W, W]
    ],
    startPosition: { x: 1, y: 1 },
    startDirection: Direction.RIGHT,
    goalPosition: { x: 1, y: 7 },
    maxCommands: 70
  },
  
  // Level 13: Multiple paths
  {
    id: 13,
    name: 'Choose Your Path',
    description: 'Find the optimal path through multiple routes',
    tutorial: 'Multiple paths exist - find the shortest one!',
    grid: [
      [W, W, W, W, W, W, W, W, W, W],
      [W, S, E, E, W, E, E, E, E, W],
      [W, E, W, E, W, E, W, W, E, W],
      [W, E, W, E, E, E, E, W, E, W],
      [W, E, W, W, W, W, E, W, E, W],
      [W, E, E, E, E, E, E, W, E, W],
      [W, W, W, W, W, W, W, W, G, W],
      [W, W, W, W, W, W, W, W, W, W]
    ],
    startPosition: { x: 1, y: 1 },
    startDirection: Direction.RIGHT,
    goalPosition: { x: 8, y: 6 },
    maxCommands: 80
  },
  
  // Level 14: Advanced traps and loops
  {
    id: 14,
    name: 'Expert Challenge',
    description: 'Complex maze with traps requiring expert skills',
    tutorial: 'Use all your skills: loops, conditions, and planning.',
    grid: [
      [W, W, W, W, W, W, W, W, W, W, W],
      [W, S, E, T, E, E, W, E, E, E, W],
      [W, W, W, W, W, E, W, E, W, E, W],
      [W, T, E, E, E, E, E, E, W, E, W],
      [W, E, W, W, W, W, W, E, W, E, W],
      [W, E, E, T, E, E, E, E, W, E, W],
      [W, W, W, W, W, W, W, W, W, E, W],
      [W, E, E, E, E, E, E, E, E, E, W],
      [W, E, W, W, W, W, W, W, W, G, W],
      [W, W, W, W, W, W, W, W, W, W, W]
    ],
    startPosition: { x: 1, y: 1 },
    startDirection: Direction.RIGHT,
    goalPosition: { x: 9, y: 8 },
    maxCommands: 100
  },
  
  // Level 15: Ultimate challenge
  {
    id: 15,
    name: 'Master Puzzle',
    description: 'The ultimate programming challenge',
    tutorial: 'Combine everything you\'ve learned to solve this final puzzle!',
    grid: [
      [W, W, W, W, W, W, W, W, W, W, W, W],
      [W, S, E, E, E, W, E, T, E, E, E, W],
      [W, W, W, W, E, W, E, W, W, W, E, W],
      [W, E, E, E, E, W, E, E, E, W, E, W],
      [W, E, W, W, W, W, W, W, E, W, E, W],
      [W, E, E, T, E, E, E, E, E, W, E, W],
      [W, W, W, W, W, W, W, W, E, W, E, W],
      [W, T, E, E, E, E, E, E, E, E, E, W],
      [W, E, W, W, W, W, W, W, W, W, E, W],
      [W, E, E, E, E, E, E, E, E, E, E, W],
      [W, W, W, W, W, W, W, W, W, W, G, W],
      [W, W, W, W, W, W, W, W, W, W, W, W]
    ],
    startPosition: { x: 1, y: 1 },
    startDirection: Direction.RIGHT,
    goalPosition: { x: 10, y: 10 },
    maxCommands: 120
  }
];
