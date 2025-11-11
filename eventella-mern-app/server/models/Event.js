import mongoose from 'mongoose';

const eventSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Movie', 'Concert', 'Play', 'Sports', 'Workshop'],
    },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    price: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    imageURL: { type: String, required: true },
    description: { type: String, required: true },
    artist: { type: String }, // Optional, based on image filters
  },
  {
    timestamps: true,
  }
);

// Text index to improve future search performance (optional but helpful)
try {
  eventSchema.index({
    title: 'text',
    description: 'text',
    location: 'text',
    artist: 'text',
    category: 'text',
  });
} catch (e) {
  // index creation failures won't block app start
}

const Event = mongoose.model('Event', eventSchema);

export default Event;