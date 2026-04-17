import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './About.css';

const About = () => {
  const { t } = useTranslation();
  return (
    <section id="about" className="about-section">
      <div className="container grid-two-col">
        <motion.div 
          className="about-image-wrapper"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img 
            src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop" 
            alt="Nature Retreat Architecture" 
            className="about-main-img"
          />
          <div className="about-img-accent"></div>
        </motion.div>

        <motion.div 
          className="about-text-content"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="about-label-group">
            <span className="about-label-line"></span>
            <span className="about-label">{t('about.subtitle') || "Philosophy"}</span>
          </div>
          
          <h2 className="about-title">
            {t('about.title') || "Architecture of Silence"}
          </h2>
          
          <div className="about-description">
            <p className="about-paragraph primary-desc">
               {t('about.desc') || "Mountain Dacha is a sanctuary designed for those who seek the profound beauty of nature without compromising on modern sophistication."}
            </p>
            <p className="about-paragraph secondary-desc">
               {t('experience.summerDesc') || "We believe that luxury isn't about excess—it's about the quality of the space you inhabit. Our retreats are crafted from local timber and stone, bringing the outside in."}
            </p>
          </div>

          <motion.div 
            className="about-cta"
            whileHover={{ x: 10 }}
            transition={{ duration: 0.3 }}
          >
            <button className="btn-about-discover">
              {t('about.readMore') || "Discover More"}
              <span className="btn-arrow">→</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
