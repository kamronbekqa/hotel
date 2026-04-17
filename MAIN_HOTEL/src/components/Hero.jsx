import React from 'react';

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <h1 className="fade-in">O'zbekistondagi Eng Saralangan <br/> <span>Dachalar To'plami</span></h1>
        <p className="fade-in">Tabiat qo'ynida, barcha qulayliklarga ega dachalarni biz bilan osongina bron qiling. Sifat va qulaylik kafolati.</p>
        <div className="hero-btns fade-in">
          <a href="#dachas" className="btn btn-primary">Dachalarni ko'rish</a>
          <a href="#about" className="btn btn-outline" style={{borderColor: '#fff', color: '#fff'}}>Biz haqimizda</a>
        </div>
      </div>

      <style jsx="true">{`
        .hero {
          height: 100vh;
          width: 100%;
          background: url('https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2000') no-repeat center center/cover;
          display: flex;
          align-items: center;
          position: relative;
          color: #fff;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7));
        }

        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          max-width: 900px !important;
        }

        .hero h1 {
          font-size: 4rem;
          color: #fff;
          margin-bottom: 20px;
          animation-delay: 0.1s;
        }

        .hero h1 span {
          color: var(--secondary);
        }

        .hero p {
          font-size: 1.25rem;
          margin-bottom: 40px;
          opacity: 0.9;
          animation-delay: 0.3s;
        }

        .hero-btns {
          display: flex;
          gap: 20px;
          justify-content: center;
          animation-delay: 0.5s;
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2.5rem;
          }
          .hero p {
            font-size: 1rem;
          }
          .hero-btns {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
