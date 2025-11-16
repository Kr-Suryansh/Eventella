/**
 * File: client/src/pages/Register.jsx
 * Purpose: Create a user account and log in immediately upon success.
 */
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUserPlus } from 'react-icons/fa';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  // Validate and register; navigates to dashboard on success
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await register(name, email, password);
      toast.success('Registration successful!');
      navigate('/dashboard'); // Or navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white/95 p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-8 brand-cursive-heading text-amber-900 drop-shadow-sm">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-amber-900">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-amber-200 rounded-md bg-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-900">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-amber-200 rounded-md bg-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-900">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-amber-200 rounded-md bg-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-900">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-amber-200 rounded-md bg-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full brand-gold-bg py-4 rounded-md font-bold hover:scale-105 transition transform flex items-center justify-center"
          >
            <FaUserPlus className="mr-3 brand-icon" />
            <span className="brand-cursive text-current text-xl md:text-2xl">Sign Up</span>
          </button>
        </form>
        
        <p className="text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-amber-900 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;