import {Suspense, useState} from 'react';
import { Layout, Menu, theme, Avatar, Button, Typography, Breadcrumb } from 'antd';
import {Outlet, useLocation, useNavigate} from 'react-router-dom'; // Import useNavigate
import {
  DashboardOutlined,
  TeamOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  BranchesOutlined,
  BellOutlined,
} from '@ant-design/icons';
import '../styles/Dashboard.css';
import PropTypes from "prop-types";
import {useAuth} from "../Provider/authProvider.jsx";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { SubMenu } = Menu;  // Import SubMenu for nested items

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // Initialize navigate
  const { signOut } = useAuth();
  const location = useLocation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const routeTitles = {
    '/dashboard': 'Dashboard',
    '/user-list': 'Users',
    '/branches': 'Branches',
    '/settings': 'Settings',
  };

  const currentTitle = routeTitles[location.pathname] || 'Dashboard';

  const menuItems = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      key: '2',
      icon: <TeamOutlined />,
      label: 'User Management',
      children: [
        {
          key: '2-1',
          icon: <UserOutlined />,
          label: 'Users',
          path: '/user-list',
        },
        {
          key: '2-2',
          icon: <BranchesOutlined />,
          label: 'Branches',
          path: '/branches',
        },
      ],
    },
    {
      key: '4',
      icon: <SettingOutlined />,
      label: 'Settings',
      path: '/settings',
    },
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
              theme="dark"
          >
            {menuItems.map(item =>
                item.children ? (
                    <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                      {item.children.map(sub => (
                          <Menu.Item
                              key={sub.key}
                              icon={sub.icon}
                              onClick={() => navigate(sub.path)}
                          >
                            {sub.label}
                          </Menu.Item>
                      ))}
                    </Menu.SubMenu>
                ) : (
                    <Menu.Item
                        key={item.key}
                        icon={item.icon}
                        onClick={() => navigate(item.path)}
                    >
                      {item.label}
                    </Menu.Item>
                )
            )}
          </Menu>
        </Sider>
        <Layout>
          <Header className="dashboard-header">
            <Breadcrumb items={[{ title: 'Home' }, { title: currentTitle }]} />
            <div className="header-actions">
              <Button type="text" icon={<BellOutlined />} />
              <Avatar icon={<UserOutlined />} />
              <Button type="text" onClick={ () => signOut()} icon={<LogoutOutlined />} />
            </div>
          </Header>
          <Content className="dashboard-content">
            {children}
          </Content>
        </Layout>
      </Layout>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
