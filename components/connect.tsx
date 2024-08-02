"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const Connect = () => {
  const router = useRouter();

  const handleConnectClick = () => {
    // Add your script logic here
    router.push('/connect');
  };

  const handleCreateClick = () => {
    // Add your script logic here
    router.push('/game');
  };

  return (
    <>
      <div>
        <div style={{ marginBottom: '10px' }}>
          <p>Connected to <span id="gameboardId"></span></p>
          <p>peers: <span id="peers"></span></p>
          <p>discovery_peers: <span id="discovery_peers"></span></p>
          <p>object_peers: <span id="object_peers"></span></p>
          <input
            id="gameIdInput"
            type="text"
            placeholder="Insert Game ID"
          />
          <button id="connect" onClick={handleConnectClick}>Connect</button>
          <button id="create" onClick={handleCreateClick}>Create Game</button>
        </div>
        <div id="gameboard"></div>
      </div>
    </>
  );
};

export default Connect;
