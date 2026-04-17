import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  ArrowRight
} from "lucide-react";
import { useTranslation } from "react-i18next";
import "./Contact.css";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-header-premium">
           <div className="header-label-group">
            <span className="label-line"></span>
            <span className="label-text">{t('contact.subtitle') || "Concierge"}</span>
          </div>
          <h2 className="section-title">{t('contact.title') || "Inquire & Connect"}</h2>
        </div>

        <div className="contact-grid-premium">
          <motion.div 
            className="contact-info-block"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="contact-description">
              {t('contact.intro') || "Our dedicated concierge team is available 24/7 to assist with your inquiries. Whether you are planning a grand event or a quiet escape, we are here to craft your perfect stay."}
            </p>

            <div className="contact-methods">
              <div className="method-item">
                <div className="method-icon"><MapPin size={24} /></div>
                <div className="method-text">
                  <h3>{t('contact.address')}</h3>
                  <p>123 Azure Coast Road, Highland Bay</p>
                </div>
              </div>

              <div className="method-row">
                <div className="method-item">
                  <div className="method-icon"><Phone size={24} /></div>
                  <div className="method-text">
                    <h3>{t('contact.phone')}</h3>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="method-item">
                  <div className="method-icon"><Mail size={24} /></div>
                  <div className="method-text">
                    <h3>{t('contact.email')}</h3>
                    <p>concierge@cove.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-social-pills">
              <a href="#" className="social-pill"><Instagram size={20} /> <span>Instagram</span></a>
              <a href="#" className="social-pill"><Facebook size={20} /> <span>Facebook</span></a>
              <a href="#" className="social-pill"><Twitter size={20} /> <span>Twitter</span></a>
            </div>
          </motion.div>

          <motion.div 
            className="contact-form-block"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <form className="concierge-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Your Name" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="email@example.com" />
                </div>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea placeholder="How can we assist you?" rows="5"></textarea>
              </div>
              <button type="submit" className="btn-send-inquiry">
                Send Inquiry <ArrowRight size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
