import React from 'react';
import {Card, InputNumber, Select, Row, Col, Input, Checkbox} from 'antd';

const { Option } = Select;

const LymphaticSystem = ({ data, onChange,readonly = false }) => {


    return (
        <Card title="Lymphatic  System" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Fluid retention</label>
                <Input
                    readOnly={readonly}
                    value={data.fluidRetention}
                    onChange={(e) => onChange('fluidRetention', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Palpate</label>
                <Input
                    readOnly={readonly}
                    value={data.Palpate}
                    onChange={(e) => onChange('Palpate', e.target.value)}
                />
            </div>
           
        </Card>
    );
};

export default LymphaticSystem;