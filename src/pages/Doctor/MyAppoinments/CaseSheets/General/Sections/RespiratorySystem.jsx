import React from 'react';
import {Card, InputNumber, Select, Row, Col, Input} from 'antd';

const { Option } = Select;

const RespiratorySystem = ({ data, onChange,readonly = false }) => {



    return (
        <Card title="Respiratory System" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Cough</label>
                <Input
                    readOnly={readonly}
                    value={data.cough}
                    onChange={(e) => onChange('cough', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Throat</label>
                <Input
                    readOnly={readonly}
                    value={data.throat}
                    onChange={(e) => onChange('throat', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Lungs</label>
                <Input
                    readOnly={readonly}
                    value={data.lungs}
                    onChange={(e) => onChange('lungs', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Respiratory Rate (BPM)</label>
                <Input
                    readOnly={readonly}
                    value={data.respiratoryRate}
                    onChange={(e) => onChange('respiratoryRate', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Expectorant</label>
                <Input
                    readOnly={readonly}
                    value={data.expectorant}
                    onChange={(e) => onChange('expectorant', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Head</label>
                <Input
                    readOnly={readonly}
                    value={data.head}
                    onChange={(e) => onChange('head', e.target.value)}
                />
            </div>
        </Card>
    );
};

export default RespiratorySystem;