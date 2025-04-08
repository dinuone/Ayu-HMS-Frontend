import React from 'react';
import Title from "antd/es/skeleton/Title.js";

function Dashboard(props) {
    return (
        <div className="welcome-banner">
            <Title level={3} style={{ color: 'white', margin: 0 }}>Welcome back, Admin!</Title>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '8px 0 0' }}>
                Harendra Ayurveda Hospital Management System.
            </p>
        </div>
    );
}

export default Dashboard;