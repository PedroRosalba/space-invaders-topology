import React from 'react';
import Invader from '../components/invader';
import Map from '../components/map'; 
import SpaceShip from '@/components/spaceship';
import SpaceShipGrid from '../components/spaceshipgrid';

const GameContainer = () => {
  const lives = 3;
  const blockWeight = 10;
  const blockHeight = 6;

  return (
    <Map lives={lives}>
      <Invader id="player1" initialX={50} />

      {/* <script lang = "ts">
        for (i = 0; i < blockWeight; i++) {
          for (j=0; j < blockHeight; j++) {
            const x = col * (gridWidth + gap);
            const y = row * (gridHeight + gap);
            spaceShips.push(<SpaceShip key={`${row}-${col}`} x={x} y={y} />);
          }
        }
      </script> */}

      <SpaceShipGrid rows = {blockHeight} columns={blockWeight} direction={"STOPPED"}/>
      {/* Add more components like Bullets here */}
    </Map>
  );
};

export default GameContainer;
