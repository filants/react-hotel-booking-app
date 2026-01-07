import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  adults: {
    type: Number,
    required: true,
  },
  kids: {
    type: Number,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
});

const RoomSchema = new mongoose.Schema({
  pictures: {
    type: [String],
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
    trim: true,
  },
  bed: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  bathroom: {
    type: [String],
    required: true,
  },
  view: {
    type: String,
    required: true,
    trim: true,
  },
  facilities: {
    type: [String],
    required: true,
  },
  bookings: {
    type: [BookingSchema],
  },
});

export default mongoose.model('Room', RoomSchema);
