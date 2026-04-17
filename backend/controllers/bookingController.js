import Booking from '../models/Booking.js';
import Dacha from '../models/Dacha.js';
import { sendTelegramMessage, formatBookingMessage } from '../utils/telegram.js';

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public (can be created without auth for guest bookings)
export const createBooking = async (req, res, next) => {
  try {
    const { dachaId, name, email, phone, checkIn, checkOut, guests, message } = req.body;

    // Validate required fields
    if (!dachaId || !name || !email || !phone || !checkIn || !checkOut || !guests) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide all required fields'
      });
    }

    // Check if dacha exists in DB
    let dacha = null;
    try {
      if (dachaId && dachaId.length > 5) { // Simple check to see if it's a valid MongoID
        dacha = await Dacha.findById(dachaId);
      }
    } catch (err) {
      console.warn('Dacha find error (possibly mock ID):', err.message);
    }

    // Create booking data structure
    const bookingData = {
      dachaId,
      name,
      email,
      phone,
      checkIn,
      checkOut,
      guests,
      message: message || '',
      userId: req.user ? req.user._id : null,
      status: 'pending'
    };

    let booking;
    let dbError = false;

    try {
      booking = await Booking.create(bookingData);
      // Try to populate if possible
      await booking.populate('dachaId', 'title price type image');
    } catch (error) {
      console.error('Database Error during booking:', error.message);
      dbError = true;
      // Use raw data for telegram notification if DB failed
      // Try to guess title from ID if it's one of our mock ones
      const mockTitles = { '1': 'Charvak Premium', '2': 'Chimgan Forest', '3': 'Beldersay Sky', '4': 'Humsan Riverside' };
      booking = { 
        ...bookingData, 
        dachaId: { title: mockTitles[dachaId] || 'Dacha (Demo)', price: '?' } 
      };
    }

    // Emit real-time notification to admin
    if (req.io) {
      req.io.to('admin_room').emit('new_booking', {
        message: `New booking request from ${name} (DB: ${dbError ? 'Down' : 'OK'})`,
        booking
      });
    }

    // Send Telegram Notification
    const telegramMessage = formatBookingMessage(booking);
    await sendTelegramMessage(telegramMessage);

    res.status(201).json({
      status: 'success',
      message: dbError 
        ? 'Xabar yuborildi (Demo rejim). Ma\'lumotlar omboriga ulanishda xato bor.' 
        : 'Booking created successfully. Awaiting approval.',
      data: { booking, demo: dbError }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
export const getAllBookings = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    // Build query
    const query = {};
    if (status) {
      query.status = status;
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const bookings = await Booking.find(query)
      .populate('dachaId', 'title price type image location')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Booking.countDocuments(query);

    res.status(200).json({
      status: 'success',
      data: {
        bookings,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's own bookings
// @route   GET /api/bookings/my
// @access  Private
export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate('dachaId', 'title price type image location')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      data: { bookings }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Private/Admin
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid status. Must be pending, approved, or rejected'
      });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        status: 'error',
        message: 'Booking not found'
      });
    }

    // Update booking status
    booking.status = status;
    await booking.save();

    // If approved, update dacha status to booked
    if (status === 'approved') {
      await Dacha.findByIdAndUpdate(booking.dachaId, { status: 'booked' });
    }

    // If rejected or changed from approved, set dacha back to available
    if (status === 'rejected' || (booking.status === 'approved' && status !== 'approved')) {
      await Dacha.findByIdAndUpdate(booking.dachaId, { status: 'available' });
    }

    await booking.populate('dachaId', 'title price type image');

    // Emit real-time notification to user (and admin for sync)
    if (req.io) {
      req.io.emit('booking_status_updated', {
        bookingId: booking._id,
        status,
        message: `Your booking for ${booking.dachaId.title} has been ${status}.`
      });
    }

    res.status(200).json({
      status: 'success',
      message: `Booking ${status} successfully`,
      data: { booking }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private (Admin or booking owner)
export const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        status: 'error',
        message: 'Booking not found'
      });
    }

    // Check if user is admin or booking owner
    const isAdmin = req.user.role === 'admin';
    const isOwner = booking.userId && booking.userId.toString() === req.user._id.toString();

    if (!isAdmin && !isOwner) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to delete this booking'
      });
    }

    // If booking was approved, set dacha back to available
    if (booking.status === 'approved') {
      await Dacha.findByIdAndUpdate(booking.dachaId, { status: 'available' });
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get booking statistics for admin dashboard
// @route   GET /api/bookings/stats
// @access  Private/Admin
export const getBookingStats = async (req, res, next) => {
  try {
    // Total bookings
    const totalBookings = await Booking.countDocuments();
    
    // Pending bookings
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    
    // Approved bookings
    const approvedBookings = await Booking.countDocuments({ status: 'approved' });
    
    // Total dachas
    const totalDachas = await Dacha.countDocuments();
    
    // Available dachas
    const availableDachas = await Dacha.countDocuments({ status: 'available' });
    
    // Recent bookings (last 5)
    const recentBookings = await Booking.find()
      .populate('dachaId', 'title price type')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      status: 'success',
      data: {
        stats: {
          totalBookings,
          pendingBookings,
          approvedBookings,
          totalDachas,
          availableDachas
        },
        recentBookings
      }
    });
  } catch (error) {
    next(error);
  }
};
