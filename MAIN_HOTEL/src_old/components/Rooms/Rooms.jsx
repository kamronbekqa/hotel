import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Users, MapPin, Wifi, Coffee, Wind, Tv, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Rooms.css';

const Rooms = () => {
   const { t } = useTranslation();
   const [selectedRoom, setSelectedRoom] = useState(null);
   const [activeImageIndex, setActiveImageIndex] = useState(0);

   const rooms = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=2070&auto=format&fit=crop',
      title: t('rooms.title_1') || 'Alpine Peak Estate',
      price: '$750',
      frequency: t('rooms.night'),
      description: t('rooms.desc_1') || 'A masterpiece of timber and glass, perched on the highest ridge with 360-degree mountain views.',
      capacity: 4,
      location: t('rooms.loc_1') || 'Ridge Sector 1',
      amenities: [
        { icon: <Wifi size={16} />, label: 'Fiber Wifi' },
        { icon: <Wind size={16} />, label: t('rooms.amenity_climate') || 'Climate' },
        { icon: <Coffee size={16} />, label: t('rooms.amenity_chef') || 'Sommelier Kit' }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1449156001437-37c645d9bc70?q=80&w=2070&auto=format&fit=crop'
      ]
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1518733057094-95b53143d2a7?q=80&w=1930&auto=format&fit=crop',
      title: t('rooms.title_2') || 'Pine Forest Lodge',
      price: '$500',
      frequency: t('rooms.night'),
      description: t('rooms.desc_2') || 'Minimalist architecture hidden deep within the pine reserve, designed for ultimate silence and focus.',
      capacity: 2,
      location: t('rooms.loc_2') || 'Evergreen Zone',
      amenities: [
        { icon: <Wifi size={16} />, label: 'Free Wifi' },
        { icon: <Users size={16} />, label: t('rooms.amenity_couple') || 'Couple Size' },
        { icon: <Tv size={16} />, label: t('rooms.amenity_tech') || 'Smart Tech' }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1518733057094-95b53143d2a7?q=80&w=1930&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-be6199f7e009?q=80&w=2070&auto=format&fit=crop'
      ]
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop',
      title: t('rooms.title_3') || 'Stone & Cedar Chalet',
      price: '$620',
      frequency: t('rooms.night'),
      description: t('rooms.desc_3') || 'Traditional materials meet contemporary design. Features a private outdoor heated spa.',
      capacity: 6,
      location: t('rooms.loc_3') || 'Highland Ridge',
      amenities: [
        { icon: <Wind size={16} />, label: t('rooms.amenity_heating') || 'Heating' },
        { icon: <Coffee size={16} />, label: t('rooms.amenity_kitchen') || 'Chef Kitchen' },
        { icon: <Wifi size={16} />, label: 'Fast Wifi' }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop'
      ]
    }
  ];

  const openGallery = (room) => {
    setSelectedRoom(room);
    setActiveImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setSelectedRoom(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % selectedRoom.gallery.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + selectedRoom.gallery.length) % selectedRoom.gallery.length);
  };

  return (
    <section id="rooms" className="rooms-section">
      <div className="container">
        <div className="section-header-premium">
          <motion.div 
            className="header-label-group"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <span className="label-line"></span>
            <span className="label-text">{t('rooms.subtitle') || "Accommodations"}</span>
          </motion.div>
          
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {t('rooms.title') || "Our Curated Stays"}
          </motion.h2>
        </div>

        <div className="rooms-grid">
          {rooms.map((room, index) => (
            <motion.div 
              key={room.id}
              className="room-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="room-image-wrapper">
                <img src={room.image} alt={room.title} className="room-image" />
                <div className="room-image-overlay">
                  <button className="view-gallery-btn" onClick={() => openGallery(room)}>
                    <Maximize2 size={24} />
                  </button>
                </div>
                <div className="room-price-tag">
                  <span className="price-val">{room.price}</span>
                  <span className="price-unit">/ {t('rooms.night')}</span>
                </div>
              </div>
              
              <div className="room-info-box">
                <div className="room-meta-top">
                  <div className="room-meta-loc">
                    <MapPin size={14} />
                    <span>{room.location}</span>
                  </div>
                  <div className="room-meta-cap">
                    <Users size={14} />
                    <span>{room.capacity}</span>
                  </div>
                </div>

                <h3 className="room-card-title">{room.title}</h3>
                <p className="room-card-desc">{room.description}</p>
                
                <div className="room-card-amenities">
                  {room.amenities.slice(0, 3).map((amenity, i) => (
                    <div key={i} className="amenity-item" title={amenity.label}>
                      {amenity.icon}
                    </div>
                  ))}
                </div>

                <div className="room-card-footer">
                  <button className="btn-room-details" onClick={() => openGallery(room)}>
                    {t('rooms.details') || "View Details"}
                  </button>
                  <button className="btn-room-book">
                    {t('rooms.bookRoom') || "Book Now"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Premium Gallery Modal */}
      <AnimatePresence>
        {selectedRoom && (
          <motion.div 
            className="gallery-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGallery}
          >
            <motion.div 
              className="gallery-modal-inner"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="gallery-close" onClick={closeGallery}>
                <X size={24} />
              </button>

              <div className="modal-stage">
                <div className="stage-left">
                  <div className="main-viewport">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={activeImageIndex}
                        src={selectedRoom.gallery[activeImageIndex]} 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                        className="viewport-img"
                      />
                    </AnimatePresence>
                    
                    <div className="stage-nav">
                      <button className="nav-btn prev" onClick={prevImage}><ChevronLeft size={28}/></button>
                      <button className="nav-btn next" onClick={nextImage}><ChevronRight size={28}/></button>
                    </div>
                  </div>
                  
                  <div className="thumb-strip">
                    {selectedRoom.gallery.map((img, idx) => (
                      <div 
                        key={idx} 
                        className={`thumb-item ${idx === activeImageIndex ? 'active' : ''}`}
                        onClick={() => setActiveImageIndex(idx)}
                      >
                        <img src={img} alt="Thumbnail" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="stage-right">
                  <div className="modal-header">
                    <span className="modal-label">{selectedRoom.location}</span>
                    <h2 className="modal-title">{selectedRoom.title}</h2>
                  </div>
                  
                  <div className="modal-body">
                    <p className="modal-desc">{selectedRoom.description}</p>
                    
                    <div className="modal-specs-grid">
                      <div className="spec-box">
                        <Users size={18}/>
                        <span>{selectedRoom.capacity} {t('booking.guests')}</span>
                      </div>
                      <div className="spec-box">
                        <Wifi size={18}/>
                        <span>Ultra-Fast WiFi</span>
                      </div>
                    </div>

                    <div className="modal-price-footer">
                      <div className="price-display">
                        <span className="price-val">{selectedRoom.price}</span>
                        <span className="price-unit">/ {t('rooms.night')}</span>
                      </div>
                      <button className="btn-modal-action">{t('booking.bookNow') || "Reserve"}</button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Rooms;
