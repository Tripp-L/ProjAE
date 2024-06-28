import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import PinConfirm from './pages/PinConfirm';
import Civilization from './pages/Civilization';
import axiosInstance from './axiosInstance';

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        try {
          await axiosInstance.get('/auth/profile', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          setLoggedIn(true);
        } catch (error) {
          if (error.response.status === 401) {
            try {
              const refreshResponse = await axiosInstance.post('/auth/refresh', null, {
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
          } else if (error.response.status === 404) {
            setLoggedIn(true); // No profile exists, but the user is still logged in
          }
        }
      } else {
        setLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, [navigate]);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    navigate('/pin-confirm');
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

  return (
    <div>
      <Routes>
        <Route path="/" element={loggedIn ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/pin-confirm" element={<PinConfirm onPinConfirmSuccess={handlePinConfirmSuccess} />} />
        <Route path="/profile" element={<Profile onProfileCompletion={handleProfileCompletion} />} />
        <Route path="/civilization/:id" element={<Civilization />} />
      </Routes>
    </div>
  );
}

export default App;




















