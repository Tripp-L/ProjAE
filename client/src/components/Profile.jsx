import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoriteContext';
import axios from 'axios';
import logo from '../assets/images/AncientEchoes.png';
import './Profile.css';

function Profile({ onProfileCompletion }) {
  const { favorites } = useFavorites();
  const [profileData, setProfileData] = useState({
    profileName: '',
    profileImage: '',
    interests: '',
    knowledge: '',
  });
  const [profileExists, setProfileExists] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/auth/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        setProfileData(response.data);
        setProfileExists(true);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setProfileExists(false);
        } else {
          console.error('Error fetching profile:', error);
        }
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = '/auth/profile';
      const method = profileExists ? 'PATCH' : 'POST';

      await axios({
        method: method,
        url: endpoint,
        data: profileData,
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

  const handleDelete = async () => {
    try {
      await axios.delete('/auth/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      setMessage('Profile deleted successfully!');
      setProfileData({
        profileName: '',
        profileImage: '',
        interests: '',
        knowledge: '',
      });
      setProfileExists(false);
      onProfileCompletion();
    } catch (error) {
      console.error('Error deleting profile:', error.response);
      setErrorMessage(error.response?.data?.message || 'Profile deletion failed. Please try again.');
    }
  };

  const handleSkip = () => {
    onProfileCompletion();
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
            <img src={profileData.profileImage} alt="Profile" className="profile-image-large" />
            <div className="form-group">
              <label htmlFor="profileName">Profile Name</label>
              <input
                type="text"
                id="profileName"
                name="profileName"
                value={profileData.profileName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="profileImage">Profile Image URL</label>
              <input
                type="text"
                id="profileImage"
                name="profileImage"
                value={profileData.profileImage}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="interests">Interests</label>
              <textarea
                id="interests"
                name="interests"
                value={profileData.interests}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="knowledge">What You Want to Know More About</label>
              <textarea
                id="knowledge"
                name="knowledge"
                value={profileData.knowledge}
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
            <img src={profileData.profileImage} alt="Profile" className="profile-image-large" />
            <div className="profile-group">
              <label>Profile Name:</label>
              <p>{profileData.profileName}</p>
            </div>
            <div className="profile-group">
              <label>Interests:</label>
              <p>{profileData.interests}</p>
            </div>
            <div className="profile-group">
              <label>What You Want to Know More About:</label>
              <p>{profileData.knowledge}</p>
            </div>
            <div className="profile-group">
              <label>Civilizations:</label>
              <ul>
                {(favorites.civilizations || []).map((item) => (
                  <li key={item.id}>
                    <Link to={`/civilizations/${item.id}`}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="profile-group">
              <label>Events:</label>
              <ul>
                {(favorites.events || []).map((item) => (
                  <li key={item.id}>
                    <Link to={`/events/${item.id}`}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="profile-group">
              <label>Artifacts:</label>
              <ul>
                {(favorites.artifacts || []).map((item) => (
                  <li key={item.id}>
                    <Link to={`/artifacts/${item.id}`}>{item.name}</Link>
                  </li>
                ))}
              </ul>
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
