import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5555', // The base URL of your Flask backend
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshTokenResponse = await axiosInstance.post('/auth/refresh', null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
          }
        });
        const { access_token } = refreshTokenResponse.data;
        localStorage.setItem('access_token', access_token);
        originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token expired. Please log in again.');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const getSmithsonianData = async () => {
  try {
    const response = await axiosInstance.get('/api/smithsonian');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch Smithsonian data:', error);
    throw error;
  }
};

export const getRijksmuseumData = async () => {
  try {
    const response = await axiosInstance.get('/api/rijksmuseum');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch Rijksmuseum data:', error);
    throw error;
  }
};

export const getWikimediaArticle = async (name) => {
  try {
    const response = await axiosInstance.get(`/api/wikimedia/articles/${name}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch Wikimedia article:', error);
    throw error;
  }
};

export const getWikimediaRealtime = async () => {
  try {
    const response = await axiosInstance.get('/api/wikimedia/realtime');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch Wikimedia realtime data:', error);
    throw error;
  }
};

export default axiosInstance;