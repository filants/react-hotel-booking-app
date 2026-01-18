import express from 'express';
import {
  getAvailableRooms,
  createRoom,
  updateRoom,
  getReservations,
  getRoomDetails,
  addBooking,
  deleteReservation,
} from '../controllers/index.js';
import { requireAuth } from '../middleware/requireAuth.js';
import { requireAdmin } from '../middleware/requireAdmin.js';
import { uploadRoomPictures } from '../middleware/uploadRooms.js';

const router = express.Router();

router.get('/', getAvailableRooms);
router.post(
  '/',
  requireAuth,
  requireAdmin,
  uploadRoomPictures.array('pictures', 10),
  createRoom,
);
router.put(
  '/:id',
  requireAuth,
  requireAdmin,
  uploadRoomPictures.array('pictures', 10),
  updateRoom,
);
router.get('/reservations', requireAuth, getReservations);
router.delete('/reservations/:reservationId', requireAuth, deleteReservation);
router.get('/:id', getRoomDetails);
router.post('/:id', requireAuth, addBooking);

export default router;
