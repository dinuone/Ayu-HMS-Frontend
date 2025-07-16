import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../Provider/authProvider.jsx';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { login } from "../Services/NetworkManager.js";


function Login() {
  const { setAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const appVersion = import.meta.env.VITE_APP_VERSION || '1.0.0';

  useEffect(() => {
    // Add animation class to background elements when component mounts
    const background = document.querySelector('.modern-login-background');
    if (background) {
      background.classList.add('animate-background');
    }
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await login(values.username, values.password);

      if (response?.data.token) {
        const authData = {
          token: response.data.token,
          user: {
            email: response.data.email,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            userName: response.data.userName,
            role: response.data.role
          },
        };

        setAuth(authData);
        navigate('/dashboard');
      } else {
        message.error('Something went wrong!');
      }
    } catch (error) {
      console.log(error)

    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="modern-login-container">
        <div className="modern-login-background">
          <div className="floating-shapes shape-1"></div>
          <div className="floating-shapes shape-2"></div>
          <div className="floating-shapes shape-3"></div>
          <div className="modern-login-gradient"></div>
        </div>

        <div className="modern-login-content">
          <Card className="modern-login-card" hoverable>
            <div className="modern-login-header">
              <div className="modern-brand-logo">
                <img src="/logo.PNG" alt="Cadvex Logo" />
              </div>
              <h1 className="modern-login-title">Welcome to HMS</h1>
              <p className="modern-login-subtitle">Sign in to access your account</p>
            </div>

            <Form
                name="login"
                className="modern-login-form"
                onFinish={onFinish}
                layout="vertical"
                size="large"
            >
              <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: 'Please enter your username' },
                    { min: 4, message: 'Username must be at least 4 characters' }
                  ]}
              >
                <Input
                    prefix={<UserOutlined className="modern-input-prefix" />}
                    placeholder="Username"
                    autoComplete="username"
                    className="modern-input"
                />
              </Form.Item>

              <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: 'Please enter your password' },
                    { min: 4, message: 'Password must be at least 4 characters' }
                  ]}
              >
                <Input.Password
                    prefix={<LockOutlined className="modern-input-prefix" />}
                    placeholder="Password"
                    autoComplete="current-password"
                    className="modern-input"
                />
              </Form.Item>

              <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading}
                    className="modern-login-button"
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>

            <div className="modern-login-footer">
              <p className="modern-version-info">© 2025 Harendra Ayurveda Hospital Pvt(Ltd)</p>
              <p className="modern-version-info">version {appVersion}</p>
            </div>
          </Card>
        </div>
      </div>
  );
}

export default Login;