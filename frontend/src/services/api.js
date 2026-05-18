import axios from 'axios';

// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth.php?action=register', userData),
  login: (email, password) => api.post('/auth.php?action=login', { email, password }),
};

// Emergency API
export const emergencyAPI = {
  createAlert: (alertData) => api.post('/emergency.php', alertData),
  getAlerts: (limit = 10) => api.get(`/emergency.php?limit=${limit}`),
  updateStatus: (id, status) => api.put(`/emergency.php?id=${id}`, { status }),
};

// Facilities API
export const facilitiesAPI = {
  findNearby: (latitude, longitude, type = null, radius = 10) => {
    let url = `/facilities.php?action=nearby&latitude=${latitude}&longitude=${longitude}&radius=${radius}`;
    if (type) url += `&type=${type}`;
    return api.get(url);
  },
  getDetails: (id) => api.get(`/facilities.php?action=details&id=${id}`),
  search: (query) => api.get(`/facilities.php?action=search&q=${query}`),
  getByType: (type) => api.get(`/facilities.php?action=type&type=${type}`),
};

// Medical Records API
export const medicalRecordsAPI = {
  addRecord: (recordData) => api.post('/medical-records.php', recordData),
  getRecords: (type = null) => {
    let url = '/medical-records.php?action=list';
    if (type) url += `&type=${type}`;
    return api.get(url);
  },
  getCritical: () => api.get('/medical-records.php?action=critical'),
  deleteRecord: (id) => api.delete(`/medical-records.php?id=${id}`),
};

// First Aid API
export const firstAidAPI = {
  getTips: (category = null) => {
    let url = '/first-aid.php?action=list';
    if (category) url += `&category=${category}`;
    return api.get(url);
  },
  getCategories: () => api.get('/first-aid.php?action=categories'),
  getTipDetails: (id) => api.get(`/first-aid.php?action=details&id=${id}`),
};

export default api;
