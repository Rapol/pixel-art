import React from 'react';
import { Group } from 'react-konva';

import { Cell } from './Cell'

export const ColorGrid = ({colors, cellSize, cellSelected, updateCell, colorSelected}) =>
(
  <Group>
    {
      colors.map(
        (row, rowIndex) => row.map(
          (cellColor, colIndex) =>
            <Cell 
              cellSize={cellSize}
              rowIndex={rowIndex}
              colIndex={colIndex}
              initialColor={cellColor}
              colorSelected={colorSelected}
            />
        )
      )
    }
  </Group>
)

let memoizedResult = null;

export const defaultGridState = (cellSize, dimensions) => {
  const colors = {
    primary: 'lightgrey',
    alternate: 'white'
  }
  const result = memoizedResult ? memoizedResult : [];
  const colAmount = dimensions.width / (cellSize);
  const cellAmount = dimensions.height / (cellSize);
  for(let i = 0; i < colAmount; i++) {
    const col = [];
    for(let j = memoizedResult && memoizedResult[i] ? memoizedResult[i].length : 0 ; j < cellAmount; j++) {
      if(i%2) {
        if(j%2) col.push(colors.primary)
        else col.push(colors.alternate);
      }
      else {
        if(j%2) col.push(colors.alternate)
        else col.push(colors.primary);
      }
    }
    if(!!memoizedResult) {
      if(i >= result.length) {
        result.push(col);
      }
      else
        Array.prototype.push.apply(result[i], col);
    }
    else
      result.push(col);
  }
  memoizedResult = result;
  return result;
}
