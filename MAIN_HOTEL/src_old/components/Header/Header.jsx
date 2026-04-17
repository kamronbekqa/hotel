import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const language = i18n.language || 'en';
  const langMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const setLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLangMenuOpen(false);
  };

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '#about' },
    { name: t('nav.rooms'), path: '#rooms' },
    { name: t('nav.winter'), path: '#winter' },
    { name: t('nav.summer'), path: '#summer' },
    { name: t('nav.gallery'), path: '#gallery' },
    { name: t('nav.contact'), path: '#contact' },
  ];

  const languages = [
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'ru', label: 'Русский', short: 'RU' },
    { code: 'uz', label: 'O\'zbek', short: 'UZ' }
  ];

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/" className="logo-link">
            <span className="logo-text">COVE</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path.includes('#') && location.pathname + location.hash === link.path);
            return (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="header-actions">
           {/* Language Switcher */}
           <div className="lang-switcher" ref={langMenuRef}>
            <button 
              className="lang-btn"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              aria-haspopup="true"
              aria-expanded={langMenuOpen}
            >
              <Globe size={18} />
              <span className="lang-current">{language.toUpperCase()}</span>
              <ChevronDown size={14} className={`chevron ${langMenuOpen ? 'rotate' : ''}`} />
            </button>
            
            {langMenuOpen && (
              <div className="lang-dropdown">
                {languages.map((lang) => (
                  <button 
                    key={lang.code}
                    className={`lang-option ${language === lang.code ? 'active' : ''}`}
                    onClick={() => setLanguage(lang.code)}
                  >
                    <span className="lang-label">{lang.label}</span>
                    <span className="lang-short">{lang.short}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="auth-btn-group">
            <Link to="/login" className="btn-login">
              {t('nav.login')}
            </Link>
            <Link to="/booking" className="btn-book">
              {t('nav.book')}
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="mobile-actions">
            <div className="mobile-lang-switcher">
              {languages.map((lang) => (
                <button 
                  key={lang.code}
                  className={`mobile-lang-btn ${language === lang.code ? 'active' : ''}`}
                  onClick={() => setLanguage(lang.code)}
                >
                  {lang.short}
                </button>
              ))}
            </div>
            <Link to="/login" className="mobile-auth-btn">{t('nav.login')}</Link>
            <Link to="/booking" className="mobile-nav-btn primary">{t('nav.book')}</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
