import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DachaList from './components/DachaList';
import Services from './components/Services';
import BookingSection from './components/BookingSection';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <DachaList />
        <Services />
        <BookingSection />
        
        {/* Simple About Section for "Wow" factor */}
        <section id="about" className="section about">
          <div className="container">
            <div className="about-grid">
              <div className="about-content">
                <h2 className="section-title" style={{textAlign: 'left', marginLeft: '0'}}>Bizning Maqsadimiz</h2>
                <p>Biz O'zbekistondagi eng yaxshi dam olish maskanlarini bitta platformada jamladik. Maqsadimiz — mijozlarga eng yuqori darajadagi xizmatni ko'rsatish va ularning vaqtini tejash.</p>
                <ul className="stats">
                  <li><strong>100+</strong> <span>Dachalar</span></li>
                  <li><strong>5000+</strong> <span>Mijozlar</span></li>
                  <li><strong>24/7</strong> <span>Yordam</span></li>
                </ul>
              </div>
              <div className="about-image">
                <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1000" alt="About" className="card" />
              </div>
            </div>
          </div>
          <style jsx="true">{`
            .about {
              background-color: #f0f4f4;
            }
            .about-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 80px;
              align-items: center;
            }
            .about-image img {
              width: 100%;
              height: 400px;
              object-fit: cover;
            }
            .stats {
              display: flex;
              gap: 40px;
              list-style: none;
              margin-top: 40px;
            }
            .stats li {
              display: flex;
              flex-direction: column;
            }
            .stats strong {
              font-size: 2rem;
              color: var(--secondary);
            }
            .stats span {
              font-size: 0.9rem;
              opacity: 0.7;
            }
            @media (max-width: 768px) {
              .about-grid {
                grid-template-columns: 1fr;
                gap: 40px;
              }
            }
          `}</style>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
