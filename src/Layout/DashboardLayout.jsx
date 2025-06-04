import { Suspense, useState } from 'react';
import { Layout, Menu, theme, Avatar, Button, Typography, Breadcrumb } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  TeamOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  BranchesOutlined,
  BellOutlined,
  MedicineBoxOutlined,
  FileWordFilled,
  FileAddOutlined,
  DollarCircleOutlined,
  UserAddOutlined,
  MoneyCollectFilled,
} from '@ant-design/icons';
import '../styles/Dashboard.css';
import PropTypes from "prop-types";
import { useAuth } from "../Provider/authProvider.jsx";
import { AiFillMedicineBox, AiOutlineTag } from "react-icons/ai";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { IoMdPricetags } from "react-icons/io";
import { FaClinicMedical, FaHospitalUser } from "react-icons/fa";
import { GiHealthNormal, GiMedicines } from "react-icons/gi";
import { RiMedicineBottleFill } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import {BsListTask} from "react-icons/bs";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { SubMenu } = Menu;

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { signOut, authData } = useAuth();
  console.log(authData)// Make sure your auth provider provides user data
  const location = useLocation();

  const user = authData.user;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const routeTitles = {
    '/dashboard': 'Dashboard',
    '/branches': 'Branches',
    '/drugs-category': 'Drug Categories',
    '/drugs': 'Drugs',
    '/disease-codes': 'Disease Codes',
    '/treatment-category': 'Treatment Categories',
    '/treatment': 'Treatments',
    '/clinic-category': 'Clinic Categories',
    '/users': 'Users',
    '/settings': 'Settings',
    '/rates-config': 'Rates Configuration',
    '/patients': 'Patients',
    '/patient-visit/': 'Patient Visit',
    '/doctor-assign': 'Doctor Assign',
    '/offer': 'Offer',
  };

  const currentTitle = routeTitles[location.pathname] || 'Dashboard';

  const filterMenuItems = (items, userRole) => {
    return items.filter(item => {
      // If item has no roles defined, show to everyone
      if (!item.roles) return true;

      // Check if user role is included in item's allowed roles

      const hasAccess = item.roles.includes(userRole);

      // For items with children, filter children first
      if (item.children) {
        const filteredChildren = filterMenuItems(item.children, userRole);
        return hasAccess && filteredChildren.length > 0;
      }

      return hasAccess;
    });
  };

  const renderMenuItems = (items) => {
    return items.map(item =>
        item.children ? (
            <SubMenu key={item.key} icon={item.icon} title={item.label}>
              {renderMenuItems(item.children)}
            </SubMenu>
        ) : (
            <Menu.Item
                key={item.key}
                icon={item.icon}
                onClick={() => navigate(item.path)}
            >
              {item.label}
            </Menu.Item>
        )
    );
  };

  const menuItems = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      path: '/dashboard',
      roles: ["SuperAdmin", "Branch Admin", "Doctor", "Ticketing Officer", "MOI"]
    },
    {
      key: '2',
      icon: <TeamOutlined />,
      label: 'User Management',
      path: '/users',
      roles: ["SuperAdmin", "Branch Admin"]
    },
    {
      key: '3',
      icon: <SettingOutlined />,
      label: 'System Management',
      roles: ["SuperAdmin"],
      children: [
        {
          key: '3-1',
          icon: <BranchesOutlined />,
          label: 'Branches',
          path: '/branches',
          roles: ["SuperAdmin"]
        },
        {
          key: '3-2',
          icon: <FileAddOutlined />,
          label: 'Disease Codes',
          path: '/disease-codes',
          roles: ["SuperAdmin", ]
        },
        {
          key: '3-3',
          icon: <FaClinicMedical />,
          label: 'Clinic Category',
          path: '/clinic-category',
          roles: ["SuperAdmin"]
        },
        {
          key: '3-4',
          icon: <IoMdPricetags />,
          label: 'Rates Configuration',
          path: '/rates-config',
          roles: ["SuperAdmin", ]
        },
        {
          key: '3-5',
          icon: <FaUserDoctor />,
          label: 'Doctor Assign',
          path: '/doctor-assign',
          roles: ["SuperAdmin"]
        },
        {
          key: '3-6',
          icon: <AiOutlineTag />,
          label: 'Offers',
          path: '/offer',
          roles: ["SuperAdmin"]
        },
      ]
    },
    {
      key: '4',
      icon: <GiMedicines />,
      label: 'Drug Management',
      roles: ["SuperAdmin", "Branch Admin"],
      children: [
        {
          key: '4-1',
          icon: <RiMedicineBottleFill />,
          label: 'Drugs Category',
          path: '/drugs-category',
          roles: ["SuperAdmin", "Branch Admin"]
        },
        {
          key: '4-2',
          icon: <AiFillMedicineBox />,
          label: 'Drugs',
          path: '/drugs',
          roles: ["SuperAdmin", "Branch Admin"]
        },
      ]
    },
    {
      key: '5',
      icon: <GiHealthNormal />,
      label: 'Treatment Management',
      roles: ["SuperAdmin", "Branch Admin"],
      children: [
        {
          key: '5-1',
          icon: <FileAddOutlined />,
          label: 'Treatment Category',
          path: '/treatment-category',
          roles: ["SuperAdmin", "Branch Admin"]
        },
        {
          key: '5-2',
          icon: <MedicineBoxOutlined />,
          label: 'Treatment',
          path: '/treatment',
          roles: ["SuperAdmin", "Branch Admin"]
        },
      ]
    },
    {
      key: '6',
      icon: <UserAddOutlined />,
      label: 'Patients Management',
      path: '/patients',
      roles: ["SuperAdmin", "Branch Admin", "Ticketing Officer"]
    },
    {
      key: '7',
      icon: <FaHospitalUser />,
      label: 'Patients Visit',
      path: '/patients-visit',
      roles: ["SuperAdmin", "Branch Admin", "Ticketing Officer"]
    },
    {
      key: '8',
      icon: <BsListTask />,
      label: 'My Appointments',
      path: '/my-appointment-list',
      roles: ["Doctor"]
    },
  ];

  // Get filtered menu items based on user role

  const filteredMenuItems = filterMenuItems(menuItems, user?.role);

  return (
      <Layout className="dashboard-layout" style={{ minHeight: '100vh' }}>
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            className="dashboard-sider-dark"
            width={260}
            theme="dark"
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
              top: 0,
              bottom: 0,
            }}
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
              // Remove defaultOpenKeys or set it to just the current active menu
          >
            {renderMenuItems(filteredMenuItems)}
          </Menu>
        </Sider>
        <Layout style={{
          marginLeft: collapsed ? 80 : 260,
          minHeight: '100vh'
        }}>
          <Header
              className="dashboard-header"
              style={{
                position: 'fixed',
                zIndex: 3, // Higher than sider
                width: `calc(100% - ${collapsed ? 80 : 260}px)`,
                left: collapsed ? 80 : 260,
                transition: 'all 0.2s',
              }}
          >
            <Breadcrumb items={[{ title: 'Home' }, { title: currentTitle }]} />
            <div className="header-actions">
              <Button type="text" icon={<BellOutlined />} />
              <Avatar icon={<UserOutlined />} />
              <Button type="text" onClick={() => signOut()} icon={<LogoutOutlined />} />
            </div>
          </Header>
          <Content className="dashboard-content" style={{
            marginTop: 64, // Height of header
            padding: '24px',
            overflow: 'auto',
            height: 'calc(100vh - 64px)' // Viewport height minus header height
          }}>
            {children}
          </Content>

        </Layout>
      </Layout>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};