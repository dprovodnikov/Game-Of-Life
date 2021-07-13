export enum Cell {
  Dead = 0,
  Living = 1,
}

export type Row = Cell[];

export type Grid = Row[];

type ArrayItemFiller<T> = (index: number) => T;

const createFilledArray = <T>(length: number, fillItem: ArrayItemFiller<T>): T[] => {
  return Array(length)
    .fill(undefined)
    .map((_, index) => fillItem(index));
};

const createRowOfDeadCells = (rowLength: number): Row => {
  return createFilledArray(rowLength, () => Cell.Dead);
};

export const createDeadGrid = (numberOfRows: number, numberOfCells: number): Grid => {
  return createFilledArray(numberOfRows, () => createRowOfDeadCells(numberOfCells));
};
