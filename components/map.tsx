"use client";

import React, { CSSProperties } from 'react';

interface MapProps {
  children: React.ReactNode;
  lives: number;
}

const headerHeight = 15; 

const mapStyle: CSSProperties = {
  position: 'relative',   
  width: '100vw', 
  height: `calc(100vh - ${headerHeight}px)`, 
  backgroundColor: 'white', 
  overflow: 'hidden', 
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
  zIndex: 1,  
};

const Map: React.FC<MapProps> = ({ children, lives }) => {
  return (
    <div style={mapStyle}>
      {children}
      <div style={headerStyle}>
        {/* <span>Lives: {lives}</span> */}
      </div>
    </div>
  );
};

export default Map;
