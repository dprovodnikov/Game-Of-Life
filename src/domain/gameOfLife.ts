import { createDeadGrid, Cell, Grid } from './grid';
import { getNextCellState } from './rules';

export interface GameOfLife {
  tick(): void;
  setEachCell(evaluate: CellEvaluator): void;
  getGrid(): Grid;
  getCell(rowIndex: number, cellIndex: number): Cell;
  getDimensions(): GridDimensions;
}

export type CellEvaluator = (rowIndex: number, cellIndex: number) => Cell;

export interface GridDimensions {
  numberOfRows: number;
  numberOfCells: number;
}

interface CellWithPosition {
  rowIndex: number;
  cellIndex: number;
  value: Cell;
}

export const createGameOfLife = (numberOfRows: number, numberOfCells: number): GameOfLife => {
  let grid: Grid = createDeadGrid(numberOfRows, numberOfCells);

  const mapEachCell = (fn: (cell: CellWithPosition) => Cell): Grid => {
    return grid.map((row, rowIndex) => {
      return row.map((cell, cellIndex) => {
        return fn({ value: cell, rowIndex, cellIndex });
      });
    });
  };

  const countLivingNeighbors = (rowIndex: number, cellIndex: number): number => {
    const topNeighbor = grid[rowIndex - 1]?.[cellIndex];
    const topLeftNeighbor = grid[rowIndex - 1]?.[cellIndex - 1];
    const topRightNeighbor = grid[rowIndex - 1]?.[cellIndex + 1];
    const leftNeighbor = grid[rowIndex][cellIndex - 1];
    const rightNeighbor = grid[rowIndex][cellIndex + 1];
    const bottomNeighbor = grid[rowIndex + 1]?.[cellIndex];
    const bottomLeftNeighbor = grid[rowIndex + 1]?.[cellIndex - 1];
    const bottomRightNeighbor = grid[rowIndex + 1]?.[cellIndex + 1];

    const neighbors: Cell[] = [
      topNeighbor,
      topLeftNeighbor,
      topRightNeighbor,
      leftNeighbor,
      rightNeighbor,
      bottomNeighbor,
      bottomLeftNeighbor,
      bottomRightNeighbor,
    ];

    return neighbors
      .filter(n => n === Cell.Living)
      .reduce((a, b) => a + b, 0);
  };

  return {
    tick() {
      grid = mapEachCell(({ value: currentState, rowIndex, cellIndex }) => {
        return getNextCellState(currentState, countLivingNeighbors(rowIndex, cellIndex));
      });
    },

    setEachCell(evaluateCell: CellEvaluator) {
      grid = mapEachCell(({ rowIndex, cellIndex }) => {
        return evaluateCell(rowIndex, cellIndex);
      });
    },

    getGrid() {
      return grid;
    },

    getCell(rowIndex: number, cellIndex: number) {
      return grid[rowIndex][cellIndex];
    },

    getDimensions() {
      return { numberOfRows, numberOfCells };
    },
  };
};
