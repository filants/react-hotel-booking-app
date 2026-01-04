import express from 'express';
import {
  getAvailableRooms,
  createRoom,
  getReservations,
  getRoomDetails,
  addBooking,
  deleteReservation,
} from '../controllers/index.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

router.get('/', getAvailableRooms);
router.post('/create', createRoom);
router.get('/reservations', requireAuth, getReservations);
router.delete('/reservations/:reservationId', requireAuth, deleteReservation);
router.get('/:id', getRoomDetails);
router.post('/:id/addBooking', requireAuth, addBooking);

export default router;
