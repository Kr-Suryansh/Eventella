import api from './api';

export const createBooking = async (bookingData) => {
  const { data } = await api.post('/bookings', bookingData);
  return data;
};

export const getMyBookings = async () => {
  const { data } = await api.get('/bookings/mybookings');
  return data;
};

export const getAllBookings = async () => {
  const { data } = await api.get('/bookings');
  return data;
};

export const cancelBooking = async (id) => {
  const { data } = await api.put(`/bookings/${id}/cancel`);
  return data;
};