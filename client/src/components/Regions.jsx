import React, { useState, useEffect } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';
import './Regions.css'; // Make sure to create and import a CSS file for styling

const initialCivilizations = [
  {
    id: 1,
    name: "Ancient China",
    latitude: 35.8617,
    longitude: 104.1954,
    description: "Ancient China was a civilization that started in ancient times along the Yellow River, Yangtze River, and other river basins in the fertile regions of East Asia.",
    imageUrl: "https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638892506/EducationHub/photos/the-great-wall-of-china.jpg"
  },
  {
    id: 2,
    name: "Atlantis",
    latitude: 21.1147,
    longitude: 11.3943,
    description: "A legendary island civilization mentioned in Plato's dialogues, often depicted as an advanced society with unique technology and architecture.",
    imageUrl: "https://vvikipedia.co/images/thumb/2/24/Faeland_Alth%C3%B3an_artist_depiction_as_atlantis.jpg/800px-Faeland_Alth%C3%B3an_artist_depiction_as_atlantis.jpg"
  },
  {
    id: 3,
    name: "Mesopotamia",
    latitude: 33.2232,
    longitude: 43.6793,
    description: "A region in the Middle East, often called the 'Cradle of Civilization,' where various cultures like the Sumerians, Akkadians, Babylonians, and Assyrians flourished.",
    imageUrl: "https://cdn.britannica.com/20/13720-050-6ED7921E/reconstruction-ruins-Ishtar-Gate-Babylon-Al-Hillah-Iraq.jpg?w=300"
  },
  {
    id: 4,
    name: "Ancient Egypt",
    latitude: 26.8206,
    longitude: 30.8025,
    description: "A civilization renowned for its pyramids, pharaohs, and intricate religious beliefs, located along the Nile River in northeastern Africa.",
    imageUrl: "https://i.natgeofe.com/n/535f3cba-f8bb-4df2-b0c5-aaca16e9ff31/giza-plateau-pyramids.jpg?w=1280&h=853"
  },
  // Add more civilizations with their respective data and coordinates
];

function Regions() {
  const globeEl = React.useRef();
  const [selectedCivilization, setSelectedCivilization] = useState(null);

  useEffect(() => {
    globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 }, 4000);
  }, []);

  const markers = initialCivilizations.map((civilization) => ({
    id: civilization.id,
    name: civilization.name,
    coordinates: [civilization.latitude, civilization.longitude],
    description: civilization.description,
    imageUrl: civilization.imageUrl,
  }));

  const handleMarkerClick = (marker) => {
    setSelectedCivilization(marker);
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        pointsData={markers}
        pointLat={(d) => d.coordinates[0]}
        pointLng={(d) => d.coordinates[1]}
        pointColor={() => 'Red'}
        pointAltitude={0.05}
        pointRadius={1.2}
        pointResolution={20}
        pointLabel={(d) => `${d.name}`}
        onPointClick={handleMarkerClick}
      />

      {selectedCivilization && (
        <div className="info-container">
          <h2>{selectedCivilization.name}</h2>
          <img src={selectedCivilization.imageUrl} alt={selectedCivilization.name} className="info-image" />
          <p>{selectedCivilization.description}</p>
          <button onClick={() => setSelectedCivilization(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Regions;
