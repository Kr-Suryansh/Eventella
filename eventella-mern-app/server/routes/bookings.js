import express from 'express';
const router = express.Router();
import {
  createBooking,
  getMyBookings,
  getAllBookings,
  cancelBooking,
} from '../controllers/bookingController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, createBooking).get(protect, admin, getAllBookings);
router.route('/mybookings').get(protect, getMyBookings);
router.route('/:id/cancel').put(protect, cancelBooking);

export default router;