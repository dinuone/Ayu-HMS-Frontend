import React, { useEffect, useState } from 'react';
import {
    message,
    Tabs,
    Card,
    Descriptions,
    Table,
    Tag,
    Button,
    Image,
    Row,
    Col,
    Space
} from 'antd';
import { useNavigate, useParams } from "react-router-dom";
import {
    UserOutlined,
    FileOutlined,
    HistoryOutlined,
    FileTextOutlined,
    CheckCircleFilled,
    QrcodeOutlined
} from '@ant-design/icons';
import api from "../../Services/NetworkManager.js";

const { TabPane } = Tabs;

function ViewPatientRecord() {
    const params = useParams();
    const [patientData, setPatientData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('1');
    const [qrLoading, setQrLoading] = useState(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await api.get(`patient/get-patient-record-for-view/${params.patientId}`);
            setPatientData(res.data.data);
        } catch (error) {
            message.error(error.response?.data?.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    const generateQrCode = async () => {
        setQrLoading(true);
        try {
            const res = await api.post(`patient/generate-qr-code`, {
                patient_id: params.patientId,
                registration_number: patientData?.patient_data?.registration_number
            });
            message.success('QR code generated successfully');
            fetchData(); // Refresh data to show the new QR code
        } catch (error) {
            message.error(error.response?.data?.message || 'Failed to generate QR code');
        } finally {
            setQrLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const visitHistoryColumns = [
        {
            title: 'Visit Date',
            dataIndex: 'visit_date',
            key: 'visit_date',
            sorter: (a, b) => new Date(a.visit_date) - new Date(b.visit_date),
        },
        {
            title: 'Chit Number',
            dataIndex: 'chit_number',
            key: 'chit_number',
        },
        {
            title: 'Visit Type',
            dataIndex: 'visit_type',
            key: 'visit_type',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status) => (
                <Tag icon={status === "COMPLETED" ? <CheckCircleFilled /> : ""}
                     color={status === "COMPLETED" ? 'green-inverse' : 'processing'}>
                    <strong>{status}</strong>
                </Tag>
            ),
        },
        {
            title: 'Doctor',
            dataIndex: 'doctor_name',
            key: 'doctor_name',
        },
    ];

    const prepareVisitHistoryData = () => {
        if (!patientData?.visit_data) return [];
        return patientData.visit_data.map((visit, index) => ({
            key: index.toString(),
            visit_date: visit.visit_date,
            chit_number: visit.chit_number,
            visit_type: visit.visit_type,
            status: visit.status,
            doctor_name: visit.doctor_name,
        }));
    };

    const handleCaseSheetClick = (visitId) => {
        navigate(`/view-case-sheet/${visitId}`)
    };

    return (
        <div style={{ padding: '20px' }}>
            <Card title="Patient Record" loading={loading}>
                <Tabs activeKey={activeTab} onChange={setActiveTab}>
                    <TabPane
                        tab={
                            <span>
                <UserOutlined />
                Patient Information
              </span>
                        }
                        key="1"
                    >
                        <Row gutter={[16, 16]}>
                            <Col xs={24} md={16}>
                                <Descriptions bordered column={1} size="middle">
                                    <Descriptions.Item label="Registration Number">
                                        {patientData?.patient_data?.registration_number}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Name">
                                        {patientData?.patient_data?.name}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Age">
                                        {patientData?.patient_data?.age}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Gender">
                                        {patientData?.patient_data?.gender}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Marital Status">
                                        {patientData?.patient_data?.marital_status}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Occupation">
                                        {patientData?.patient_data?.occupation}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="NIC Number">
                                        {patientData?.patient_data?.nic_number}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Contact Number">
                                        {patientData?.patient_data?.contact_no}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Address">
                                        {`${patientData?.patient_data?.address_line_1}, ${patientData?.patient_data?.address_line_2}, ${patientData?.patient_data?.city}, ${patientData?.patient_data?.district}, ${patientData?.patient_data?.province}`}
                                    </Descriptions.Item>
                                </Descriptions>
                            </Col>
                            <Col xs={24} md={8}>
                                <Card
                                    title="QR Code"
                                    bordered={false}
                                    style={{ textAlign: 'center' }}
                                >
                                    {patientData?.patient_data?.qr_code ? (
                                        <Image
                                            src={patientData.patient_data.qr_code}
                                            alt="Patient QR Code"
                                            style={{ maxWidth: '100%' }}
                                        />
                                    ) : (
                                        <Space direction="vertical" style={{ width: '100%' }}>
                                            <QrcodeOutlined style={{ fontSize: '48px', color: '#999' }} />
                                            <p>No QR code available</p>
                                            <Button
                                                type="primary"
                                                icon={<QrcodeOutlined />}
                                                loading={qrLoading}
                                                onClick={generateQrCode}
                                            >
                                                Generate QR Code
                                            </Button>
                                        </Space>
                                    )}
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>

                    <TabPane
                        tab={
                            <span>
                <HistoryOutlined />
                Visit History
              </span>
                        }
                        key="2"
                    >
                        <Table
                            columns={visitHistoryColumns}
                            dataSource={prepareVisitHistoryData()}
                            pagination={{ pageSize: 5 }}
                            scroll={{ x: true }}
                        />
                    </TabPane>

                    <TabPane
                        tab={
                            <span>
                <FileTextOutlined />
                Case Sheets
              </span>
                        }
                        key="3"
                    >
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                            {patientData?.patient_log?.map((log) => (
                                <div
                                    key={log.id}
                                    style={{
                                        width: '150px',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        padding: '10px',
                                        border: '1px solid #f0f0f0',
                                        borderRadius: '8px',
                                        transition: 'all 0.3s',
                                        ':hover': {
                                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                        }
                                    }}
                                    onClick={() => handleCaseSheetClick(log.visit_id)}
                                >
                                    <FileOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                                    <div style={{ marginTop: '8px', fontWeight: '500' }}>{log.chit_number}</div>
                                    <div style={{ color: '#888', fontSize: '12px' }}>
                                        {new Date(log.visit_date).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    );
}

export default ViewPatientRecord;