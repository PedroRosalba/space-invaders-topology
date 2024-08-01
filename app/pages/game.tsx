import React from 'react';
import Invader from '@/components/invader';
import Map from '@/components/map'; 
import SpaceShip from '@/components/spaceship';
import SpaceShipGrid from '@/components/spaceshipgrid';
import Connect from "@/components/connect";

const GameContainer = () => {
  const lives = 3;
  const blockWeight = 10;
  const blockHeight = 6;

  return (
    <Map lives={lives}>
      <Invader id="player1" initialX={50} />
      <SpaceShipGrid rows = {blockHeight} columns={blockWeight} direction={"STOPPED"}/>
    </Map>
  );
};

export default GameContainer;
