import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  health: () => api.get('/auth/health'),
};

// Patient API
export const patientAPI = {
  getDoctors: (specialization) => api.get('/patient/doctors', { params: { specialization } }),
  getSpecializations: () => api.get('/patient/specializations'),
  bookAppointment: (data) => api.post('/patient/appointments', data),
  getAppointments: () => api.get('/patient/appointments'),
  cancelAppointment: (id) => api.delete(`/patient/appointments/${id}`),
};

// Doctor API
export const doctorAPI = {
  getProfile: () => api.get('/doctor/profile'),
  getAppointments: (filter) => api.get('/doctor/appointments', { params: { filter } }),
  approveAppointment: (id) => api.put(`/doctor/appointments/${id}/approve`),
  rejectAppointment: (id) => api.put(`/doctor/appointments/${id}/reject`),
  getSchedule: () => api.get('/doctor/schedule'),
  addSchedule: (data) => api.post('/doctor/schedule', data),
  getPatients: () => api.get('/doctor/patients'),
};

// Admin API
export const adminAPI = {
  getUsers: (role) => api.get('/admin/users', { params: { role } }),
  createDoctor: (data) => api.post('/admin/doctors', data),
  updateDoctor: (id, data) => api.put(`/admin/doctors/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getAnalytics: () => api.get('/admin/analytics'),
};

export default api;
