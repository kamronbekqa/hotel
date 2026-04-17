import React, { useState } from 'react';

const BookingModal = ({ dacha, isOpen, onClose, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          dachaId: dacha._id
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        onSubmitSuccess();
        alert('Muovaffaqiyatli bron qilindi! Admin tez orada siz bilan bog\'lanadi.');
        onClose();
      } else {
        setError(data.message || 'Xatolik yuz berdi');
      }
    } catch (err) {
      setError('Server bilan bog\'lanishda xatolik');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass fade-in">
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="modal-header">
          <h2>Bron qilish</h2>
          <p>{dacha.title} — ${dacha.price}/kun</p>
        </div>

        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label>Ismingiz</label>
            <input 
              type="text" 
              name="name" 
              required 
              placeholder="Ismingizni kiriting"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Telefon</label>
              <input 
                type="tel" 
                name="phone" 
                required 
                placeholder="+998 90 123 45 67"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                required 
                placeholder="misol@mail.uz"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Kirish sanasi</label>
              <input 
                type="date" 
                name="checkIn" 
                required 
                value={formData.checkIn}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Chiqish sanasi</label>
              <input 
                type="date" 
                name="checkOut" 
                required 
                value={formData.checkOut}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Mehmonlar soni</label>
            <input 
              type="number" 
              name="guests" 
              min="1" 
              max="50"
              required 
              value={formData.guests}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Qo'shimcha xabar (ixtiyoriy)</label>
            <textarea 
              name="message" 
              rows="3"
              placeholder="Maxsus talablaringiz bo'lsa kiriting..."
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Yuborilmoqda...' : 'Bron qilishni tasdiqlash'}
          </button>
        </form>
      </div>

      <style jsx="true">{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
          padding: 20px;
        }

        .modal-content {
          background: #fff;
          padding: 40px;
          border-radius: 24px;
          width: 100%;
          max-width: 600px;
          position: relative;
          max-height: 90vh;
          overflow-y: auto;
        }

        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          font-size: 2rem;
          cursor: pointer;
          color: #888;
        }

        .modal-header {
          margin-bottom: 30px;
          text-align: center;
        }

        .modal-header p {
          color: var(--secondary);
          font-weight: 500;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        label {
          display: block;
          margin-bottom: 8px;
          font-size: 0.9rem;
          font-weight: 500;
        }

        input, textarea {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid #ddd;
          border-radius: 12px;
          font-family: inherit;
          font-size: 1rem;
          transition: var(--transition);
        }

        input:focus, textarea:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(26, 58, 58, 0.1);
        }

        .alert-error {
          background: #ffebee;
          color: #c62828;
          padding: 15px;
          border-radius: 12px;
          margin-bottom: 20px;
          font-size: 0.9rem;
          text-align: center;
        }

        @media (max-width: 500px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default BookingModal;
