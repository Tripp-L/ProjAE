import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/images/AncientEchoes.png';
import './Login.css';

export default function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    pin: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', formData);
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      onLoginSuccess();
      navigate('/pin-confirm');
    } catch (error) {
      console.error('Login error:', error.response);
      setErrorMessage(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePinVisibility = () => {
    setShowPin(!showPin);
  };

  return (
    <div className="auth-container">
      <img src={logo} alt="Logo" className="auth-logo" />
      <div className="auth-form">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>
          <div className="form-group password-group">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
            <span className="password-toggle" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          <div className="form-group pin-group">
            <label htmlFor="pin">PIN (4 digits)</label>
            <input
              type={showPin ? "text" : "password"}
              id="pin"
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              required
              autoComplete="pin"
            />
            <span className="pin-toggle" onClick={togglePinVisibility}>
              <FontAwesomeIcon icon={showPin ? faEyeSlash : faEye} />
            </span>
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}
