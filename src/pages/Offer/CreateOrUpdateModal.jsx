import React, { useEffect } from 'react';
import { Button, Form, Input, Modal, InputNumber, DatePicker, Select } from 'antd';
import moment from 'moment';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const CreateOrUpdateModal = ({visible, onCancel, onSubmit, initialValues, confirmLoading, treatmentOptions , platformOptions }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields();
        if (initialValues) {
            form.setFieldsValue({
                ...initialValues,
                dateRange: [
                    moment(initialValues.start_date),
                    moment(initialValues.end_date)
                ]
            });
        }
    }, [initialValues, form, visible]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const payload = {
                ...values,
                start_date: values.dateRange[0].format('YYYY-MM-DD'),
                end_date: values.dateRange[1].format('YYYY-MM-DD')
            };
            delete payload.dateRange; // Remove the temporary dateRange field
            onSubmit(payload);
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    return (
        <Modal
            open={visible}
            title={initialValues ? "Edit Offer" : "Create Offer"}
            okText={initialValues ? "Update" : "Create"}
            onCancel={onCancel}
            onOk={handleSubmit}
            confirmLoading={confirmLoading}
            destroyOnClose
            width={700}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="offer_name"
                    label="Offer Name"
                    rules={[{ required: true, message: 'Please input offer name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                >
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    name="discount_percentage"
                    label="Discount Percentage"
                    rules={[{
                        required: true,
                        message: 'Please input discount percentage!'
                    }]}
                >
                    <InputNumber
                        min={0}
                        max={100}
                        style={{ width: '100%' }}
                        formatter={value => `${value}%`}
                        parser={value => value.replace('%', '')}
                    />
                </Form.Item>

                <Form.Item
                    name="dateRange"
                    label="Offer Period"
                    rules={[{
                        required: true,
                        message: 'Please select offer period!'
                    }]}
                >
                    <RangePicker
                        style={{ width: '100%' }}
                        format="YYYY-MM-DD"
                    />
                </Form.Item>

                <Form.Item
                    name="treatment"
                    label="Treatment"
                    rules={[{ required: true, message: 'Please select treatment!' }]}
                >
                    <Select placeholder="Select Treatment">
                        {treatmentOptions.map(treatment => (
                            <Select.Option key={treatment.id} value={treatment.id}>
                                {treatment.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="platform"
                    label="Platform"
                    rules={[{ required: true, message: 'Please select platform!' }]}
                >
                    <Select placeholder="Select Platform">
                        {platformOptions.map(platoform => (
                            <Select.Option key={platoform} value={platoform}>
                                {platoform}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateOrUpdateModal;