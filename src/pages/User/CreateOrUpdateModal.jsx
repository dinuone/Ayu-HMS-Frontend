import React, { useEffect, useState } from 'react';
import {Button, Form, Input, Modal, Select, Space, Switch, InputNumber, Col, Row} from 'antd';

const CreateOrUpdateModal = ({ visible, onCancel, onSubmit, initialValues, confirmLoading, branches, roles }) => {
    const [form] = Form.useForm();
    const [isDoctorRole, setIsDoctorRole] = useState(false);
    const DEFAULT_PASSWORD = 'user@#123';

    useEffect(() => {
        form.resetFields();
        const isDoctor = initialValues?.role?.name === 'Doctor';
        setIsDoctorRole(isDoctor);

        if (initialValues) {
            form.setFieldsValue({
                ...initialValues,
                role: initialValues.role?.id,
                branches: initialValues.branch?.map(b => b.id) || [],
                password: DEFAULT_PASSWORD,
                ...(isDoctor && {
                    specialty: initialValues.specialty,
                    doctor_fee: initialValues.doctor_fee
                })
            });
        } else if (visible) {
            form.setFieldsValue({
                password: DEFAULT_PASSWORD
            });
        }
    }, [initialValues, form, visible]);

    const handleRoleChange = (roleId) => {
        const selectedRole = roles.find(r => r.id === roleId);
        setIsDoctorRole(selectedRole?.name === 'Doctor');
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            onSubmit(values);
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    return (
        <Modal
            visible={visible}
            title={initialValues ? "Edit User" : "Create User"}
            okText={initialValues ? "Update" : "Create"}
            onCancel={handleCancel}
            onOk={handleSubmit}
            confirmLoading={confirmLoading}
            destroyOnClose={true}
            width={700}
        >
            <Form form={form} layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="first_name"
                            label="First Name"
                            rules={[{ required: true, message: 'Please input first name!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="last_name"
                            label="Last Name"
                            rules={[{ required: true, message: 'Please input last name!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="username"
                            label="Username"
                            rules={[{ required: true, message: 'Please input username!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
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
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="role"
                            label="Role"
                            rules={[{ required: true, message: 'Please select role!' }]}
                        >
                            <Select
                                placeholder="Select role"
                                onChange={handleRoleChange}
                            >
                                {roles.map(role => (
                                    <Select.Option key={role.id} value={role.id}>
                                        {role.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
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
                    </Col>
                </Row>

                {isDoctorRole && (
                    <>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="specialty"
                                    label="Specialty"
                                    rules={[{ required: true, message: 'Please input specialty!' }]}
                                >
                                    <Input placeholder="e.g., Cardiology, Neurology" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="doctor_fee"
                                    label="Consultation Fee"
                                    rules={[{ required: true, message: 'Please input consultation fee!' }]}
                                >
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        min={0}
                                        step={100}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                )}

                {!initialValues && (
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            { required: true, message: 'Please input password!' },
                            { min: 6, message: 'Password must be at least 6 characters!' }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                )}
            </Form>
        </Modal>
    );
};

export default CreateOrUpdateModal;