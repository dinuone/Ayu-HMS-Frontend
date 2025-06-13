import React, { useEffect, useState } from 'react';
import {
    Card,
    Col,
    Row,
    Space,
    Descriptions,
    Tag,
    Typography,
    Avatar,
    Divider,
    List,
    Button,
    Badge,
    message
} from "antd";
import {
    IdcardOutlined,
    CalendarOutlined,
    UserOutlined,
    MedicineBoxOutlined,
    FileTextOutlined,
    ClockCircleOutlined,
    EnvironmentOutlined,
    PhoneOutlined,
    MailOutlined,
    PrinterOutlined,
    ManOutlined,
    WomanOutlined,
    HeartOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined, DashboardOutlined
} from "@ant-design/icons";
import {useNavigate, useParams} from "react-router-dom";
import api from "../../Services/NetworkManager.js";

const { Title, Text } = Typography;

function PatientVisitView() {
    const [loading, setLoading] = useState(false);
    const [visitData, setVisitData] = useState({});
    const { visitId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        FetchVisitData();
    }, []);

    const FetchVisitData = async () => {
        setLoading(true);
        try {
            const response = await api.get(`patient-visit/get/${visitId}`);
            setVisitData(response.data.data);
        } catch (err) {
            console.log(err);
            message.error(err.response?.data?.message || 'Failed to fetch visit data');
        } finally {
            setLoading(false);
        }
    };

    const getGenderIcon = (gender) => {
        return gender === 'Male' ? <ManOutlined /> : <WomanOutlined />;
    };

    const getStatusTag = (status) => {
        let color, icon;
        switch (status) {
            case 'PENDING':
                color = 'orange';
                icon = <ClockCircleOutlined />;
                break;
            case 'COMPLETED':
                color = 'green';
                icon = <CheckCircleOutlined />;
                break;
            case 'CANCELLED':
                color = 'red';
                icon = <CloseCircleOutlined />;
                break;
            default:
                color = 'blue';
                icon = <ClockCircleOutlined />;
        }
        return (
            <Tag icon={icon} color={color} style={{ borderRadius: '12px', padding: '4px 8px' }}>
                {status}
            </Tag>
        );
    };

    const handleViewInvoice = () => {
        navigate(`/view-invoice/${visitData.invoice.invoice_no}`, {
            state: { invoice: visitData.invoice }
        });
    };

    return (
        <div style={{ padding: '24px', background: '#f5f7fa' }}>
            <Row gutter={[24, 24]}>
                {/* Patient Information Column */}
                <Col xs={24} md={8}>
                    <Card
                        loading={loading}
                        title={
                            <Space>
                                <IdcardOutlined style={{ color: "#1890ff" }} />
                                <Title level={5} style={{ margin: 0 }}>Patient Information</Title>
                            </Space>
                        }
                        headStyle={{ borderBottom: 0 }}
                        style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.09)' }}
                    >
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                <Badge dot status="success" offset={[-5, 40]}>
                                    <Avatar
                                        size={64}
                                        icon={<UserOutlined />}
                                        style={{ backgroundColor: '#1890ff', marginRight: '16px' }}
                                    />
                                </Badge>
                                <div>
                                    <Title level={4} style={{ margin: 0 }}>{visitData.patient_data?.name.toUpperCase()}</Title>
                                    <Text type="secondary">Reg No: {visitData.patient_data?.registration_number}</Text>
                                </div>
                            </div>

                            <Descriptions column={1} size="small">
                                <Descriptions.Item label={
                                    <Space>
                                        {getGenderIcon(visitData.patient_data?.gender)}
                                        <span>Gender/Age</span>
                                    </Space>
                                }>
                                    <Text strong>{visitData.patient_data?.gender}, {visitData.patient_data?.age} yrs</Text>
                                </Descriptions.Item>
                                <Descriptions.Item label={<Space><HeartOutlined /><span>Weight</span></Space>}>
                                    <Text strong>{visitData.patient_data?.weight} kg</Text>
                                </Descriptions.Item>
                                <Descriptions.Item label={<Space><PhoneOutlined /><span>Contact</span></Space>}>
                                    <Text strong>{visitData.patient_data?.contact_no}</Text>
                                </Descriptions.Item>
                                <Descriptions.Item label={<Space><EnvironmentOutlined /><span>Address</span></Space>}>
                                    <Text>
                                        {visitData.patient_data?.address_line_1}, <br />
                                        {visitData.patient_data?.address_line_2} <br />
                                    </Text>
                                </Descriptions.Item>
                                <Descriptions.Item label={<Space><EnvironmentOutlined /><span>Province</span></Space>}>
                                    <Text>
                                       {visitData.patient_data?.province}
                                    </Text>
                                </Descriptions.Item>
                                <Descriptions.Item label={<Space><EnvironmentOutlined /><span>District</span></Space>}>
                                    <Text>
                                        {visitData.patient_data?.district}
                                    </Text>
                                </Descriptions.Item>
                                <Descriptions.Item label={<Space><EnvironmentOutlined /><span>City</span></Space>}>
                                    <Text>
                                        {visitData.patient_data?.city}
                                    </Text>
                                </Descriptions.Item>
                                <Descriptions.Item label={<Space><FileTextOutlined /><span>NIC</span></Space>}>
                                    <Text strong>{visitData.patient_data?.nic_number}</Text>
                                </Descriptions.Item>
                            </Descriptions>
                            <Divider/>
                            <Card title="QR Code" style={{ textAlign: 'center' }}>
                                {/* Assuming qr_code is a URL or base64 data */}
                                {visitData.patient_data?.qr_code && (
                                    <img
                                        src={visitData.patient_data.qr_code}
                                        alt="Patient QR Code"
                                        style={{ width: '100%', maxWidth: '200px' }}
                                    />
                                )}
                            </Card>
                        </Space>
                    </Card>
                </Col>

                {/* Visit Information Column */}
                <Col xs={24} md={16}>
                    <Card
                        loading={loading}
                        title={
                            <Space>
                                <CalendarOutlined style={{ color: "#722ed1" }} />
                                <Title level={5} style={{ margin: 0 }}>Visit Information</Title>
                            </Space>
                        }
                        headStyle={{ borderBottom: 0 }}
                        style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.09)' }}
                    >
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Descriptions column={{ xs: 1, sm: 2 }} size="small">
                                <Descriptions.Item label={<Space><FileTextOutlined /><span>Visit ID</span></Space>}>
                                    <Text strong>{visitId}</Text>
                                </Descriptions.Item>
                                <Descriptions.Item label={<Space><CalendarOutlined /><span>Visit Date</span></Space>}>
                                    <Text strong>{visitData.visit_date}</Text>
                                </Descriptions.Item>
                                <Descriptions.Item label={<Space><UserOutlined /><span>Patient Type</span></Space>}>
                                    <Tag color={visitData.patient_type === 'Normal' ? 'blue' : 'purple'}>
                                        {visitData.patient_type}
                                    </Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label={<Space><MedicineBoxOutlined /><span>Visit Type</span></Space>}>
                                    <Tag color={visitData.visit_type === 'Clinic' ? 'green' : 'orange'}>
                                        {visitData.visit_type}
                                    </Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label={<Space><FileTextOutlined /><span>Chit Number</span></Space>}>
                                    <Text strong>{visitData.chit_number}</Text>
                                </Descriptions.Item>
                                <Descriptions.Item label={<Space><DashboardOutlined /><span>Status</span></Space>}>
                                    {getStatusTag(visitData.status)}
                                </Descriptions.Item>
                                <Descriptions.Item label={<Space><UserOutlined /><span>Doctor</span></Space>}>
                                    <Text strong>{visitData.doctor_name}</Text>
                                </Descriptions.Item>
                                <Descriptions.Item label={<Space><MedicineBoxOutlined /><span>Clinic</span></Space>}>
                                    <Tag color="purple">{visitData.clinic_category}</Tag>
                                </Descriptions.Item>
                            </Descriptions>

                            <Divider />

                            {/* Treatments Section */}
                            <Title level={5} style={{ marginBottom: '16px' }}>
                                <MedicineBoxOutlined style={{ marginRight: '8px', color: '#13c2c2' }} />
                                Treatments
                            </Title>

                            {visitData.treatments?.length > 0 ? (
                                <List
                                    dataSource={visitData.treatments}
                                    renderItem={treatment => (
                                        <List.Item>
                                            <Tag
                                                icon={<MedicineBoxOutlined />}
                                                color="cyan"
                                                style={{ padding: '8px 12px', borderRadius: '8px' }}
                                            >
                                                {treatment.name}
                                            </Tag>
                                        </List.Item>
                                    )}
                                    grid={{ gutter: 16, xs: 1, sm: 2, md: 3 }}
                                />
                            ) : (
                                <Card bordered={false} style={{ background: '#fafafa' }}>
                                    <Text type="secondary">No treatments assigned for this visit</Text>
                                </Card>
                            )}

                            {/*<Divider />*/}

                            {/*<Space>*/}
                            {/*    <Button type="primary" icon={<PrinterOutlined />}>*/}
                            {/*        Print Summary*/}
                            {/*    </Button>*/}
                            {/*    <Button icon={<MailOutlined />}>*/}
                            {/*        Send to Patient*/}
                            {/*    </Button>*/}
                            {/*</Space>*/}
                        </Space>
                    </Card>

                    <Card
                        title={
                            <Space>
                                <FileTextOutlined style={{ fontSize: 22, color: "#faad14" }} />
                                <Title level={5} style={{ margin: 0 }}>Invoice</Title>
                            </Space>
                        }
                        style={{
                            borderRadius: '12px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                            marginTop: 24,
                            background: '#fff'
                        }}
                        headStyle={{ borderBottom: 0 }}
                    >
                        {visitData.invoice?.invoice_no ? (
                            <div
                                onClick={handleViewInvoice}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    padding: '20px 24px',
                                    background: '#ffffff',
                                    border: '1px solid #d9d9d9',
                                    borderRadius: '12px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                    transition: 'all 0.3s ease',
                                    gap: '16px',
                                    width: '100%',
                                    maxWidth: '500px',
                                    margin: '16px 0'
                                }}
                                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'}
                                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'}
                            >
                                <div
                                    style={{
                                        backgroundColor: '#fffbe6',
                                        borderRadius: '8px',
                                        padding: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <FileTextOutlined style={{ fontSize: 36, color: '#faad14' }} />
                                </div>
                                <div>
                                    <Text strong style={{ fontSize: 16, color: '#262626' }}>
                                        {visitData.invoice.invoice_no}
                                    </Text>
                                    <br />
                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                        Click to view the invoice
                                    </Text>
                                </div>
                            </div>
                        ) : (
                            <Text type="secondary">No invoice available for this visit</Text>
                        )}

                    </Card>
                </Col>

            </Row>

        </div>
    );
}

export default PatientVisitView;