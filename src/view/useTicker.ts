import { useEffect, useState } from 'react';
import * as Domain from '../domain';

export const useTicker = (game: Domain.GameOfLife, tickIntervalMs: number) => {
  const [grid, setGrid] = useState(() => game.getGrid());

  const fillGridRandomly = () => {
    game.setEachCell(() => {
      return Math.random() < 0.33
        ? Domain.Cell.Living
        : Domain.Cell.Dead;
    });
  };

  useEffect(() => {
    fillGridRandomly();

    const interval = setInterval(() => {
      game.tick();
      setGrid(game.getGrid());
    }, tickIntervalMs);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return grid;
};
