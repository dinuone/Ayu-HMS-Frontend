import React, { memo } from 'react';
import {Input, Radio, Typography} from 'antd';
import ReactQuill from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css';

const { Title } = Typography;


const MedicalHistory = memo(({data, onChange,readonly = false}) => {

    return (
        <>
            <Title level={5}>Previous Medical History</Title>

            <div style={{marginBottom:16}}>
                <label style={{ width: 200 }}>Previous joint problems</label>
                <ReactQuill
                    readOnly={readonly}
                    theme="snow"
                    value={data.previousJointProblem}
                    onChange={(value) => onChange('previousJointProblem', value)}

                />
            </div>


            <label style={{ width: 150 }}>Other Major Illness</label>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>HTN</label>
                <Input
                    readOnly={readonly}
                    value={data.otherMajorIllness_HTN}
                    onChange={(e) => onChange('otherMajorIllness_HTN', e.target.value)}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>DM</label>
                <Input
                    readOnly={readonly}
                    value={data.otherMajorIllness_DM}
                    onChange={(e) => onChange('otherMajorIllness_DM', e.target.value)}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>CHO</label>
                <Input
                    readOnly={readonly}
                    value={data.otherMajorIllness_CHO}
                    onChange={(e) => onChange('otherMajorIllness_CHO', e.target.value)}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>THY</label>
                <Input
                    readOnly={readonly}
                    value={data.otherMajorIllness_THY}
                    onChange={(e) => onChange('otherMajorIllness_THY', e.target.value)}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>TB</label>
                <Input
                    readOnly={readonly}
                    value={data.otherMajorIllness_TB}
                    onChange={(e) => onChange('otherMajorIllness_TB', e.target.value)}
                />
            </div>

            <div style={{marginBottom:16}}>
                <label style={{ width: 200 }}>Surgeries</label>
                <ReactQuill
                    readOnly={readonly}
                    theme="snow"
                    value={data.surgeries}
                    onChange={(value) => onChange('surgeries', value)}
                />
            </div>

            <div style={{marginBottom:16}}>
                <label style={{ width: 200 }}>Allergies</label>
                <ReactQuill
                    readOnly={readonly}
                    theme="snow"
                    value={data.allergies}
                    onChange={(value) => onChange('allergies', value)}
                />
            </div>

            <div style={{marginBottom:16}}>
                <label style={{ width: 200 }}>Family history</label>
                <ReactQuill
                    readOnly={readonly}
                    theme="snow"
                    value={data.familyHistory}
                    onChange={(value) => onChange('familyHistory', value)}
                />
            </div>



        </>
    );
});

export default MedicalHistory;