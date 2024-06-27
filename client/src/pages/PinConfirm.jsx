import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import './PinConfirm.css';

function PinConfirm({ onPinConfirmSuccess }) {
  const [pin, setPin] = useState('');
  const navigate = useNavigate(); // This will be used to navigate to the profile page

  const handleChange = (e) => {
    setPin(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/verify_pin', { pin });
      localStorage.setItem('access_token', response.data.access_token);
      onPinConfirmSuccess();
      navigate('/profile'); // Navigate to Profile page after successful PIN confirmation
    } catch (error) {
      alert('Invalid PIN. Please try again.');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="pin-confirm-form">
      <h2>Confirm Pin</h2>
      <Form.Group controlId="formPin">
        <Form.Label>4 Digit Pin</Form.Label>
        <Form.Control type="text" name="pin" placeholder="4 digit pin" onChange={handleChange} required maxLength="4" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Confirm Pin
      </Button>
    </Form>
  );
}

export default PinConfirm;
