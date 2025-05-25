import React, { useState, useEffect } from 'react';
import {
    Button,
    Card,
    Select,
    Form,
    Row,
    Col,
    Tag,
    message, Divider, List
} from 'antd';
import {
    ArrowLeftOutlined, CheckCircleTwoTone,
    CheckOutlined, CloseCircleTwoTone,
    UserOutlined
} from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import api from "../../Services/NetworkManager.js";

const { Option } = Select;

const PatientVisit = () => {
    const { patientRegNo } = useParams(); // Access route parameter
    const navigate = useNavigate();
    const [visitType, setVisitType] = useState(null);
    const [visitSubType, setVisitSubType] = useState(null);
    const [selectedTreatments, setSelectedTreatments] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [patientData, setPatientData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [clinicData, setClinicData] = useState([]);
    const [treatmentData, setTreatmentData] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [selectedClinic, setSelectedClinic] = useState(null);
    const doctors = ['Dr. Sharma', 'Dr. Patel', 'Dr. Gupta', 'Dr. Desai'];



    const handleTreatmentSelect = (values) => {
        // values will be an array when mode="multiple"
        const newTreatments = treatmentData.filter(t => values.includes(t.id));
        setSelectedTreatments(newTreatments);
    };

    const GetClinicsOrTreatments = async (visitType) => {
        try{
            const res = await api.get(`patient-visit/get-available-clinics-or-treatments/${visitType}`)
            console.log(res);
            if(visitType ===1 ){
                setClinicData(res.data.data)
            }else{
                setTreatmentData(res.data.data)
            }

        }catch (err){
            console.error(err);
        }
    }

    const handleVisitTypeChange = (value) =>
    {
        let visitType = null
        if(value === "CLINIC /OPD"){
            visitType =1
        }else{
            visitType =2
        }
        setVisitSubType(value)
        GetClinicsOrTreatments(visitType)
    }

    const handleSubmit = (values) => {
        // Prepare form data with patientRegNo
        const formData = {
            patientRegNo,
            visitType,
            visitSubType,
            treatments: selectedTreatments,
            doctor: selectedDoctor,
            ...values
        };

        console.log('Form submitted:', formData);
        message.success('Visit registered successfully!');
        navigate('/patients'); // Redirect after submission
    };
    useEffect(() => {
        const sum = selectedTreatments.reduce((acc, treatment) => {
            return acc + (treatment.price || 0);
        }, 0);
        setTotalCost(sum);
    }, [selectedTreatments]);

    const clearVisitData = () =>{
        setVisitSubType(null);
        setVisitType(null);
        setTreatmentData([])
        setClinicData([])
        setSelectedTreatments([])
    }

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px' }}>
            <Button
                type="link"
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate(-1)}
                style={{ marginBottom: 16 }}
            >
                Go Back
            </Button>

            <Card
                title={`Patient Visit - Registration #${patientRegNo}`}
                loading={loading}

            >
                {!visitType ? (
                    <Row gutter={16}>
                        <Col span={24}>
                            <h3 style={{ marginBottom: 24 }}>Select Visit Type</h3>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Button
                                        block
                                        size="large"
                                        variant="solid"
                                        onClick={() => setVisitType('feelo')}
                                        color="orange"
                                    >
                                        Feelo App Visit
                                    </Button>
                                </Col>
                                <Col span={12}>
                                    <Button
                                        block
                                        size="large"
                                        variant="solid"
                                        onClick={() => setVisitType('normal')}
                                        color="purple"
                                    >
                                        Normal Visit
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                ) : (
                    <Form layout="vertical" onFinish={handleSubmit}>
                        {visitType === 'feelo' ? (
                            <>
                                <Form.Item
                                    label="Feelo Reference ID"
                                    name="feeloReference"
                                    rules={[{ required: true, message: 'Please enter Feelo reference ID' }]}
                                >
                                    <Select showSearch placeholder="Enter Feelo Reference ID">
                                        <Option value="ref-123">REF-123</Option>
                                        <Option value="ref-456">REF-456</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item label="Select Treatments">
                                    <Select
                                        mode="multiple"
                                        placeholder="Search Treatments"
                                        showSearch
                                        optionFilterProp="children"
                                        onChange={handleTreatmentSelect}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().includes(input.toLowerCase())
                                        }
                                    >
                                        {treatmentData.map(treatment => (
                                            <Option key={treatment.id} value={treatment.id}>
                                                {treatment.name}
                                            </Option>
                                        ))}
                                    </Select>

                                </Form.Item>
                            </>
                        ) : (
                            <>
                                <Form.Item
                                    label="Assign to"
                                    name="assign_to"
                                    rules={[{ required: true, message: 'Please select visit sub-type' }]}
                                >
                                    <Select
                                        placeholder="Select Assign"
                                        onChange={handleVisitTypeChange}
                                    >
                                        <Option value="CLINIC /OPD">CLINIC /OPD</Option>
                                        <Option value="TREATMENT">TREATMENT</Option>
                                    </Select>
                                </Form.Item>

                                {visitSubType === 'CLINIC /OPD' && (

                                    <>
                                        <Form.Item
                                            label="Select Clinic"
                                            name="clinic"
                                            rules={[{ required: true, message: 'Please select clinic' }]}
                                        >
                                            <Select showSearch placeholder="Search clinics"
                                                    onChange={(value) => {
                                                        const selectedClinic = clinicData.find(c => c.name === value);
                                                        setSelectedClinic(selectedClinic);
                                                    }}>
                                                {clinicData.map(clinic => (
                                                    <Option key={clinic.id} value={clinic.name}>
                                                        {clinic.name}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>


                                        {selectedClinic && (
                                            <div style={{ marginBottom: 24,}}>
                                                <h4>Available Days</h4>
                                                <Row gutter={[8, 8]}>
                                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                                        <Col key={day} span={3}>
                                                            <Card
                                                                size="small"
                                                                hoverable
                                                                style={{
                                                                    fontWeight: 'bold',
                                                                    textAlign: 'center',
                                                                    backgroundColor: selectedClinic.available_days.includes(day)
                                                                        ? '#f6ffed'
                                                                        : '#fff2f0',
                                                                    borderColor: selectedClinic.available_days.includes(day)
                                                                        ? '#b7eb8f'
                                                                        : '#ffccc7'
                                                                }}
                                                            >
                                                                <div style={{ fontSize: 12, marginBottom: 4 }}>{day}</div>
                                                                {selectedClinic.available_days.includes(day) ? (
                                                                    <CheckCircleTwoTone twoToneColor="#52c41a" />
                                                                ) : (
                                                                    <CloseCircleTwoTone twoToneColor="#ff4d4f" />
                                                                )}
                                                            </Card>
                                                        </Col>
                                                    ))}
                                                </Row>
                                            </div>
                                        )}
                                    </>

                                )}

                                {visitSubType === 'TREATMENT' && (
                                    <Form.Item label="Select Treatments">
                                        <Select
                                            mode="multiple"
                                            placeholder="Search Treatments"
                                            showSearch
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().includes(input.toLowerCase())
                                            }
                                            onChange={handleTreatmentSelect}
                                        >
                                            {treatmentData.map(treatment => (
                                                <Option key={treatment.id} value={treatment.id}>
                                                    {treatment.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                )}
                            </>
                        )}

                        <Form.Item
                            label="Select Doctor"
                            name="doctor"
                            rules={[{ required: true, message: 'Please select doctor' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Search doctors"
                                onChange={setSelectedDoctor}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {doctors.map(doctor => (
                                    <Option key={doctor} value={doctor}>
                                        {doctor}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                icon={<CheckOutlined />}
                                htmlType="submit"
                                style={{ marginRight: 8 }}
                                loading={loading}
                            >
                                Submit Visit
                            </Button>
                            <Button onClick={clearVisitData}>
                                Cancel
                            </Button>
                        </Form.Item>
                    </Form>
                )}


                {visitType && selectedTreatments.length > 0 && (
                    <div style={{
                        marginTop: 16,
                        padding: '12px 16px',
                        backgroundColor: '#fafafa',
                        borderRadius: 4,
                        border: '1px solid #d9d9d9'
                    }}>
                        <Row justify="space-between">
                            <Col>
                                <strong>Selected Treatments:</strong>
                            </Col>
                            <Col>
                                <strong>Total:</strong> LKR.{totalCost.toFixed(2)}
                            </Col>
                        </Row>
                        <Divider style={{ margin: '12px 0' }} />
                        {selectedTreatments.map(treatment => (
                            <Row key={treatment.id} justify="space-between" style={{ marginBottom: 8 }}>
                                <Col>{treatment.name}</Col>
                                <Col>LKR.{treatment.price.toFixed(2)}</Col>
                            </Row>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
};

export default PatientVisit;