import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function Profile({ onProfileCompletion }) {
  const [formData, setFormData] = useState({
    profileImage: '',
    interests: '',
    knowledge: '',
    savedCivilizations: ''
  });
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/auth/profile');
        console.log('Fetched profile data:', response.data);
        setFormData(response.data);
      } catch (error) {
        console.log('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

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
      await axios.post('/auth/profile', formData);
      setMessage('Profile updated successfully!');
      console.log('Profile updated, navigating to home page');
      onProfileCompletion();
    } catch (error) {
      console.error('Error updating profile:', error.response);
      setErrorMessage(error.response?.data?.message || 'Profile update failed. Please try again.');
    }
  };

  const handleSkip = () => {
    console.log('Profile skipped, navigating to home page');
    onProfileCompletion();
  };

  const handleDelete = async () => {
    try {
      await axios.delete('/auth/profile');
      setMessage('Profile deleted successfully!');
      navigate('/login');
    } catch (error) {
      console.error('Error deleting profile:', error.response);
      setErrorMessage(error.response?.data?.message || 'Profile deletion failed. Please try again.');
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {message && <p className="success-message">{message}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formProfileImage">
          <Form.Label>Profile Image URL</Form.Label>
          <Form.Control type="text" name="profileImage" value={formData.profileImage} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formInterests">
          <Form.Label>Interests</Form.Label>
          <Form.Control type="text" name="interests" value={formData.interests} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formKnowledge">
          <Form.Label>What You Want to Know More About</Form.Label>
          <Form.Control type="text" name="knowledge" value={formData.knowledge} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formSavedCivilizations">
          <Form.Label>Saved Civilizations</Form.Label>
          <Form.Control type="text" name="savedCivilizations" value={formData.savedCivilizations} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save Profile
        </Button>
        <Button variant="secondary" onClick={handleSkip}>
          Skip
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete Profile
        </Button>
      </Form>
    </div>
  );
}

export default Profile;









