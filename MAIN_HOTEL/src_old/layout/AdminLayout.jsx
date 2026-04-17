import React, { useState } from 'react';
import { Layout, Menu, Button, Avatar, Space, Typography } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  BedDouble, 
  Image as ImageIcon, 
  Users, 
  Settings, 
  LogOut,
  PanelLeftClose,
  PanelLeftOpen 
} from 'lucide-react';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: '/admin', icon: <LayoutDashboard size={18} />, label: 'Dashboard', onClick: () => navigate('/admin') },
    { key: '/admin/bookings', icon: <Calendar size={18} />, label: 'Bookings', onClick: () => navigate('/admin/bookings') },
    { key: '/admin/rooms', icon: <BedDouble size={18} />, label: 'Rooms', onClick: () => navigate('/admin/rooms') },
    { key: '/admin/gallery', icon: <ImageIcon size={18} />, label: 'Gallery', onClick: () => navigate('/admin/gallery') },
    { key: '/admin/users', icon: <Users size={18} />, label: 'Users', onClick: () => navigate('/admin/users') },
    { key: '/admin/settings', icon: <Settings size={18} />, label: 'Settings', onClick: () => navigate('/admin/settings') },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        theme="light"
        style={{ borderRight: '1px solid #111111', background: '#fff' }}
      >
        <div style={{ height: 64, margin: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ margin: 0, color: '#111111', display: collapsed ? 'none' : 'block' }}>ADMIN</h2>
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ borderRight: 0 }}
        />
        
        <div style={{ position: 'absolute', bottom: 16, width: '100%', padding: '0 16px' }}>
          <Button 
            type="text" 
            danger 
            icon={<LogOut size={18} />} 
            onClick={() => navigate('/login')}
            block
            style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', borderRadius: 0 }}
          >
            {!collapsed && 'Logout'}
          </Button>
        </div>
      </Sider>
      
      <Layout>
        <Header style={{ padding: '0 24px', background: '#fff', borderBottom: '1px solid #111111', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button
            type="text"
            icon={collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64, borderRadius: 0 }}
          />
          <Space>
            <Avatar style={{ borderRadius: 0 }} src="https://ui-avatars.com/api/?name=Admin+User&background=111111&color=fff" />
            <Text strong style={{ color: '#111111' }}>Admin User</Text>
          </Space>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', border: '1px solid #111111', borderRadius: 0, minHeight: 280 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
