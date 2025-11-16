/**
 * File: server/models/Booking.js
 * Purpose: Represent a user's reservation for an Event.
 *
 * Relations:
 * - user -> User reference
 * - event -> Event reference
 *
 * Business fields:
 * - seats: number of seats reserved
 * - totalPrice: calculated at creation (event.price * seats)
 * - status: lifecycle state (Confirmed | Cancelled)
 */
import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Event',
    },
    seats: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Confirmed', 'Cancelled'],
      default: 'Confirmed',
    },
  },
  {
    timestamps: true, // Replaces bookingDate
  }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;