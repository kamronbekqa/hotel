import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Heart, Star, CloudRain, Sun } from 'lucide-react';
import './Features.css';

const features = [
  {
    icon: <Shield size={32} />,
    title: 'Safe & Secure',
    description: '24/7 security and private access for your peace of mind.'
  },
  {
    icon: <Zap size={32} />,
    title: 'Modern Amenities',
    description: 'High-speed internet, smart home features, and modern appliances.'
  },
  {
    icon: <Heart size={32} />,
    title: 'Eco-Friendly',
    description: 'Sustainable materials and energy-efficient systems throughout.'
  },
  {
    icon: <Star size={32} />,
    title: 'Premium Service',
    description: 'Butler service and concierge available for all your needs.'
  },
  {
    icon: <Sun size={32} />,
    title: 'Panoramic Views',
    description: 'Large windows designed to capture the beauty of nature.'
  },
  {
    icon: <CloudRain size={32} />,
    title: 'All-Weather Ready',
    description: 'Perfect insulation for both summer breeze and winter snow.'
  }
];

const Features = () => {
  return (
    <section className="features-section section">
      <div className="container">
        <div className="section-header text-center mb-16">
          <span className="section-subtitle">The COVE Standard</span>
          <h2 className="section-title mt-2">COVE Excellence</h2>
        </div>

        <div className="features-grid">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="feature-icon-wrapper">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
