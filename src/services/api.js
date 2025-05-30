import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:1111/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
