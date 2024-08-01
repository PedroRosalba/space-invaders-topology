// components/CanvasComponent.js

import React from 'react';

const Connect = () => {
  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <p>Connected to <span id="gameboardId"></span></p>
        <p>peers: <span id="peers"></span></p>
        <p>discovery_peers: <span id="discovery_peers"></span></p>
        <p>object_peers: <span id="object_peers"></span></p>
        <input
          id="canvasIdInput"
          type="text"
          placeholder="Insert canvas ID"
        />
        <button id="connect">Connect</button>
        <button id="create">Create Game</button>
      </div>
      <div id="gameboard"></div>
    </div>
  );
}

export default Connect;
