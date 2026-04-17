import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Hero.css';

const Hero = () => {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  
  const y = useTransform(scrollY, [0, 800], [0, 240]);
  const textY = useTransform(scrollY, [0, 800], [0, -80]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section className="hero">
      <motion.div 
        className="hero-background" 
        style={{ y }}
      >
        <img 
          src="https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=2070&auto=format&fit=crop" 
          alt="Luxury Mountain Retreat" 
          className="hero-img" 
        />
        <div className="hero-overlay"></div>
      </motion.div>
      
      <motion.div 
        className="hero-content"
        style={{ opacity, y: textY }}
      >
        <motion.div 
          className="hero-branding"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="hero-logo-large">COVE</span>
        </motion.div>

        <div className="hero-text-wrapper">
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('hero.subtitle')}
          </motion.p>
        </div>

        <motion.div
           className="hero-actions"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        >
           <a href="#rooms" className="btn-hero-primary">{t('hero.start')}</a>
           <a href="#about" className="btn-hero-secondary">{t('hero.watch')}</a>
        </motion.div>
      </motion.div>

      <motion.div 
        className="hero-scroll-btn"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <div className="scroll-hint">
          <span>Explore</span>
          <motion.div 
            className="hint-line"
            animate={{ scaleY: [0, 1, 0], translateY: [0, 10, 20] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
