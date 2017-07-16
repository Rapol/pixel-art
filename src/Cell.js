import React, { Component } from "react";
import { Rect } from "react-konva";

export class Cell extends Component {
  shouldComponentUpdate() {
    // cell recoloring is handled by using konva low level api for performance reasons. always return false
    return false;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.initialColor !== nextProps.initialColor) {
      this.syncCell(nextProps.initialColor)
    }
  }

  syncCell(color) {
    const { cell } = this.refs;
    cell.fill(color);
    cell.draw();
  }

  updateCell() {
    const { cell } = this.refs;
    const { selectedColor } = this.props;
    cell.fill(selectedColor);
    this.updateCanvas();
    cell.draw();
  }

  render() {
    const { cellSize, rowIndex, colIndex, initialColor } = this.props;
    return (
      <Rect
        x={rowIndex * cellSize}
        y={colIndex * cellSize}
        height={cellSize}
        width={cellSize}
        fill={initialColor}
        ref="cell"
        onClick={() => this.updateCell()}
        onTap={() => this.updateCell()}        
      />
    );
  }

  updateCanvas() {
    const data = {
      x: this.props.rowIndex,
      y: this.props.colIndex,
      color: this.props.selectedColor,
      user: "pixel@rt.com"
    }
    return (async () => {
      try {
        let response = await fetch('https://6d5p2o5pm2.execute-api.us-east-1.amazonaws.com/dev/canvas', {
          method: 'put',
          body: JSON.stringify(data),
        });
        return await response;
      } catch (error) {
        console.error(error);
      }
    })();
  }
}