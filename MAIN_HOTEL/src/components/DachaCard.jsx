import React from 'react';

const DachaCard = ({ dacha, onBook }) => {
  return (
    <div className="card dacha-card">
      <div className="card-image">
        <img src={dacha.image} alt={dacha.title} />
        <div className="card-tag">{dacha.type === 'rent' ? 'Ijara' : 'Sotuv'}</div>
      </div>
      
      <div className="card-body">
        <div className="card-header">
          <h3>{dacha.title}</h3>
          <p className="price">${dacha.price} <span>/ kun</span></p>
        </div>
        
        <p className="location">📍 {dacha.location}</p>
        <p className="description">{dacha.description.substring(0, 100)}...</p>
        
        <div className="features">
          {dacha.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="feature-tag">{feature}</span>
          ))}
          {dacha.features.length > 3 && <span className="feature-tag">+{dacha.features.length - 3}</span>}
        </div>
        
        <button className="btn btn-primary w-100" onClick={() => onBook(dacha)}>
          Bron qilish
        </button>
      </div>

      <style jsx="true">{`
        .dacha-card {
          display: flex;
          flex-direction: column;
        }

        .card-image {
          position: relative;
          height: 240px;
          overflow: hidden;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .dacha-card:hover .card-image img {
          transform: scale(1.1);
        }

        .card-tag {
          position: absolute;
          top: 15px;
          right: 15px;
          background: var(--secondary);
          color: #fff;
          padding: 5px 15px;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .card-body {
          padding: 25px;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 10px;
        }

        .card-header h3 {
          font-size: 1.25rem;
          margin-bottom: 0;
        }

        .price {
          color: var(--secondary);
          font-weight: 700;
          font-size: 1.2rem;
        }

        .price span {
          font-size: 0.8rem;
          color: #888;
          font-weight: 400;
        }

        .location {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 15px;
        }

        .description {
          font-size: 0.9rem;
          color: #555;
          margin-bottom: 20px;
          height: 45px;
          overflow: hidden;
        }

        .features {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 25px;
        }

        .feature-tag {
          background: #f0f4f4;
          color: var(--primary);
          padding: 4px 12px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .w-100 {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default DachaCard;
