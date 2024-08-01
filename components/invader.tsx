"use client";

import React, { CSSProperties, Component } from 'react';
import { PlayerData, Direction, PlayerID } from '../utils/playersData'; 
import Bullet from './bullet';

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

const shotCooldown = 500; 

class Invader extends Component<InvaderProps, InvaderState> {
  private playerData: PlayerData;
  private moveInterval: number | undefined;
  private bulletIdCounter: number;
  private mapWidth: number;

  constructor(props: InvaderProps) {
    super(props);

    this.playerData = new PlayerData(undefined, props.id, props.initialX, "STOPPED");
    this.bulletIdCounter = 0;
    this.mapWidth = window.innerWidth;

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
    }, 50); 
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
      this.playerData.updatePosition(Math.min(this.mapWidth - 15, this.playerData.position.x + 5));
    }
    this.updateStateFromPlayerData();
  };

  shootBullet = () => {
    const currentTime = Date.now();
    if (currentTime - this.state.lastShotTime >= shotCooldown) {
      const { position } = this.state;
      const newBullet: BulletData = {
        id: this.bulletIdCounter++,
        position: { x: position.x + 7, y: 632 }, 
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
      })).filter(bullet => bullet.position.y > 0), 
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
      bottom: '0px', 
      zIndex: 2,
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
