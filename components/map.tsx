"use client";

import React, { CSSProperties } from 'react';

interface MapProps {
  children: React.ReactNode;
  lives: number;
}

const headerHeight = 15; 

const mapStyle: CSSProperties = {
  position: 'relative',   
  width: '100vw', // Full viewport width
  height: `calc(100vh - ${headerHeight}px)`, // Full viewport height minus header
  backgroundColor: 'white', // Background color for the map area
  overflow: 'hidden', // Ensure children don't spill outside the map
};

const headerStyle: CSSProperties = {
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: `${headerHeight}px`,
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderTop: '1px solid #ddd',
  zIndex: 1, // Ensure header appears above the map content
};

const Map: React.FC<MapProps> = ({ children, lives }) => {
  return (
    <div style={mapStyle}>
      {children} {/* Render children components, like Invaders or Bullets */}
      <div style={headerStyle}>
        {/* <span>Lives: {lives}</span> */}
      </div>
    </div>
  );
};

export default Map;
