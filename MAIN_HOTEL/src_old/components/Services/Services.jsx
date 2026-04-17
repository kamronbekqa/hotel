import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Utensils, Car, Map, Coffee, Shield, Zap } from 'lucide-react';
import './Services.css';

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <Utensils size={24} />,
      title: t('services.spa') || 'Private Chef',
      description: t('services.spaDesc') || 'Gourmet meals prepared in your quiet corner by professionals.'
    },
    {
      icon: <Car size={24} />,
      title: t('services.dining') || 'Luxury Transport',
      description: t('services.diningDesc') || 'Chauffeur-driven cars and effortless transfers at your service.'
    },
    {
      icon: <Map size={24} />,
      title: t('services.tours') || 'Local Tours',
      description: t('services.toursDesc') || 'Exclusively curated tours to explore hidden natural gems.'
    },
    {
      icon: <Coffee size={24} />,
      title: t('experience.summer') || 'Daily Refreshments',
      description: t('experience.summerDesc') || 'Fresh coffee, artisanal snacks, and fruits delivered daily.'
    }
  ];

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="services-grid-wrapper">
          <motion.div 
            className="services-content-left"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-label-group">
              <span className="section-label-line"></span>
              <span className="section-label">{t('experience.summer') || "Services"}</span>
            </div>
            
            <h2 className="section-title">
              {t('experience.winter') || "Beyond Accommodation"}
            </h2>
            
            <p className="services-description">
              {t('experience.winterDesc') || "We believe in creating complete experiences. From personalized dining to adventure planning, our dedicated concierge team ensures every moment is perfect."}
            </p>

            <div className="services-features-list">
              {services.map((service, i) => (
                <motion.div 
                  key={i}
                  className="services-feature-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="feature-icon-wrapper">
                    {service.icon}
                  </div>
                  <div className="feature-text">
                    <h4 className="feature-title">{service.title}</h4>
                    <p className="feature-desc">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="services-image-container"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="services-main-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop" 
                alt="Luxury Concierge Service" 
                className="services-main-img"
              />
              <div className="services-img-overlay"></div>
            </div>
            
            <motion.div 
              className="services-floating-badge"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <div className="badge-content">
                <span className="badge-number">24</span>
                <div className="badge-text">
                  <span className="badge-top">H/7</span>
                  <span className="badge-bottom">{t('contact.title') || "Contact"}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
