import React, { useEffect, useState } from 'react';
import Header from './Header';
import Navbar from './Navbar';
import './Home.css'; // Import the CSS file

function Home({ onLogout }) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('access_token');
    setLoggedIn(!!isLoggedIn);
  }, []);

  return (
    <div className="home-container"> {/* Use the correct class name */}
      {loggedIn && (
        <>
          <Header onLogout={onLogout} />
          <Navbar />
          <h1>Welcome To Ancient Echoes: The Digital Epic of History</h1>
          <p>Explore the wonders of ancient civilizations!</p>
          {/* Other content */}
        </>
      )}
    </div>
  );
}

export default Home;




