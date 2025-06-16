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
import CommonForm from "./CaseSheets/CommonForm.jsx";
import PreviousVisits from "./PreviousVisits.jsx";

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

    console.log(visitData)

    return (
        <div>
            <Row gutter={[24, 24]}>


                <Col span={24}>
                    <Card
                        loading={loading}
                        style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                    >
                        <Title level={3} style={{ marginBottom: 0, }} >
                            CHIT NUMBER : <Tag color="blue" style={{ fontSize: '1rem' }}>{visitData.chit_number}</Tag>
                        </Title>
                        <Divider />

                        <Tabs
                            activeKey={activeTab}
                            onChange={setActiveTab}
                            tabPosition="left"

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
                                            {/*<Descriptions.Item label={<span><HeartOutlined /> Weight</span>}>*/}
                                            {/*    {visitData.patient_data?.weight} kg*/}
                                            {/*</Descriptions.Item>*/}
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
                                        Patient History
                                    </span>
                                }
                                key="2"
                            >

                                <Row gutter={[16, 16]}>
                                    {visitData.status === "PENDING" && (
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
                                    )}

                                    <Col span={24}>
                                        <Title level={4} style={{ marginTop: '24px' }}>Previous Visits</Title>
                                        <Divider/>
                                        <PreviousVisits patientId={visitData?.patient_data?.id} highlightChitNumber={visitData?.chit_number}/>
                                    </Col>
                                </Row>

                            </TabPane>

                            {/* DIAGNOSIS TAB */}
                            {visitData.status === "PENDING" && (
                                <TabPane
                                    tab={<span><MedicineBoxOutlined />Diagnosis</span>}
                                    key="3"
                                >
                                    <div style={{ maxHeight: '600px', overflowY: 'auto', paddingRight: 16 }}>
                                        <CommonForm
                                            visitData={visitData}
                                            patientData={visitData.patient_data}
                                        />
                                    </div>
                                </TabPane>
                           )}

                        </Tabs>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default ViewAppointment;