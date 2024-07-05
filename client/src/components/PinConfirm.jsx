import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PinConfirm.css';

export default function PinConfirm({ onPinConfirmSuccess }) {
  const [pin, setPin] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPin(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/pin-confirm', { pin }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      if (response.status === 200) {
        onPinConfirmSuccess();
        navigate('/');
      }
    } catch (error) {
      console.error('Pin confirmation error:', error.response);
      setErrorMessage(error.response?.data?.error || 'Pin confirmation failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Pin Confirmation</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="pin">Enter PIN</label>
            <input
              type="password"
              id="pin"
              name="pin"
              value={pin}
              onChange={handleChange}
              required
              autoComplete="one-time-code"
            />
          </div>
          <button type="submit" className="btn btn-primary">Confirm PIN</button>
        </form>
      </div>
    </div>
  );
}
