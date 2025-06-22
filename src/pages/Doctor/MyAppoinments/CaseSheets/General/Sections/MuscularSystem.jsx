import React from 'react';
import {Card, InputNumber, Select, Row, Col, Input, Checkbox} from 'antd';

const { Option } = Select;

const MuscularSystem = ({ data, onChange,readonly = false }) => {



    return (
        <Card title="Muscular System" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Muscles</label>
                <Input
                    readOnly={readonly}
                    value={data.muscles}
                    onChange={(e) => onChange('muscles', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Adipose Tissue</label>
                <Input
                    readOnly={readonly}
                    value={data.adiposeTissue}
                    onChange={(e) => onChange('adiposeTissue', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Body Weight</label>
                <Input
                    readOnly={readonly}
                    value={data.bodyWeight}
                    onChange={(e) => onChange('bodyWeight', e.target.value)}
                />
            </div>
        </Card>
    );
};

export default MuscularSystem;