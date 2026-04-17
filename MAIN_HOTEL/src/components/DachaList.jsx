import React, { useState, useEffect } from 'react';
import DachaCard from './DachaCard';
import BookingModal from './BookingModal';

const MOCK_DACHAS = [
  {
    _id: '1',
    title: 'Charvak Premium Resort',
    description: 'Gidrometeodan tepada joylashgan dabdabali dacha. Basseyndan Charvak suv omboriga ajoyib ko\'rinish. Barcha qulayliklar mavjud.',
    price: 500,
    type: 'rent',
    image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=1000',
    location: 'Charvak, Toshkent vil.',
    features: ['Charvak manzarasi', 'Qishki basseyn', 'Sauna', 'Bilyard']
  },
  {
    _id: '2',
    title: 'Chimgan Forest Lodge',
    description: 'Archa va qarag\'aylar orasida joylashgan shinam dacha. Tabiat qo\'ynida dam olishni xohlovchilar uchun eng yaxshi tanlov.',
    price: 300,
    type: 'rent',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1000',
    location: 'Chimgan, Bo\'stonliq',
    features: ['O\'rmon manzarasi', 'Kamin', 'BBQ zona']
  },
  {
    _id: '3',
    title: 'Beldersay Sky View',
    description: 'Eng baland nuqtada joylashgan zamonaviy dacha. Kanat yo\'liga juda yaqin. High-tech uslubida qurilgan.',
    price: 700,
    type: 'rent',
    image: 'https://images.unsplash.com/photo-1514894780063-58813219ddc9?q=80&w=1000',
    location: 'Beldersoy, Toshkent vil.',
    features: ['Panorama oyna', 'Isitiladigan basseyn', 'Smart Home']
  }
];

const DachaList = () => {
  const [dachas, setDachas] = useState(MOCK_DACHAS);
  const [loading, setLoading] = useState(true);
  const [selectedDacha, setSelectedDacha] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDachas = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dachas');
        const data = await response.json();
        if (data.status === 'success' && data.data.dachas.length > 0) {
          setDachas(data.data.dachas);
        }
      } catch (error) {
        console.error('Failed to fetch dachas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDachas();
  }, []);

  const handleBookClick = (dacha) => {
    setSelectedDacha(dacha);
    setIsModalOpen(true);
  };

  return (
    <section id="dachas" className="section dachas-section">
      <div className="container">
        <h2 className="section-title fade-in">Bizning Eng Yaxshi Dachalarimiz</h2>
        
        {loading ? (
          <div className="loading-state">Ma'lumotlar yuklanmoqda...</div>
        ) : (
          <div className="grid grid-3">
            {dachas.map((dacha) => (
              <DachaCard 
                key={dacha._id} 
                dacha={dacha} 
                onBook={handleBookClick} 
              />
            ))}
          </div>
        )}

        {selectedDacha && (
          <BookingModal 
            dacha={selectedDacha} 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)}
            onSubmitSuccess={() => {
              // Option to refresh data or show success
            }}
          />
        )}
      </div>

      <style jsx="true">{`
        .section {
          padding: 100px 0;
        }

        .dachas-section {
          background-color: #fcfcfc;
        }

        .loading-state {
          text-align: center;
          padding: 50px;
          color: #888;
          font-size: 1.2rem;
        }

        @media (max-width: 768px) {
          .section {
            padding: 60px 0;
          }
        }
      `}</style>
    </section>
  );
};

export default DachaList;
