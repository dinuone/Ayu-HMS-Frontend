import React from 'react';
import {Card, InputNumber, Select, Row, Col, Input, Checkbox} from 'antd';

const { Option } = Select;

const IntegumentarySystem = ({ data, onChange }) => {


    return (
        <Card title="Integumentary System" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Skin</label>
                <Input
                    value={data.skin}
                    onChange={(e) => onChange('skin', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Body Hair</label>
                <Input
                    value={data.bodyHair}
                    onChange={(e) => onChange('bodyHair', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Sweat</label>
                <Input
                    value={data.sweat}
                    onChange={(e) => onChange('sweat', e.target.value)}
                />
            </div>
        </Card>
    );
};

export default IntegumentarySystem;