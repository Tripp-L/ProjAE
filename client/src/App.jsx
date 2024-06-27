import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import PinConfirm from './pages/PinConfirm';

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('access_token');
    setLoggedIn(!!isLoggedIn);
  }, []);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    navigate('/pin-confirm');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('access_token');
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
      </Routes>
    </div>
  );
}

export default App;


















