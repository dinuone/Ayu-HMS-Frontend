import React from 'react';
import {Card, InputNumber, Select, Row, Col, Input, Checkbox} from 'antd';

const { Option } = Select;

const SensoryFunctions = ({ data, onChange }) => {




    return (
        <Card title="Sensory Functions" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Touch</label>
                <Input
                    value={data.touch}
                    onChange={(e) => onChange('touch', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Pain</label>
                <Input
                    value={data.pain}
                    onChange={(e) => onChange('pain', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Pressure</label>
                <Input
                    value={data.pressure}
                    onChange={(e) => onChange('pressure', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Temperature</label>
                <Input
                    value={data.temperature}
                    onChange={(e) => onChange('temperature', e.target.value)}
                />
            </div>
        </Card>
    );
};

export default SensoryFunctions;