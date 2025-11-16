/**
 * File: server/server.js
 * Purpose: Bootstraps the Express application — loads environment variables, connects to MongoDB,
 * configures global middleware (CORS, JSON parsing), mounts feature routes, and sets up
 * not-found and error handlers.
 *
 * Key variables:
 * - PORT: The TCP port the API listens on (from env or default 9460)
 * - corsOptions: Allowed origins/headers/methods for the browser to call this API
 *
 * Primary responsibilities per block:
 * 1) Load configuration (dotenv) and establish DB connection (connectDB)
 * 2) Initialize Express app and global middleware (CORS + JSON body parser)
 * 3) Mount resource routes (auth, events, bookings)
 * 4) Attach 404 and error handlers as fallbacks
 */
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import colors from 'colors';
import connectDB from './config/db.js';

// Import routes
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';
import bookingRoutes from './routes/bookings.js';

// Load env vars
dotenv.config();

// Connect to database
// Establish a single process-wide MongoDB connection used by all requests
connectDB();

const app = express();

// Middleware - CORS with specific configuration
// origin: list of allowed front-end dev URLs; adjust for deployments (e.g., Netlify/Vercel domain)
// credentials: allow cookies/credentials if used by clients
// methods/allowedHeaders: restrict to the verbs/headers we expect clients to use
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(express.json());

// Mount routes
// Health-check / welcome route for quick sanity verification
app.get('/', (req, res) => {
  res.send('✅ Eventella API is running...');
});

// Feature routes grouped by domain
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);

// 404 handler
// 404 fallback for any route not handled above
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error Handling Middleware
// Centralized error handler — ensures consistent JSON error shape
app.use((err, req, res, next) => {
  console.error(`\n❌ Error: ${err.message}`.red);
  console.error(err.stack);
  res.status(err.status || 500).json({ 
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

// Choose configured port or default to 9460 for local dev
const PORT = process.env.PORT || 9460;

app.listen(PORT, () => {
  console.log(
    `\n🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`.yellow.bold
  );
  console.log(`📡 CORS enabled for: http://localhost:5173, http://localhost:5174`.cyan);
  console.log(`\n✅ Ready to accept requests!\n`.green);
});