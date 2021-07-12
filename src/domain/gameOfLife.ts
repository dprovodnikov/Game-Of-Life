import { createDeadGrid, Cell, Grid } from './grid';

export type CellPopulator = (rowIndex: number, cellIndex: number) => Cell;

export interface GridDimensions {
  numberOfRows: number;
  numberOfCells: number;
}

export interface GameOfLife {
  tick(): void;
  populateEachCell(populator: CellPopulator): void;
  getGrid(): Grid;
}

export const createGameOfLife = (numberOfRows: number, numberOfCells: number): GameOfLife => {
  let grid: Grid = createDeadGrid(numberOfRows, numberOfCells);

  const tick = () => {
    console.log(grid);
  };

  const populateEachCell = (populateCell: CellPopulator) => {
    grid = grid.map((row, rowIndex) => {
      return row.map((cell, cellIndex) => {
        return populateCell(rowIndex, cellIndex);
      });
    });
  };

  const getGrid = () => grid;

  return {
    tick,
    populateEachCell,
    getGrid,
  };
};
