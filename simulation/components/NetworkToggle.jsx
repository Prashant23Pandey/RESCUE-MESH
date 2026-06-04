import React, { useContext } from 'react';
import { SimulationContext } from '../context/SimulationContext';

export default function NetworkToggle() {
  const { isOnline, toggleNetwork } = useContext(SimulationContext);

  return (
    <button
      className="px-4 py-2 rounded-md text-white focus:outline-none transition-colors"
      style={{
        backgroundColor: isOnline ? '#34D399' : '#F87171',
      }}
      onClick={toggleNetwork}
    >
      {isOnline ? 'Global Internet Connected' : 'Internet Blackout (Offline Mesh Mode)'}
    </button>
  );
}
