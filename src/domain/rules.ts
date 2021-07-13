import { Cell } from './grid';

export enum Rules {
  MinLivingNeighborsToSurvive = 2,
  MaxLivingNeighborsToSurvive = 3,
  RequiredLivingNeighborsToReproduce = 3,
}

const canComeToLife = (livingNeighborsCount: number): boolean => {
  return livingNeighborsCount === Rules.RequiredLivingNeighborsToReproduce;
};

const canLiveOn = (livingNeighborsCount: number): boolean => {
  return livingNeighborsCount === Rules.MinLivingNeighborsToSurvive
    || livingNeighborsCount === Rules.MaxLivingNeighborsToSurvive;
};

export const getNextCellState = (currentState: Cell, livingNeighborsCount: number): Cell => {
  if (currentState === Cell.Living) {
    if (canLiveOn(livingNeighborsCount)) {
      return Cell.Living;
    }

    return Cell.Dead;
  }

  if (currentState === Cell.Dead) {
    if (canComeToLife(livingNeighborsCount)) {
      return Cell.Living;
    }

    return Cell.Dead;
  }

  return currentState;
};
