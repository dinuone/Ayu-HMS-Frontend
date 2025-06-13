// ClinicSelect.jsx
import React from 'react';
import {DatePicker, Form, Select} from 'antd';

const { Option } = Select;

function ClinicSelect({ clinicsFromDB, value = [], onChange }) {
    const handleChange = (selectedIds) => {
        const selectedClinics = clinicsFromDB.filter(t => selectedIds.includes(t.id));
        onChange(selectedClinics);
    };



    const selectedIds = value.map(t => t.id);

    return (

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <label style={{ width: 150 }}>Assign to Clinics</label>
            <Select
                mode="multiple"
                placeholder="Select clinics"
                value={selectedIds}
                onChange={handleChange}
                optionLabelProp="label"
                style={{ minWidth: 500 }}
            >
                {clinicsFromDB.map((clinic) => (
                    <Option key={clinic.id} value={clinic.id} label={clinic.name}>
                        {clinic.name}
                    </Option>
                ))}
            </Select>
        </div>

    );
}

export default ClinicSelect;
