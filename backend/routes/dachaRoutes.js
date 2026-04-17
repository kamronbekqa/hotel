import express from 'express';
import {
  getAllDachas,
  getDachaById,
  createDacha,
  updateDacha,
  deleteDacha
} from '../controllers/dachaController.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllDachas);
router.get('/:id', getDachaById);

// Protected routes (Admin only)
router.post('/', verifyToken, verifyAdmin, createDacha);
router.put('/:id', verifyToken, verifyAdmin, updateDacha);
router.delete('/:id', verifyToken, verifyAdmin, deleteDacha);

export default router;
