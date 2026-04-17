import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowRight, Users, Wifi } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dachaAPI } from '../services/api';
import '../components/Rooms/Rooms.css';

import { useTranslation } from 'react-i18next';

const Rent = () => {
  const { t } = useTranslation();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRentals();
  }, []);

  const mockRentals = [
    {
      _id: '1',
      title: 'Ocean Breeze Dacha',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
      price: 150,
      location: 'Shoreline Drive, Zone A',
      status: 'available',
      capacity: 4,
      description: 'A beautiful coastal retreat with private beach access and stunning ocean views.'
    },
    {
      _id: '2',
      title: 'Azure Cliffside Villa',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
      price: 280,
      location: 'Cliffview Road, Zone B',
      status: 'available',
      capacity: 6,
      description: 'Perched on a cliff, this villa offers panoramic views of the turquoise sea.'
    },
    {
      _id: '3',
      title: 'Sunset Sands Cabin',
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop',
      price: 120,
      location: 'Golden Beach, Zone C',
      status: 'booked',
      capacity: 2,
      description: 'A cozy wooden cabin perfect for watching the sunset over the horizon.'
    }
  ];

  const fetchRentals = async () => {
    try {
      setLoading(true);
      const response = await dachaAPI.getAll({ type: 'rent' });
      
      if (response.data.status === 'success' && response.data.data.dachas.length > 0) {
        setRentals(response.data.data.dachas);
      } else {
        setRentals(mockRentals);
      }
    } catch (err) {
      console.error('Error fetching rentals, using mock data:', err);
      setRentals(mockRentals);
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
    <div className="rent-page">
      {/* Page Hero */}
      <div className="rent-page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-header-premium" style={{ alignItems: 'flex-start', textAlign: 'left' }}>
              <div className="header-label-group">
                <span className="label-line"></span>
                <span className="label-text">{t('rent.subtitle') || "Short Term"}</span>
              </div>
              <h1 className="section-title" style={{ color: 'var(--clr-white)', marginBottom: 0 }}>
                {t('rent.title') || "Escape to our Curated Rentals"}
              </h1>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Rentals Grid */}
      <div className="rent-page-body">
        <div className="container">
        {rentals.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">No properties available for rent at the moment.</p>
          </div>
        ) : (
          <div className="rooms-grid pb-20">
            {rentals.map((rental, index) => (
              <motion.div 
                key={rental._id}
                className="room-card"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              >
                <div className="room-image-wrapper">
                  <img src={rental.image} alt={rental.title} className="room-image" />
                  <div className="room-price-tag">
                    <span className="price-val">${rental.price}</span>
                    <span className="price-unit">/ {t('rooms.night') || 'night'}</span>
                  </div>
                  {rental.status === 'booked' && (
                    <div className="room-status-badge" style={{top: '20px', left: '20px', background: 'rgba(255,255,255,0.9)', color: '#C47260', padding: '6px 12px', fontSize: '0.75rem', fontWeight: '700', borderRadius: '40px'}}>
                      Fully Booked
                    </div>
                  )}
                </div>
                
                <div className="room-info-box">
                  <div className="room-meta-top">
                    <div className="room-meta-loc">
                      <MapPin size={14} />
                      <span>{rental.location}</span>
                    </div>
                    <div className="room-meta-cap">
                      <Users size={14} />
                      <span>{rental.capacity || 2} {t('booking.guests')}</span>
                    </div>
                  </div>

                  <h3 className="room-card-title">{rental.title}</h3>
                  <p className="room-card-desc">{rental.description}</p>
                  
                  <div className="room-card-amenities">
                    <div className="amenity-item"><Wifi size={16} /></div>
                    <div className="amenity-item"><Calendar size={16} /></div>
                  </div>

                  <div className="room-card-footer">
                    <Link to="/booking" className="btn-room-book w-full flex items-center justify-center gap-2">
                      {t('rent.bookNow') || "Book Now"} <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rent;
