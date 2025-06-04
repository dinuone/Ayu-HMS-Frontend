import {Form, Input, Select} from 'antd';
import PropTypes from 'prop-types';

const FeeloVisitForm = ({ treatmentData, onTreatmentSelect }) => (
    <>
        <Form.Item
            label="Feelo Reference ID"
            name="feeloReference"
            rules={[{ required: true, message: 'Please enter Feelo reference ID' }]}
        >
           <Input/>
        </Form.Item>

        <Form.Item label="Select Treatments" name="treatments"
                   rules={[{ required: true, message: 'Please select treatments' }]}>
            <Select
                mode="multiple"
                placeholder="Search Treatments"
                showSearch
                optionFilterProp="children"
                onChange={onTreatmentSelect}
                filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                }
            >
                {treatmentData.map(treatment => (
                    <Select.Option key={treatment.id} value={treatment.id}>
                        {treatment.name}
                    </Select.Option>
                ))}
            </Select>
        </Form.Item>
    </>
);

FeeloVisitForm.propTypes = {
    treatmentData: PropTypes.array.isRequired,
    onTreatmentSelect: PropTypes.func.isRequired,
};

export default FeeloVisitForm;