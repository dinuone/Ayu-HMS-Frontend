import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined, DashboardOutlined } from '@ant-design/icons';
import '../styles/Login.css';



function Login({ onLogin }) {
  const onFinish = (values) => {
    if (values.username === 'admin' && values.password === 'admin') {
      message.success('Welcome back! Redirecting to dashboard...');
      onLogin();
    } else {
      message.error('Invalid credentials. Please try again.');
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
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Username"
              autoComplete="username"
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
              prefix={<LockOutlined />}
              placeholder="Password"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <div className="login-footer">
          {/*<p>*/}
          {/*  Don't have an account? <a href="#">Sign up</a>*/}
          {/*</p>*/}
          <p>
            <a href="#">Forgot password?</a>
          </p>
        </div>
      </Card>
    </div>
  );
}

export default Login;