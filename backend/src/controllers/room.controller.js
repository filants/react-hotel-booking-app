import Room from '../models/Room.js';

export const create = async (req, res) => {
  try {
    const {
      img,
      name,
      category,
      size,
      description,
      bathroom,
      view,
      facilities,
      bookings,
    } = req.body;

    const room = await Room.create({
      img,
      name,
      category,
      size,
      description,
      bathroom,
      view,
      facilities,
      bookings,
    });

    res.status(201).send({ error: null, room });
  } catch (error) {
    res.status(400).send({ error: error.message || 'Unknown error' });
  }
};

export const fetch = async (req, res) => {
  try {
    const { roomCategory, checkIn, checkOut } = req.query;

    const filter = {};

    if (roomCategory && roomCategory !== 'all') {
      filter.category = roomCategory;
    }

    const rooms = await Room.find(filter);

    if (!checkIn || !checkOut) {
      return res.status(200).send(rooms);
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const availableRooms = rooms.filter((room) => {
      if (!room.bookings || room.bookings.length === 0) return true;

      const hasOverlap = room.bookings.some((booking) => {
        const bookingStart = new Date(booking.checkIn);
        const bookingEnd = new Date(booking.checkOut);

        return bookingStart < end && start < bookingEnd;
      });

      return !hasOverlap;
    });

    res.status(200).send(availableRooms);
  } catch (error) {
    res.status(400).send({ error: error.message || 'Unknown error' });
  }
};
