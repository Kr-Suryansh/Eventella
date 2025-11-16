/**
 * File: client/src/context/AuthContext.jsx
 * Purpose: Provide authentication state and actions to the app via React Context.
 *
 * Exposed in context value:
 * - user: { id, role, name?, email? } | null
 * - loading: boolean while auth state initializes from localStorage
 * - login(email, password), register(name, email, password), logout()
 *
 * Storage/Headers:
 * - JWT persisted in localStorage as 'token'
 * - axios Authorization header managed via setAuthToken
 */
import { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../api/auth';
import { setAuthToken } from '../api/api';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwt_decode(token);
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser({ id: decoded.id, role: decoded.role });
          setAuthToken(token);
        }
      }
    } catch (error) {
      console.error('Invalid token');
      logout();
    }
    setLoading(false);
  }, []);

  // Authenticate and store token, then derive `user` from JWT claims
  const login = async (email, password) => {
    const { token, ...userData } = await loginUser(email, password);
    localStorage.setItem('token', token);
    setAuthToken(token);
    const decoded = jwt_decode(token);
    setUser({ id: decoded.id, role: decoded.role, ...userData });
  };

  // Register, store token, and set user from JWT claims
  const register = async (name, email, password) => {
    const { token, ...userData } = await registerUser(name, email, password);
    localStorage.setItem('token', token);
    setAuthToken(token);
    const decoded = jwt_decode(token);
    setUser({ id: decoded.id, role: decoded.role, ...userData });
  };

  // Clear auth state and remove token
  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};