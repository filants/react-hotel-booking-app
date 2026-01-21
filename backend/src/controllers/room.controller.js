import Room from '../models/Room.js';
import path from 'path';
import fs from 'fs';
import { log } from 'console';

export const getAvailableRooms = async (req, res) => {
  try {
    const { roomCategory, checkIn, checkOut, page } = req.query;

    const limit = 8;
    const pageNum = Math.max(parseInt(page, 10) || 1, 1);

    const filter = {};

    if (roomCategory && roomCategory !== 'all') {
      filter.category = roomCategory;
    }

    const [rooms, count] = await Promise.all([
      Room.find(filter)
        .limit(limit)
        .skip((pageNum - 1) * limit)
        .sort({ name: 1 }),
      Room.countDocuments(filter),
    ]);

    if (!checkIn || !checkOut) {
      return res.json({
        availableRooms: rooms,
        lastPage: Math.ceil(count / limit),
      });
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

    res.json({
      availableRooms,
      lastPage: Math.ceil(availableRooms.length / limit),
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await Room.findById(id);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    const {
      name,
      category,
      size,
      bed,
      description,
      bathroom,
      view,
      facilities,
      keepPictures,
    } = req.body;

    if (
      !name ||
      !category ||
      !size ||
      !bed ||
      !description ||
      !view ||
      !bathroom ||
      !facilities ||
      !keepPictures
    ) {
      return res
        .status(400)
        .json({ message: 'Please fill in all required fields' });
    }

    const bathroomArray = JSON.parse(bathroom);
    const facilitiesArray = JSON.parse(facilities);
    const keep = JSON.parse(keepPictures);

    if (!bathroomArray.length || !facilitiesArray.length) {
      return res.status(400).json({
        message: 'Bathroom and facilities are required',
      });
    }

    const uploadedFiles = req.files || [];
    const uploaded = uploadedFiles.map((f) => `/uploads/rooms/${f.filename}`);

    const uploadedNames = new Set(uploadedFiles.map((f) => f.filename));

    const toDelete = (room.pictures || []).filter((url) => !keep.includes(url));

    toDelete.forEach((url) => {
      const base = path.basename(url);
      if (uploadedNames.has(base)) return;

      const filePath = path.join(process.cwd(), 'uploads', 'rooms', base);
      fs.unlink(filePath, () => {});
    });

    room.name = name;
    room.category = category;
    room.size = size;
    room.bed = bed;
    room.description = description;
    room.bathroom = bathroomArray;
    room.view = view;
    room.facilities = facilitiesArray;

    room.pictures = [...keep, ...uploaded];

    await room.save();

    res.json(room);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createRoom = async (req, res) => {
  try {
    const {
      name,
      category,
      size,
      bed,
      description,
      bathroom,
      view,
      facilities,
    } = req.body;

    if (
      !name ||
      !category ||
      !size ||
      !bed ||
      !description ||
      !view ||
      !bathroom ||
      !facilities
    ) {
      return res
        .status(400)
        .json({ message: 'Please fill in all required fields' });
    }

    const bathroomArray = JSON.parse(bathroom);
    const facilitiesArray = JSON.parse(facilities);

    if (!bathroomArray.length || !facilitiesArray.length) {
      return res.status(400).json({
        message: 'Bathroom and facilities are required',
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: 'At least one picture is required',
      });
    }

    const pictures = (req.files || []).map(
      (f) => `/uploads/rooms/${f.filename}`,
    );

    const room = await Room.create({
      name,
      category,
      size,
      bed,
      description,
      bathroom: bathroomArray,
      view,
      facilities: facilitiesArray,
      pictures,
    });

    res.status(201).json(room);
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
      { new: true, runValidators: true },
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

    const limit = 8;
    const pageNum = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const skip = (pageNum - 1) * limit;

    const result = await Room.aggregate([
      { $unwind: '$bookings' },
      { $match: { 'bookings.user': userId } },
      { $sort: { 'bookings.checkIn': 1 } },

      {
        $facet: {
          data: [
            { $skip: skip },
            { $limit: limit },
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
          ],
          meta: [{ $count: 'total' }],
        },
      },
    ]);

    const reservations = result[0]?.data ?? [];
    const total = result[0]?.meta?.[0]?.total ?? 0;
    const lastPage = Math.max(1, Math.ceil(total / limit));

    res.json({ reservations, lastPage });
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
      { new: true },
    );

    if (!updatedRoom)
      return res.status(404).json({ error: 'Reservation not found' });

    res.json({ message: 'Reservation deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Could not delete reservation' });
  }
};
