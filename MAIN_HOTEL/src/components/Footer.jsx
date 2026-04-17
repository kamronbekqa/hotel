import React from 'react';

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-info">
            <div className="logo">
              <span className="logo-icon">🏡</span>
              <span className="logo-text" style={{color: '#fff'}}>LUXE DACHA</span>
            </div>
            <p>O'zbekistondagi eng hashamatli va shinam dachalarni bron qilish platformasi. Biz bilan dam olishingiz unutilmas bo'ladi.</p>
          </div>

          <div className="footer-links">
            <h4>Tezkor havolalar</h4>
            <ul>
              <li><a href="#hero">Bosh sahifa</a></li>
              <li><a href="#dachas">Dachalar</a></li>
              <li><a href="#about">Biz haqimizda</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Bog'lanish</h4>
            <ul>
              <li>📍 Toshkent sh., Chilonzor tumani</li>
              <li>📞 +998 90 123 45 67</li>
              <li>✉️ info@luxedacha.uz</li>
              <li>🕒 24/7 mijozlarni qo'llab-quvvatlash</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 LUXE DACHA. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>

      <style jsx="true">{`
        .footer {
          background: #111;
          color: #fff;
          padding: 80px 0 20px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1.5fr;
          gap: 60px;
          margin-bottom: 60px;
        }

        .footer-info p {
          margin-top: 20px;
          opacity: 0.7;
          max-width: 300px;
        }

        .footer h4 {
          color: #fff;
          margin-bottom: 25px;
          font-size: 1.2rem;
          position: relative;
        }

        .footer h4::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 30px;
          height: 2px;
          background: var(--secondary);
        }

        .footer ul {
          list-style: none;
        }

        .footer ul li {
          margin-bottom: 12px;
          opacity: 0.7;
          transition: var(--transition);
        }

        .footer-links ul li:hover {
          opacity: 1;
          padding-left: 5px;
          color: var(--secondary);
        }

        .footer-links a {
          text-decoration: none;
          color: inherit;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 30px;
          text-align: center;
          font-size: 0.9rem;
          opacity: 0.5;
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
