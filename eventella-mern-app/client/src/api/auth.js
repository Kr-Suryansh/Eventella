/**
 * File: client/src/api/auth.js
 * Purpose: Wrapper functions for auth endpoints.
 *
 * All functions return server JSON responses directly.
 */
import api from './api';

// POST /auth/login -> { token, user }
export const loginUser = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};

// POST /auth/register -> { token, user }
export const registerUser = async (name, email, password) => {
  const { data } = await api.post('/auth/register', { name, email, password });
  return data;
};

// GET /auth/profile -> { _id, name, email, role }
export const getUserProfile = async () => {
  const { data } = await api.get('/auth/profile');
  return data;
};