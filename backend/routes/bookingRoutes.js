import express from 'express';
import {
  createBooking,
  getAllBookings,
  getMyBookings,
  updateBookingStatus,
  deleteBooking,
  getBookingStats
} from '../controllers/bookingController.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public/Semi-public routes
router.post('/', createBooking); // Allow guest bookings

// Protected routes (Authenticated users)
router.get('/my', verifyToken, getMyBookings);

// Admin-only routes
router.get('/stats', verifyToken, verifyAdmin, getBookingStats);
router.get('/', verifyToken, verifyAdmin, getAllBookings);
router.put('/:id', verifyToken, verifyAdmin, updateBookingStatus);
router.delete('/:id', verifyToken, deleteBooking); // Admin or owner can delete

export default router;
