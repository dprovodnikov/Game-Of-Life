import React from 'react';
import ReactDOM from 'react-dom';
import { GameOfLife } from './GameOfLife';
import * as domain from '../domain/gameOfLife';

const gameOfLife = domain.createGameOfLife(50, 50);

ReactDOM.render(
  <GameOfLife game={gameOfLife} />,
  document.getElementById('root'),
);
