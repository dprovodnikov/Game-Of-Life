import React, { useState, FC } from 'react';
import * as domain from '../domain/gameOfLife';
import { Grid, Cell } from './GameOfLife.styled';

interface Props {
  game: domain.GameOfLife,
}

export const GameOfLife: FC<Props> = ({ game }) => {
  const [grid] = useState(() => game.getGrid());
  const dimensions = game.getDimensions();

  return (
    <Grid rows={dimensions.numberOfRows} cells={dimensions.numberOfCells}>
      {grid.map((row, rowIndex) => {
        return row.map((cell, cellIndex) => {
          return (
            <Cell
              /* eslint-disable-next-line */
              key={`${rowIndex}_${cellIndex}`}
              status={cell}
            />
          );
        });
      })}
    </Grid>
  );
};
