/**
 * File: server/utils/generateToken.js
 * Purpose: Sign a short JSON Web Token containing user id and role.
 *
 * Notes:
 * - Token payload: { id, role }
 * - Expiry: 30 days
 */
import jwt from 'jsonwebtoken';

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export default generateToken;