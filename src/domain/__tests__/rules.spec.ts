import { Cell } from '../grid';
import { getNextCellState, Rules } from '../rules';

describe('game of life rules', () => {
  describe('living cell', () => {
    it('lives on if it has minimum required neighbors to survive', () => {
      const nextCellState = getNextCellState(Cell.Living, Rules.MinLivingNeighborsToSurvive);

      expect(nextCellState).toBe(Cell.Living);
    });

    it('lives on if it has maximum allowed neighbors to survive', () => {
      const nextCellState = getNextCellState(Cell.Living, Rules.MaxLivingNeighborsToSurvive);

      expect(nextCellState).toBe(Cell.Living);
    });

    it('dies if it does not have enough neighbors to survive', () => {
      const nextCellState = getNextCellState(Cell.Living, Rules.MinLivingNeighborsToSurvive - 1);

      expect(nextCellState).toBe(Cell.Dead);
    });

    it('dies if it has too many neighbors to survive', () => {
      const nextCellState = getNextCellState(Cell.Living, Rules.MaxLivingNeighborsToSurvive + 1);

      expect(nextCellState).toBe(Cell.Dead);
    });
  });

  describe('dead cell', () => {
    it('stays dead if it does not have enough neighbors to come to life', () => {
      expect(
        getNextCellState(Cell.Dead, Rules.RequiredLivingNeighborsToReproduce - 1),
      ).toBe(Cell.Dead);
    });

    it('stays dead if it has too many neighbors to come to life', () => {
      expect(
        getNextCellState(Cell.Dead, Rules.RequiredLivingNeighborsToReproduce + 1),
      ).toBe(Cell.Dead);
    });

    it('comes to life if has an exact number of neightbors required to come to live', () => {
      const nextCellState = getNextCellState(Cell.Dead, Rules.RequiredLivingNeighborsToReproduce);

      expect(nextCellState).toBe(Cell.Living);
    });
  });
});
