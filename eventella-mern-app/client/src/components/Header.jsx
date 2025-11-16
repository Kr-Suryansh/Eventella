/**
 * File: client/src/components/Header.jsx
 * Purpose: Global navigation header with responsive layout and auth-aware links.
 *
 * State:
 * - mobileMenuOpen: toggles mobile navigation panel
 *
 * Behavior:
 * - Shows Dashboard/Admin links when user is authenticated (role-based)
 * - Logout clears auth and returns to /login
 */
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaCalendarAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const onLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  return (
  <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-amber-100/30">
      <nav className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        {/* Artistic Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-300 group"
        >
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 bg-gold-blob rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative w-full h-full bg-gold-pill rounded-xl flex items-center justify-center shadow-lg">
              <FaCalendarAlt className="text-white text-lg" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-cursive text-2xl font-bold brand-gradient-text leading-none tracking-wide">
              Eventella
            </span>
            <span className="text-xs font-medium text-gray-500 mt-0.5">Unforgettable Moments</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-700 font-medium nav-link-gold transition-all duration-300 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 underline-gold group-hover:w-full transition-all duration-300"></span>
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 font-medium nav-link-gold transition-all duration-300 relative group"
                >
                  Dashboard
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 underline-gold group-hover:w-full transition-all duration-300"></span>
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="px-4 py-2 rounded-full brand-gold-bg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Admin
                  </Link>
                )}
                <button onClick={onLogout} className="btn-primary px-3 py-2">
                  <span className="brand-cursive text-current text-lg md:text-xl leading-tight">Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="btn-primary px-3 py-2">
                <span className="brand-cursive text-current text-lg md:text-xl leading-tight">Login</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-700 text-2xl hover:text-amber-700 transition-colors duration-300"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
  <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-amber-100/30 animate-slideDown">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            <Link
              to="/"
              className="text-gray-700 font-medium hover:text-amber-700 transition-colors py-3 px-4 rounded-lg hover:bg-amber-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 font-medium hover:text-amber-700 transition-colors py-3 px-4 rounded-lg hover:bg-amber-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="text-gray-700 font-medium hover:text-amber-700 transition-colors py-3 px-4 rounded-lg hover:bg-amber-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <button onClick={onLogout} className="btn-primary w-full py-2">
                  <span className="brand-cursive text-current text-lg leading-tight">Logout</span>
                </button>
              </>
            ) : (
                <Link
                  to="/login"
                  className="btn-primary w-full text-center py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="brand-cursive text-current text-lg leading-tight">Login</span>
                </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;