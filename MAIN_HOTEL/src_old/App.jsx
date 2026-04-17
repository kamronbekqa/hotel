import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { themeConfig } from './theme/themeConfig';
import './i18n'; // Initialize i18n
import { useAuth } from './context/AuthContext';
import MainLayout from './layout/MainLayout';
import AdminLayout from './layout/AdminLayout';
import ScrollToTop from './components/ScrollToTop';
import ScrollToHash from './components/ScrollToHash';
import { AnimatePresence } from 'framer-motion';

// Pages
import Home from './pages/Home';
import Experience from './pages/Experience';
import Summer from './pages/Summer';
import Winter from './pages/Winter';
import Rooms from './pages/Rooms';
import Gallery from './pages/Gallery';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Sales from './pages/Sales';
import Rent from './pages/Rent';
import Login from './pages/Login';
import Admin from './pages/Admin';

const AdminPlaceholder = ({ title }) => (
  <div style={{ padding: '24px', background: 'white', borderRadius: '12px' }}>
    <h2>{title}</h2>
    <p>This module is under construction.</p>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/summer" element={<Summer />} />
          <Route path="/winter" element={<Winter />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/rent" element={<Rent />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Admin />} />
          <Route path="bookings" element={<AdminPlaceholder title="Bookings Management" />} />
          <Route path="rooms" element={<AdminPlaceholder title="Rooms Management" />} />
          <Route path="gallery" element={<AdminPlaceholder title="Gallery Management" />} />
          <Route path="users" element={<AdminPlaceholder title="User Management" />} />
          <Route path="settings" element={<AdminPlaceholder title="Settings" />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ConfigProvider theme={themeConfig}>
      <Router>
        <ScrollToTop />
        <ScrollToHash />
        <AnimatedRoutes />
      </Router>
    </ConfigProvider>
  );
}

export default App;
