import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-content">
        <div className="logo">
          <span className="logo-icon">🏡</span>
          <span className="logo-text">LUXE DACHA</span>
        </div>
        
        <ul className="nav-links">
          <li><a href="#hero">Bosh sahifa</a></li>
          <li><a href="#dachas">Dachalar</a></li>
          <li><a href="#services">Xizmatlar</a></li>
          <li><a href="#contact" className="btn btn-primary btn-sm">Bron qilish</a></li>
        </ul>
      </div>

      <style jsx="true">{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 20px 0;
          transition: all 0.4s ease;
          background: transparent;
        }

        .navbar.scrolled {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          padding: 12px 0;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
        }

        .navbar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          font-size: 1.5rem;
          color: var(--primary);
          cursor: pointer;
        }

        .logo-icon {
          font-size: 2rem;
        }

        .nav-links {
          display: flex;
          gap: 30px;
          list-style: none;
          align-items: center;
        }

        .nav-links a {
          text-decoration: none;
          color: var(--text-dark);
          font-weight: 500;
          transition: var(--transition);
          opacity: 0.8;
        }

        .nav-links a:hover {
          color: var(--secondary);
          opacity: 1;
        }

        .btn-sm {
          padding: 8px 20px;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
