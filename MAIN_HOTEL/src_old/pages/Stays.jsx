import { Star, MapPin, Wifi, Coffee, User } from "lucide-react";
import { motion } from "framer-motion";
import './Stays.css';

const STAYS = [
  {
    id: 1,
    title: "The Nordic Cabin",
    location: "Oslo, Norway",
    price: 250,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?q=80&w=2000&auto=format&fit=crop",
    amenities: ["Wifi", "Kitchen"]
  },
  {
    id: 2,
    title: "Forest Glass House",
    location: "Oregon, USA",
    price: 320,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2000&auto=format&fit=crop",
    amenities: ["Pool", "Wifi"]
  },
  {
    id: 3,
    title: "Lakeside Retreat",
    location: "Lake Como, Italy",
    price: 450,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop",
    amenities: ["Kitchen", "View"]
  },
  {
    id: 4,
    title: "Minimalist Loft",
    location: "Berlin, Germany",
    price: 180,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2000&auto=format&fit=crop",
    amenities: ["Wifi", "Workspace"]
  }
];

export default function Stays() {
  return (
    <div className="stays-page">
      <div className="stays-hero">
        <div className="container">
          <motion.div
            className="stays-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="stays-label-group">
              <span className="stays-label-line"></span>
              <span className="stays-label">Curated Collection</span>
            </div>
            <h1 className="stays-hero-title">Handpicked Stays</h1>
            <p className="stays-hero-subtitle">Find your perfect getaway in our hand-picked collection of luxury retreats.</p>
          </motion.div>
        </div>
      </div>

      <section className="stays-section">
        <div className="container">
          <div className="stays-grid">
            {STAYS.map((stay, index) => (
              <motion.div
                key={stay.id}
                className="stay-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="stay-image-wrapper">
                  <img src={stay.image} alt={stay.title} className="stay-image" />
                  <div className="stay-rating-badge">
                    <Star size={12} fill="#D4A017" color="#D4A017" />
                    <span>{stay.rating}</span>
                  </div>
                  <div className="stay-overlay"></div>
                </div>

                <div className="stay-info">
                  <div className="stay-location">
                    <MapPin size={14} />
                    <span>{stay.location}</span>
                  </div>

                  <div className="stay-title-row">
                    <h3 className="stay-title">{stay.title}</h3>
                    <div className="stay-price">
                      <span className="stay-price-val">${stay.price}</span>
                      <span className="stay-price-unit">/ night</span>
                    </div>
                  </div>

                  <div className="stay-amenities">
                    {stay.amenities.map(amenity => (
                      <span key={amenity} className="stay-amenity-tag">{amenity}</span>
                    ))}
                  </div>

                  <button className="stay-btn">Reserve Now</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
