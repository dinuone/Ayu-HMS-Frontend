import React from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

function TreatmentSelect({ treatmentsFromDB, caseSheet, setCaseSheet }) {
    // treatmentsFromDB = [{ id: 1, name: 'Vein Stripping' }, { id: 2, name: 'Sclerotherapy' }, ...]

    const handleChange = (selectedIds) => {
        // selectedIds is an array of treatment IDs
        // Map selected IDs to objects with id and name
        const selectedTreatments = treatmentsFromDB.filter(t => selectedIds.includes(t.id));

        setCaseSheet((prev) => ({
            ...prev,
            treatments: selectedTreatments,
        }));
    };

    // Get currently selected IDs from caseSheet for value prop
    const selectedIds = (caseSheet.treatments || []).map(t => t.id);

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
