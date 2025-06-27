import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080', // Adjust if your backend runs elsewhere
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

export default API;
