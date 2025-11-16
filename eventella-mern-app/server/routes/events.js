/**
 * File: server/routes/events.js
 * Purpose: Define Event resource routes (list, detail, admin CRUD).
 *
 * Routes:
 * - GET /           : List events (public)
 * - POST /          : Create event (admin only)
 * - GET /:id        : Get single event by id (public)
 * - PUT /:id        : Update event (admin only)
 * - DELETE /:id     : Delete event (admin only)
 */
import express from 'express';
const router = express.Router();
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Public list; admin-gated creation
router.route('/').get(getEvents).post(protect, admin, createEvent);
// Public details; admin-gated update/delete
router
  .route('/:id')
  .get(getEventById)
  .put(protect, admin, updateEvent)
  .delete(protect, admin, deleteEvent);

export default router;