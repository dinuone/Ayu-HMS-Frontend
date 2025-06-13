import React, { memo } from 'react';
import {DatePicker, Input, Radio, Typography} from 'antd';
import ReactQuill from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css';

const { Title } = Typography;


const PresentIllness = memo(({data, onChange}) => {

    return (
        <>
            <Title level={5}>History of Present Illness</Title>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 80 }}>Onset</label>
                <Radio.Group
                    value={data.onset}
                    onChange={(e) => onChange('onset', e.target.value)}
                >
                    <Radio value="Gradual">Gradual</Radio>
                    <Radio value="Sudden">Sudden</Radio>
                </Radio.Group>
            </div>


            <div style={{  alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 200 }}>Progression</label>
                <ReactQuill
                    theme="snow"
                    value={data.progression}
                    onChange={(value) => onChange('progression', value)}
                />
            </div>


            <div style={{  alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 200 }}>Previous treatment</label>
                <ReactQuill
                    theme="snow"
                    value={data.previousTreatment}
                    onChange={(value) => onChange('previousTreatment', value)}
                />
            </div>

        </>
    );
});

export default PresentIllness;