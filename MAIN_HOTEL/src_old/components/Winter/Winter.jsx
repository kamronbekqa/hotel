import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Thermometer, Map, Coffee } from 'lucide-react';
import '../Summer/Summer.css';

const winterActivities = [
  {
    icon: <Flame size={40} strokeWidth={1} />,
    title: 'Hearth Nights',
    description: 'Bespoke evenings by the traditional stone hearth with curated wine tastings and local stories.'
  },
  {
    icon: <Thermometer size={40} strokeWidth={1} />,
    title: 'Steam Therapy',
    description: 'Reclaim your vitality in our wood-fired cedar sauna overlooking snowy Alpine peaks.'
  },
  {
    icon: <Map size={40} strokeWidth={1} />,
    title: 'Trail Tracking',
    description: 'Private snowshoeing expeditions into the quiet, crystalline wilderness with expert tracking.'
  },
  {
    icon: <Coffee size={40} strokeWidth={1} />,
    title: 'Slow Mornings',
    description: 'Artisanal coffee rituals as the first light hits the frosted mountain tops of the ridge.'
  }
];

const Winter = () => {
  return (
    <section className="activities-section-premium" id="winter" style={{background: 'var(--clr-white)'}}>
      <div className="container">
        <div className="section-header-premium text-center mb-16">
          <div className="header-label-group flex justify-center">
            <span className="label-line"></span>
            <span className="label-text">The Silver Season</span>
            <span className="label-line"></span>
          </div>
          <h2 className="section-title">Winter Serenity</h2>
        </div>

        <div className="activities-grid-refined">
          {winterActivities.map((activity, index) => (
            <motion.div 
              key={index}
              className="premium-activity-card"
              style={{background: 'var(--clr-beige)'}}
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

export default Winter;
