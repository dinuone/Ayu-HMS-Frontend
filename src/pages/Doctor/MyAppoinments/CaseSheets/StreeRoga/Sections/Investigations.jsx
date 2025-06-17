import React, { memo } from 'react';
import { Input, Radio, Typography, Tag } from 'antd';

const { Title } = Typography;


const Investigations = memo(({ data, onChange, readonly = false }) => {
    return (
        <>
            <Title level={5}>Investigations</Title>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Blood Test</label>

                {readonly ? (
                    <Tag color="red-inverse">
                        {data?.bloodTest || 'Not selected'}
                    </Tag>
                ) : (
                    <Radio.Group
                        value={data?.bloodTest}
                        onChange={(e) => onChange('bloodTest', e.target.value)}
                    >
                        <Radio value="FBC">FBC</Radio>
                        <Radio value="ESR">ESR</Radio>
                        <Radio value="CRP">CRP</Radio>
                    </Radio.Group>
                )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Imaging Test</label>

                {readonly ? (
                    <Tag color="red-inverse">
                        {data?.imagingTest || 'Not selected'}
                    </Tag>
                ) : (
                    <Radio.Group
                        value={data?.imagingTest}
                        onChange={(e) => onChange('imagingTest', e.target.value)}
                    >
                        <Radio value="X ray">X ray</Radio>
                        <Radio value="MRI">MRI</Radio>
                    </Radio.Group>
                )}
            </div>
        </>
    );
});

export default Investigations;
