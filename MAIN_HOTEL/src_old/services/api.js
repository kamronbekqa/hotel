import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'https://688cbd28cd9d22dda5ce5073.mockapi.io/BEK',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      return Promise.reject(error.response.data);
    } else if (error.request) {
      return Promise.reject({ message: 'Server bilan aloqa uzildi (Network Error). Iltimos, backend ishlayotganini tekshiring.' });
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me')
};

// Dacha API calls
export const dachaAPI = {
  getAll: (params) => api.get('/dachas', { params }),
  getById: (id) => api.get(`/dachas/${id}`),
  create: (data) => api.post('/dachas', data),
  update: (id, data) => api.put(`/dachas/${id}`, data),
  delete: (id) => api.delete(`/dachas/${id}`)
};

// Booking API calls
export const bookingAPI = {
  create: (data) => api.post('/user', data),
  getAll: (params) => api.get('/bookings', { params }),
  getMy: () => api.get('/bookings/my'),
  updateStatus: (id, status) => api.put(`/bookings/${id}`, { status }),
  delete: (id) => api.delete(`/bookings/${id}`),
  getStats: () => api.get('/bookings/stats')
};

// Upload API calls
export const uploadAPI = {
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

// MockAPI for Users
const MOCK_API_URL = 'https://688cbd28cd9d22dda5ce5073.mockapi.io/BEK';
export const usersAPI = {
  getAll: () => axios.get(`${MOCK_API_URL}/user`),
  getById: (id) => axios.get(`${MOCK_API_URL}/user/${id}`),
  create: (data) => axios.post(`${MOCK_API_URL}/user`, data),
  update: (id, data) => axios.put(`${MOCK_API_URL}/user/${id}`, data),
  delete: (id) => axios.delete(`${MOCK_API_URL}/user/${id}`)
};

export default api;
