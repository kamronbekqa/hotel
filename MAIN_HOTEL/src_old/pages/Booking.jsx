import React from 'react';
import Booking from '../components/Booking/Booking';
import { motion } from 'framer-motion';

const BookingPage = () => {
  return (
    <motion.div 
      className="page-container pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Booking />
    </motion.div>
  );
};

export default BookingPage;
