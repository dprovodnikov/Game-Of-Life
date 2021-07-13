import { useEffect, useState } from 'react';
import * as domain from '../domain';

export const useTicker = (game: domain.GameOfLife, tickIntervalMs: number) => {
  const [grid, setGrid] = useState(() => game.getGrid());

  const fillGridRandomly = () => {
    game.setEachCell(() => {
      return Math.random() < 0.33
        ? domain.Cell.Living
        : domain.Cell.Dead;
    });
  };

  useEffect(() => {
    fillGridRandomly();

    setInterval(() => {
      game.tick();
      setGrid(game.getGrid());
    }, tickIntervalMs);
  }, []);

  return grid;
};
