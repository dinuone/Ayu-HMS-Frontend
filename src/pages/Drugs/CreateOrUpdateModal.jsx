// CreateOrUpdateModal.jsx
import React, { useEffect } from 'react';
import {Button, Form, Input, InputNumber, Modal, Select} from 'antd';

const CreateOrUpdateModal = ({ visible, onCancel, onSubmit, initialValues, confirmLoading, drugCategories }) => {
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

    console.log("initials",initialValues)

    return (
        <Modal
            open={visible}
            title={initialValues ? "Edit Drug" : "Create Drug"}
            okText={initialValues ? "Update" : "Create"}
            onCancel={onCancel}
            onOk={handleSubmit}
            confirmLoading={confirmLoading}
            destroyOnClose
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please input drug name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="brand"
                    label="Brand"
                    rules={[{ required: false, }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="unit_price"
                    label="Unit Price"
                    rules={[{ required: true, message: 'Please input unit price!' }]}
                >
                    <InputNumber style={{width:"100%"}} />
                </Form.Item>

                <Form.Item
                    name="drug_category"
                    label="Drug Category"
                    showSearch
                    rules={[{ required: true, message: 'Please select drug category!' }]}
                >
                    <Select placeholder="Select Drug Category">
                        {drugCategories.map(drugCtg => (
                            <Select.Option key={drugCtg.id} value={drugCtg.id}>
                                {drugCtg.name}
                            </Select.Option>
                        ))}
                    </Select>
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