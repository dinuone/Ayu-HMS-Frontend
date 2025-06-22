import React, {useState} from 'react';
import { Button, Card, Descriptions, Divider, Space, Table, Typography, Tabs, Timeline, Collapse, Tag } from 'antd';
import ChiefComplaint from "../CaseSheets/StreeRoga/Sections/ChiefComplaint.jsx";
import OtherComplaint from "../CaseSheets/StreeRoga/Sections/OtherComplaint.jsx";
import MenstrualHistory from "../CaseSheets/StreeRoga/Sections/MenstrualHistory.jsx";
import ObstetricHistory from "../CaseSheets/StreeRoga/Sections/ObstetricHistory.jsx";
import PresentIllness from "../CaseSheets/StreeRoga/Sections/PresentIllness.jsx";
import MedicalHistory from "../CaseSheets/StreeRoga/Sections/MedicalHistory.jsx";
import PersonalHistory from "../CaseSheets/StreeRoga/Sections/PersonalHistory.jsx";
import PhysicalExam from "../CaseSheets/StreeRoga/Sections/PhysicalExam.jsx";
import Investigations from "../CaseSheets/StreeRoga/Sections/Investigations.jsx";
import DifferentialDiagnosis from "../CaseSheets/StreeRoga/Sections/DifferentialDiagnosis.jsx";
import AMADiagnosis from "../CaseSheets/StreeRoga/Sections/AMADiagnosis.jsx";
import NextVisit from "../CaseSheets/StreeRoga/Sections/NextVisit.jsx";
import Remarks from "../CaseSheets/Common/Remarks.jsx";
import {CheckCircleFilled, DownloadOutlined, EyeFilled} from "@ant-design/icons";
import { RiArrowGoBackFill } from "react-icons/ri";
import dayjs from 'dayjs';
import RespiratorySystem from "../CaseSheets/General/Sections/RespiratorySystem.jsx";
import CirculatorySystem from "../CaseSheets/General/Sections/CirculatorySystem.jsx";
import IntegumentarySystem from "../CaseSheets/General/Sections/IntegumentarySystem.jsx";
import ReproductiveSystem from "../CaseSheets/General/Sections/ReproductiveSystem.jsx";
import GastroIntestinalSystem from "../CaseSheets/General/Sections/GastroIntestinalSystem.jsx";
import MuscularSystem from "../CaseSheets/General/Sections/MuscularSystem.jsx";
import MotorFunctions from "../CaseSheets/General/Sections/MotorFunctions.jsx";
import CardiovascularSystem from "../CaseSheets/General/Sections/CardioVascularSystem.jsx";
import SkeletalSystem from "../CaseSheets/General/Sections/SkeletalSystem.jsx";
import SensoryFunctions from "../CaseSheets/General/Sections/SensoryFunctions.jsx";
import {useNavigate} from "react-router-dom";

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;

