import { Cell } from './grid';

export enum Rules {
  MinimumNeighborsToSurvive = 2,
  MaximumNeighborsToSurvive = 3,
  EnoughNeighborsToReproduce = 3,
}

const canComeToLife = (livingNeighborsCount: number): boolean => {
  return livingNeighborsCount === Rules.EnoughNeighborsToReproduce;
};

const canLiveOn = (livingNeighborsCount: number): boolean => {
  return livingNeighborsCount === Rules.MinimumNeighborsToSurvive
    || livingNeighborsCount === Rules.MaximumNeighborsToSurvive;
};

export const getNextCellState = (currentState: Cell, livingNeighborsCount: number): Cell => {
  if (currentState === Cell.Alive) {
    if (canLiveOn(livingNeighborsCount)) {
      return Cell.Alive;
    }

    return Cell.Dead;
  }

  if (currentState === Cell.Dead) {
    if (canComeToLife(livingNeighborsCount)) {
      return Cell.Alive;
    }

    return Cell.Dead;
  }

  return currentState;
};
