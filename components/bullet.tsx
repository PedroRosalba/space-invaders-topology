import React, { CSSProperties } from 'react';

interface BulletProps {
  x: number;
  y: number;
  // width: number;
  // height: number;
}

const Bullet: React.FC<BulletProps> = ({ x, y, }) => {
  const style: CSSProperties = {
    width: `1px`,
    height: ` 5px`,
    backgroundColor: 'red',
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`,
  };

  return <div style={style}></div>;
};

export default Bullet;
