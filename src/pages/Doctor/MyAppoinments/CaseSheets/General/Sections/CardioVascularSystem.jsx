import React from 'react';
import { Card, InputNumber, Input, Select, Row, Col } from 'antd';

const { Option } = Select;

const CardiovascularSystem = ({ data, onChange }) => {


    return (
        <Card title="Cardiovascular System" style={{ marginBottom: 16 }}>
            <Row gutter={16}>
                <Col span={8}>
                    <label>Heart Rate (bpm)</label>
                    <InputNumber
                        style={{ width: '100%' }}
                        value={data?.heartRate}
                        onChange={(value) => onChange('heartRate', value)}
                    />
                </Col>
                <Col span={8}>
                    <label>Lymph Nodes</label>
                    <Input
                        value={data?.lymphNodes}
                        onChange={(e) => onChange('lymphNodes', e.target.value)}
                        placeholder="120/80"
                    />
                </Col>
                <Col span={8}>
                    <label>Body Temperature</label>
                    <Input
                        value={data?.bodyTemperature}
                        onChange={(e) => onChange('bodyTemperature', e.target.value)}
                        placeholder="120/80"
                    />
                </Col>
            </Row>
        </Card>
    );
};

export default CardiovascularSystem;