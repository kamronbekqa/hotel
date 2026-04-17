import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Twitter, Facebook, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-premium">
      <div className="container">
        <div className="footer-top-grid">
          <div className="footer-brand-block">
            <h2 className="footer-logo">COVE</h2>
            <p className="footer-mission">
              {t('contact.intro') || "Crafting silence and luxury in the heart of nature."}
            </p>
            <div className="footer-lang-status">
               <Globe size={16} />
               <span>Available Worldwide</span>
            </div>
          </div>

          <div className="footer-links-grid">
            <div className="footer-col">
              <h4 className="footer-col-title">{t('nav.home') || "Explore"}</h4>
              <ul className="footer-links">
                <li><Link to="/">{t('nav.home')}</Link></li>
                <li><Link to="#rooms">{t('nav.rooms')}</Link></li>
                <li><Link to="#about">{t('nav.about')}</Link></li>
                <li><Link to="#experience">{t('nav.experience') || "Experience"}</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-col-title">{t('nav.contact') || "Support"}</h4>
              <ul className="footer-links">
                <li><Link to="#contact">{t('nav.contact')}</Link></li>
                <li><Link to="/booking">{t('nav.book')}</Link></li>
                <li><Link to="/faq">Concierge FAQ</Link></li>
              </ul>
            </div>
          </div>

          <div className="footer-newsletter-block">
            <h4 className="footer-col-title">The Inner Circle</h4>
            <p className="newsletter-desc">Subscribe for exclusive seasonal retreats & news.</p>
            <div className="footer-newsletter-form">
              <input type="email" placeholder="Email address" className="f-input" />
              <button className="f-btn">
                <ArrowRight size={18} />
              </button>
            </div>
            <div className="footer-social-row">
              <a href="#" className="f-social"><Instagram size={18} /></a>
              <a href="#" className="f-social"><Twitter size={18} /></a>
              <a href="#" className="f-social"><Facebook size={18} /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p className="copyright">&copy; {currentYear} COVE Mountain Retreat. {t('contact.rights') || "All rights reserved."}</p>
          <div className="legal-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
