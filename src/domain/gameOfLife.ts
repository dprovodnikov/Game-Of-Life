import { createDeadGrid, Cell, Grid } from './grid';
import { getNextCellState } from './rules';

export interface GameOfLife {
  tick(): void;
  populateEachCell(populator: CellPopulator): void;
  getGrid(): Grid;
  getCell(rowIndex: number, cellIndex: number): Cell;
}

export type CellPopulator = (rowIndex: number, cellIndex: number) => Cell;

interface CellWithPosition {
  rowIndex: number;
  cellIndex: number;
  value: Cell;
}

export const createGameOfLife = (numberOfRows: number, numberOfCells: number): GameOfLife => {
  const grid: Grid = createDeadGrid(numberOfRows, numberOfCells);

  const forEachCell = (fn: (cell: CellWithPosition) => void) => {
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        fn({ rowIndex, cellIndex, value: cell });
      });
    });
  };

  const getLivingNeighborsCount = (rowIndex: number, cellIndex: number): number => {
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
      .filter(n => !!n)
      .reduce((a, b) => a + b, 0);
  };

  const updateCellsOnGrid = (cells: CellWithPosition[]) => {
    cells.forEach(cell => {
      grid[cell.rowIndex][cell.cellIndex] = cell.value;
    });
  };

  return {
    tick() {
      const updatedCells: CellWithPosition[] = [];

      forEachCell(cell => {
        const livingNeighborsCount = getLivingNeighborsCount(cell.rowIndex, cell.cellIndex);

        updatedCells.push(({
          ...cell,
          value: getNextCellState(cell.value, livingNeighborsCount),
        }));
      });

      updateCellsOnGrid(updatedCells);
    },

    populateEachCell(populateCell: CellPopulator) {
      forEachCell(({ rowIndex, cellIndex }) => {
        grid[rowIndex][cellIndex] = populateCell(rowIndex, cellIndex);
      });
    },

    getGrid() {
      const deepCopy = JSON.parse(JSON.stringify(grid));

      return deepCopy;
    },

    getCell(rowIndex: number, cellIndex: number) {
      return grid[rowIndex][cellIndex];
    },
  };
};
