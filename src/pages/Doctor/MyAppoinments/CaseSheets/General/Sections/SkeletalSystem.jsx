import React from 'react';
import {Card, InputNumber, Select, Row, Col, Input, Checkbox} from 'antd';

const { Option } = Select;

const SkeletalSystem = ({ data, onChange,readonly = false }) => {


    return (
        <Card title="Skeletal System" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Bones</label>
                <Input
                    readOnly={readonly}
                    value={data.bones}
                    onChange={(e) => onChange('bones', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Joints</label>
                <Input
                    readOnly={readonly}
                    value={data.joints}
                    onChange={(e) => onChange('joints', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Crepitations</label>
                <Input
                    readOnly={readonly}
                    value={data.crepitations}
                    onChange={(e) => onChange('crepitations', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Hair</label>
                <Input
                    readOnly={readonly}
                    value={data.hair}
                    onChange={(e) => onChange('hair', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Nails</label>
                <Input
                    readOnly={readonly}
                    value={data.nails}
                    onChange={(e) => onChange('nails', e.target.value)}
                />
            </div>
        </Card>
    );
};

export default SkeletalSystem;