import React from 'react';
import { Typography } from 'antd';
import ReactQuill from 'react-quill-new';

const { Title } = Typography;

function TreatmentHistory({ data = {}, onChange, readonly }) {
    return (
        <>
            <Title level={5}>Treatment History</Title>

            <div style={{  alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Medical</label>
                <ReactQuill
                    readOnly={readonly}
                    theme="snow"
                    value={data.medical || ''}
                    onChange={(value) => onChange('medical', value)}
                />
            </div>

            <div style={{  alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Surgical</label>
                <ReactQuill
                    readOnly={readonly}
                    theme="snow"
                    value={data.surgical || ''}
                    onChange={(value) => onChange('surgical', value)}
                />
            </div>
        </>
    );
}

export default TreatmentHistory;
