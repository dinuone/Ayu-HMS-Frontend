import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../styles/Login.css';

import { useAuth } from '../Provider/authProvider.jsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {login} from "../Services/NetworkManager.js";

function Login() {
  const { setAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
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
            role : response.data.role
          },
        };

        setAuth(authData);
        setLoading(false);
        navigate('/dashboard');

      } else {
        message.error('Something went wrong!.');
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      // Extract error message from response
      const errorMessage = error.response?.data?.data?.message || 'Login failed. Please try again.';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };


  return (
      <div className="login-container">
        <div className="login-background"></div>
        <div className="login-overlay"></div>
        <Card className="login-card">
          <div className="login-header">
            <div className="brand-logo">
              <img src="/logo.PNG" alt="Logo" />
            </div>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Enter your credentials to access your account</p>
          </div>

          <Form
              name="login"
              className="login-form"
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
              <Input prefix={<UserOutlined />} placeholder="Username" autoComplete="username" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please enter your password' },
                  { min: 4, message: 'Password must be at least 4 characters' }
                ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" autoComplete="current-password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <div className="login-footer">
            <p>
              <a href="#">Forgot password?</a>
            </p>
          </div>
        </Card>
      </div>
  );
}

export default Login;
