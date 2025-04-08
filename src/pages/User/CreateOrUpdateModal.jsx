import React, { useEffect } from 'react';
import {Button, Form, Input, Modal, Select, Space, Switch} from 'antd';
import api from '../../Services/NetworkManager.js';

const CreateOrUpdateModal = ({ visible, onCancel, onSubmit, initialValues, confirmLoading, branches, roles }) => {
    const [form] = Form.useForm();
    const DEFAULT_PASSWORD = 'user@#123';

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                ...initialValues,
                password: DEFAULT_PASSWORD
            });
        } else {
            form.setFieldsValue({
                password: DEFAULT_PASSWORD // Set default password for new users
            });
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

    const handleCancel = () => {
        form.resetFields(); // Clear all input fields
        onCancel(); // Call the original onCancel handler
    };


    return (
        <Modal
            visible={visible}
            title={initialValues ? "Edit User" : "Create User"}
            okText={initialValues ? "Update" : "Create"}
            onCancel={handleCancel}
            onOk={handleSubmit}
            confirmLoading={confirmLoading}
            destroyOnClose
        >
            <Form form={form} layout="vertical" initialValues={initialValues}>
                <Form.Item
                    name="first_name"
                    label="First Name"
                    rules={[{ required: true, message: 'Please input first name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="last_name"
                    label="Last Name"
                    rules={[{ required: true, message: 'Please input last name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="username"
                    label="Username"
                    rules={[{ required: true, message: 'Please input username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Please input email!' },
                        { type: 'email', message: 'Invalid email format!' }
                    ]}
                >
                    <Input placeholder="ex@Email.com" />
                </Form.Item>

                <Form.Item
                    name="role"
                    label="Role"
                    rules={[{ required: true, message: 'Please select role!' }]}
                >
                    <Select placeholder="Select role">
                        {roles.map(role => (
                            <Select.Option key={role.id} value={role.id}>
                                {role.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="branches"
                    label="Branches"
                    rules={[{ required: true, message: 'Please select at least one branch!' }]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Select branches"
                        optionFilterProp="children"
                        showSearch
                    >
                        {branches.map(branch => (
                            <Select.Option key={branch.id} value={branch.id}>
                                {branch.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        { required: true, message: 'Please input password!' },
                        { min: 6, message: 'Password must be at least 6 characters!' }
                    ]}
                >
                    <Input />
                </Form.Item>


            </Form>
        </Modal>
    );
};

export default CreateOrUpdateModal;