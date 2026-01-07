import Room from '../models/Room.js';

export const createRoom = async (req, res) => {
  try {
    const {
      pictures,
      name,
      category,
      size,
      bed,
      description,
      bathroom,
      view,
      facilities,
      bookings,
    } = req.body;

    const room = await Room.create({
      pictures,
      name,
      category,
      size,
      bed,
      description,
      bathroom,
      view,
      facilities,
      bookings,
    });

    res.status(201).json({ error: null, room });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAvailableRooms = async (req, res) => {
  try {
    const { roomCategory, checkIn, checkOut } = req.query;

    const filter = {};

    if (roomCategory && roomCategory !== 'all') {
      filter.category = roomCategory;
    }

    const rooms = await Room.find(filter);

    if (!checkIn || !checkOut) {
      return res.status(200).json(rooms);
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

    res.json(availableRooms);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getRoomDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await Room.findById(id);

    if (!room) return res.status(404).json({ error: 'Room not found' });

    res.json(room);
  } catch (error) {
    res.status(500).json({ error: 'Could not load room' });
  }
};

export const addBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, adults, checkIn, checkOut } = req.body;

    if (!user || adults <= 0 || !checkIn || !checkOut)
      return res.status(400).json({ error: 'Invalid booking data' });

    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      {
        $push: { bookings: { user, adults, checkIn, checkOut } },
      },
      { new: true, runValidators: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.status(201).json({ message: 'Booking added' });
  } catch (error) {
    res.status(500).json({ error: 'Could not add new booking' });
  }
};

export const getReservations = async (req, res) => {
  try {
    const userId = req.user.id;

    const reservations = await Room.aggregate([
      { $unwind: '$bookings' },
      { $match: { 'bookings.user': userId } },
      {
        $project: {
          pictures: 1,
          name: 1,
          category: 1,
          size: 1,
          description: 1,
          bathroom: 1,
          view: 1,
          facilities: 1,
          booking: '$bookings',
        },
      },
      { $sort: { 'booking.checkIn': 1 } },
    ]);

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Could not load reservations' });
  }
};

export const deleteReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    if (!reservationId)
      return res.status(400).json({ error: 'Reservation id is required' });

    const updatedRoom = await Room.findOneAndUpdate(
      { 'bookings._id': reservationId, 'bookings.user': userId },
      { $pull: { bookings: { _id: reservationId, user: userId } } },
      { new: true }
    );

    if (!updatedRoom)
      return res.status(404).json({ error: 'Reservation not found' });

    res.json({ message: 'Reservation deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Could not delete reservation' });
  }
};
