/**
 * File: client/src/api/events.js
 * Purpose: Event listing and admin CRUD endpoints.
 */
import api from './api';

// GET /events?category=&location=&q=&maxPrice=
export const getEvents = async (params = {}) => {
  const { data } = await api.get('/events', { params });
  return data;
};

// GET /events/:id
export const getEventById = async (id) => {
  const { data } = await api.get(`/events/${id}`);
  return data;
};

// POST /events (admin)
export const createEvent = async (eventData) => {
  const { data } = await api.post('/events', eventData);
  return data;
};

// PUT /events/:id (admin)
export const updateEvent = async (id, eventData) => {
  const { data } = await api.put(`/events/${id}`, eventData);
  return data;
};

// DELETE /events/:id (admin)
export const deleteEvent = async (id) => {
  const { data } = await api.delete(`/events/${id}`);
  return data;
};