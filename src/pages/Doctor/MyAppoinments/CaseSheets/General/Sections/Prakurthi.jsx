import React from 'react';
import { Typography } from 'antd';
import ReactQuill from 'react-quill-new';

const { Title } = Typography;

function Prakurthi({ data = {}, onChange, readonly }) {
    return (
        <>
            <Title level={5}>Prakurthi</Title>

            <div style={{  alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Physical</label>
                <ReactQuill
                    readOnly={readonly}
                    theme="snow"
                    value={data.physical || ''}
                    onChange={(value) => onChange('physical', value)}
                />
            </div>

            <div style={{  alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Mental</label>
                <ReactQuill
                    readOnly={readonly}
                    theme="snow"
                    value={data.mental || ''}
                    onChange={(value) => onChange('mental', value)}
                />
            </div>
        </>
    );
}

export default Prakurthi;
