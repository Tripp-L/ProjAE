import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import PinConfirm from './components/PinConfirm';
import Civilizations from './components/Civilizations';
import Events from './components/Events';
import Regions from './components/Regions';
import Artifacts from './components/Artifacts';
import axios from 'axios';
import { FavoriteProvider } from './contexts/FavoriteContext';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        try {
          const response = await axios.get('/auth/profile', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          setLoggedIn(true);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            try {
              const refreshResponse = await axios.post('/auth/refresh', null, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
                }
              });
              const { access_token } = refreshResponse.data;
              localStorage.setItem('access_token', access_token);
              setLoggedIn(true);
            } catch (refreshError) {
              setLoggedIn(false);
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');
              navigate('/login');
            }
          } else if (error.response && error.response.status === 404) {
            setLoggedIn(true);
          }
        }
      } else {
        setLoggedIn(false);
      }
      setLoading(false);
    };
    checkLoginStatus();
  }, [navigate]);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    navigate('/');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  const handlePinConfirmSuccess = () => {
    navigate('/profile');
  };

  const handleProfileCompletion = () => {
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <FavoriteProvider>
      <div>
        {location.pathname !== '/signup' && location.pathname !== '/login' && location.pathname !== '/pin-confirm' && (
          <>
            <Header loggedIn={loggedIn} profile={null} onLogout={handleLogout} />
            <Navbar />
          </>
        )}
        
        <Routes>
          <Route path="/" element={loggedIn ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/pin-confirm" element={<PinConfirm onPinConfirmSuccess={handlePinConfirmSuccess} />} />
          <Route path="/profile" element={<Profile onProfileCompletion={handleProfileCompletion} />} />
          <Route path="/civilizations" element={loggedIn ? <Civilizations /> : <Navigate to="/login" />} />
          <Route path="/events" element={loggedIn ? <Events /> : <Navigate to="/login" />} />
          <Route path="/regions" element={loggedIn ? <Regions /> : <Navigate to="/login" />} />
          <Route path="/artifacts" element={loggedIn ? <Artifacts /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </FavoriteProvider>
  );
}

export default App;


