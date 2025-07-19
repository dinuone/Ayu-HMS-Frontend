import React, { memo } from 'react';
import {Input, Radio, Typography} from 'antd';
import ReactQuill from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css';

const { Title } = Typography;


const PastIllnesses = memo(({data, onChange,readonly = false}) => {

    return (
        <>
            <Title level={5}>Past Illnesses</Title>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>HTN</label>
                <Input
                    readOnly={readonly}
                    value={data.pastIllness_HTN}
                    onChange={(e) => onChange('pastIllness_HTN', e.target.value)}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>DM</label>
                <Input
                    readOnly={readonly}
                    value={data.pastIllness_DM}
                    onChange={(e) => onChange('pastIllness_DM', e.target.value)}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>CHL</label>
                <Input
                    readOnly={readonly}
                    value={data.pastIllness_CHL}
                    onChange={(e) => onChange('pastIllness_CHL', e.target.value)}
                />
            </div>



            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>TB</label>
                <Input
                    readOnly={readonly}
                    value={data.pastIllness_TB}
                    onChange={(e) => onChange('pastIllness_TB', e.target.value)}
                />
            </div>


            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>BA</label>
                <Input
                    readOnly={readonly}
                    value={data.pastIllness_BA}
                    onChange={(e) => onChange('pastIllness_BA', e.target.value)}
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

export default PastIllnesses;