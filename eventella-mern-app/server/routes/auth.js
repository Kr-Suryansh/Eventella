/**
 * File: server/routes/auth.js
 * Purpose: Define authentication endpoints and connect them to controller logic.
 *
 * Routes:
 * - POST /register: Create a new user
 * - POST /login: Authenticate and return JWT
 * - GET /profile: Return current user info (requires JWT)
 */
import express from 'express';
const router = express.Router();
import {
  registerUser,
  loginUser,
  getUserProfile,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

// Public
router.post('/register', registerUser);
router.post('/login', loginUser);
// Protected
router.get('/profile', protect, getUserProfile);

export default router;