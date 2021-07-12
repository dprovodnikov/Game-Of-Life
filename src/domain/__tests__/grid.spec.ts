import { Cell, createDeadGrid, Grid } from '../grid';

describe('grid', () => {
  const numberOfRows = 5;
  const numberOfCells = 5;
  let grid: Grid;

  beforeEach(() => {
    grid = createDeadGrid(numberOfRows, numberOfCells);
  });

  it('creates a grid of given dimensions', () => {
    expect(grid).toHaveLength(numberOfRows);
    expect(grid.every(row => row.length === numberOfCells)).toBe(true);
  });

  it('has each cell dead by default', () => {
    const everyCellIsDead = grid.every(row => {
      return row.every(cell => cell === Cell.Dead);
    });

    expect(everyCellIsDead).toBe(true);
  });
});
