// Level definitions

import { Level, CellType, Direction } from '../types/game';

const E = CellType.EMPTY;
const W = CellType.WALL;
const S = CellType.START;
const G = CellType.GOAL;
const T = CellType.TRAP;

export const levels: Level[] = [
  // Уровень 1: Простое движение вперёд
  {
    id: 1,
    name: 'Первые шаги',
    description: 'Переместите робота вперёд, чтобы достичь цели',
    tutorial: 'Используйте команду moveForward, чтобы переместить робота на один шаг вперёд.',
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
  
  // Уровень 2: Повороты
  {
    id: 2,
    name: 'Учимся поворачивать',
    description: 'Поверните и двигайтесь, чтобы достичь цели',
    tutorial: 'Используйте turnRight и turnLeft для изменения направления, затем moveForward.',
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
  
  // Уровень 3: Простой лабиринт
  {
    id: 3,
    name: 'Простой лабиринт',
    description: 'Пройдите через простой коридор',
    tutorial: 'Комбинируйте движения и повороты для прохождения лабиринта.',
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
  
  // Уровень 4: Введение в условия
  {
    id: 4,
    name: 'Умное движение',
    description: 'Используйте условные операторы для проверки возможности движения вперёд',
    tutorial: 'Используйте if(canMoveForward) { moveForward } чтобы избежать стен.',
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
  
  // Уровень 5: Условная навигация
  {
    id: 5,
    name: 'Условная навигация',
    description: 'Перемещайтесь с использованием условных движений',
    tutorial: 'Проверяйте, можете ли двигаться вперёд, иначе поворачивайте.',
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
  
  // Уровень 6: Введение в циклы
  {
    id: 6,
    name: 'Повторяющиеся действия',
    description: 'Используйте циклы while для повторения действий',
    tutorial: 'Используйте while(canMoveForward) { moveForward } чтобы двигаться до столкновения со стеной.',
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
  
  // Уровень 7: Цикл с поворотами
  {
    id: 7,
    name: 'Цикл с поворотами',
    description: 'Комбинируйте циклы с поворотами',
    tutorial: 'Используйте циклы для повторяющихся движений и поворотов.',
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
  
  // Уровень 8: Сложный лабиринт с циклами
  {
    id: 8,
    name: 'Лабиринт с циклами',
    description: 'Пройдите сложный лабиринт, используя циклы',
    tutorial: 'Эффективно используйте циклы для навигации.',
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
  
  // Уровень 9: Введение в ловушки
  {
    id: 9,
    name: 'Избегая ловушек',
    description: 'Избегайте ловушек на пути к цели',
    tutorial: 'Осторожно обходите ловушки (красные клетки).',
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
  
  // Уровень 10: Сложная навигация с ловушками
  {
    id: 10,
    name: 'Лабиринт с ловушками',
    description: 'Пройдите лабиринт с множеством ловушек',
    tutorial: 'Тщательно планируйте путь, чтобы избежать всех ловушек.',
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
  
  // Уровень 11: Продвинутые условия
  {
    id: 11,
    name: 'Умная навигация',
    description: 'Используйте продвинутую условную логику',
    tutorial: 'Комбинируйте условные операторы с циклами для оптимальных решений.',
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
  
  // Уровень 12: Спиральный лабиринт
  {
    id: 12,
    name: 'Спираль',
    description: 'Пройдите по спиральному узору',
    tutorial: 'Используйте эффективные циклы для прохождения спирали.',
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
  
  // Уровень 13: Множество путей
  {
    id: 13,
    name: 'Выберите свой путь',
    description: 'Найдите оптимальный путь среди множества маршрутов',
    tutorial: 'Существует несколько путей - найдите самый короткий!',
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
  
  // Уровень 14: Продвинутые ловушки и циклы
  {
    id: 14,
    name: 'Испытание эксперта',
    description: 'Сложный лабиринт с ловушками для экспертов',
    tutorial: 'Используйте все свои навыки: циклы, условия и планирование.',
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
  
  // Уровень 15: Финальное испытание
  {
    id: 15,
    name: 'Мастер головоломок',
    description: 'Финальное испытание по программированию',
    tutorial: 'Объедините всё, что вы изучили, чтобы решить эту финальную головоломку!',
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
