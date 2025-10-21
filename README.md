# 🤖 Головоломка программирования робота

Образовательная игра-головоломка для браузера, созданная на React и TypeScript, где игроки изучают концепции программирования, управляя роботом в лабиринтах.

_Robot Programming Puzzle Game - A browser-based educational puzzle game built with React and TypeScript where players learn programming concepts by controlling a robot through mazes._

## 🎮 Особенности игры / Game Features

### Основной геймплей / Core Gameplay
- **15 прогрессивных уровней** - От простых движений до сложной навигации в лабиринте
- **Canvas-рендеринг** - Плавное игровое поле на основе сетки с визуальной обратной связью
- **Пошаговое выполнение** - Наблюдайте за выполнением кода построчно
- **Визуализация в реальном времени** - Смотрите, как робот движется по вашему коду

### Язык программирования / Programming Language
Игра включает упрощённый язык программирования с:
- **Базовые команды**: `moveForward`, `turnLeft`, `turnRight`
- **Условные операторы**: `if(condition) { ... }`
- **Циклы**: `while(condition) { ... }`
- **Условия**: `canMoveForward`, `atGoal`

### Образовательные функции / Educational Features
- **Система обучения** - Каждый уровень включает подсказки и цели обучения
- **Прогрессивный путь обучения**:
  1. Последовательности команд (Уровни 1-3)
  2. Условные операторы (Уровни 4-5)
  3. Циклы while (Уровни 6-8)
  4. Избегание ловушек (Уровни 9-10)
  5. Продвинутые комбинации (Уровни 11-15)
- **Подсказки при ошибках** - Полезные сообщения об ошибках
- **Подсветка синтаксиса** - Цветовое выделение кода в редакторе

### Game Features
- **Leaderboard System** - Track optimal solutions (minimal commands)
- **Level Completion Tracking** - Visual indicators for completed levels
- **Persistent Progress** - Saves to localStorage
- **Run/Step/Reset Controls** - Full control over code execution

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

The game will open at `http://localhost:3000`

## 🎯 How to Play

1. **Select a Level** - Choose from 15 progressively challenging levels
2. **Read the Tutorial** - Each level includes instructions and hints
3. **Write Code** - Use the code editor to program the robot
4. **Run or Step** - Execute your code all at once or step-by-step
5. **Reach the Goal** - Navigate the robot to the green goal marker
6. **Optimize** - Try to solve with minimal commands for the leaderboard!

## 📝 Example Code

### Level 1 - Simple Movement
```javascript
moveForward
moveForward
```

### Level 6 - Using Loops
```javascript
while(canMoveForward) {
  moveForward
}
```

### Advanced - Conditionals and Loops
```javascript
while(canMoveForward) {
  if(canMoveForward) {
    moveForward
  }
  turnRight
}
```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── GameCanvas.tsx   # Canvas-based game renderer
│   ├── CodeEditor.tsx   # Syntax-highlighted code editor
│   ├── ControlPanel.tsx # Run/Step/Reset controls
│   ├── LevelSelector.tsx # Level navigation
│   ├── Leaderboard.tsx  # Best solutions display
│   └── Tutorial.tsx     # Level instructions
├── engine/              # Game engine
│   └── interpreter.ts   # Language lexer, parser, and interpreter
├── data/                # Game data
│   └── levels.ts        # All 15 level definitions
├── types/               # TypeScript types
│   └── game.ts          # Game type definitions
└── App.tsx             # Main application component
```

## 🎨 Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type-safe development
- **HTML5 Canvas** - Game rendering
- **CSS3** - Styling and animations
- **LocalStorage** - Progress persistence

## 🔧 Development

### Build
```bash
npm run build
```

### Test
```bash
npm test
```

### Lint
The project uses ESLint with React configuration (included with Create React App).

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎓 Learning Objectives

Players will learn:
- Sequential thinking and command ordering
- Conditional logic (if statements)
- Loop concepts (while loops)
- Debugging and error handling
- Code optimization
- Algorithmic problem solving

## 🌟 Features Highlights

- ✅ 15 carefully designed levels
- ✅ Syntax highlighting in code editor
- ✅ Step-by-step code execution
- ✅ Visual robot animation
- ✅ Hint system for each level
- ✅ Leaderboard for optimal solutions
- ✅ Progress tracking
- ✅ Responsive design
- ✅ Error detection with helpful messages
- ✅ Tutorial for programming concepts

Enjoy learning programming through puzzle solving! 🎮🤖
