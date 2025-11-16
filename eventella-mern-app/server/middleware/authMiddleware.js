/**
 * File: server/middleware/authMiddleware.js
 * Purpose: Provide authentication/authorization guards for protected routes.
 *
 * Exports:
 * - protect: Validates JWT from the Authorization header and attaches `req.user`
 * - admin: Ensures the authenticated user has an admin role
 */
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Protect middleware: Verifies a Bearer token and loads the user from DB.
 * - Reads `Authorization: Bearer <token>`
 * - Verifies with `JWT_SECRET`
 * - Attaches `req.user` (without password) for downstream handlers
 */
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]; // extract token part
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // { id, iat, exp }
      req.user = await User.findById(decoded.id).select('-password'); // attach safe user
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

/**
 * Admin middleware: Only continues if authenticated and role === 'admin'.
 */
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

export { protect, admin };