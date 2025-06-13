import React, { memo } from 'react';
import {Input, Radio, Typography} from 'antd';
import ReactQuill from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css';

const { Title } = Typography;


const PhysicalExam = memo(({data, onChange}) => {

    return (
        <>
            <Title level={5}>Physical Examination</Title>


            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16}}>
                <label style={{ width: 150 }}>Pulse</label>
                <Input
                    value={data.pulse}
                    onChange={(e) => onChange('pulse', e.target.value)}
                    style={{width:500}}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>B/P</label>
                <Input
                    value={data.bp}
                    onChange={(e) => onChange('bp', e.target.value)}
                    style={{width:500}}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Weight</label>
                <Input
                    value={data.weight}
                    onChange={(e) => onChange('weight', e.target.value)}
                    style={{width:500}}
                />
            </div>

        </>
    );
});

export default PhysicalExam;