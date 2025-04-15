import React, { useEffect, useState } from "react";
import {
    Form,
    Input,
    InputNumber,
    Button,
    Table,
    Space,
    message,
    Spin,
    Row,
    Col,
} from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined, UndoOutlined } from "@ant-design/icons";
import api from "../../Services/NetworkManager.js";
import CrudService from "../../Services/CrudService.js";

const crudService = CrudService('rates');

const RatesConfiguration = () => {
    const [form] = Form.useForm();
    const [customCharges, setCustomCharges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);

    // Simulate fetching existing config
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await crudService.fetchAll()

                form.setFieldsValue({
                    hospital_charge: response.data.data.hospital_charge,
                });

                const customChargesData = JSON.parse(response.data.data.custom_charge || '{}');

                const chargesArray = Object.entries(customChargesData).map(
                    ([name, value], index) => ({
                        key: Date.now() + index,
                        name,
                        value,
                    })
                );

                setCustomCharges(chargesArray);
            } catch (err) {
                console.error(err);
                message.error(err.response?.data?.message || 'Operation failed');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddRow = () => {
        setCustomCharges([
            ...customCharges,
            { key: Date.now(), name: "", value: 0 },
        ]);
    };

    const handleRemoveRow = (key) => {
        setCustomCharges(customCharges.filter((item) => item.key !== key));
    };

    const handleInputChange = (key, field, value) => {
        const updated = customCharges.map((item) =>
            item.key === key ? { ...item, [field]: value } : item
        );
        setCustomCharges(updated);
    };

    const handleSubmit = async (values) => {
        const names = customCharges.map((item) => item.name.trim());

        const hasEmptyName = names.some((name) => !name);
        const hasDuplicates = new Set(names).size !== names.length;

        if (hasEmptyName) {
            return message.warning("Custom charge names cannot be empty.");
        }

        if (hasDuplicates) {
            return message.warning("Custom charge names must be unique.");
        }

        const customChargesObject = customCharges.reduce((acc, item) => {
            acc[item.name.trim()] = item.value;
            return acc;
        }, {});

        const payload = {
            hospital_charge: values.hospital_charge,
            custom_charge: JSON.stringify(customChargesObject)
        };

        try {
            setSubmitLoading(true);
            await api.post("/rates/update", payload); // Replace with your actual API
        } catch (error) {
            console.error(error);
            message.error(error.response?.data?.message || 'Operation failed');
        } finally {
            setSubmitLoading(false);
        }
    };

    const columns = [
        {
            title: "Charge Name",
            dataIndex: "name",
            render: (text, record) => (
                <Input
                    value={record.name}
                    onChange={(e) =>
                        handleInputChange(record.key, "name", e.target.value)
                    }
                />
            ),
        },
        {
            title: "Charge Value (LKR)",
            dataIndex: "value",
            render: (text, record) => (
                <InputNumber
                    min={0}
                    value={record.value}
                    onChange={(value) =>
                        handleInputChange(record.key, "value", value || 0)
                    }
                />
            ),
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (_, record) => (
                <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveRow(record.key)}
                />
            ),
        },
    ];

    return (
        <Spin spinning={loading}>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                autoComplete="off"
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="Hospital Charge (LKR)"
                            name="hospital_charge"
                            rules={[{ required: true, message: "Please enter hospital charge" }]}
                        >
                            <InputNumber min={0} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={4} className="d-flex align-items-end">
                        <Button
                            variant="outlined"
                            color="orange"
                            icon={<PlusOutlined />}
                            onClick={handleAddRow}
                            style={{ marginTop: "30px" }}
                        >
                            Add Custom Charge
                        </Button>
                    </Col>
                </Row>

                <Form.Item label="Custom Charges">
                    <Table
                        dataSource={customCharges}
                        columns={columns}
                        pagination={false}
                        rowKey="key"
                        bordered
                    />
                </Form.Item>

                <Form.Item>
                    <Row justify="end">
                        <Space>
                            <Button
                                variant="solid"
                                color="default"
                                icon={<SaveOutlined />}
                                htmlType="submit"
                                loading={submitLoading}
                            >
                                Save Configuration
                            </Button>
                            <Button
                                variant="outlined"
                                color="danger"
                                icon={<UndoOutlined />}
                                onClick={() => {
                                    form.resetFields();
                                    setCustomCharges([]);
                                }}
                            >
                                Reset
                            </Button>
                        </Space>
                    </Row>
                </Form.Item>
            </Form>
        </Spin>
    );
};

export default RatesConfiguration;
