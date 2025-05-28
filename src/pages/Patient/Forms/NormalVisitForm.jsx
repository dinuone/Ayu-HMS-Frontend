import { Card, Col, Form, Row, Select } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import PropTypes from 'prop-types';

const NormalVisitForm = ({visitSubType, clinicData, treatmentData, selectedClinic, onVisitTypeChange, onClinicChange, onTreatmentSelect}) => (
    <>
        <Form.Item
            label="Assign to"
            name="assign_to"
            rules={[{ required: true, message: 'Please select visit sub-type' }]}
        >
            <Select placeholder="Select Assign" onChange={onVisitTypeChange}>
                <Select.Option value="CLINIC /OPD">CLINIC /OPD</Select.Option>
                <Select.Option value="TREATMENT">TREATMENT</Select.Option>
            </Select>
        </Form.Item>

        {visitSubType === 'CLINIC /OPD' && (
            <>
                <Form.Item
                    label="Select Clinic"
                    name="clinic"
                    rules={[{ required: true, message: 'Please select clinic' }]}
                >
                    <Select showSearch placeholder="Search clinics" onChange={onClinicChange}>
                        {clinicData.map(clinic => (
                            <Select.Option key={clinic.id} value={clinic.id}>
                                {clinic.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                {selectedClinic && (
                    <div style={{ marginBottom: 24 }}>
                        <h4>Available Days</h4>
                        <Row gutter={[8, 8]}>
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                <Col key={day} span={3}>
                                    <Card
                                        size="small"
                                        hoverable
                                        style={{
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            backgroundColor: selectedClinic.available_days.includes(day)
                                                ? '#f6ffed'
                                                : '#fff2f0',
                                            borderColor: selectedClinic.available_days.includes(day)
                                                ? '#b7eb8f'
                                                : '#ffccc7',
                                        }}
                                    >
                                        <div style={{ fontSize: 12, marginBottom: 4 }}>{day}</div>
                                        {selectedClinic.available_days.includes(day) ? (
                                            <CheckCircleTwoTone twoToneColor="#52c41a" />
                                        ) : (
                                            <CloseCircleTwoTone twoToneColor="#ff4d4f" />
                                        )}
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                )}
            </>
        )}

        {visitSubType === 'TREATMENT' && (
            <Form.Item label="Select Treatments" name="treatments"
                       rules={[{ required: true, message: 'Please select treatments' }]}>
                <Select
                    mode="multiple"
                    placeholder="Search Treatments"
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().includes(input.toLowerCase())
                    }
                    onChange={onTreatmentSelect}
                >
                    {treatmentData.map(treatment => (
                        <Select.Option key={treatment.id} value={treatment.id}>
                            {treatment.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        )}
    </>
);

NormalVisitForm.propTypes = {
    visitSubType: PropTypes.string,
    clinicData: PropTypes.array.isRequired,
    treatmentData: PropTypes.array.isRequired,
    selectedClinic: PropTypes.object,
    onVisitTypeChange: PropTypes.func.isRequired,
    onClinicChange: PropTypes.func.isRequired,
    onTreatmentSelect: PropTypes.func.isRequired,
};

export default NormalVisitForm;