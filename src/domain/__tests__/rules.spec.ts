import { Cell } from '../grid';
import { getNextCellState, Rules } from '../rules';

describe('game of life rules', () => {
  describe('living cell', () => {
    it('lives on if it has minimum required neighbors to survive', () => {
      const nextCellState = getNextCellState(Cell.Alive, Rules.MinimumNeighborsToSurvive);

      expect(nextCellState).toBe(Cell.Alive);
    });

    it('lives on if it has maximum allowed neighbors to survive', () => {
      const nextCellState = getNextCellState(Cell.Alive, Rules.MaximumNeighborsToSurvive);

      expect(nextCellState).toBe(Cell.Alive);
    });

    it('dies if it does not have enough neighbors to survive', () => {
      const nextCellState = getNextCellState(Cell.Alive, Rules.MinimumNeighborsToSurvive - 1);

      expect(nextCellState).toBe(Cell.Dead);
    });

    it('dies if it has too many neighbors to survive', () => {
      const nextCellState = getNextCellState(Cell.Alive, Rules.MaximumNeighborsToSurvive + 1);

      expect(nextCellState).toBe(Cell.Dead);
    });
  });

  describe('dead cell', () => {
    it('stays dead if it does not have enough neighbors to come to life', () => {
      const nextCellState = getNextCellState(Cell.Dead, Rules.EnoughNeighborsToReproduce - 1);

      expect(nextCellState).toBe(Cell.Dead);
    });

    it('stays dead if it has too many neighbors to come to life', () => {
      const nextCellState = getNextCellState(Cell.Dead, Rules.EnoughNeighborsToReproduce + 1);

      expect(nextCellState).toBe(Cell.Dead);
    });

    it('comes to life if has an exact number of neightbors required to come to live', () => {
      const nextCellState = getNextCellState(Cell.Dead, Rules.EnoughNeighborsToReproduce);

      expect(nextCellState).toBe(Cell.Alive);
    });
  });
});
