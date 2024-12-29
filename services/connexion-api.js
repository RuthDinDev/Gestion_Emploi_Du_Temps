import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5004/api';

// Création d'une instance Axios configurée
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Timeout en ms
  headers: {
    'Content-Type': 'application/json',
  },
});

// Gestion des erreurs globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
