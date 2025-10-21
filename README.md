# 🤖 Robot Programming Puzzle Game

A browser-based educational puzzle game built with React and TypeScript where players learn programming concepts by controlling a robot through mazes.

## 🎮 Game Features

### Core Gameplay
- **15 Progressive Levels** - From simple movements to complex maze navigation
- **Canvas-based Rendering** - Smooth grid-based game field with visual feedback
- **Step-by-step Execution** - Watch your code execute line by line
- **Real-time Visualization** - See the robot move as your code runs

### Programming Language
The game includes a simplified programming language with:
- **Basic Commands**: `moveForward`, `turnLeft`, `turnRight`
- **Conditionals**: `if(condition) { ... }`
- **Loops**: `while(condition) { ... }`
- **Conditions**: `canMoveForward`, `atGoal`

### Educational Features
- **Tutorial System** - Each level includes hints and learning objectives
- **Progressive Learning Path**:
  1. Command sequences (Levels 1-3)
  2. Conditional operators (Levels 4-5)
  3. While loops (Levels 6-8)
  4. Trap avoidance (Levels 9-10)
  5. Advanced combinations (Levels 11-15)
- **Error Hints** - Helpful error messages when code fails
- **Syntax Highlighting** - Color-coded code editor

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
