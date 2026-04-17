import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Testimonials.css';

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: "Sarah Jenkins",
      location: "London, UK",
      text: t('testimonials.text1') || "The most relaxing vacation we've ever had. Properties like this are rare gems.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
    },
    {
      name: "Michael Chen",
      location: "Singapore",
      text: t('testimonials.text2') || "Architecture is stunning, and the blend of mountain and sea air is rejuvenating.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
    },
    {
      name: "Elena Rodriguez",
      location: "Madrid, Spain",
      text: t('testimonials.text3') || "A masterclass in minimal, premium hospitality. Every detail felt deliberate and luxurious.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop"
    }
  ];

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <div className="section-header-premium">
          <div className="header-label-group">
            <span className="label-line"></span>
            <span className="label-text">{t('testimonials.subtitle') || "Guest Experiences"}</span>
          </div>
          <h2 className="section-title">{t('testimonials.title') || "Stories from our Guests"}</h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="testimonial-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            >
              <div className="testimonial-quote-icon">
                <Quote size={40} />
              </div>
              
              <p className="testimonial-text">"{testimonial.text}"</p>
              
              <div className="testimonial-footer">
                <div className="guest-info">
                  <img src={testimonial.avatar} alt={testimonial.name} className="guest-avatar" />
                  <div className="guest-details">
                    <h4 className="guest-name">{testimonial.name}</h4>
                    <span className="guest-loc">{testimonial.location}</span>
                  </div>
                </div>
                
                <div className="guest-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="var(--clr-gold)" color="var(--clr-gold)" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
