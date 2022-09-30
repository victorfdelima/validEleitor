import axios from 'axios';
import { getToken, logout } from './auth';

export const api = axios.create();

api.interceptors.request.use(
  async (config) => {
    const token = getToken();

    if (config?.headers && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response?.status === 401) {
      logout();

      window.location.href = '/login';
    }
  },
);
