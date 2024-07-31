"use client";

import React, { CSSProperties, Component } from 'react';
import { PlayerData, Direction, PlayerID } from '../utils/playersData'; // Adjust the import path as necessary
import Bullet from './bullet'; // Adjust the import path as necessary

interface InvaderProps {
  id: PlayerID;
  initialX: number;
}

interface BulletData {
  id: number;
  position: { x: number, y: number };
}

interface InvaderState {
  position: { x: number, y: number };
  direction: Direction;
  lives: number;
  bullets: BulletData[];
  lastShotTime: number;
}

const shotCooldown = 500; // Cooldown period in milliseconds

class Invader extends Component<InvaderProps, InvaderState> {
  private playerData: PlayerData;
  private moveInterval: number | undefined;
  private bulletIdCounter: number;
  private mapWidth: number;

  constructor(props: InvaderProps) {
    super(props);

    this.playerData = new PlayerData(undefined, props.id, props.initialX, "STOPPED");
    this.bulletIdCounter = 0;
    this.mapWidth = window.innerWidth; // or get this value from props or context

    this.state = {
      position: this.playerData.position,
      direction: this.playerData.direction,
      lives: this.playerData.lives,
      bullets: [],
      lastShotTime: 0,
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    this.moveInterval = window.setInterval(() => {
      this.updatePosition();
      this.updateBullets();
    }, 50); // Update position and bullets every 50ms
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    if (this.moveInterval) {
      window.clearInterval(this.moveInterval);
    }
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      this.playerData.updateDirection('LEFT');
    } else if (event.key === 'ArrowRight') {
      this.playerData.updateDirection('RIGHT');
    } else if (event.key === ' ') {
      this.shootBullet();
    }
    this.updateStateFromPlayerData();
  };

  handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      this.playerData.updateDirection('STOPPED');
    }
    this.updateStateFromPlayerData();
  };

  updatePosition = () => {
    if (this.playerData.direction === 'LEFT') {
      this.playerData.updatePosition(Math.max(0, this.playerData.position.x - 5));
    } else if (this.playerData.direction === 'RIGHT') {
      this.playerData.updatePosition(Math.min(this.mapWidth - 15, this.playerData.position.x + 5)); // Assuming invader width is 15px
    }
    this.updateStateFromPlayerData();
  };

  shootBullet = () => {
    const currentTime = Date.now();
    if (currentTime - this.state.lastShotTime >= shotCooldown) {
      const { position } = this.state;
      const newBullet: BulletData = {
        id: this.bulletIdCounter++,
        position: { x: position.x + 7, y: 632 }, // Adjust x to center the bullet, y is at the top of the invader
      };
      this.setState((prevState) => ({
        bullets: [...prevState.bullets, newBullet],
        lastShotTime: currentTime,
      }));
    }
  };

  updateBullets = () => {
    this.setState((prevState) => ({
      bullets: prevState.bullets.map((bullet) => ({
        ...bullet,
        position: { ...bullet.position, y: bullet.position.y - 5 },
      })).filter(bullet => bullet.position.y > 0), // Remove bullets that have left the screen
    }));
  };

  updateStateFromPlayerData = () => {
    this.setState({
      position: this.playerData.position,
      direction: this.playerData.direction,
      lives: this.playerData.lives,
    });
  };

  render() {
    const { position, bullets } = this.state;

    const invaderStyle: CSSProperties = {
      width: '15px',
      height: '10px',
      backgroundColor: 'grey',
      position: 'absolute',
      left: `${position.x}px`,
      bottom: '0px', // Position the invader at the bottom
      zIndex: 2, // Ensure the invader is above the header
    };

    return (
      <div>
        <div style={invaderStyle}></div>
        {bullets.map((bullet) => (
          <Bullet key={bullet.id} x={bullet.position.x} y={bullet.position.y} />
        ))}
      </div>
    );
  }
}

export default Invader;
