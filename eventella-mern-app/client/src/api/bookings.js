/**
 * File: client/src/api/bookings.js
 * Purpose: Booking endpoints for create/list/cancel.
 */
import api from './api';

// POST /bookings -> { ...booking }
export const createBooking = async (bookingData) => {
  const { data } = await api.post('/bookings', bookingData);
  return data;
};

// GET /bookings/mybookings -> [ ...bookings ]
export const getMyBookings = async () => {
  const { data } = await api.get('/bookings/mybookings');
  return data;
};

// GET /bookings (admin)
export const getAllBookings = async () => {
  const { data } = await api.get('/bookings');
  return data;
};

// PUT /bookings/:id/cancel -> { ...booking }
export const cancelBooking = async (id) => {
  const { data } = await api.put(`/bookings/${id}/cancel`);
  return data;
};