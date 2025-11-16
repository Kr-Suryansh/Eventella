/**
 * File: server/routes/bookings.js
 * Purpose: Define Booking routes for creating, viewing, and canceling bookings.
 *
 * Routes:
 * - POST /              : Create a booking (authenticated)
 * - GET  /              : List all bookings (admin only)
 * - GET  /mybookings    : List bookings for the current user (authenticated)
 * - PUT  /:id/cancel    : Cancel a booking (authenticated)
 */
import express from 'express';
const router = express.Router();
import {
  createBooking,
  getMyBookings,
  getAllBookings,
  cancelBooking,
} from '../controllers/bookingController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Create (user) and list all (admin)
router.route('/').post(protect, createBooking).get(protect, admin, getAllBookings);
// List current user's bookings
router.route('/mybookings').get(protect, getMyBookings);
// Cancel a booking by id
router.route('/:id/cancel').put(protect, cancelBooking);

export default router;