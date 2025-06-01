import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import api from "../../../Services/NetworkManager.js";
import {
    Card,
    message,
    Row,
    Col,
    Typography,
    Descriptions,
    Divider,
    Avatar,
    Tabs,
    Tag,
    Table,
    Input,
    Button,
    Form
} from "antd";
import {
    UserOutlined,
    IdcardOutlined,
    CalendarOutlined,
    EnvironmentOutlined,
    PhoneOutlined,
    HeartOutlined,
    ManOutlined,
    WomanOutlined,
    HistoryOutlined,
    MedicineBoxOutlined,
    FileTextOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

function ViewAppointment(props) {
    const [loading, setLoading] = useState(false);
    const [visitData, setVisitData] = useState({});
    const [activeTab, setActiveTab] = useState("1");
    const [form] = Form.useForm();
    const { visitId } = useParams();

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

    const visitHistoryColumns = [
        {
            title: 'Date',
            dataIndex: 'visit_date',
            key: 'visit_date',
        },
        {
            title: 'Doctor',
            dataIndex: 'doctor_name',
            key: 'doctor_name',
        },
        {
            title: 'Type',
            dataIndex: 'visit_type',
            key: 'visit_type',
            render: (text) => <Tag color={text === 'Clinic' ? 'geekblue' : 'green'}>{text}</Tag>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => (
                <Tag color={
                    text === 'PENDING' ? 'orange' :
                        text === 'COMPLETED' ? 'green' : 'red'
                }>
                    {text}
                </Tag>
            )
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <Title level={3} style={{ marginBottom: 0 }}>
                        Chit Number: <Tag color="blue" style={{ fontSize: '1rem' }}>{visitData.chit_number}</Tag>
                    </Title>
                    <Divider />
                </Col>

                <Col span={24}>
                    <Card
                        loading={loading}
                        style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                    >
                        <Tabs
                            activeKey={activeTab}
                            onChange={setActiveTab}
                            tabPosition="left"
                            style={{ minHeight: '500px' }}
                        >
                            {/* PATIENT INFORMATION TAB */}
                            <TabPane
                                tab={
                                    <span>
                                        <UserOutlined />
                                        Patient Info
                                    </span>
                                }
                                key="1"
                            >
                                <Row gutter={[16, 16]}>
                                    <Col span={24}>
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                            <Avatar
                                                size={64}
                                                icon={<UserOutlined />}
                                                style={{
                                                    backgroundColor: '#1890ff',
                                                    marginRight: '16px',
                                                    fontSize: '24px'
                                                }}
                                            />
                                            <div>
                                                <Title level={4} style={{ margin: 0 }}>
                                                    {visitData.patient_data?.name}
                                                </Title>
                                                <Text type="secondary">
                                                    Reg No: {visitData.patient_data?.registration_number}
                                                </Text>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col span={24}>
                                        <Descriptions column={2} bordered size="small">
                                            <Descriptions.Item label={<span><IdcardOutlined /> Registration No</span>}>
                                                {visitData.patient_data?.registration_number}
                                            </Descriptions.Item>
                                            <Descriptions.Item label={<span>{getGenderIcon(visitData.patient_data?.gender)} Gender/Age</span>}>
                                                {visitData.patient_data?.gender}, {visitData.patient_data?.age} yrs
                                            </Descriptions.Item>
                                            <Descriptions.Item label={<span><HeartOutlined /> Weight</span>}>
                                                {visitData.patient_data?.weight} kg
                                            </Descriptions.Item>
                                            <Descriptions.Item label={<span><PhoneOutlined /> Contact</span>}>
                                                {visitData.patient_data?.contact_no}
                                            </Descriptions.Item>
                                            <Descriptions.Item label={<span><EnvironmentOutlined /> Address</span>} span={2}>
                                                {visitData.patient_data?.address_line_1}, {visitData.patient_data?.address_line_2},
                                                {visitData.patient_data?.city}, {visitData.patient_data?.district}
                                            </Descriptions.Item>
                                            <Descriptions.Item label={<span><IdcardOutlined /> NIC Number</span>}>
                                                {visitData.patient_data?.nic_number}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Marital Status">
                                                {visitData.patient_data?.marital_status || 'N/A'}
                                            </Descriptions.Item>
                                        </Descriptions>
                                    </Col>
                                </Row>
                            </TabPane>

                            {/* VISIT HISTORY TAB */}
                            <TabPane
                                tab={
                                    <span>
                                        <HistoryOutlined />
                                        Visit History
                                    </span>
                                }
                                key="2"
                            >
                                <Row gutter={[16, 16]}>
                                    <Col span={24}>
                                        <Title level={4}>Current Visit</Title>
                                        <Descriptions column={2} bordered size="small">
                                            <Descriptions.Item label="Visit Date">
                                                {visitData.visit_date}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Visit Type">
                                                <Tag color={visitData.visit_type === 'Clinic' ? 'geekblue' : 'green'}>
                                                    {visitData.visit_type}
                                                </Tag>
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Patient Type">
                                                <Tag color={visitData.patient_type === 'Normal' ? 'blue' : 'gold'}>
                                                    {visitData.patient_type}
                                                </Tag>
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Clinic Category">
                                                {visitData.clinic_category}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Doctor">
                                                {visitData.doctor_name}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Status">
                                                <Tag
                                                    color={
                                                        visitData.status === 'PENDING' ? 'orange' :
                                                            visitData.status === 'COMPLETED' ? 'green' : 'red'
                                                    }
                                                >
                                                    {visitData.status}
                                                </Tag>
                                            </Descriptions.Item>
                                        </Descriptions>
                                    </Col>

                                    <Col span={24}>
                                        <Title level={4} style={{ marginTop: '24px' }}>Previous Visits</Title>
                                        <Table
                                            columns={visitHistoryColumns}
                                            dataSource={[]} // Replace with actual visit history data
                                            rowKey="id"
                                            pagination={false}
                                            bordered
                                        />
                                    </Col>
                                </Row>
                            </TabPane>

                            {/* DIAGNOSIS TAB */}
                            <TabPane
                                tab={
                                    <span>
                                        <MedicineBoxOutlined />
                                        Diagnosis
                                    </span>
                                }
                                key="3"
                            >
                                <Form form={form} layout="vertical">
                                    <Row gutter={[16, 16]}>
                                        <Col span={24}>
                                            <Form.Item label="Symptoms" name="symptoms">
                                                <TextArea rows={4} placeholder="Enter patient symptoms" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item label="Diagnosis" name="diagnosis">
                                                <TextArea rows={4} placeholder="Enter diagnosis" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item label="Prescription" name="prescription">
                                                <TextArea rows={4} placeholder="Enter prescription details" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item label="Notes" name="notes">
                                                <TextArea rows={2} placeholder="Additional notes" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Button type="primary" htmlType="submit">
                                                Save Diagnosis
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>

                                <Divider />

                                <Title level={4}>Previous Diagnoses</Title>
                                <Table
                                    columns={[
                                        {
                                            title: 'Date',
                                            dataIndex: 'date',
                                            key: 'date',
                                        },
                                        {
                                            title: 'Diagnosis',
                                            dataIndex: 'diagnosis',
                                            key: 'diagnosis',
                                        },
                                        {
                                            title: 'Doctor',
                                            dataIndex: 'doctor',
                                            key: 'doctor',
                                        }
                                    ]}
                                    dataSource={[]} // Replace with actual diagnosis history
                                    rowKey="id"
                                    pagination={false}
                                    bordered
                                />
                            </TabPane>
                        </Tabs>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default ViewAppointment;