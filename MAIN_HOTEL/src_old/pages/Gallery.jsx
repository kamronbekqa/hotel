import React from 'react';
import Gallery from '../components/Gallery/Gallery';
import { motion } from 'framer-motion';

const GalleryPage = () => {
  return (
    <motion.div 
      className="page-container pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Gallery />
    </motion.div>
  );
};

export default GalleryPage;
