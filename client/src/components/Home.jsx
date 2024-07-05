import React from 'react';
import TimelineComponent from './Timeline';
import './Home.css';

function Home({ onLogout }) {
  return (
    <div className="home-container">
      <h1>Welcome To Ancient Echoes: The Digital Epic of History</h1>
      <p>Explore the wonders of ancient civilizations!</p>
      <TimelineComponent />
    </div>
  );
}

export default Home;

