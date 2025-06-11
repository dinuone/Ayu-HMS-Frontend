import React from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

function TreatmentSelect({ treatmentsFromDB, treatments, setTreatments }) {
    const handleChange = (selectedIds) => {
        const selectedTreatments = treatmentsFromDB.filter(t => selectedIds.includes(t.id));
        setTreatments(selectedTreatments);
    };

    const selectedIds = (treatments || []).map(t => t.id);

    return (
        <Form.Item name="treatments">
            <Select
                mode="multiple"
                placeholder="Select treatments"
                value={selectedIds}
                onChange={handleChange}
                optionLabelProp="label"
                style={{ minWidth: 300 }}
            >
                {treatmentsFromDB.map((treatment) => (
                    <Option key={treatment.id} value={treatment.id} label={treatment.name}>
                        {treatment.name}
                    </Option>
                ))}
            </Select>
        </Form.Item>
    );
}

export default TreatmentSelect;
