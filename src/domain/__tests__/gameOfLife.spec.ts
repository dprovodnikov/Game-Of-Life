import { createGameOfLife, GameOfLife } from '../gameOfLife';
import { Cell, Grid } from '../grid';

describe('GameOfLife', () => {
  it('initializes to a completely dead grid by default', () => {
    const game = createGameOfLife(3, 3);
    expect(game.getGrid()).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });

  it('allows to populate each cell', () => {
    const game = createGameOfLife(3, 3);

    game.populateEachCell((rowIndex, cellIndex) => {
      if (rowIndex === 2 && cellIndex === 0) {
        return Cell.Alive;
      }

      if (rowIndex === 0 && cellIndex === 2) {
        return Cell.Alive;
      }

      return Cell.Dead;
    });

    expect(game.getGrid()).toEqual([
      [0, 0, 1],
      [0, 0, 0],
      [1, 0, 0],
    ]);
  });
});
