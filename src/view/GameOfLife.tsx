import React, { FC } from 'react';
import * as Domain from '../domain';
import * as Styled from './GameOfLife.styled';
import { useTicker } from './useTicker';

interface Props {
  game: Domain.GameOfLife,
}

export const GameOfLife: FC<Props> = ({ game }) => {
  const grid = useTicker(game, 500);
  const dimensions = game.getDimensions();

  return (
    <Styled.Grid rows={dimensions.numberOfRows} cells={dimensions.numberOfCells}>
      {grid.map((row, rowIndex) => {
        return row.map((cell, cellIndex) => {
          return (
            <Styled.Cell
              /* eslint-disable-next-line */
              key={`${rowIndex}_${cellIndex}`}
              status={cell}
            />
          );
        });
      })}
    </Styled.Grid>
  );
};
