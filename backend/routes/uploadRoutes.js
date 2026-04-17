import express from 'express';
import upload from '../middleware/upload.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// @desc    Upload image
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', verifyToken, verifyAdmin, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No file uploaded'
      });
    }

    // Return the file URL
    const fileUrl = `/uploads/${req.file.filename}`;

    res.status(200).json({
      status: 'success',
      message: 'Image uploaded successfully',
      data: {
        filename: req.file.filename,
        url: fileUrl,
        size: req.file.size
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error uploading file',
      error: error.message
    });
  }
});

export default router;
