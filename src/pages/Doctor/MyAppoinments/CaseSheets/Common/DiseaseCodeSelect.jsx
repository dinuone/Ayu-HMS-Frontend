import React from 'react';
import { Form, Select, Typography } from 'antd';

const { Option } = Select;
const { Title } = Typography;

function DiseaseCodeSelect({ diseaseCodesFromDB, value = [], onChange }) {
    const handleChange = (selectedIds) => {
        const selected = diseaseCodesFromDB.filter(dc => selectedIds.includes(dc.id));
        onChange(selected);
    };

    const selectedIds = value.map(dc => dc.id); // value is an array of selected disease code objects

    return (
        <>
            <label style={{ width: 150 }}>Disease Codes</label>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <Select
                    mode="multiple"
                    placeholder="Select disease codes"
                    value={selectedIds}
                    onChange={handleChange}
                    optionLabelProp="label"
                    showSearch
                    optionFilterProp="label"
                    filterOption={(input, option) =>
                        option.label.toLowerCase().includes(input.toLowerCase())
                    }
                    style={{ minWidth: 600 }}
                >
                    {diseaseCodesFromDB.map(({ id, name }) => (
                        <Option key={id} value={id} label={name}>
                            {name}
                        </Option>
                    ))}
                </Select>
            </div>
        </>
    );
}

export default DiseaseCodeSelect;
