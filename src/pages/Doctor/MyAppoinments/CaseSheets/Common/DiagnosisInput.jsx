import React, { memo } from 'react';
import {DatePicker, Input, Typography} from 'antd';


const { Title } = Typography;

const DiagnosisInput = memo(({ value, onChange }) => {
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 170 }}>Diagnosis</label>
                <Input.TextArea rows={4}
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </>
    );
});

export default DiagnosisInput;

