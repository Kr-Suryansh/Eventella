/**
 * File: client/src/components/AdminRoute.jsx
 * Purpose: Restrict nested routes to authenticated admins only.
 *
 * Behavior:
 * - Loading: spinner
 * - No user: redirect to /login (preserving intended location)
 * - Non-admin user: redirect to home
 * - Admin: render <Outlet />
 */
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';

const AdminRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return user.role === 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default AdminRoute;