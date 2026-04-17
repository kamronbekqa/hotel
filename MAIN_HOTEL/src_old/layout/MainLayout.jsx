import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderComponent from '../components/Header/Header';
import FooterComponent from '../components/Footer/Footer';

const MainLayout = () => {
  return (
    <div className="app-main-layout">
      <HeaderComponent />
      
      <main className="main-content">
        <Outlet />
      </main>
      
      <FooterComponent />
    </div>
  );
};

export default MainLayout;
