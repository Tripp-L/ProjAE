import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/AncientEchoes.png';
import './Profile.css';

function Profile({ onProfileCompletion }) {
  const [formData, setFormData] = useState({
    profileName: '',
    profileImage: '',
    interests: '',
    knowledge: '',
    savedCivilizations: ''
  });
  const [profileExists, setProfileExists] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/auth/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        setFormData(response.data);
        setProfileExists(true);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setProfileExists(false);
        } else {
          console.log('Error fetching profile:', error);
        }
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
      const endpoint = profileExists ? '/auth/profile' : '/auth/profile';
      const method = profileExists ? 'patch' : 'post';

      await axios({
        method: method,
        url: endpoint,
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      setMessage('Profile updated successfully!');
      onProfileCompletion();
      setProfileExists(true);
      setIsEditing(false); // Switch to view mode after saving
    } catch (error) {
      console.error('Error saving profile:', error.response);
      setErrorMessage(error.response?.data?.message || 'Profile save failed. Please try again.');
    }
  };

  const handleSkip = () => {
    navigate('/');
  };

  const handleDelete = async () => {
    try {
      await axios.delete('/auth/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      setMessage('Profile deleted successfully!');
      setFormData({
        profileName: '',
        profileImage: '',
        interests: '',
        knowledge: '',
        savedCivilizations: ''
      });
      setProfileExists(false);
      navigate('/');
    } catch (error) {
      console.error('Error deleting profile:', error.response);
      setErrorMessage(error.response?.data?.message || 'Profile deletion failed. Please try again.');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="auth-container">
      <img src={logo} alt="Logo" className="auth-logo" />
      <div className="auth-form">
        <h2>Profile</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {message && <p className="success-message">{message}</p>}
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <img src={formData.profileImage} alt="Profile" className="profile-image-large" />
            <div className="form-group">
              <label htmlFor="profileName">Profile Name</label>
              <input
                type="text"
                id="profileName"
                name="profileName"
                value={formData.profileName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="profileImage">Profile Image URL</label>
              <input
                type="text"
                id="profileImage"
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="interests">Interests</label>
              <textarea
                id="interests"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="knowledge">What You Want to Know More About</label>
              <textarea
                id="knowledge"
                name="knowledge"
                value={formData.knowledge}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="savedCivilizations">Saved Civilizations</label>
              <textarea
                id="savedCivilizations"
                name="savedCivilizations"
                value={formData.savedCivilizations}
                onChange={handleChange}
              />
            </div>
            <div className="button-group">
              <button type="submit" className="btn btn-primary">Save Profile</button>
              <button type="button" className="btn btn-secondary" onClick={handleSkip}>Skip</button>
              {profileExists && (
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete Profile</button>
              )}
            </div>
          </form>
        ) : (
          <div className="profile-view">
            <img src={formData.profileImage} alt="Profile" className="profile-image-large" />
            <div className="profile-group">
              <label>Profile Name:</label>
              <p>{formData.profileName}</p>
            </div>
            <div className="profile-group">
              <label>Interests:</label>
              <p>{formData.interests}</p>
            </div>
            <div className="profile-group">
              <label>What You Want to Know More About:</label>
              <p>{formData.knowledge}</p>
            </div>
            <div className="profile-group">
              <label>Saved Civilizations:</label>
              <p>{formData.savedCivilizations}</p>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleEdit}>Edit Profile</button>
            <button type="button" className="btn btn-secondary" onClick={handleSkip}>Skip</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
