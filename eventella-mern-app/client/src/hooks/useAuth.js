/**
 * File: client/src/hooks/useAuth.js
 * Purpose: Convenient hook wrapper to access AuthContext.
 */
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  return useContext(AuthContext);
};