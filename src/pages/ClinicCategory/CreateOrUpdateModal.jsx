// CreateOrUpdateModal.jsx
import React, { useEffect } from 'react';
import { Button, Form, Input, Modal, Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

const CreateOrUpdateModal = ({ visible, onCancel, onSubmit, initialValues, confirmLoading, }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields();
        if (initialValues) {
            form.setFieldsValue(initialValues);
        }
    }, [initialValues, form, visible]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            onSubmit(values);
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    const daysOfWeekOptions = [
        'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun'
    ];


    return (
        <Modal
            open={visible}
            title={initialValues ? "Edit Clinic Category" : "Create Clinic Category"}
            okText={initialValues ? "Update" : "Create"}
            onCancel={onCancel}
            onOk={handleSubmit}
            confirmLoading={confirmLoading}
            destroyOnClose
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label="Clinic Category Name"
                    rules={[{ required: true, message: 'Please input clinic category name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"

                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    name="available_days"
                    label="Available Days"
                    rules={[{ required: true, message: 'Please select at least one day!' }]}
                >
                    <CheckboxGroup  options={daysOfWeekOptions}  />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateOrUpdateModal;