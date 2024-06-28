import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import './Civilization.css';

const Civilization = () => {
  const { id } = useParams();
  const [civilization, setCivilization] = useState(null);

  useEffect(() => {
    const fetchCivilization = async () => {
      try {
        const response = await axios.get(`/api/civilizations/${id}`);
        setCivilization(response.data);
      } catch (error) {
        console.error("Error fetching civilization:", error);
      }
    };
    fetchCivilization();
  }, [id]);

  if (!civilization) return <div>Loading...</div>;

  return (
    <div>
      <h1>{civilization.name}</h1>
      <p>Region: {civilization.region}</p>
      <p>{civilization.description}</p>
    </div>
  );
};

export default Civilization;
