// CreateOrUpdateModal.jsx
import React, {useEffect, useState} from 'react';
import {Button, Form, Input, InputNumber, Modal, Select, Radio, Divider, message} from 'antd';
import api from "../../Services/NetworkManager.js";

const CreateOrUpdateModal = ({ visible, onCancel, onSubmit, initialValues, confirmLoading, drugCategories }) => {
    const [form] = Form.useForm();
    const [provinces,setProvinces] = useState([]);
    const [districts,setDistricts] = useState([]);

    const genderOptions = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
    ];

    const maritalOptions = [
        { label: 'Married', value: 'Married' },
        { label: 'UnMarried', value: 'UnMarried' },
    ];

    const fetchProvinceData = async () => {
        try {
            const res = await api.get('/location/provinces');
            setProvinces(res.data.data);
        } catch (error) {
            message.error(error.response?.data?.message || 'Operation failed');
        }
    }

    const fetchDistricts = async (provinceId) => {
        try {
            const res = await api.get(`/location/districts/${provinceId}`);
            setDistricts(res.data.data);
        } catch (error) {
            message.error(error.response?.data?.message || 'Operation failed');
        }
    }

    const handleProvinceChange = (provinceId) => {
        setDistricts([]);
        form.setFieldsValue({ district: undefined });
        fetchDistricts(provinceId);
    };

    useEffect(()=>{
        fetchProvinceData()
    },[])

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
            title={initialValues ? "Edit Patient Data" : "Register New Patient"}
            okText={initialValues ? "Update" : "Create"}
            onCancel={onCancel}
            onOk={handleSubmit}
            confirmLoading={confirmLoading}
            destroyOnClose
            width={1000}
         

        >
            <Form
                form={form}
                layout="horizontal"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please input drug name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="age"
                    label="Age"
                    rules={[{ required: true, message: 'Please input age!' }]}
                >
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[{ required: true, message: 'Please select gender!' }]}
                >
                    <Radio.Group options={genderOptions} defaultValue="Male" />
                </Form.Item>

                <Form.Item
                    name="marital_status"
                    label="Marital"
                    rules={[{ required: true, message: 'Please select marital status!' }]}
                >
                    <Radio.Group options={maritalOptions} defaultValue="Married" />
                </Form.Item>

                <Divider/>
                <Form.Item
                    name="address_line_1"
                    label="Address Line 01"
                    rules={[{ required: true, message: 'Please input address line 01!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="address_line_2"
                    label="Address Line 02"
                    rules={[{ required:false, }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>


                <Form.Item
                    name="province"
                    label="Province"
                    rules={[{ required: true, message: 'Please select a province!' }]}
                >
                    <Select
                        placeholder="Select Province"
                        showSearch
                        filterOption={(input, option) =>
                            option?.children?.toLowerCase().includes(input.toLowerCase())
                        }
                        onChange={handleProvinceChange}
                    >
                        {provinces.map(province => (
                            <Select.Option key={province.id} value={province.id}>
                                {province.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="district"
                    label="District"
                    rules={[{ required: true, message: 'Please select or enter a district!' }]}>
                    <Select
                        placeholder="Select or enter District"
                        showSearch

                        filterOption={(input, option) =>
                            option?.children?.toLowerCase().includes(input.toLowerCase())
                        }
                        allowClear 
                    >
                        {districts.map(district => (
                            <Select.Option key={district.id} value={district.name}>
                                {district.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>


                <Form.Item
                    name="drug_category"
                    label="Drug Category"
                    rules={[{ required: true, message: 'Please select drug category!' }]}
                >
                    <Select placeholder="Select Drug Category" showSearch>
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