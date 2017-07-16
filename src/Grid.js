import React, { Component } from "react";
import { Group, Text } from "react-konva";

import { Cell } from "./Cell";
export class ColorGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: false,
      colors: props.colors
    }
  }

  componentDidMount() {
    this.fetchGridState().then((colors) => {
      this.setState({
        colors: this.updateCanvasState(this.state.colors, colors),
        isLoading: false
      });
    })
      .catch((err) => {
        console.log(err)
        this.setState({ error: true })
      })
  }

  render() {
    return (<Group>
      {this.state.colors.map((row, rowIndex) =>
        row.map((cellColor, colIndex) => (
          <Cell
            cellSize={this.props.cellSize}
            rowIndex={rowIndex}
            colIndex={colIndex}
            initialColor={cellColor}
            selectedColor={this.props.selectedColor}
          />
        ))
      )}
      {this.state.isLoading &&
        <Text
          x="50"
          y="50"
          text="Loading..."
          fontSize="30"
          fill="green"
        />
      }
    </Group>)
  }

  updateCanvasState(oldColors, newColors) {
    const colorCopy = oldColors.slice();
    newColors.forEach((item) => {
      colorCopy[item.x][item.y] = item.color;
    });
    return colorCopy;
  }

  fetchGridState() {
    return (async () => {
      try {
        let response = await fetch('https://6d5p2o5pm2.execute-api.us-east-1.amazonaws.com/dev/canvas');
        let responseJson = await response.json();
        return responseJson;
      } catch (error) {
        console.error(error);
      }
    })();
  }
}

let memoizedResult = null;
const defaultColors = {
  primary: "lightgrey",
  alternate: "white"
};

export const defaultGridState = (cellSize, dimensions) => {
  const result = memoizedResult ? memoizedResult : [];
  const colAmount = dimensions.width / cellSize;
  const cellAmount = dimensions.height / cellSize;
  for (let i = 0; i < colAmount; i++) {
    const col = [];
    for (
      let j = memoizedResult && memoizedResult[i]
        ? memoizedResult[i].length
        : 0;
      j < cellAmount;
      j++
    ) {
      if (i % 2) {
        if (j % 2) col.push(defaultColors.primary);
        else col.push(defaultColors.alternate);
      } else {
        if (j % 2) col.push(defaultColors.alternate);
        else col.push(defaultColors.primary);
      }
    }
    if (!!memoizedResult) {
      if (i >= result.length) result.push(col);
      else Array.prototype.push.apply(result[i], col);
    } else result.push(col);
  }
  memoizedResult = result;
  return result;
};