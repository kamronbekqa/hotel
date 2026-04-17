import React, { useState, useEffect } from 'react';

const MOCK_DACHAS = [
  { _id: '1', title: 'Charvak Premium Resort', price: 500 },
  { _id: '2', title: 'Chimgan Forest Lodge', price: 300 },
  { _id: '3', title: 'Beldersay Sky View', price: 700 },
  { _id: '4', title: 'Humsan Riverside Villa', price: 250 }
];

const BookingSection = () => {
  const [dachas, setDachas] = useState(MOCK_DACHAS);
  const [formData, setFormData] = useState({
    dachaId: '',
    name: '',
    phone: '',
    email: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/dachas?limit=100')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success' && data.data.dachas.length > 0) {
          setDachas(data.data.dachas);
        }
      })
      .catch(err => console.error('Dachalarni yuklashda xato:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', msg: '' });

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setStatus({ type: 'success', msg: 'Muovaffaqiyatli band qilindi! Telegram orqali xabar yuborildi.' });
        setFormData({ dachaId: '', name: '', phone: '', email: '', checkIn: '', checkOut: '', guests: 1, message: '' });
      } else {
        setStatus({ type: 'error', msg: data.message || 'Xatolik yuz berdi' });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Server bilan bog\'lanib bo\'lmadi' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking-section" className="section booking-section">
      <div className="container">
        <div className="booking-card glass-dark">
          <div className="booking-info">
            <h2 style={{color: '#fff'}}>Dachani hoziroq band qiling</h2>
            <p style={{color: 'rgba(255,255,255,0.7)', marginBottom: '30px'}}>Ma'lumotlaringizni qoldiring, biz sizga 15 daqiqa ichida qo'ng'iroq qilamiz.</p>
            
            <div className="contact-info-list" style={{color: '#fff'}}>
              <div className="info-item">📞 +998 90 123 45 67</div>
              <div className="info-item">📍 Toshkent viloyati, Bo'stonliq t.</div>
              <div className="info-item">🕒 24/7 xizmat ko'rsatamiz</div>
            </div>
          </div>

          <form className="booking-form-inline" onSubmit={handleSubmit}>
            {status.msg && (
              <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                {status.msg}
              </div>
            )}
            
            <div className="form-grid">
              <div className="form-group">
                <label>Dachani tanlang</label>
                <select name="dachaId" required value={formData.dachaId} onChange={handleChange}>
                  <option value="">Tanlang...</option>
                  {dachas.map(d => (
                    <option key={d._id} value={d._id}>{d.title} (${d.price})</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Ismingiz</label>
                <input type="text" name="name" required placeholder="Ismingiz" value={formData.name} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Telefon raqamingiz</label>
                <input type="tel" name="phone" required placeholder="+998 90 ..." value={formData.phone} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Mehmonlar</label>
                <input type="number" name="guests" min="1" value={formData.guests} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Kelish sanasi</label>
                <input type="date" name="checkIn" required value={formData.checkIn} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Ketish sanasi</label>
                <input type="date" name="checkOut" required value={formData.checkOut} onChange={handleChange} />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={loading} style={{marginTop: '20px'}}>
              {loading ? 'Yuborilmoqda...' : 'Band qilish'}
            </button>
          </form>
        </div>
      </div>

      <style jsx="true">{`
        .booking-section {
          padding: 100px 0;
          background: url('https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2000') no-repeat center center/cover;
          position: relative;
        }

        .booking-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.5);
        }

        .booking-card {
          position: relative;
          z-index: 10;
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 50px;
          padding: 60px;
          border-radius: 30px;
          align-items: center;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .booking-form-inline label {
          color: rgba(255,255,255,0.8);
          font-size: 0.8rem;
          margin-bottom: 5px;
          display: block;
        }

        .booking-form-inline input, 
        .booking-form-inline select {
          padding: 12px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.1);
          color: #fff;
          width: 100%;
        }

        .booking-form-inline select option {
          background: var(--primary);
        }

        .alert {
          padding: 10px;
          border-radius: 10px;
          margin-bottom: 15px;
          font-size: 0.9rem;
          text-align: center;
        }

        .alert-success { background: rgba(76, 175, 80, 0.2); color: #81c784; border: 1px solid #4caf50; }
        .alert-error { background: rgba(244, 67, 54, 0.2); color: #e57373; border: 1px solid #f44336; }

        @media (max-width: 992px) {
          .booking-card { grid-template-columns: 1fr; padding: 30px; }
        }
      `}</style>
    </section>
  );
};

export default BookingSection;
