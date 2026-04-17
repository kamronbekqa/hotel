import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { dachaAPI, bookingAPI, usersAPI } from '../../services/api';
import { useTranslation } from 'react-i18next';
import './Booking.css';

const Booking = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    dachaId: '',
    name: '',
    email: '',
    telegramUser: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    message: ''
  });
  const [dachas, setDachas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDachas();
  }, []);

  const fetchDachas = async () => {
    try {
      const response = await dachaAPI.getAll({ status: 'available' });
      if (response.data && response.data.status === 'success') {
        // Limit to 3 distinct types if possible, or just the main ones
        setDachas(response.data.data.dachas.slice(0, 3));
      } else {
        // Fallback for demo/mock if API is not fully set up
        setDachas([
          { _id: '1', title: 'Alpine Peak Estate', price: '750', type: 'Luxury' },
          { _id: '2', title: 'Pine Forest Lodge', price: '500', type: 'Minimalist' },
          { _id: '3', title: 'Stone & Cedar Chalet', price: '620', type: 'Traditional' }
        ]);
      }
    } catch (err) {
      console.error('Error fetching dachas:', err);
      // Fallback
      setDachas([
        { _id: '1', title: 'Alpine Peak Estate', price: '750', type: 'Luxury' },
        { _id: '2', title: 'Pine Forest Lodge', price: '500', type: 'Minimalist' },
        { _id: '3', title: 'Stone & Cedar Chalet', price: '620', type: 'Traditional' }
      ]);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // 1. Submit to the working Mock API endpoint
      const response = await bookingAPI.create({
        ...formData,
        timestamp: new Date().toISOString(),
        type: 'BOOKING_REQUEST'
      });
      
      if (response.status === 201 || response.status === 200 || (response.data && response.data.id)) {
        // 2. Initial "Sent" notification
        setSuccess(t('booking.successSent'));
        
        // 3. Final "Received" notification with a slight delay
        setTimeout(() => {
          setSuccess(t('booking.successReceived'));
          setFormData({
            dachaId: '',
            name: '',
            email: '',
            telegramUser: '',
            checkIn: '',
            checkOut: '',
            guests: 1,
            message: ''
          });
          setLoading(false);
        }, 2000);
      } else {
         throw new Error('Unexpected API response');
      }
    } catch (err) {
      console.error('Error creating booking:', err);
      setError(err.message || t('booking.errorMessage'));
      setLoading(false);
    }
  };

  return (
    <section className="booking-section section">
      <div className="booking-container">
        <motion.div 
          className="booking-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="booking-header">
            <h2 className="section-title">{t('booking.title')}</h2>
            <p className="booking-subtitle">{t('booking.subtitle')}</p>
          </div>
          
          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="alert alert-error">{error}</div>}

          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{t('booking.selectProperty')}</label>
              <select
                name="dachaId"
                value={formData.dachaId}
                onChange={handleChange}
                required
              >
                <option value="">{t('booking.chooseDacha')}</option>
                {dachas.map((dacha) => (
                  <option key={dacha._id} value={dacha._id}>
                    {dacha.title} — ${dacha.price} ({dacha.type})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>{t('booking.name')}</label>
                <input
                  type="text"
                  name="name"
                  placeholder={t('booking.namePlaceholder')}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>{t('booking.telegramUser')}</label>
                <input
                  type="text"
                  name="telegramUser"
                  placeholder={t('booking.telegramPlaceholder')}
                  value={formData.telegramUser}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>{t('booking.email')}</label>
              <input
                type="email"
                name="email"
                placeholder={t('booking.emailPlaceholder')}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>{t('booking.checkInLabel')}</label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="form-group">
                <label>{t('booking.checkOutLabel')}</label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  min={formData.checkIn || new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>{t('booking.guests')}</label>
              <select name="guests" value={formData.guests} onChange={handleChange}>
                {[1, 2, 3, 4, 5].map(n => (
                  <option key={n} value={n}>{t(`booking.guests${n}`)}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>{t('booking.message')}</label>
              <textarea
                name="message"
                rows="3"
                placeholder={t('booking.messagePlaceholder')}
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? t('booking.submitting') : t('booking.submit')}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Booking;
