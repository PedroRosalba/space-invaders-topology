"use client";

import React, { Component, CSSProperties } from 'react';

interface SpaceShipProps {
  id: number;
  x: number;
  y: number;
  alive: boolean;
  onCollision: (id: number) => void;
}

class SpaceShip extends Component<SpaceShipProps> {
  checkCollision(bullet: { x: number; y: number }) {
    const { x, y } = this.props;
    const spaceshipWidth = 15;
    const spaceshipHeight = 10;
    const bulletWidth = 1;
    const bulletHeight = 5;

    if (
      bullet.x < x + spaceshipWidth &&
      bullet.x + bulletWidth > x &&
      bullet.y < y + spaceshipHeight &&
      bullet.y + bulletHeight > y
    ) {
        console.log('test');
        this.props.onCollision(this.props.id); 
    }
  }

  render() {
    const { x, y, alive } = this.props;
    if (!alive) {
      return null; 
    }

    const style: CSSProperties = {
      width: '15px',
      height: '10px',
      backgroundColor: 'green',
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
    };

    return <div style={style}></div>;
  }
}

export default SpaceShip;
