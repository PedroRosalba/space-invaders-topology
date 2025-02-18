"use client";

import React, { CSSProperties, useEffect, useState, useRef } from 'react';
import SpaceShip from './spaceship';
import { Direction } from '../utils/playersData'; 

interface SpaceShipGridProps {
  rows: number;
  columns: number;
  direction: Direction;
}

const gridWidth = 15;
const gridHeight = 10;
const gap = 5;
const velocity = 4; 
const boundaryPadding = 10; 

const generateSpaceShips = (rows: number, cols: number) => {
  const spaceShips = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * (gridWidth + gap);
      const y = row * (gridHeight + gap);
      spaceShips.push(<SpaceShip id={x*y} x={x} y={y} alive = {true}/>);
    }
  }
  return spaceShips;
};

const SpaceShipGrid: React.FC<SpaceShipGridProps> = ({ rows, columns, direction }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState(0);
  const [movingRight, setMovingRight] = useState(true);

  useEffect(() => {
    const containerWidth = containerRef.current?.clientWidth || 0;
    const gridWidthWithGap = columns * (gridWidth + gap);

    const moveInterval = setInterval(() => {
      setPosition(prevPosition => {
        let newPosition = prevPosition + (movingRight ? velocity : -velocity);

        if (newPosition > containerWidth - gridWidthWithGap - boundaryPadding) {
          newPosition = containerWidth - gridWidthWithGap - boundaryPadding;
          setMovingRight(false);
        } else if (newPosition < boundaryPadding) {
          newPosition = boundaryPadding;
          setMovingRight(true);
        }

        return newPosition;
      });
    }, 16); 

    return () => clearInterval(moveInterval);
  }, [movingRight, columns]);

  const containerStyle: CSSProperties = {
    position: 'relative',
    width: '100%', 
    height: `${rows * (gridHeight + gap)}px`,
    overflow: 'hidden',
  };

  const gridStyle: CSSProperties = {
    position: 'absolute',
    left: `${position}px`,
    top: '0px',
    width: `${columns * (gridWidth + gap)}px`,
    height: '100%',
    backgroundColor: 'transparent', 
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      <div style={gridStyle}>
        {generateSpaceShips(rows, columns)}
      </div>
    </div>
  );
};

export default SpaceShipGrid;
