import React from 'react';
import Summer from '../components/Summer/Summer';
import Winter from '../components/Winter/Winter';
import { motion } from 'framer-motion';

const ExperiencePage = () => {
  return (
    <div className="page-container section-coastal min-h-screen">
      <motion.div 
        className="text-center py-20 pt-32 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="glass-card max-w-4xl mx-auto">
          <h1 className="hero-title" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
            Curated Experiences
          </h1>
          <p className="hero-text" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Whether you seek the warmth of the summer sun or the cozy embrace of winter, we have something special for you.
          </p>
        </div>
      </motion.div>
      <Summer />
      <Winter />
    </div>
  );
};

export default ExperiencePage;
