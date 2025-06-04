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
            title={initialValues ? "Edit Drug Category" : "Create Drug Category"}
            okText={initialValues ? "Update" : "Create"}
            onCancel={onCancel}
            onOk={handleSubmit}
            confirmLoading={confirmLoading}
            destroyOnClose
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label="Category Name"
                    rules={[{ required: true, message: 'Please input category name!' }]}
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