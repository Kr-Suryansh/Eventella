/**
 * File: client/src/components/ProtectedRoute.jsx
 * Purpose: Restrict access to nested routes to authenticated users.
 *
 * Behavior:
 * - While auth state is loading: show spinner
 * - If user exists: render nested route via <Outlet />
 * - Else: redirect to /login and preserve intended location in state
 */
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;