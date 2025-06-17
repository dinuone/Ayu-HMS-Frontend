import React, { memo } from 'react';
import {Checkbox, Input, Tag, Typography} from 'antd';

const { Title } = Typography;

const otherComplaintOptions = ['Gastritis', 'Headache', 'Other'];

const OtherComplaint = memo(({
                                 value,
                                 onChange,
                                 otherComplaintDetail,
                                 onDetailChange,
                                 readonly = false

                             }) => {
    const showOtherInput = value?.includes('Other');

    return (
        <>
            <Title level={5}>Other Complaint</Title>

            {readonly ? (
                <>
                    {value.length === 0 ? (
                        <Tag color="red-inverse">None</Tag>
                    ) : (
                        value.map((val) => (
                            <Tag key={val}  color="red-inverse" style={{ marginBottom: 6 }}>
                                {val}
                            </Tag>
                        ))
                    )}

                    {otherComplaintDetail && (
                        <div style={{ marginTop: 10 }}>
                            <Input
                                readonly={readonly}
                                style={{ marginTop: '10px', marginBottom: '10px' }}
                                value={otherComplaintDetail}
                                onChange={(e) => onDetailChange(e.target.value)}
                            />
                        </div>
                    )}
                </>
            ) : (
                <>
                    <Checkbox.Group
                        options={otherComplaintOptions}
                        value={value}
                        onChange={(checkedValues) => onChange(checkedValues)}
                    />

                    {showOtherInput && (
                        <Input
                            style={{ marginTop: '10px', marginBottom: '10px' }}
                            value={otherComplaintDetail}
                            onChange={(e) => onDetailChange(e.target.value)}
                        />
                    )}
                </>
            )}
        </>
    );
});

export default OtherComplaint;