import React from 'react';
import Contact from '../components/Contact/Contact';
import { motion } from 'framer-motion';

const ContactPage = () => {
  return (
    <motion.div 
      className="page-container pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Contact />
    </motion.div>
  );
};

export default ContactPage;
