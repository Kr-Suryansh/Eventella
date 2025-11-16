/**
 * File: client/src/pages/Login.jsx
 * Purpose: Authenticate users via email/password and redirect to intended page.
 */
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaGoogle } from 'react-icons/fa'; // Google Login icon

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/';

  // Attempt login and navigate back to `from` location
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Logged in successfully!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white/95 p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-8 brand-cursive-heading text-amber-900 drop-shadow-sm">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-amber-900">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-amber-200 rounded-md focus:border-amber-400 bg-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-900">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-amber-200 rounded-md focus:border-amber-400 bg-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full brand-gold-bg py-4 rounded-md font-bold hover:scale-105 transition transform flex items-center justify-center"
          >
            <span className="brand-cursive text-current text-xl md:text-2xl">Login</span>
          </button>
        </form>
        
        <div className="text-center my-4">
          <p className="text-gray-500">or</p>
        </div>

        {/* Google Login Placeholder */}
        <button className="w-full bg-white border border-amber-200 text-amber-900 py-3 rounded-md font-bold flex items-center justify-center hover:bg-gray-50">
          <FaGoogle className="mr-2 brand-icon" /> Login with Google
        </button>
        <p className="text-xs text-center text-gray-400 mt-2">(Google Login not implemented in this MVP)</p>
        
        <p className="text-center mt-4">
          New to Eventella?{' '}
          <Link to="/register" className="text-amber-900 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;