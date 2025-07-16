import {Form, Input, message, Select} from 'antd';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import api from '../../../Services/NetworkManager.js';

const PromotionVisitForm = ({ treatmentData, onTreatmentSelect, platforms}) => {


    return (
        <>
            <Form.Item
                label="Select Platform"
                name="platform"
                rules={[{ required: true, message: 'Please select platform' }]}
            >
                <Select
                    placeholder="Search platform"
                    showSearch
                    optionFilterProp="children"
                    onChange={platforms}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().includes(input.toLowerCase())
                    }
                >
                    {platforms.map(platform => (
                        <Select.Option key={platform} value={platform}>
                            {platform}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                label="Reference ID"
                name="referenceId"
                rules={[{ required: true, message: 'Please enter reference ID' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Select Treatments"
                name="treatments"
                rules={[{ required: true, message: 'Please select treatments' }]}
            >
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
};

PromotionVisitForm.propTypes = {
    treatmentData: PropTypes.array.isRequired,
    onTreatmentSelect: PropTypes.func.isRequired,
    platforms: PropTypes.array.isRequired,
    visitType: PropTypes.string.isRequired, // added this for `visitType`
};

export default PromotionVisitForm;
