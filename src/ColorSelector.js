import React from "react";
import styled from "styled-components";

const ColorSelectorContainer = styled.section`
  height: ${props => (props.height ? props.height : "40px")};
  background: #111111;
  z-index: 1;
  width: 100%;
  text-align: center;
  @media (max-width: 600px) {
    overflow: auto;
  }
`;

const ColorBlock = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  display: inline-block;
  height: 30px;
  width: 30px;
`;

export const COLORS = [
  "#ffffff",
  "#e4e4e4",
  "#888888",
  "#222222",
  "#ffa7d1",
  "#e50000",
  "#e59500",
  "#a06a42",
  "#e5d900",
  "#94e044",
  "#02be01",
  "#00d3dd",
  "#0083c7",
  "#0000ea",
  "#cf6ee4",
  "#820080"
];

export const ColorSelector = ({ setSelectedColor }) => (
  <ColorSelectorContainer>
    {COLORS.map(color => (
      <ColorBlock
        backgroundColor={color}
        key={color}
        style={{ backgroundColor: color }}
        onClick={() => setSelectedColor(color)}
      />
    ))}
  </ColorSelectorContainer>
);