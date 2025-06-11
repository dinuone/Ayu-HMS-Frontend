import React from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

function DiseaseCodeSelect({ diseaseCodesFromDB, selectedDiseaseCodes, setSelectedDiseaseCodes }) {
    const handleChange = (selectedIds) => {
        const selected = diseaseCodesFromDB.filter(dc => selectedIds.includes(dc.id));
        setSelectedDiseaseCodes(selected);
    };

    const selectedIds = (selectedDiseaseCodes || []).map(dc => dc.id);

    return (
        <Form.Item label="Disease Codes" name="diseaseCodes">
            <Select
                mode="multiple"
                placeholder="Select disease codes"
                value={selectedIds}
                onChange={handleChange}
                optionLabelProp="label"
                style={{ minWidth: 300 }}
            >
                {diseaseCodesFromDB.map(({ id, code, name }) => (
                    <Option key={id} value={id} label={`${code} - ${name}`}>
                        {code} - {name}
                    </Option>
                ))}
            </Select>
        </Form.Item>
    );
}

export default DiseaseCodeSelect;
