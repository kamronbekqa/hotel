import React from 'react';
import Winter from '../components/Winter/Winter';
import { motion } from 'framer-motion';

const WinterPage = () => {
  return (
    <motion.div 
      className="page-container pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Winter />
    </motion.div>
  );
};

export default WinterPage;
