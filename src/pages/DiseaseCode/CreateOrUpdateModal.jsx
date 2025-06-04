// CreateOrUpdateModal.jsx
import React, { useEffect } from 'react';
import { Button, Form, Input, Modal } from 'antd';

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

    return (
        <Modal
            open={visible}
            title={initialValues ? "Edit Disease Code" : "Create Disease Code"}
            okText={initialValues ? "Update" : "Create"}
            onCancel={onCancel}
            onOk={handleSubmit}
            confirmLoading={confirmLoading}
            destroyOnClose
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="disease_code"
                    label="Disease Code"
                    rules={[{ required: true, message: 'Please input disease code!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="disease_name"
                    label="Disease Name"
                    rules={[{ required: true, message: 'Please input disease name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"

                >
                    <Input.TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateOrUpdateModal;