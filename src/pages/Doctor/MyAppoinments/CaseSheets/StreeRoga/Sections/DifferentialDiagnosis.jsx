import React, { memo } from 'react';
import {Input, Radio, Typography} from 'antd';
import ReactQuill from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css';

const { Title } = Typography;


const DifferentialDiagnosis = memo(({value, onChange}) => {

    return (
        <>
            <Title level={5}>Differential Diagnosis</Title>

            <div style={{marginBottom:16}}>
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={onChange}
                />
            </div>
        </>
    );
});

export default DifferentialDiagnosis;