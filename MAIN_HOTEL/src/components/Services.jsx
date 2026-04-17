import React from 'react';

const Services = () => {
  const services = [
    {
      icon: '🏊‍♂️',
      title: 'Hovuz xizmati',
      description: 'Barcha dachalarimizda toza va isitiladigan hovuzlar mavjud.'
    },
    {
      icon: '🍳',
      title: 'Oshpaz xizmati',
      description: 'Milliy va yevropa taomlarini tayyorlab beruvchi malakali oshpazlar.'
    },
    {
      icon: '🧹',
      title: 'Tozalik nazorati',
      description: 'Har bir tashrifdan oldin va keyin professional tozalash ishlari.'
    },
    {
      icon: '🚕',
      title: 'Transfer',
      description: 'Toshkent shahridan dacha eshigigacha qulay transport xizmati.'
    }
  ];

  return (
    <section id="services" className="section services">
      <div className="container">
        <h2 className="section-title fade-in">Bizning Xizmatlarimiz</h2>
        <div className="grid grid-4">
          {services.map((item, index) => (
            <div key={index} className="service-card glass fade-in" style={{animationDelay: `${index * 0.15}s`}}>
              <div className="service-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx="true">{`
        .services {
          background-color: #fff;
          position: relative;
        }

        .grid-4 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .service-card {
          padding: 40px 30px;
          text-align: center;
          border-radius: 24px;
          transition: var(--transition);
          border: 1px solid #f0f0f0;
          background: #fcfcfc;
        }

        .service-card:hover {
          background: var(--primary);
          color: #fff;
          transform: translateY(-10px);
        }

        .service-card:hover h3, 
        .service-card:hover p {
          color: #fff;
        }

        .service-icon {
          font-size: 3rem;
          margin-bottom: 20px;
          display: block;
        }

        .service-card h3 {
          margin-bottom: 15px;
          font-size: 1.25rem;
        }

        .service-card p {
          font-size: 0.9rem;
          opacity: 0.8;
        }
      `}</style>
    </section>
  );
};

export default Services;
