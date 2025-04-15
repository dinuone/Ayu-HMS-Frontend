// CreateOrUpdateModal.jsx
import React, { useEffect } from 'react';
import {Button, Form, Input, InputNumber, Modal, Select} from 'antd';

const CreateOrUpdateModal = ({ visible, onCancel, onSubmit, initialValues, confirmLoading, treatmentCategories }) => {
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
            title={initialValues ? "Edit Treatment" : "Create Treatment"}
            okText={initialValues ? "Update" : "Create"}
            onCancel={onCancel}
            onOk={handleSubmit}
            confirmLoading={confirmLoading}
            destroyOnClose
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="treatment_name"
                    label="Treatment Name"
                    rules={[{ required: true, message: 'Please input treatment name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="treatment_price"
                    label="Treatment Price"
                    rules={[{ required: true, message: 'Please input treatment price!' }]}
                >
                    <InputNumber style={{width:"100%"}} />
                </Form.Item>

                <Form.Item
                    name="treatment_category"
                    label="Treatment Category"
                    showSearch
                    rules={[{ required: true, message: 'Please select treatment category!' }]}
                >
                    <Select placeholder="Select Treatment Category">
                        {treatmentCategories.map(treatment => (
                            <Select.Option key={treatment.id} value={treatment.id}>
                                {treatment.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateOrUpdateModal;