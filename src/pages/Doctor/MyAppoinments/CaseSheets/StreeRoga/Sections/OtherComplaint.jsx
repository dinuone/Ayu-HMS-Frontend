import React, { memo } from 'react';
import { Checkbox, Input, Typography } from 'antd';

const { Title } = Typography;

const otherComplaintOptions = ['Gastritis', 'Headache', 'Other'];

const OtherComplaint = memo(({
                                 value,
                                 onChange,
                                 otherComplaintDetail,
                                 onDetailChange
                             }) => {
    const showOtherInput = value?.includes('Other');

    return (
        <>
            <Title level={5}>Other Complaint</Title>
            <Checkbox.Group
                options={otherComplaintOptions}
                value={value}
                onChange={(checkedValues) => {
                    onChange(checkedValues);
                }}
            />

            {showOtherInput && (
                <>
                    <Input
                        style={{marginTop: '10px', marginBottom:'10px'}}
                        value={otherComplaintDetail}
                        onChange={(e) => onDetailChange(e.target.value)}
                    />
                </>
            )}
        </>
    );
});

export default OtherComplaint;