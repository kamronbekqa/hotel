import React from 'react';
import Rooms from '../components/Rooms/Rooms';
import { motion } from 'framer-motion';

const RoomsPage = () => {
  return (
    <motion.div 
      className="page-container pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Rooms />
    </motion.div>
  );
};

export default RoomsPage;
