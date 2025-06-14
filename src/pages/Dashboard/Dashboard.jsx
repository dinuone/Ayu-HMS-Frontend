import React, { useRef, useEffect } from 'react';
import { Card, Row, Col, Statistic, Typography, Divider, Progress } from 'antd';
import {
    UserOutlined,
    TeamOutlined,
    DollarOutlined,
    MessageOutlined,
    ArrowUpOutlined,
    CalendarOutlined,
    MedicineBoxOutlined
} from '@ant-design/icons';
import Chart from 'chart.js/auto';

const { Title, Text } = Typography;

const Dashboard = () => {
    const visitsChartRef = useRef(null);
    const departmentChartRef = useRef(null);
    const revenueChartRef = useRef(null);
    const visitsChartInstance = useRef(null);
    const departmentChartInstance = useRef(null);
    const revenueChartInstance = useRef(null);

    // Sample data
    const stats = {
        doctors: 24,
        patients: 186,
        earnings: 125000,
        feedbacks: 42,
        appointments: 18
    };

    useEffect(() => {
        // Cleanup function
        return () => {
            if (visitsChartInstance.current) {
                visitsChartInstance.current.destroy();
            }
            if (departmentChartInstance.current) {
                departmentChartInstance.current.destroy();
            }
            if (revenueChartInstance.current) {
                revenueChartInstance.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        // Destroy existing charts if they exist
        if (visitsChartInstance.current) {
            visitsChartInstance.current.destroy();
        }
        if (departmentChartInstance.current) {
            departmentChartInstance.current.destroy();
        }
        if (revenueChartInstance.current) {
            revenueChartInstance.current.destroy();
        }

        // Patient Visits Chart
        const visitsCtx = visitsChartRef.current.getContext('2d');
        visitsChartInstance.current = new Chart(visitsCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Patient Visits',
                    data: [120, 200, 150, 180, 190, 210, 250, 220, 240, 280, 300, 350],
                    backgroundColor: '#1890ff',
                    borderRadius: 6,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#ffffff',
                        titleColor: '#000000',
                        bodyColor: '#000000',
                        borderColor: '#dddddd',
                        borderWidth: 1,
                        padding: 12,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        callbacks: {
                            label: (context) => `${context.dataset.label}: ${context.raw}`
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false }
                    },
                    y: {
                        grid: {
                            color: '#f0f0f0',
                            drawBorder: false
                        }
                    }
                }
            }
        });

        // Department Distribution Chart
        const departmentCtx = departmentChartRef.current.getContext('2d');
        departmentChartInstance.current = new Chart(departmentCtx, {
            type: 'doughnut',
            data: {
                labels: ['General', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics'],
                datasets: [{
                    data: [35, 20, 15, 15, 15],
                    backgroundColor: [
                        '#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1'
                    ],
                    borderWidth: 0,
                    cutout: '70%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 12,
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        backgroundColor: '#ffffff',
                        titleColor: '#000000',
                        bodyColor: '#000000',
                        borderColor: '#dddddd',
                        borderWidth: 1,
                        padding: 12,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }
                }
            }
        });

        // Revenue Trend Chart
        const revenueCtx = revenueChartRef.current.getContext('2d');
        revenueChartInstance.current = new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Revenue (LKR)',
                    data: [95000, 110000, 105000, 115000, 120000, 125000, 135000, 130000, 140000, 150000, 160000, 180000],
                    borderColor: '#52c41a',
                    backgroundColor: 'rgba(82, 196, 26, 0.1)',
                    borderWidth: 2,
                    tension: 0.3,
                    fill: true,
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: '#52c41a',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#ffffff',
                        titleColor: '#000000',
                        bodyColor: '#000000',
                        borderColor: '#dddddd',
                        borderWidth: 1,
                        padding: 12,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        callbacks: {
                            label: (context) => `LKR ${context.raw.toLocaleString()}`
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false }
                    },
                    y: {
                        grid: {
                            color: '#f0f0f0',
                            drawBorder: false
                        },
                        ticks: {
                            callback: (value) => `LKR ${value.toLocaleString()}`
                        }
                    }
                }
            }
        });
    }, []);

    return (
        <div style={{ padding: '24px', background: '#f0f2f5' }}>
            {/* Welcome Banner */}
            <Card
                bordered={false}
                style={{
                    background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
                    marginBottom: '24px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
            >
                <Title level={3} style={{ color: 'white', margin: 0 }}>
                    <MedicineBoxOutlined style={{ marginRight: '10px' }} />
                    Welcome back, Admin!
                </Title>
                <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Harendra Ayurveda Hospital Management System
                </Text>
            </Card>

            {/* Stats Cards */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                {[
                    {
                        title: 'Total Doctors',
                        value: stats.doctors,
                        icon: <UserOutlined />,
                        color: '#1890ff',
                        progress: 70
                    },
                    {
                        title: 'Active Patients',
                        value: stats.patients,
                        icon: <TeamOutlined />,
                        color: '#52c41a',
                        progress: 85
                    },
                    {
                        title: 'Total Earnings',
                        value: `LKR ${stats.earnings.toLocaleString()}`,
                        icon: <DollarOutlined />,
                        color: '#faad14',
                        progress: 65
                    },
                    {
                        title: 'Patient Feedbacks',
                        value: stats.feedbacks,
                        icon: <MessageOutlined />,
                        color: '#722ed1',
                        progress: 45
                    },
                    {
                        title: "Today's Appointments",
                        value: stats.appointments,
                        icon: <CalendarOutlined />,
                        color: '#f5222d',
                        progress: 30
                    },
                ].map((stat, index) => (
                    <Col key={index} xs={24} sm={12} md={8} lg={4} xl={4}>
                        <Card
                            bordered={false}
                            style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)' }}
                        >
                            <Statistic
                                title={<Text strong>{stat.title}</Text>}
                                value={stat.value}
                                prefix={stat.icon}
                                valueStyle={{ color: stat.color, fontSize: '24px' }}
                            />
                            <Progress
                                percent={stat.progress}
                                showInfo={false}
                                strokeColor={stat.color}
                                strokeWidth={4}
                            />
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                                <ArrowUpOutlined /> {stat.progress - 10}% from last month
                            </Text>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Charts Section */}
            <Row gutter={[16, 16]}>
                {/* Patient Visits Chart */}
                <Col xs={24} lg={12}>
                    <Card
                        title="Monthly Patient Visits"
                        bordered={false}
                        style={{ borderRadius: '12px', height: '400px' }}
                    >
                        <div style={{ height: '300px' }}>
                            <canvas ref={visitsChartRef}></canvas>
                        </div>
                    </Card>
                </Col>

                {/* Department Distribution Chart */}
                <Col xs={24} lg={12}>
                    <Card
                        title="Patient Distribution by Department"
                        bordered={false}
                        style={{ borderRadius: '12px', height: '400px' }}
                    >
                        <div style={{ height: '300px' }}>
                            <canvas ref={departmentChartRef}></canvas>
                        </div>
                    </Card>
                </Col>

                {/* Revenue Trend Chart */}
                <Col xs={24}>
                    <Card
                        title="Monthly Revenue Trend"
                        bordered={false}
                        style={{ borderRadius: '12px', height: '400px', marginTop: '16px' }}
                    >
                        <div style={{ height: '300px' }}>
                            <canvas ref={revenueChartRef}></canvas>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;