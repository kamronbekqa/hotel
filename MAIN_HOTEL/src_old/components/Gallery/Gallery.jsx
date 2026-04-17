import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import './Gallery.css';

const galleryImages = [
  'https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=2070&auto=format&fit=crop', // Alpine Peak
  'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2070&auto=format&fit=crop', // Forest Cabin
  'https://images.unsplash.com/photo-1600585154340-be6199f7e009?q=80&w=2070&auto=format&fit=crop', // Modern Timber
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop', // Mountain Lake
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop', // Valley View
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop', // Snowy Range
  'https://images.unsplash.com/photo-1518733057094-95b53143d2a7?q=80&w=2070&auto=format&fit=crop', // Cabin Fog
  'https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2070&auto=format&fit=crop', // Forest Light
  'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=2070&auto=format&fit=crop', // Modern Chalet
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop', // Twilight Mountain
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=2070&auto=format&fit=crop', // Waterfall
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop' // Serene Lake
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="gallery-section section">
      <div className="container">
      <div className="section-header text-center">
         <motion.span 
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Visual Harmony
        </motion.span>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Spaces
        </motion.h2>
      </div>

      <div className="gallery-grid">
        {galleryImages.map((img, index) => (
          <motion.div 
            key={index}
            className="gallery-item"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedImage(img)}
            layoutId={`image-${index}`}
          >
            <img src={img} alt={`Space ${index + 1}`} />
            <div className="gallery-overlay">
              <ZoomIn color="white" size={32} />
            </div>
          </motion.div>
        ))}
      </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button className="lightbox-close">
              <X size={32} />
            </button>
            <motion.img 
              src={selectedImage} 
              alt="Selected Space" 
              className="lightbox-image"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
