import React, { useEffect, useRef } from 'react';
import { CellType, Direction, Position } from '../types/game';

interface GameCanvasProps {
  grid: CellType[][];
  robotPosition: Position;
  robotDirection: Direction;
  goalPosition: Position;
  cellSize?: number;
}

const GameCanvas: React.FC<GameCanvasProps> = ({
  grid,
  robotPosition,
  robotDirection,
  goalPosition,
  cellSize = 40
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        const posX = x * cellSize;
        const posY = y * cellSize;

        // Draw cell background
        switch (cell) {
          case CellType.WALL:
            ctx.fillStyle = '#2c3e50';
            break;
          case CellType.EMPTY:
            ctx.fillStyle = '#ecf0f1';
            break;
          case CellType.START:
            ctx.fillStyle = '#3498db';
            break;
          case CellType.GOAL:
            ctx.fillStyle = '#2ecc71';
            break;
          case CellType.TRAP:
            ctx.fillStyle = '#e74c3c';
            break;
          default:
            ctx.fillStyle = '#ecf0f1';
        }
        
        ctx.fillRect(posX, posY, cellSize, cellSize);

        // Draw grid lines
        ctx.strokeStyle = '#bdc3c7';
        ctx.lineWidth = 1;
        ctx.strokeRect(posX, posY, cellSize, cellSize);
      });
    });

    // Draw goal marker
    ctx.fillStyle = '#27ae60';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎯', goalPosition.x * cellSize + cellSize / 2, goalPosition.y * cellSize + cellSize / 2);

    // Draw robot
    const robotX = robotPosition.x * cellSize + cellSize / 2;
    const robotY = robotPosition.y * cellSize + cellSize / 2;

    ctx.save();
    ctx.translate(robotX, robotY);

    // Rotate based on direction
    switch (robotDirection) {
      case Direction.UP:
        ctx.rotate(-Math.PI / 2);
        break;
      case Direction.DOWN:
        ctx.rotate(Math.PI / 2);
        break;
      case Direction.LEFT:
        ctx.rotate(Math.PI);
        break;
      case Direction.RIGHT:
        // No rotation needed
        break;
    }

    // Draw robot as an arrow/triangle
    ctx.fillStyle = '#f39c12';
    ctx.beginPath();
    ctx.moveTo(cellSize / 3, 0);
    ctx.lineTo(-cellSize / 4, -cellSize / 4);
    ctx.lineTo(-cellSize / 4, cellSize / 4);
    ctx.closePath();
    ctx.fill();

    // Draw robot body
    ctx.fillStyle = '#e67e22';
    ctx.fillRect(-cellSize / 4, -cellSize / 6, cellSize / 4, cellSize / 3);

    ctx.restore();
  }, [grid, robotPosition, robotDirection, goalPosition, cellSize]);

  const width = grid[0]?.length * cellSize || 400;
  const height = grid.length * cellSize || 400;

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        border: '2px solid #34495e',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    />
  );
};

export default GameCanvas;
