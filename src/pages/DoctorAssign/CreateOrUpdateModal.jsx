import React, { useState, useEffect } from 'react';
import {
    Modal,
    Form,
    Select,
    Button,
    Row,
    Col,
    Tag,
    Divider
} from 'antd';
import {CheckOutlined, CloseOutlined} from '@ant-design/icons';

const { Option } = Select;

const CreateOrUpdateModal = ({visible, onCancel, initialValues, onFinish, loading, doctors, clinics, treatments, onSubmit}) => {
    const [form] = Form.useForm();
    const [selectedTreatments, setSelectedTreatments] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [assignedUnit, setAssignedUnit] = useState(null);

    // Days of week options
    const daysOfWeek = [
        { label: 'Monday', value: 'Monday' },
        { label: 'Tuesday', value: 'Tuesday' },
        { label: 'Wednesday', value: 'Wednesday' },
        { label: 'Thursday', value: 'Thursday' },
        { label: 'Friday', value: 'Friday' },
        { label: 'Saturday', value: 'Saturday' },
        { label: 'Sunday', value: 'Sunday' }
    ];

    // Assignment unit options (1 for Clinic, 2 for Treatment)
    const assignUnits = [
        { label: 'CLINIC', value: 'CLINIC' },
        { label: 'TREATMENT', value:'TREATMENT'  },
    ];

    const shifts = [
        { label: 'First Half', value: 'First Half' },
        { label: 'Second Half', value: 'Second Half' },
        { label: 'Full Day', value: 'Full Day' },
    ];

    useEffect(() => {
        if (initialValues) {
            console.log(initialValues)
            // Use string values for comparison
            const unitValue = initialValues.assign_unit === 'CLINIC' ? 'CLINIC' : 'TREATMENT';
            setAssignedUnit(unitValue);
            console.log(unitValue)

            form.setFieldsValue({
                doctorId: initialValues.doctor_id,
                assignedUnit: unitValue,  // Use the string value
                clinicCategories: initialValues.clinic_categories?.map(c => c.id) || [], // Map to array of IDs
                treatments: initialValues.treatments || [],
                daysAndShift: initialValues.days_and_shift || []
            });

            setSelectedTreatments(initialValues.treatments || []);
            setSelectedDays(initialValues.days_and_shift || []);
        } else {
            form.resetFields();
            setSelectedTreatments([]);
            setSelectedDays([]);
            setAssignedUnit(null);
        }
    }, [initialValues, form]);

    const handleTreatmentSelect = (value) => {
        const treatment = treatments.find(t => t.id === value);
        if (treatment && !selectedTreatments.some(t => t.id === value)) {
            setSelectedTreatments([...selectedTreatments, treatment]);
        }
    };

    const removeTreatment = (id) => {
        setSelectedTreatments(selectedTreatments.filter(t => t.id !== id));
    };

    const handleDaySelect = (day) => {
        if (!selectedDays.some(d => d.day === day)) {
            setSelectedDays([...selectedDays, { day, shift: shifts[0].value }]);
        }
    };

    const handleUnitChange = (value) => {
        setAssignedUnit(value);
        form.setFieldsValue({
            clinicCategories: undefined,
            treatments: undefined
        });
        setSelectedTreatments([]);
    };

    const handleShiftChange = (day, value) => {
        setSelectedDays(selectedDays.map(d =>
            d.day === day ? { ...d, shift: value } : d
        ));
    };

    const removeDay = (day) => {
        setSelectedDays(selectedDays.filter(d => d.day !== day));
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const payload = {
                doctor_id: values.doctorId,
                assign_unit: assignedUnit === 'CLINIC' ? 1 : 2,
                clinic_categories: assignedUnit === "CLINIC" ? values.clinicCategories : [],
                treatments: assignedUnit === "TREATMENT" ? selectedTreatments.map(t => t.id) : [],
                days_and_shift: selectedDays.map(day => ({
                    day: day.day,
                    shift: day.shift
                }))
            };

            await onSubmit(payload);
            onCancel();
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    return (
        <Modal
            title={initialValues ? "Update Doctor Assignment" : "Create Doctor Assignment"}
            open={visible}
            onCancel={onCancel}
            width={800}
            footer={[
                <Button
                    key="submit"
                    type="primary"
                    loading={loading}
                    onClick={handleSubmit}
                    icon={<CheckOutlined />}
                >
                    {initialValues ? "Update" : "Create"}
                </Button>
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={initialValues || {}}
            >
                <Form.Item
                    name="doctorId"
                    label="Doctor"
                    rules={[{ required: true, message: 'Please select a doctor' }]}
                >
                    <Select
                        showSearch
                        placeholder="Select doctor"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().includes(input.toLowerCase())
                        }
                    >
                        {doctors.map(doctor => (
                            <Option key={doctor.id} value={doctor.id}>
                                {doctor.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="assignedUnit"
                    label="Assigned Unit"
                    rules={[{ required: true, message: 'Please select assigned unit' }]}
                >
                    <Select
                        placeholder="Select unit"
                        onChange={handleUnitChange}
                    >
                        {assignUnits.map(unit => (
                            <Option key={unit.value} value={unit.value}>
                                {unit.label}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                {assignedUnit === "CLINIC" && (
                    <Form.Item
                        name="clinicCategories"  // Make sure this matches the field name
                        label="Clinic Categories"
                        rules={[{ required: true, message: 'Please select at least one clinic' }]}
                    >
                        <Select
                            mode="multiple"
                            placeholder="Select clinics"
                            showSearch
                            filterOption={(input, option) =>
                                option.children.toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            {clinics.map(clinic => (
                                <Option key={clinic.id} value={clinic.id}>
                                    {clinic.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                )}

                {assignedUnit === "TREATMENT" && (
                    <Form.Item label="Treatments">
                        <Select
                            placeholder="Search and select treatments"
                            showSearch
                            onSelect={handleTreatmentSelect}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            {treatments
                                .filter(t => !selectedTreatments.some(st => st.id === t.id))
                                .map(treatment => (
                                    <Option key={treatment.id} value={treatment.id}>
                                        {treatment.name}
                                    </Option>
                                ))}
                        </Select>

                        <div style={{ marginTop: 8 }}>
                            {selectedTreatments.map(treatment => (
                                <Tag
                                    key={treatment.id}
                                    closable
                                    onClose={() => removeTreatment(treatment.id)}
                                    style={{ marginBottom: 4 }}
                                >
                                    {treatment.name}
                                </Tag>
                            ))}
                        </div>
                    </Form.Item>
                )}

                <Divider orientation="center">Weekly Schedule</Divider>
                <div style={{ marginBottom: 16 }}>
                    <Select
                        placeholder="Add working days"
                        style={{ width: 200 }}
                        onSelect={handleDaySelect}
                    >
                        {daysOfWeek
                            .filter(day => !selectedDays.some(d => d.day === day.value))
                            .map(day => (
                                <Option key={day.value} value={day.value}>
                                    {day.label}
                                </Option>
                            ))}
                    </Select>
                </div>

                {selectedDays.map((day, index) => (
                    <div key={index} style={{ marginBottom: 16 }}>
                        <Row align="middle" gutter={8}>
                            <Col>
                                <Tag color="blue" style={{ padding: '4px 8px' }}>
                                    {day.day}
                                </Tag>
                            </Col>
                            <Col flex="auto">
                                <Select
                                    value={day.shift}
                                    style={{ width: '100%' }}
                                    onChange={(value) => handleShiftChange(day.day, value)}
                                >
                                    {shifts.map(shift => (
                                        <Option key={shift.value} value={shift.value}>
                                            {shift.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Col>
                            <Col>
                                <Button
                                    type="text"
                                    danger
                                    size="small"
                                    icon={<CloseOutlined />}
                                    onClick={() => removeDay(day.day)}
                                />
                            </Col>
                        </Row>
                    </div>
                ))}
            </Form>
        </Modal>
    );
};

export default CreateOrUpdateModal;