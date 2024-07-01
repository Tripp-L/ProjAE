import axios from 'axios';

const baseURL = 'http://localhost:5555'; // The base URL of your Flask backend

const getAuthHeaders = () => {
  const accessToken = localStorage.getItem('access_token');
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
};

const handleError = async (error) => {
  if (error.response && error.response.status === 401 && !error.config._retry) {
    error.config._retry = true;
    try {
      const refreshResponse = await axios.post(`${baseURL}/auth/refresh`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
        }
      });
      const { access_token } = refreshResponse.data;
      localStorage.setItem('access_token', access_token);
      error.config.headers['Authorization'] = `Bearer ${access_token}`;
      return axios(error.config);
    } catch (refreshError) {
      console.error('Refresh token expired. Please log in again.');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
    }
  }
  return Promise.reject(error);
};

export const getSmithsonianData = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/smithsonian`, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    handleError(error);
    console.error('Failed to fetch Smithsonian data:', error);
    throw error;
  }
};

export const getRijksmuseumData = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/rijksmuseum`, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    handleError(error);
    console.error('Failed to fetch Rijksmuseum data:', error);
    throw error;
  }
};

export const getWikimediaArticle = async (name) => {
  try {
    const response = await axios.get(`${baseURL}/api/wikimedia/articles/${name}`, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    handleError(error);
    console.error('Failed to fetch Wikimedia article:', error);
    throw error;
  }
};

export const getWikimediaRealtime = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/wikimedia/realtime`, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    handleError(error);
    console.error('Failed to fetch Wikimedia realtime data:', error);
    throw error;
  }
};
