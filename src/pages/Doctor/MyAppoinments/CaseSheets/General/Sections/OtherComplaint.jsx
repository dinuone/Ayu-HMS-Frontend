import React, { memo } from 'react';
import { Typography } from 'antd';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const { Title } = Typography;

const OtherComplaint = memo(({ value, onChange, readonly = false}) => {
    return (
        <>
            <Title level={5}>Other Complaint</Title>
            <ReactQuill
                readOnly={readonly}
                theme="snow"
                value={value}
                onChange={onChange}
            />
        </>
    );
});

export default OtherComplaint;