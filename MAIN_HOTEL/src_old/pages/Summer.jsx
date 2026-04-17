import React from 'react';
import Summer from '../components/Summer/Summer';
import { motion } from 'framer-motion';

const SummerPage = () => {
  return (
    <motion.div 
      className="page-container pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Summer />
    </motion.div>
  );
};

export default SummerPage;
