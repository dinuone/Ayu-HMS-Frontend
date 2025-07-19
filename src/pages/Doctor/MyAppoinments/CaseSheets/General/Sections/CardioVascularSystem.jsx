import React from 'react';
import { Card, InputNumber, Input, Select, Row, Col } from 'antd';

const { Option } = Select;

const CardiovascularSystem = ({ data, onChange,readonly = false }) => {


    return (
        <Card title="Cardiovascular System" style={{ marginBottom: 16 }}>
            <Row gutter={16}>
                <Col span={8}>
                    <label>Heart Rate (bpm)</label>
                    <Input
                        readOnly={readonly}
                        value={data?.heartRate}
                        onChange={(e) => onChange('heartRate', e.target.value)}
                        placeholder="120/80"
                    />
                </Col>
                <Col span={8}>
                    <label>Lymph Nodes</label>
                    <Input
                        readOnly={readonly}
                        value={data?.lymphNodes}
                        onChange={(e) => onChange('lymphNodes', e.target.value)}
                        placeholder="120/80"
                    />
                </Col>
                <Col span={8}>
                    <label>Body Temperature (°C) </label>
                    <Input
                        readOnly={readonly}
                        value={data?.bodyTemperature}
                        onChange={(e) => onChange('bodyTemperature', e.target.value)}
                        placeholder="120/80"
                        suffix="°C"
                    />
                </Col>
            </Row>
        </Card>
    );
};

export default CardiovascularSystem;