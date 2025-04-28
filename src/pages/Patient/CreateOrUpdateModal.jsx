// CreateOrUpdateModal.jsx
import React, {useEffect, useState} from 'react';
import {Button, Form, Input, InputNumber, Modal, Select, Radio, Divider, message,} from 'antd';
import api from "../../Services/NetworkManager.js";
import QRCode from 'qrcode';

const CreateOrUpdateModal = ({ visible, onCancel, onSubmit, initialValues, confirmLoading, drugCategories }) => {
    const [form] = Form.useForm();
    const [provinces,setProvinces] = useState([]);
    const [districts,setDistricts] = useState([]);
    const [city, setCity] = useState([]);

    const genderOptions = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
    ];

    const maritalOptions = [
        { label: 'Married', value: 'Married' },
        { label: 'UnMarried', value: 'UnMarried' },
    ];

    const customerType = [
        { label: 'Feelo', value: 'Feelo' },
        { label: 'Normal', value: 'Normal' },
    ];

    const generateQRCode = async (patientData) => {
        try {
            const qrString = JSON.stringify(patientData);
            const qrCodeBase64WithPrefix = await QRCode.toDataURL(qrString);

            // Remove "data:image/png;base64," prefix
            return qrCodeBase64WithPrefix.split(",")[1];

        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    };

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

    const fetchCities = async (districtId) => {
        try {
            const res = await api.get(`/location/cities/${districtId}`);
            setCity(res.data.data);
        } catch (error) {
            message.error(error.response?.data?.message || 'Operation failed');
        }
    }

    const handleProvinceChange = (provinceId) => {
        setDistricts([]);
        form.setFieldsValue({ district: undefined });
        fetchDistricts(provinceId);
    };
    const handleDistrictChange = (districtId) => {
        setCity([]);
        form.setFieldsValue({ city: undefined });
        fetchCities(districtId);
    };

    const handleNICChange = (nic)  => {
        const nicPattern = /^(?:\d{9}[vVxX]?|\d{12})$/;
        if (nicPattern.test(nic)) {
            let dob = null;
            let gender = '';

            let year = 0;
            let days = 0;

            if (nic.length === 10) {
                year = '19' + nic.substring(0, 2)
                days = nic.substring(2, 5)
            } else if (nic.length === 12) {
                year = nic.substring(0, 4)
                days = nic.substring(4, 7)
            }

            if (days > 500) {
                days = days - 500;
                gender = "Female"
            } else {
                gender = 'Male'
            }

            const dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 366];

            let mn = 0;

            for (let i = 0; i < dayCount.length; i++) {
                if (days <= dayCount[i]) {
                    mn = i
                    break;
                }
            }

            const d = days - dayCount[mn - 1] - 1;

            if (d.toString() === 'NaN') {
                return false
            }

            const month = mn.toString().padStart(2, '0');
            const day = d.toString().padStart(2, '0');

            dob = year + '-' + month + '-' + day

            const birthDateDefault = new Date(year, mn - 1, d);

            const age = calculateCustomerAge(birthDateDefault);

            form.setFieldsValue({
                dob: dob,
                gender: gender,
                age: age,
            });
        }

    };

    const calculateCustomerAge = (dateOfBirth) =>  {

        const dob = new Date(dateOfBirth);
        console.log(dob)

        //calculate month difference from current date in time
        const month_diff = Date.now() - dob.getTime();
        console.log(month_diff)

        //convert the calculated difference in date format
        const age_dt = new Date(month_diff);
        console.log(age_dt)

        //extract year from date
        const year = age_dt.getUTCFullYear();
        console.log(year)

        return Math.abs(year - 1970);

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
            const qrCode = await generateQRCode(values);

            const provinceObj = provinces.find(p => p.id === values.province);
            const districtObj = districts.find(d => d.id === values.district);
            const cityObj = city.find(c => c.id === values.city);

            // If no city is selected from the list, treat it as a custom input
            const cityName = cityObj ? cityObj.name : values.city;

            const payload = {
                ...values,
                province: provinceObj ? provinceObj.name : '',
                district: districtObj ? districtObj.name : '',
                city: cityName,
                qr_code : qrCode,
            };

            onSubmit(payload);

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
                    name="nic_number"
                    label="Nic Number"

                    rules={[{ required: true,
                        pattern: /^(?:\d{9}[vVxX]?|\d{12})$/,
                        message: 'Invalid NIC number! It must be 9 digits followed by an optional letter (v/V/x/X) or exactly 12 digits.'}]}
                >
                    <Input onChange={(e) => handleNICChange(e.target.value)} />
                </Form.Item>

                <Form.Item
                    name="age"
                    label="Age"
                    rules={[
                        { required: true, message: 'Please input age!' },
                        { type: 'number', min: 1, max: 120, message: 'Age must be between 1 and 120!' },]}
                >
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[{ required: true, message: 'Please select gender!' }]}
                >
                    <Radio.Group options={genderOptions}  />
                </Form.Item>

                <Form.Item
                    name="weight"
                    label="Weight"
                    rules={[
                        { required: false },
                        { type: 'number', min: 1, max: 500, message: 'Weight must be between 1kg and 500kg!' },
                    ]}
                >
                    <InputNumber
                        addonAfter="kg"
                        style={{ width: '100%' }}
                    />
                </Form.Item>

                <Form.Item
                    name="marital_status"
                    label="Marital"
                    rules={[{ required: true, message: 'Please select marital status!' }]}
                >
                    <Radio.Group options={maritalOptions}  />
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
                        onChange={handleDistrictChange}
                        filterOption={(input, option) =>
                            option?.children?.toLowerCase().includes(input.toLowerCase())
                        }
                        allowClear 
                    >
                        {districts.map(district => (
                            <Select.Option key={district.id} value={district.id}>
                                {district.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="city"
                    label="City"
                    rules={[{ required: true, message: 'Please select a city!' }]}>
                    <Select
                        placeholder="Select or type city"
                        showSearch
                        filterOption={(input, option) =>
                            option?.children?.toLowerCase().includes(input.toLowerCase())
                        }
                        onSearch={(value) => {
                            // Optionally, you can handle custom search behavior here.
                        }}
                        onChange={(value) => {
                            // Handling change for selected or entered value
                            form.setFieldsValue({ city: value });
                        }}
                        allowClear
                    >
                        {city.map((citydata) => (
                            <Select.Option key={citydata.id} value={citydata.id}>
                                {citydata.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>



                <Divider/>

                <Form.Item
                    name="contact_no"
                    label="Contact Number"
                    rules={[
                        { required: true, message: 'Please input contact number!' },
                        { pattern: /^[0-9]{9}$/, message: 'Contact number must be 10 digits!' },]}
                >
                    <Input
                        addonBefore="+94"
                        style={{ width: '100%' }}
                        placeholder="Enter number"
                    />
                </Form.Item>

                <Form.Item
                    name="occupation"
                    label="Occupation"
                    rules={[{ required: false }]}
                >
                    <Input />
                </Form.Item>

                <Divider/>

                <Form.Item
                    name="patient_type"
                    label="Patient Type"
                    rules={[{ required: true, message: 'Please select Patient type!' }]}
                >
                    <Radio.Group options={customerType}  />
                </Form.Item>

                <Form.Item
                    name="remark"
                    label="Remark"
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
            </Form>

        </Modal>
    );
};

export default CreateOrUpdateModal;