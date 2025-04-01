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
        {
          key: '2-1',
          icon: <ShoppingCartOutlined />,
          label: 'Products',
        },
        {
          key: '2-2',
          icon: <TagOutlined />,
          label: 'Categories',
        },
        {
          key: '2-3',
          icon: <GiftOutlined />,
          label: 'Orders',
        },
      ],
    },
    {
      key: '3',
      icon: <TeamOutlined />,
      label: 'User Management',
      children: [
        {
          key: '3-1',
          icon: <UserOutlined />,
          label: 'Users',
        },
        {
          key: '3-2',
          icon: <TeamOutlined />,
          label: 'Roles',
        },
      ],
    },
    {
      key: '4',
      icon: <BarChartOutlined />,
      label: 'Analytics',
      children: [
        {
          key: '4-1',
          icon: <RiseOutlined />,
          label: 'Sales Analytics',
        },
        {
          key: '4-2',
          icon: <DollarOutlined />,
          label: 'Revenue',
        },
      ],
    },
    {
      key: '5',
      icon: <AppstoreOutlined />,
      label: 'Apps & Pages',
      children: [
        {
          key: '5-1',
          icon: <FileOutlined />,
          label: 'Pages',
        },
        {
          key: '5-2',
          icon: <AppstoreOutlined />,
          label: 'Applications',
        },
      ],
    },
    {
      key: '6',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  return (
    <Layout className="dashboard-layout">
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        className="dashboard-sider"
        theme="light"
      >
        <div className="dashboard-logo">
          <div className="logo-icon">
            <DashboardOutlined />
          </div>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['2', '3', '4']}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header className="dashboard-header">
          <Breadcrumb items={[
            { title: 'Home' },
            { title: 'Dashboard' },
          ]} />
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
              Here's what's happening with your store today.
            </p>
          </div>

          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} lg={6}>
              <Card className="stats-card" hoverable>
                <Statistic
                  title="Total Revenue"
                  value={142893}
                  precision={2}
                  prefix="$"
                  valueStyle={{ color: '#3f8600' }}
                  suffix={<RiseOutlined style={{ fontSize: 16 }} />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="stats-card" hoverable>
                <Statistic
                  title="Active Users"
                  value={1128}
                  prefix={<UserOutlined />}
                  valueStyle={{ color: '#0083b0' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="stats-card" hoverable>
                <Statistic
                  title="New Orders"
                  value={892}
                  prefix={<ShoppingCartOutlined />}
                  valueStyle={{ color: '#722ed1' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="stats-card" hoverable>
                <Statistic
                  title="Growth Rate"
                  value={25.8}
                  precision={1}
                  suffix="%"
                  prefix={<BarChartOutlined />}
                  valueStyle={{ color: '#cf1322' }}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24} lg={16}>
              <Card className="chart-card" title="Sales Overview">
                {/* Chart component would go here */}
                <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Chart placeholder
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card className="chart-card" title="Recent Activities">
                {/* Activity list would go here */}
                <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Activities placeholder
                </div>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard;