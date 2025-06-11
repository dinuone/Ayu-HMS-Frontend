import React from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

function DiseaseCodeSelect({ diseaseCodesFromDB, caseSheet, setCaseSheet }) {
    // Map selected disease code IDs to full objects
    const handleChange = (selectedIds) => {
        const selectedDiseaseCodes = diseaseCodesFromDB.filter(dc => selectedIds.includes(dc.id));

        setCaseSheet((prev) => ({
            ...prev,
            diseaseCodes: selectedDiseaseCodes,
        }));
    };

    // Selected disease code IDs from caseSheet
    const selectedIds = (caseSheet.diseaseCodes || []).map(dc => dc.id);

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
