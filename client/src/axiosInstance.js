import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5555',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
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

export default axiosInstance;
