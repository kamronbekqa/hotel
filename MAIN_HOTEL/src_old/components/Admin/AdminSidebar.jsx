import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Users, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
  Bell,
  Map
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminSidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: <LayoutDashboard size={22} /> },
    { id: 'bookings', label: 'Bookings', icon: <CalendarCheck size={22} /> },
    { id: 'dachas', label: 'Dachas', icon: <Map size={22} /> },
    { id: 'users', label: 'Users', icon: <Users size={22} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={22} /> },
  ];

  return (
    <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="admin-logo-section">
        <div className="admin-logo-icon">
          <Home size={24} />
        </div>
        {!isCollapsed && (
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="admin-logo-text"
          >
            Dacha<span>SaaS</span>
          </motion.span>
        )}
      </div>

      <button 
        className="sidebar-toggle"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <nav className="admin-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
            title={isCollapsed ? item.label : ''}
          >
            <div className="nav-icon">{item.icon}</div>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="nav-label"
              >
                {item.label}
              </motion.span>
            )}
            {activeTab === item.id && !isCollapsed && (
              <motion.div 
                layoutId="active-indicator"
                className="active-indicator"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <button 
          onClick={onLogout}
          className="admin-nav-item logout-btn"
          title={isCollapsed ? 'Logout' : ''}
        >
          <div className="nav-icon"><LogOut size={22} /></div>
          {!isCollapsed && <span className="nav-label">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;

