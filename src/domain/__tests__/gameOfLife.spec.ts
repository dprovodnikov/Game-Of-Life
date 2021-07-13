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
      [Cell.Dead, Cell.Dead, Cell.Living],
      [Cell.Dead, Cell.Dead, Cell.Dead],
      [Cell.Living, Cell.Dead, Cell.Dead],
    ];

    game.setEachCell((rowIndex, cellIndex) => {
      return desiredGrid[rowIndex][cellIndex];
    });

    expect(game.getGrid()).toEqual(desiredGrid);
  });

  describe('tick', () => {
    it('keeps the grid intact if all cells are dead', () => {
      const game = createGameOfLife(3, 3);
      const gridBeforeTick = game.getGrid();

      game.tick();

      const gridAfterTick = game.getGrid();
      expect(gridBeforeTick).toEqual(gridAfterTick);
    });

    it('kills a cell if it has no living neighbors', () => {
      const game = createGameOfLife(2, 2);
      const initialGrid: Grid = [
        [Cell.Dead, Cell.Dead],
        [Cell.Living, Cell.Dead],
      ];

      game.setEachCell((rowIndex, cellIndex) => {
        return initialGrid[rowIndex][cellIndex];
      });
      game.tick();

      expect(game.getGrid()).toEqual([
        [Cell.Dead, Cell.Dead],
        [Cell.Dead, Cell.Dead],
      ]);
    });

    it('keeps a cell alive if it has minimum required neighbors to live', () => {
      const game = createGameOfLife(3, 3);
      const initialGrid: Grid = [
        [Cell.Living, Cell.Dead, Cell.Dead],
        [Cell.Dead, Cell.Living, Cell.Dead],
        [Cell.Living, Cell.Dead, Cell.Dead],
      ];

      game.setEachCell((rowIndex, cellIndex) => {
        return initialGrid[rowIndex][cellIndex];
      });
      game.tick();

      expect(game.getCell(1, 1)).toBe(Cell.Living);
    });

    it('keeps a cell alive if it has maximum allowed neighbors to live', () => {
      const game = createGameOfLife(3, 3);
      const initialGrid: Grid = [
        [Cell.Living, Cell.Dead, Cell.Dead],
        [Cell.Living, Cell.Living, Cell.Dead],
        [Cell.Living, Cell.Dead, Cell.Dead],
      ];

      game.setEachCell((rowIndex, cellIndex) => {
        return initialGrid[rowIndex][cellIndex];
      });
      game.tick();

      expect(game.getCell(1, 1)).toBe(Cell.Living);
    });

    it('kills a cell if it has too many living neighbors', () => {
      const game = createGameOfLife(3, 3);
      const initialGrid: Grid = [
        [Cell.Living, Cell.Living, Cell.Dead],
        [Cell.Living, Cell.Living, Cell.Dead],
        [Cell.Living, Cell.Dead, Cell.Dead],
      ];

      game.setEachCell((rowIndex, cellIndex) => {
        return initialGrid[rowIndex][cellIndex];
      });
      game.tick();

      expect(game.getCell(1, 1)).toBe(Cell.Dead);
    });

    it('brings a cell to life if it has a required number of living neighbors', () => {
      const game = createGameOfLife(3, 3);
      const initialGrid: Grid = [
        [Cell.Living, Cell.Dead, Cell.Dead],
        [Cell.Dead, Cell.Living, Cell.Dead],
        [Cell.Living, Cell.Dead, Cell.Dead],
      ];

      game.setEachCell((rowIndex, cellIndex) => {
        return initialGrid[rowIndex][cellIndex];
      });
      game.tick();

      expect(game.getCell(1, 0)).toBe(Cell.Living);
    });
  });

  describe('patterns', () => {
    describe('still lifes', () => {
      describe('block', () => {
        it('stays the same after tick', () => {
          const game = createGameOfLife(4, 4);
          const initialGrid: Grid = [
            [Cell.Dead, Cell.Dead, Cell.Dead, Cell.Dead],
            [Cell.Dead, Cell.Living, Cell.Living, Cell.Dead],
            [Cell.Dead, Cell.Living, Cell.Living, Cell.Dead],
            [Cell.Dead, Cell.Dead, Cell.Dead, Cell.Dead],
          ];

          game.setEachCell((rowIndex, cellIndex) => {
            return initialGrid[rowIndex][cellIndex];
          });

          game.tick();

          expect(game.getGrid()).toEqual(initialGrid);
        });
      });

      describe('beehive', () => {
        it('stays the same after tick', () => {
          const game = createGameOfLife(5, 6);
          const initialGrid: Grid = [
            [Cell.Dead, Cell.Dead, Cell.Dead, Cell.Dead, Cell.Dead, Cell.Dead],
            [Cell.Dead, Cell.Dead, Cell.Living, Cell.Living, Cell.Dead, Cell.Dead],
            [Cell.Dead, Cell.Living, Cell.Dead, Cell.Dead, Cell.Living, Cell.Dead],
            [Cell.Dead, Cell.Dead, Cell.Living, Cell.Living, Cell.Dead, Cell.Dead],
            [Cell.Dead, Cell.Dead, Cell.Dead, Cell.Dead, Cell.Dead, Cell.Dead],
          ];

          game.setEachCell((rowIndex, cellIndex) => {
            return initialGrid[rowIndex][cellIndex];
          });

          game.tick();

          expect(game.getGrid()).toEqual(initialGrid);
        });
      });
    });

    describe('oscillators', () => {
      describe('blinker', () => {
        const game = createGameOfLife(5, 5);
        const position1: Grid = [
          [Cell.Dead, Cell.Dead, Cell.Dead, Cell.Dead, Cell.Dead],
          [Cell.Dead, Cell.Dead, Cell.Living, Cell.Dead, Cell.Dead],
          [Cell.Dead, Cell.Dead, Cell.Living, Cell.Dead, Cell.Dead],
          [Cell.Dead, Cell.Dead, Cell.Living, Cell.Dead, Cell.Dead],
          [Cell.Dead, Cell.Dead, Cell.Dead, Cell.Dead, Cell.Dead],
        ];
        const position2: Grid = [
          [Cell.Dead, Cell.Dead, Cell.Dead, Cell.Dead, Cell.Dead],
          [Cell.Dead, Cell.Dead, Cell.Dead, Cell.Dead, Cell.Dead],
          [Cell.Dead, Cell.Living, Cell.Living, Cell.Living, Cell.Dead],
          [Cell.Dead, Cell.Dead, Cell.Dead, Cell.Dead, Cell.Dead],
          [Cell.Dead, Cell.Dead, Cell.Dead, Cell.Dead, Cell.Dead],
        ];

        it('changes after one tick', () => {
          game.setEachCell((rowIndex, cellIndex) => {
            return position1[rowIndex][cellIndex];
          });

          game.tick();

          expect(game.getGrid()).toEqual(position2);
        });

        it('changes back after the second tick', () => {
          game.setEachCell((rowIndex, cellIndex) => {
            return position2[rowIndex][cellIndex];
          });

          game.tick();

          expect(game.getGrid()).toEqual(position1);
        });
      });
    });
  });
});
