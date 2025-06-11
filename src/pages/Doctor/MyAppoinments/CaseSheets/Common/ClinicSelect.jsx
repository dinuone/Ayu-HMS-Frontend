// ClinicSelect.jsx
import React from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

function ClinicSelect({ clinicsFromDB, selectedClinics, setSelectedClinics }) {
    const handleChange = (selectedIds) => {
        const selected = clinicsFromDB.filter(clinic => selectedIds.includes(clinic.id));
        setSelectedClinics(selected);
    };

    const selectedIds = (selectedClinics || []).map(clinic => clinic.id);

    return (
        <Form.Item label="Assign to Clinics" name="clinics">
            <Select
                mode="multiple"
                placeholder="Select clinics"
                value={selectedIds}
                onChange={handleChange}
                optionLabelProp="label"
                style={{ minWidth: 300 }}
            >
                {clinicsFromDB.map(({ id, name }) => (
                    <Option key={id} value={id} label={name}>
                        {name}
                    </Option>
                ))}
            </Select>
        </Form.Item>
    );
}

export default ClinicSelect;
