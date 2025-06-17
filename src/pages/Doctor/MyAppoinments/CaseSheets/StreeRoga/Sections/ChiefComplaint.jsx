import React, { memo } from 'react';
import { Typography } from 'antd';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const { Title } = Typography;

const ChiefComplaint = memo(({ value, onChange, readonly = false}) => {
    return (
        <>
            <Title level={5}>Chief Complaint</Title>
            <ReactQuill
                readOnly={readonly}
                theme="snow"
                value={value}
                onChange={onChange}
            />
        </>
    );
});

export default ChiefComplaint;