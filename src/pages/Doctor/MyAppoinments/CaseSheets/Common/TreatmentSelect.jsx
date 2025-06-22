import React from 'react';
import { Form, Select, Typography } from 'antd';

const { Option } = Select;
const { Title } = Typography;

function TreatmentSelect({ treatmentsFromDB, value = [], onChange }) {
    const handleChange = (selectedIds) => {
        const selectedTreatments = treatmentsFromDB.filter(t => selectedIds.includes(t.id));
        onChange(selectedTreatments);
    };

    const selectedIds = value.map(t => t.id); // value is an array of treatment objects

    return (
        <>
            <Title level={5}>Treatments</Title>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <Select
                    mode="multiple"
                    placeholder="Select treatments"
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
                    {treatmentsFromDB.map((treatment) => (
                        <Option
                            key={treatment.id}
                            value={treatment.id}
                            label={treatment.name}
                        >
                            {treatment.name}
                        </Option>
                    ))}
                </Select>
            </div>
        </>
    );
}

export default TreatmentSelect;
