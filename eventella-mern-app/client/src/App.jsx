/**
 * File: client/src/App.jsx
 * Purpose: Define top-level routes and apply auth/role guards.
 * - Public: Home, Login, Register, EventDetails
 * - Protected: Book, Confirmation, Dashboard (wrapped in ProtectedRoute)
 * - Admin-only: AdminDashboard (wrapped in AdminRoute)
 */
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EventDetails from './pages/EventDetails';
import BookingPage from './pages/BookingPage';
import ConfirmationPage from './pages/ConfirmationPage';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/event/:id" element={<EventDetails />} />
          
          {/* Protected Routes (user must be authenticated) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/book/:id" element={<BookingPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Admin Routes (user must have role 'admin') */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;