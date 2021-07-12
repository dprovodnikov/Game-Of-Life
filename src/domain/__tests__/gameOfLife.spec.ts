import { createGameOfLife } from '../gameOfLife';
import { Cell, Grid } from '../grid';

describe('GameOfLife', () => {
  it('initializes to a completely dead grid by default', () => {
    const game = createGameOfLife(3, 3);
    expect(game.getGrid()).toEqual([
      [Cell.Dead, Cell.Dead, Cell.Dead],
      [Cell.Dead, Cell.Dead, Cell.Dead],
      [Cell.Dead, Cell.Dead, Cell.Dead],
    ]);
  });

  it('allows to populate each cell', () => {
    const game = createGameOfLife(3, 3);
    const desiredGrid: Grid = [
      [Cell.Dead, Cell.Dead, Cell.Alive],
      [Cell.Dead, Cell.Dead, Cell.Dead],
      [Cell.Alive, Cell.Dead, Cell.Dead],
    ];

    game.populateEachCell((rowIndex, cellIndex) => {
      return desiredGrid[rowIndex][cellIndex];
    });

    expect(game.getGrid()).toEqual(desiredGrid);
  });
});
