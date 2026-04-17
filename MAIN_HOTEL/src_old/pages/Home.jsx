import React from 'react';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Rooms from '../components/Rooms/Rooms';
import Services from '../components/Services/Services';
import Testimonials from '../components/Testimonials/Testimonials';
import Contact from '../components/Contact/Contact';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      
      <main className="content-areas">
        <About />
        
        <Rooms />
        
        <div className="section-divider">
          <div className="divider-line"></div>
        </div>

        <Services />
        
        <Testimonials />
        
        <Contact />
      </main>
    </div>
  );
};

export default Home;
