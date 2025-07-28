import axios from 'axios';

const BASE_URL = 'http://172.20.10.3:8080';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const register = (data) => api.post('/auths/register', data);
export const login = (data) => api.post('/auths/login', data);
export const verifyOtp = (data) => api.post('/auths/verifyOtp', data);
export const resendOtp = (email) => api.post('/auths/resend-otp', null, { params: { email } });
export const getProfile = () => api.get('/users/me');

export default api; 