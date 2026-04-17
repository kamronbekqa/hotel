import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import './Slider.css';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2000&auto=format&fit=crop',
    title: 'Modern Mountain Lodge',
    subtitle: 'Exclusive Retreat',
    description: 'Breathtaking views and premium luxury in the heart of nature.'
  },
  {
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2000&auto=format&fit=crop',
    title: 'Glass Forest Villa',
    subtitle: 'Eco-Luxury',
    description: 'Experience seamless living between nature and modern design.'
  },
  {
    image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=2000&auto=format&fit=crop',
    title: 'Alpine Summit Dacha',
    subtitle: 'High-Altitude Comfort',
    description: 'The ultimate destination for peace and tranquility.'
  }
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="featured-slider-wrapper">
      <section className="featured-slider">
        <AnimatePresence mode="wait">
          <motion.div 
            key={current}
            className="slide-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div 
              className="slide-bg" 
              style={{ backgroundImage: `url(${slides[current].image})` }}
            >
              <div className="slide-overlay"></div>
            </div>

            <div className="slide-content">
              <motion.span 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="slide-subtitle"
              >
                {slides[current].subtitle}
              </motion.span>
              <motion.h2 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="slide-title"
              >
                {slides[current].title}
              </motion.h2>
              <motion.p 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="slide-desc"
              >
                {slides[current].description}
              </motion.p>
              <motion.button 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="slide-btn"
              >
                View Property <ArrowRight size={18} />
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="slider-controls">
          <button className="control-btn" onClick={prev}><ChevronLeft size={24} /></button>
          <div className="slider-dots">
            {slides.map((_, i) => (
              <div 
                key={i} 
                className={`dot ${i === current ? 'active' : ''}`}
                onClick={() => setCurrent(i)}
              ></div>
            ))}
          </div>
          <button className="control-btn" onClick={next}><ChevronRight size={24} /></button>
        </div>
      </section>
    </div>
  );
};

export default Slider;
