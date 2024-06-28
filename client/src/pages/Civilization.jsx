import React from 'react';
import { useParams } from 'react-router-dom';

const Civilization = () => {
  const { id } = useParams();
  
  // Fetch civilization details using the id
  // For demonstration, using static content

  const civilization = {
    1: {
      name: 'Civilization 1',
      region: 'Region 1',
      description: 'Detailed description of Civilization 1.'
    },
    2: {
      name: 'Civilization 2',
      region: 'Region 2',
      description: 'Detailed description of Civilization 2.'
    }
  }[id];

  return (
    <div>
      <h1>{civilization.name}</h1>
      <p>Region: {civilization.region}</p>
      <p>{civilization.description}</p>
    </div>
  );
};

export default Civilization;
