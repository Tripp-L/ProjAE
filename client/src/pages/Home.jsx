import React, { useEffect, useState } from 'react';
import Header from './Header';
import Navbar from './Navbar';
import TimelineComponent from './Timeline';
import './Home.css';

function Home({ onLogout }) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('access_token');
    setLoggedIn(!!isLoggedIn);
  }, []);

  return (
    <div className="home-container">
      {loggedIn && (
        <>
          <Header onLogout={onLogout} />
          <Navbar />
          <h1>Welcome To Ancient Echoes: The Digital Epic of History</h1>
          <p>Explore the wonders of ancient civilizations!</p>
          <TimelineComponent />
        </>
      )}
    </div>
  );
}

export default Home;
