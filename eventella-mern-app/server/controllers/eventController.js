/**
 * File: server/controllers/eventController.js
 * Purpose: Serve public event listings/details and provide admin CRUD operations.
 *
 * Filtering (getEvents): supports category, location (fuzzy), maxPrice (<=), and text query `q`
 * across multiple fields using case-insensitive regex.
 */
import Event from '../models/Event.js';

// @desc    Fetch all events
// @route   GET /api/events
// @access  Public
/**
 * GET /api/events
 * Query params: category, location, maxPrice, q
 * Returns: array of events matching filters
 */
const getEvents = async (req, res) => {
  const { category, location, q, maxPrice } = req.query;
  const filter = {};

  if (category) {
    filter.category = category;
  }
  if (location) {
    // partial, case-insensitive match to support values like "Cineplex, Downtown"
    filter.location = new RegExp(String(location).trim(), 'i');
  }
  if (maxPrice !== undefined && maxPrice !== null && String(maxPrice).trim() !== '') {
    const priceCap = Number(maxPrice);
    if (!Number.isNaN(priceCap)) {
      filter.price = { $lte: priceCap };
    }
  }
  if (q && String(q).trim()) {
    const regex = new RegExp(String(q).trim(), 'i'); // case-insensitive partial match
    filter.$or = [
      { title: regex },
      { description: regex },
      { location: regex },
      { artist: regex },
      { category: regex },
    ];
  }

  try {
    const events = await Event.find(filter);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single event
// @route   GET /api/events/:id
// @access  Public
/**
 * GET /api/events/:id
 * Returns: single event by id
 */
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create an event
// @route   POST /api/events
// @access  Private/Admin
/**
 * POST /api/events (admin)
 * Body: { title, category, location, date, price, availableSeats, imageURL, description, artist }
 * Returns: created event document
 */
const createEvent = async (req, res) => {
  const {
    title,
    category,
    location,
    date,
    price,
    availableSeats,
    imageURL,
    description,
    artist
  } = req.body;

  try {
    const event = new Event({
      title,
      category,
      location,
      date,
      price,
      availableSeats,
      imageURL,
      description,
      artist,
      // user: req.user._id, // If you want to link creator
    });

    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
/**
 * PUT /api/events/:id (admin)
 * Partially updates provided fields; preserves existing values when omitted.
 */
const updateEvent = async (req, res) => {
  const {
    title,
    category,
    location,
    date,
    price,
    availableSeats,
    imageURL,
    description,
    artist
  } = req.body;

  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      event.title = title || event.title;
      event.category = category || event.category;
      event.location = location || event.location;
      event.date = date || event.date;
      event.price = price || event.price;
      event.availableSeats = availableSeats || event.availableSeats;
      event.imageURL = imageURL || event.imageURL;
      event.description = description || event.description;
      event.artist = artist || event.artist;

      const updatedEvent = await event.save();
      res.json(updatedEvent);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
/**
 * DELETE /api/events/:id (admin)
 * Removes an event by id.
 */
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      await event.deleteOne(); // Use deleteOne()
      res.json({ message: 'Event removed' });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getEvents, getEventById, createEvent, updateEvent, deleteEvent };