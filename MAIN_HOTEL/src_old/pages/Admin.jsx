import React, { useState, useEffect, useCallback } from 'react';
import { 
  Table, 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Button, 
  Tag, 
  Space, 
  Avatar, 
  Input, 
  Badge, 
  Tooltip,
  Typography,
  message
} from 'antd';
import { 
  Users, 
  Calendar, 
  Home,
  Bell,
  Check,
  X,
  Search,
  Plus
} from 'lucide-react';
import { io } from 'socket.io-client';
import { bookingAPI, usersAPI, dachaAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const { Title, Text } = Typography;

const socket = io('http://localhost:5000', {
  withCredentials: true,
  autoConnect: false
});

const Admin = () => {
  const { logout } = useAuth();
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalDachas: 0,
    pendingBookings: 0,
    availableDachas: 0
  });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [statsRes, bookingsRes] = await Promise.all([
        bookingAPI.getStats(),
        bookingAPI.getAll()
      ]);

      if (statsRes.data?.data) setStats(statsRes.data.data.stats);
      if (bookingsRes.data?.data) setBookings(bookingsRes.data.data.bookings);
    } catch (err) {
      console.error("Fetch Data Error:", err);
      message.error("Failed to sync data with server");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    socket.connect();
    socket.emit('join_admin_room');

    socket.on('new_booking', (data) => {
      setBookings(prev => [data.booking, ...prev]);
      message.info(data.message);
      setStats(prev => ({ ...prev, pendingBookings: prev.pendingBookings + 1, totalBookings: prev.totalBookings + 1 }));
    });

    return () => {
      socket.off('new_booking');
      socket.disconnect();
    };
  }, [fetchData]);

  const handleBookingAction = async (id, status) => {
    try {
      await bookingAPI.updateStatus(id, status);
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status } : b));
      message.success(`Booking ${status}`);
    } catch (err) {
      message.error("Action failed");
    }
  };

  const columns = [
    {
      title: 'Guest',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar src={`https://ui-avatars.com/api/?name=${text}&background=random`} />
          <div>
            <Text strong>{text}</Text><br/>
            <Text type="secondary" style={{ fontSize: '12px' }}>{record.email}</Text>
          </div>
        </Space>
      )
    },
    {
      title: 'Dacha',
      dataIndex: ['dachaId', 'title'],
      key: 'dacha',
      render: (text) => text || 'Skyline Dacha'
    },
    {
      title: 'Check-in',
      dataIndex: 'checkIn',
      key: 'checkIn',
      render: (date) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'approved' ? 'success' : status === 'pending' ? 'processing' : 'error'}>
          {status.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'right',
      render: (_, record) => (
        <Space>
          {record.status === 'pending' && (
            <>
              <Tooltip title="Approve">
                <Button 
                  shape="circle" 
                  icon={<Check size={16} />} 
                  onClick={() => handleBookingAction(record._id, 'approved')}
                  type="primary"
                  ghost
                />
              </Tooltip>
              <Tooltip title="Reject">
                <Button 
                  shape="circle" 
                  icon={<X size={16} />} 
                  onClick={() => handleBookingAction(record._id, 'rejected')}
                  danger
                  ghost
                />
              </Tooltip>
            </>
          )}
          <Button type="text" icon={<Plus size={16} />} />
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: '0 0 24px 0' }}>
      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="stat-card">
            <Statistic 
              title="Total Bookings" 
              value={stats.totalBookings} 
              prefix={<Calendar size={20} style={{ marginRight: 8, color: '#1677ff' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="stat-card">
            <Statistic 
              title="Pending Requests" 
              value={stats.pendingBookings} 
              prefix={<Bell size={20} style={{ marginRight: 8, color: '#faad14' }} />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="stat-card">
            <Statistic 
              title="Total Properties" 
              value={stats.totalDachas} 
              prefix={<Home size={20} style={{ marginRight: 8, color: '#52c41a' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="stat-card">
            <Statistic 
              title="Active Users" 
              value={stats.availableDachas} 
              prefix={<Users size={20} style={{ marginRight: 8, color: '#722ed1' }} />}
            />
          </Card>
        </Col>
      </Row>

      <Card 
        title={<Title level={4} style={{ margin: 0 }}>Recent Booking Activity</Title>}
        extra={
          <Input 
            prefix={<Search size={16} />} 
            placeholder="Search guest name..." 
            style={{ width: 250 }}
          />
        }
        bordered={false}
      >
        <Table 
          columns={columns} 
          dataSource={bookings} 
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 8 }}
        />
      </Card>
    </div>
  );
};

export default Admin;

