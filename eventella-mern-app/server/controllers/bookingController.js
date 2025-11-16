/**
 * File: server/controllers/bookingController.js
 * Purpose: Handle booking lifecycle — create, list (self/admin), and cancel.
 */
import Booking from '../models/Booking.js';
import Event from '../models/Event.js';

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
/**
 * POST /api/bookings
 * Body: { eventId, seats }
 * Validates availability, reserves seats, and persists the booking.
 */
const createBooking = async (req, res) => {
  const { eventId, seats } = req.body;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.availableSeats < seats) {
      return res.status(400).json({ message: 'Not enough available seats' });
    }

    const totalPrice = event.price * seats;

    const booking = new Booking({
      user: req.user._id,
      event: eventId,
      seats,
      totalPrice,
    });

    // Update available seats
    event.availableSeats = event.availableSeats - seats;
    await event.save();

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
/**
 * GET /api/bookings/mybookings
 * Returns current user's bookings; filters out records for deleted events.
 */
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate(
      'event',
      'title date location imageURL'
    );
    
    // Filter out bookings where the event was deleted (event is null)
    const validBookings = bookings.filter(booking => booking.event !== null);
    
    res.json(validBookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings
// @access  Private/Admin
/**
 * GET /api/bookings (admin)
 * Returns all bookings with shallow user and event info populated.
 */
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('user', 'name email')
      .populate('event', 'title date');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel a booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
/**
 * PUT /api/bookings/:id/cancel
 * Allows the owning user to cancel a confirmed booking and restores seats.
 */
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if the user owns the booking
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Only cancel if it's already confirmed
    if (booking.status === 'Confirmed') {
      booking.status = 'Cancelled';

      // Restore available seats
      const event = await Event.findById(booking.event);
      if (event) {
        event.availableSeats += booking.seats;
        await event.save();
      }

      const updatedBooking = await booking.save();
      res.json(updatedBooking);
    } else {
      res.status(400).json({ message: 'Booking already cancelled' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createBooking, getMyBookings, getAllBookings, cancelBooking };