import React, { memo } from 'react';
import { DatePicker, Typography, Tag } from 'antd';
import dayjs from 'dayjs';

const { Title } = Typography;

const redInverseStyle = {
    backgroundColor: 'white',
    color: 'red',
    borderColor: 'red',
};

const NextVisit = memo(({ value, onChange, readonly = false }) => {
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Next Visit Date</label>

                {readonly ? (
                    <Tag color="red-inverse">
                        {value ? dayjs(value).format('YYYY-MM-DD') : 'Not selected'}
                    </Tag>
                ) : (
                    <DatePicker
                        value={value ? dayjs(value) : null}
                        format="YYYY-MM-DD"
                        onChange={(date, dateString) => onChange(dateString)}
                        style={{ width: 200 }}
                    />
                )}
            </div>
        </>
    );
});

export default NextVisit;
