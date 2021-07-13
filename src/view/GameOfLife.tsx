import React, { FC } from 'react';
import * as domain from '../domain/gameOfLife';

interface Props {
  game: domain.GameOfLife,
}

export const GameOfLife: FC<Props> = () => {
  return (
    <div>
      Hello, world!
    </div>
  );
};
