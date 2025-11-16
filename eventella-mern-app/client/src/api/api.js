/**
 * File: client/src/api/api.js
 * Purpose: Centralized Axios instance used by all API modules.
 *
 * baseURL:
 * - Reads from `import.meta.env.VITE_API_URL` (configure in client/.env)
 * - Falls back to local dev server at http://localhost:9460/api
 *
 * setAuthToken(token):
 * - Adds/clears the Authorization header for subsequent requests
 */
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:9460/api',
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;