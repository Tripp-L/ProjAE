import React from 'react';
import Globe from 'react-globe.gl';

function Regions({ civilizations = [] }) { // Provide a default empty array for civilizations

  const markers = civilizations.map((civilization) => ({
    id: civilization.id,
    city: civilization.name,
    color: 'red', 
    coordinates: [civilization.latitude, civilization.longitude],  
    value: 1, 
  }));

  return (
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      markers={markers} 
      markerTooltip={(d) => `${d.city}`}
      onMarkerClick={(marker) => { 
        // Handle marker clicks here (e.g., show a modal with more details)
      }}
    />
  );
}

export default Regions;