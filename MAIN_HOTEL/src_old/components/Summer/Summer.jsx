import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Footprints, Wind, Soup } from 'lucide-react';
import './Summer.css';

const summerActivities = [
  {
    icon: <Footprints size={40} strokeWidth={1} />,
    title: 'Alpine Hiking',
    description: 'Explore untouched mountain trails with our expert local guides, tailored to your pace.'
  },
  {
    icon: <Wind size={40} strokeWidth={1} />,
    title: 'Paragliding',
    description: 'Soar through the crystal clear skies for a breathtaking bird-eye view of the resort.'
  },
  {
    icon: <Compass size={40} strokeWidth={1} />,
    title: 'Forest Discovery',
    description: 'Connect with nature in our private 20-acre pine forest reserve, curated for tranquility.'
  },
  {
    icon: <Soup size={40} strokeWidth={1} />,
    title: 'Mountain Tea',
    description: 'Traditional herbal tea ceremonies on our panoramic sun terrace as the sun dips low.'
  }
];

const Summer = () => {
  return (
    <section className="activities-section-premium" id="summer">
      <div className="container">
        <div className="section-header-premium text-center mb-16">
          <div className="header-label-group flex justify-center">
            <span className="label-line"></span>
            <span className="label-text">The Golden Season</span>
            <span className="label-line"></span>
          </div>
          <h2 className="section-title">Summer Vitality</h2>
        </div>

        <div className="activities-grid-refined">
          {summerActivities.map((activity, index) => (
            <motion.div 
              key={index}
              className="premium-activity-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="activity-icon-stage">
                <div className="icon-glow"></div>
                {activity.icon}
              </div>
              <h3 className="activity-title-gold">{activity.title}</h3>
              <p className="activity-desc-muted">{activity.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Summer;
