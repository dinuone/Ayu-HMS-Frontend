import { useState } from 'react';
import { Layout, Menu, theme, Card, Row, Col, Statistic, Avatar, Button, Typography, Breadcrumb } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  SettingOutlined,
  TeamOutlined,
  FileOutlined,
  BellOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  ShopOutlined,
  GiftOutlined,
  TagOutlined,
  DollarOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import '../styles/Dashboard.css';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '2',
      icon: <ShopOutlined />,
      label: 'E-commerce',
      children: [
        { key: '2-1', icon: <ShoppingCartOutlined />, label: 'Products' },
        { key: '2-2', icon: <TagOutlined />, label: 'Categories' },
        { key: '2-3', icon: <GiftOutlined />, label: 'Orders' },
      ],
    },
    {
      key: '3',
      icon: <TeamOutlined />,
      label: 'User Management',
      children: [
        { key: '3-1', icon: <UserOutlined />, label: 'Users' },
        { key: '3-2', icon: <TeamOutlined />, label: 'Roles' },
      ],
    },
    {
      key: '4',
      icon: <BarChartOutlined />,
      label: 'Analytics',
      children: [
        { key: '4-1', icon: <RiseOutlined />, label: 'Sales Analytics' },
        { key: '4-2', icon: <DollarOutlined />, label: 'Revenue' },
      ],
    },
    {
      key: '5',
      icon: <AppstoreOutlined />,
      label: 'Apps & Pages',
      children: [
        { key: '5-1', icon: <FileOutlined />, label: 'Pages' },
        { key: '5-2', icon: <AppstoreOutlined />, label: 'Applications' },
      ],
    },
    { key: '6', icon: <SettingOutlined />, label: 'Settings' },
  ];

  return (
      <Layout className="dashboard-layout">
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            className="dashboard-sider-dark"
            width={260}
            theme="dark"
        >
          <div className="dashboard-logo">
            <div className="logo-icon">
              <img src="/logo.PNG" alt="" />
            </div>
          </div>
          <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['2', '3', '4']}
              items={menuItems}
              theme="dark"
          />
        </Sider>
        <Layout>
          <Header className="dashboard-header">
            <Breadcrumb items={[{ title: 'Home' }, { title: 'Dashboard' }]} />
            <div className="header-actions">
              <Button type="text" icon={<BellOutlined />} />
              <Avatar icon={<UserOutlined />} />
              <Button type="text" icon={<LogoutOutlined />} />
            </div>
          </Header>
          <Content className="dashboard-content">
            <div className="welcome-banner">
              <Title level={3} style={{ color: 'white', margin: 0 }}>Welcome back, Admin!</Title>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '8px 0 0' }}>
                Harendra Ayurveda Hospital Management System.
              </p>
            </div>
          </Content>
        </Layout>
      </Layout>
  );
}

export default Dashboard;
