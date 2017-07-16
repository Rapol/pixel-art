import React, { Component } from "react";
import { Layer, Stage } from "react-konva";

import { ColorGrid } from "./Grid";
import { defaultGridState } from "./Grid";
import { ColorSelector, COLORS } from "./ColorSelector";
import { WindowResizeListener } from "./WindowResizeListener";

export class App extends Component {
  state = { selectedColor: COLORS[3] };

  render() {
    const colorSelectorHeight = 40;
    const cellSize = 10;
    const { selectedColor } = this.state;

    return (
      <div>
        <ColorSelector
          height={`${colorSelectorHeight}px`}
          setSelectedColor={color => this.setState({ selectedColor: color })}
        />
        <WindowResizeListener>
          {dimensions => (
            <Stage width={dimensions.width} height={dimensions.height}>
              <Layer>
                <ColorGrid
                  dimensions={dimensions}
                  cellSize={cellSize}
                  colors={defaultGridState(cellSize, dimensions)}
                  selectedColor={selectedColor}
                />
              </Layer>
            </Stage>
          )}
        </WindowResizeListener>
      </div>
    );
  }
}
