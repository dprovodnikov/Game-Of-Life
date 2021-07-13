import styled from 'styled-components';
import * as domain from '../domain/grid';

const cellSide = 15;
const cellGap = 3;

export const Grid = styled.div<{ rows: number; cells: number }>`
  display: grid;
  grid-template: repeat(${p => p.rows}, ${cellSide}px) / repeat(${p => p.cells}, ${cellSide}px);
  gap: ${cellGap}px;
  background-color: #aaa;
  width: ${({ cells }) => cells * cellSide + cells * cellGap + cellGap}px;
  height: ${({ rows }) => rows * cellSide + rows * cellGap + cellGap}px;
  padding: ${cellGap}px;
  box-sizing: border-box;
  margin: auto;
`;

export const Cell = styled.div<{ status: domain.Cell }>`
  height: ${cellSide}px;
  width: ${cellSide}px;
  background-color: ${props => props.status === domain.Cell.Living ? 'black' : 'white'}
`;
