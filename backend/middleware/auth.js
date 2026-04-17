import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Verify JWT token
export const verifyToken = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'error',
        message: 'No token provided. Authorization denied.'
      });
    }

    // Extract token
    const token = authHeader.split(' ')[1];

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from token
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return res.status(401).json({
          status: 'error',
          message: 'User not found. Authorization denied.'
        });
      }

      // Attach user to request
      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          status: 'error',
          message: 'Token expired. Please login again.'
        });
      }
      
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token. Authorization denied.'
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error during authentication'
    });
  }
};

// Verify admin role
export const verifyAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Access denied. Admin privileges required.'
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error during authorization'
    });
  }
};
