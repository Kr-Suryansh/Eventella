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

  const login = async (email, password) => {
    const { token, ...userData } = await loginUser(email, password);
    localStorage.setItem('token', token);
    setAuthToken(token);
    const decoded = jwt_decode(token);
    setUser({ id: decoded.id, role: decoded.role, ...userData });
  };

  const register = async (name, email, password) => {
    const { token, ...userData } = await registerUser(name, email, password);
    localStorage.setItem('token', token);
    setAuthToken(token);
    const decoded = jwt_decode(token);
    setUser({ id: decoded.id, role: decoded.role, ...userData });
  };

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