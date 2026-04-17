import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Maximize2, X, Phone, Bed, Bath, ArrowRight } from 'lucide-react';
import { dachaAPI } from '../services/api';
import '../components/Rooms/Rooms.css';

import { useTranslation } from 'react-i18next';

const Sales = () => {
  const { t } = useTranslation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProp, setSelectedProp] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const mockProperties = [
    {
      _id: 's1',
      title: 'Modern Beachfront Villa',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
      price: 1250000,
      location: 'Coastal Avenue, Zones 1',
      area: 350,
      bedrooms: 4,
      bathrooms: 3,
      description: 'Ultra-modern villa with direct beach access, panoramic windows, and smart home system.',
      status: 'available'
    },
    {
      _id: 's2',
      title: 'Cozy Mountain Cottage',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
      price: 450000,
      location: 'Highland Peaks, Zones 4',
      area: 120,
      bedrooms: 2,
      bathrooms: 1,
      description: 'Charming cottage nestled in the woods, featuring a stone fireplace and large terrace.',
      status: 'available'
    },
    {
      _id: 's3',
      title: 'Luxury Family Estate',
      image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop',
      price: 2800000,
      location: 'Grand Valley, Zones 2',
      area: 800,
      bedrooms: 6,
      bathrooms: 5,
      description: 'Expansive estate with guest house, swimming pool, tennis court, and lush gardens.',
      status: 'available'
    }
  ];

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await dachaAPI.getAll({ type: 'sale' });
      
      if (response.data.status === 'success' && response.data.data.dachas.length > 0) {
        setProperties(response.data.data.dachas);
      } else {
        setProperties(mockProperties);
      }
    } catch (err) {
      console.error('Error fetching properties, using mock data:', err);
      setProperties(mockProperties);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container flex items-center justify-center min-h-screen">
        <div className="loader-premium"></div>
      </div>
    );
  }

  return (
    <div className="page-container min-h-screen">
       <div className="section-header-premium text-center pt-32 mb-20">
          <motion.div 
            className="header-label-group flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="label-line"></span>
            <span className="label-text">{t('sales.subtitle') || "Real Estate"}</span>
            <span className="label-line"></span>
          </motion.div>
          <motion.h1 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {t('sales.title') || "Signature Properties for Sale"}
          </motion.h1>
        </div>

      <div className="container">
        {properties.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">No properties available for sale at the moment.</p>
          </div>
        ) : (
          <div className="rooms-grid pb-20">
            {properties.map((prop, index) => (
              <motion.div 
                key={prop._id}
                className="room-card"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              >
                <div className="room-image-wrapper">
                  <img src={prop.image} alt={prop.title} className="room-image" />
                  <div className="room-price-tag">
                    <span className="price-val">${prop.price.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="room-info-box">
                  <div className="room-meta-top">
                    <div className="room-meta-loc">
                      <MapPin size={14} />
                      <span>{prop.location}</span>
                    </div>
                  </div>

                  <h3 className="room-card-title">{prop.title}</h3>
                  <p className="room-card-desc">{prop.description}</p>
                  
                  <div className="room-card-amenities">
                    <div className="amenity-item" title="Bedrooms">
                      <Bed size={16} /> <span className="ml-2 text-xs">{prop.bedrooms}</span>
                    </div>
                    <div className="amenity-item" title="Bathrooms">
                      <Bath size={16} /> <span className="ml-2 text-xs">{prop.bathrooms}</span>
                    </div>
                    <div className="amenity-item" title="Area">
                      <Maximize2 size={16} /> <span className="ml-2 text-xs">{prop.area}m²</span>
                    </div>
                  </div>

                  <div className="room-card-footer">
                    <button className="btn-room-details" onClick={() => setSelectedProp(prop)}>
                      {t('rooms.details') || "Explore Estate"}
                    </button>
                    <button className="btn-room-book">
                      {t('sales.contactAgent') || "Inquire"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Premium Detail Modal */}
      <AnimatePresence>
        {selectedProp && (
          <motion.div 
            className="gallery-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProp(null)}
          >
            <motion.div 
              className="gallery-modal-inner"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{height: 'auto', maxWidth: '800px'}}
            >
              <button className="gallery-close" onClick={() => setSelectedProp(null)}>
                <X size={24} />
              </button>
              
              <div className="modal-stage" style={{flexDirection: 'column'}}>
                <div className="room-image-wrapper" style={{height: '400px'}}>
                  <img src={selectedProp.image} alt={selectedProp.title} className="room-image" />
                </div>

                <div className="stage-right" style={{width: '100%', padding: '40px', background: 'var(--clr-white)'}}>
                  <div className="modal-header">
                    <span className="modal-label">{selectedProp.location}</span>
                    <h2 className="modal-title" style={{fontSize: '2rem'}}>{selectedProp.title}</h2>
                  </div>
                  
                  <div className="modal-body">
                    <p className="modal-desc">{selectedProp.description}</p>
                    
                    <div className="modal-specs-grid" style={{marginBottom: '40px'}}>
                      <div className="spec-box">
                        <Maximize2 size={18}/>
                        <span>{selectedProp.area} m² Area</span>
                      </div>
                      <div className="spec-box">
                        <Bed size={18}/>
                        <span>{selectedProp.bedrooms} Bedrooms</span>
                      </div>
                    </div>

                    <div className="modal-price-footer">
                      <div className="price-display">
                        <span className="price-val">${selectedProp.price.toLocaleString()}</span>
                      </div>
                      <button className="btn-modal-action">{t('sales.contactAgent') || "Contact Agent"}</button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sales;
