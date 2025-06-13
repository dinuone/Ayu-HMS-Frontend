import React, { memo } from 'react';
import {DatePicker, Input, Typography} from 'antd';


const { Title } = Typography;

const NextVisit = memo(({ value, onChange }) => {
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Next Visit Date</label>
                <DatePicker
                    format="YYYY-MM-DD"
                    onChange={(date, dateString) => onChange(dateString)}
                    style={{ width: 200 }}
                />
            </div>





        </>
    );
});

export default NextVisit;