function ViewGeneralCaseSheet({ visitData = [],patientLog, caseSheet, loading, onBack, onDownload,  }) {

    console.log("patientLog Data ::::::::::::::::::::::",patientLog)
    console.log("Visit Data ::::::::::::::::::::::",visitData)

    const today = new Date().toISOString().split('T')[0];
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("1");

    const containerStyle = {
        maxWidth: 1200,
        margin: '0 auto',
        padding: '24px',
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        textAlign: 'left'
    };

    const cardStyle = {
        marginTop: 16,
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    };

    const items = [
        {
            key: '1',
            label: 'Hospital Name',
            children: 'Harendra Ayurveda Hospital Pvt(Ltd)',
        },
        {
            key: '2',
            label: 'Date',
            children: today,
        },
        {
            key: '3',
            label: 'Consultant Name',
            children: patientLog?.doctor_name || 'N/A',
        },
        {
            key: '4',
            label: 'Patient Number',
            children: patientLog?.chit_number || 'N/A',
        },
    ];

    const patientDetails = [
        {
            key: '1',
            label: 'Name',
            children: patientLog?.patient_data.name || 'N/A',
        },
        {
            key: '2',
            label: 'Age',
            children: patientLog?.patient_data.age || 'N/A',
        },
        {
            key: '3',
            label: 'Gender',
            children: patientLog?.patient_data.gender || 'N/A',
        },
        {
            key: '4',
            label: 'Marital Status',
            children: patientLog?.patient_data.marital_status || 'N/A',
        },
        {
            key: '5',
            label: 'Address',
            children: `${patientLog?.patient_data.address_line_1}, ${patientLog?.patient_data.address_line_2 || ''}` || 'N/A',
        },
        {
            key: '6',
            label: 'Occupation',
            children: patientLog?.patient_data.occupation || 'N/A',
        },
    ];

    const prescriptionColumns = [
        {
            title: 'Medicine Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
        },
        {
            title: 'Quantity',
            dataIndex: 'qty',
            key: 'qty',
            width: '15%',
        },
        {
            title: 'Instructions',
            dataIndex: 'instruction',
            key: 'instruction',
            width: '35%',
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
            width: '20%',
        },
    ];

    const navigateToView = (visitId) => {
        navigate(`/view-case-sheet/${visitId}`)
        setActiveTab("1");
    }

    const visitHistoryColumns = [
        {
            title: 'Date',
            dataIndex: 'visit_date',
            key: 'visit_date',
            render: (date) => dayjs(date).format('DD MMM YYYY'),
            width: '15%',
            sorter: (a, b) => new Date(a.visit_date) - new Date(b.visit_date),
        },
        {
            title: 'Chit Number',
            dataIndex: 'chit_number',
            key: 'chit_number',
            width: '15%',
        },
        {
            title: 'Patient Name',
            dataIndex: 'patient_name',
            key: 'patient_name',
            width: '20%',
        },
        {
            title: 'Visit Type',
            dataIndex: 'patient_type',
            render:(record) => (
                <Tag color={record  === "Normal" ? 'purple-inverse' : 'orange-inverse'}>{record}</Tag>
            ),
            width: '25%',
        },

        {
            title: 'Status',
            dataIndex: 'status',
            render: (status) => (
                <Tag icon={status  === "COMPLETED" ? <CheckCircleFilled/> : ""}
                     color={status  === "COMPLETED" ? 'green-inverse' : 'processing'}>
                    <strong>{status}</strong>
                </Tag>
            ),
            width: '25%',
        },

        {
            title: 'Actions',
            render: (_, record) => (
                <Space>
                    <Button
                        disabled={record.status ==="PENDING"}
                        onClick={() => navigateToView(record.id)}
                        icon={<EyeFilled/>}
                        color="default"
                        variant="solid"
                        size="small"
                    />
                </Space>
            )
        },

        {
            title: 'Doctor',
            dataIndex: 'doctor_name',
            key: 'doctor_name',
            width: '10%',
        },
    ];

    const renderCaseSheetTab = () => (
        <>
            <Card style={cardStyle} loading={loading}>
                <MedicalHistory data={caseSheet.previousMedicalHistory} readonly={true} />
            </Card>

            <Card style={cardStyle} loading={loading}>
                <PersonalHistory data={caseSheet.personalHistory} readonly={true} />
            </Card>

            {caseSheet?.respiratory && (
                <>
                    <div style={{ marginTop: 16,}}>
                        <RespiratorySystem data={caseSheet?.respiratory} readonly={true} />
                    </div>
                </>
            )}

            {caseSheet?.circulatory && (
                <>
                    <div style={{ marginTop: 16,}}>
                        <CirculatorySystem data={caseSheet?.circulatory} readonly={true} />
                    </div>
                </>
            )}

            {caseSheet?.integumentary && (
                <>
                    <div style={{ marginTop: 16,}}>
                        <IntegumentarySystem data={caseSheet?.integumentary} readonly={true} />
                    </div>
                </>
            )}

            {caseSheet?.reproductiveSystem && (
                <>
                    <div style={{ marginTop: 16,}}>
                        <ReproductiveSystem data={caseSheet?.reproductiveSystem} readonly={true} />
                    </div>
                </>
            )}

            {caseSheet?.gastroIntestinal && (
                <>
                    <div style={{ marginTop: 16,}}>
                        <GastroIntestinalSystem data={caseSheet?.gastroIntestinal} readonly={true} />
                    </div>
                </>
            )}

            {caseSheet?.muscular && (
                <>
                    <div style={{ marginTop: 16,}}>
                        <MuscularSystem data={caseSheet?.muscular} readonly={true} />
                    </div>
                </>
            )}

            {caseSheet?.motorFunctions && (
                <>
                    <div style={{ marginTop: 16,}}>
                        <MotorFunctions data={caseSheet?.motorFunctions} readonly={true} />
                    </div>
                </>
            )}

            {caseSheet?.cardiovascular && (
                <>
                    <div style={{ marginTop: 16,}}>
                        <CardiovascularSystem data={caseSheet?.cardiovascular} readonly={true} />
                    </div>
                </>
            )}

            {caseSheet?.skeletal && (
                <>
                    <div style={{ marginTop: 16,}}>
                        <SkeletalSystem data={caseSheet?.skeletal} readonly={true} />
                    </div>
                </>
            )}

            {caseSheet?.sensoryFunctions && (
                <>
                    <div style={{ marginTop: 16,}}>
                        <SensoryFunctions data={caseSheet?.sensoryFunctions} readonly={true} />
                    </div>
                </>
            )}


            <Card style={cardStyle} title="Diagnosis">
                {caseSheet.selectedDiseaseCodes && caseSheet.selectedDiseaseCodes.length > 0 ? (
                    <Space size={[0, 8]} wrap>
                        {caseSheet.selectedDiseaseCodes.map((item, index) => (
                            <Tag key={index} color="blue">{item.name}</Tag>
                        ))}
                    </Space>
                ) : (
                    <Text type="secondary">No Diagnosis data available</Text>
                )}
            </Card>

            <Card title="Current Prescription" style={cardStyle}>
                {patientLog?.prescription && patientLog?.prescription.length > 0 ? (
                    <Table
                        dataSource={patientLog?.prescription}
                        columns={prescriptionColumns}
                        rowKey="id"
                        pagination={false}
                        size="small"
                    />
                ) : (
                    <Text type="secondary">No prescription data available</Text>
                )}
            </Card>

            <Card style={cardStyle} title="Selected Treatments">
                {caseSheet.selectedTreatments && caseSheet.selectedTreatments.length > 0 ? (
                    <Space size={[0, 8]} wrap>
                        {caseSheet.selectedTreatments.map((treatment, index) => (
                            <Tag key={index} color="green">{treatment.name}</Tag>
                        ))}
                    </Space>
                ) : (
                    <Text type="secondary">No treatments selected</Text>
                )}
            </Card>

            <Card style={cardStyle} title="Assigned Clinics">
                {caseSheet.selectedClinics && caseSheet.selectedClinics.length > 0 ? (
                    <Space size={[0, 8]} wrap>
                        {caseSheet.selectedClinics.map((clinic, index) => (
                            <Tag key={index} color="orange">{clinic.name}</Tag>
                        ))}
                    </Space>
                ) : (
                    <Text type="secondary">No clinics selected</Text>
                )}
            </Card>

            <Card style={cardStyle} loading={loading}>
                <NextVisit value={caseSheet.nextVisitDate} readonly={true} />
            </Card>

            <Card style={cardStyle} loading={loading}>
                <Remarks value={caseSheet.remarks} readonly={true} />
            </Card>
        </>
    );

    const renderVisitHistoryTab = () => (
        <Card style={cardStyle}>
            {visitData.length > 0 ? (
                <Table
                    dataSource={visitData}
                    columns={visitHistoryColumns}
                    rowKey="id"
                    size="small"
                    pagination={{ pageSize: 10 }}
                    expandable={{
                        expandedRowRender: (record) => (
                            <div style={{ padding: '16px 24px', background: '#fafafa' }}>
                                <Collapse bordered={false} ghost>

                                    <Panel header="Diagnosis" key="1">
                                        {patientLog.diease_code?.length > 0 ? (
                                            <ul style={{ margin: 0, paddingLeft: 16 }}>
                                                {patientLog.diease_code.map((item, idx) => (
                                                    <li key={idx}>{item.name}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <Text>No diagnosis recorded</Text>
                                        )}
                                    </Panel>
                                    <Panel header="Treatments" key="2">
                                        {patientLog.treatments?.length > 0 ? (
                                            <ul style={{ margin: 0, paddingLeft: 16 }}>
                                                {patientLog.treatments.map((item, idx) => (
                                                    <li key={idx}>{item.name}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <Text>No Treatments recorded</Text>
                                        )}
                                    </Panel>

                                    <Panel header="Prescription Details" key="3">
                                        {patientLog.prescription?.length > 0 ? (
                                            <Table
                                                dataSource={patientLog.prescription}
                                                columns={prescriptionColumns}
                                                rowKey="id"
                                                pagination={false}
                                                size="small"
                                            />
                                        ) : (
                                            <Text>No prescription recorded</Text>
                                        )}
                                    </Panel>
                                </Collapse>
                            </div>
                        ),
                        rowExpandable: (record) => true,
                    }}
                />
            ) : (
                <Text type="secondary">No previous visit records found</Text>
            )}
        </Card>
    );

    const renderTimelineTab = () => (
        <Card style={cardStyle}>
            <Timeline mode="left" style={{ marginTop: 16 }}>
                {visitData.length > 0 ? (
                    visitData.map((visit, index) => (
                        <Timeline.Item
                            key={index}
                            label={dayjs(visit.visit_date).format('DD MMM YYYY')}
                            color={index === 0 ? 'green' : 'blue'}
                        >
                            <Card size="small" style={{ marginBottom: 16 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Text strong>{visit.doctor_name || 'Unknown Doctor'}</Text>
                                    <Tag color={index === 0 ? 'green' : 'blue'}>
                                        {index === 0 ? 'Latest' : `Visit #${visitData.length - index}`}
                                    </Tag>
                                </div>
                                <Divider style={{ margin: '8px 0' }} />
                                <Text strong>Next Visit Date : </Text>
                                <Text>
                                    {patientLog.next_visit_date
                                        ? new Date(patientLog.next_visit_date).toISOString().split('T')[0]
                                        : 'Not specified'}
                                </Text>
                                <br />
                                <Text strong>Diagnosis : </Text>
                                {patientLog.diease_code?.length > 0 ? (
                                    <Space size={[0, 4]} wrap>
                                        {patientLog.diease_code.map((item, idx) => (
                                            <Tag key={idx} color="gold-inverse">{item.name}</Tag>
                                        ))}
                                    </Space>
                                ) : (
                                    <Text>No diagnosis recorded</Text>
                                )}
                            </Card>
                        </Timeline.Item>
                    ))
                ) : (
                    <Timeline.Item>
                        <Text type="secondary">No visit history available</Text>
                    </Timeline.Item>
                )}
            </Timeline>
        </Card>
    );

    return (
        <div style={containerStyle}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px', textAlign: 'right' }}>
                <Space>
                    <Button onClick={onBack} variant="solid" color="default" icon={<RiArrowGoBackFill />}>Back</Button>
                    <Button onClick={onDownload} variant="solid" color="orange" icon={<DownloadOutlined />}>Download Case Sheet</Button>
                </Space>
            </div>

            {/* Patient Information Section */}
            <Card style={cardStyle} loading={loading}>
                <Descriptions
                    column={2}
                    size="small"
                    title="Hospital Information"
                    items={items}
                />
                <Divider />
                <Descriptions
                    column={1}
                    size="small"
                    title="Patient Details"
                    items={patientDetails}
                />
            </Card>

            {/* Main Tabs Section */}
            <Card style={{ ...cardStyle, padding: 0 }}>
                <Tabs defaultActiveKey="1" type="card" size="large" activeKey={activeTab}  onChange={(key) => setActiveTab(key)}>
                    <TabPane tab="Case Sheet" key="1">
                        {renderCaseSheetTab()}
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                Visit History <Tag color="blue" style={{ marginLeft: 5 }}>{visitData.length}</Tag>
                            </span>
                        }
                        key="2"
                    >
                        {renderVisitHistoryTab()}
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                Patient Timeline <Tag color="blue" style={{ marginLeft: 5 }}>{visitData.length}</Tag>
                            </span>
                        }
                        key="3"
                    >
                        {renderTimelineTab()}
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    );
}

export default ViewGeneralCaseSheet;