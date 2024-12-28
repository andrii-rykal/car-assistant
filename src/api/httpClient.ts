import axios from 'axios';
import { store } from '../app/store';

export const client = axios.create({
  baseURL: 'https://car-assistant-app-production.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(config => {
  const state = store.getState();
  const token = state.auth.token;

  if (token && config.url !== '/auth/registration') {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
},
  (error) => {
    return Promise.reject(error);
  }
);
