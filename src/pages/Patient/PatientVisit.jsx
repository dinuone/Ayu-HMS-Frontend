import React, {useEffect, useState} from 'react';
import { Button, Card, Col, Form, Row, Select, message } from 'antd';
import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import {useVisitLogic} from "./helper/useVisitLogic.js";
import VisitTypeSelector from "./Components/VisitTypeSelector.jsx";
import PromotionVisitForm from "./Forms/PromotionVisitForm.jsx";
import NormalVisitForm from "./Forms/NormalVisitForm.jsx";
import DoctorAvailability from "./Components/DoctorAvailability.jsx";
import PriceCalculation from "./Components/PriceCalculation.jsx";
import api from "../../Services/NetworkManager.js";


const PatientVisit = () => {
    const { patientRegNo } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [submitLoading, setSubmitLoading] = useState(false);


    const {
        visitType,
        setVisitType,
        visitSubType,
        selectedTreatments,
        selectedDoctor,
        loading,
        clinicData,
        treatmentData,
        totalCost,
        selectedClinic,
        doctors,
        hospitalCharge,
        customCharges,
        handleTreatmentSelect,
        handleVisitTypeChange,
        checkDoctorAvailability,
        handleClinicChange,
        handleDoctorChange,
        clearVisitData,
        treatmentPrice
    } = useVisitLogic(patientRegNo,form);


    const handleSubmit = async (values) => {
        if (!selectedDoctor) {
            message.error('Please select a doctor');
            return;
        }

        const isAvailable = checkDoctorAvailability(selectedDoctor);
        if (!isAvailable) {
            message.error(`Selected doctor is not available today during the current shift`);
            return;
        }

        try {
            setSubmitLoading(true)
            const payload = {
                patient_reg_no: patientRegNo,
                clinic_category_id: values.clinic,
                patient_type: visitType === 'feelo' ? 1 : 2,
                visit_type: values.assign_to === "CLINIC /OPD" ? 1 : 2,
                treatments: selectedTreatments,
                doctor_id: values.doctor,
                feelo_app_ref: visitType === 'feelo' ? values.feeloReference : null
            }
            console.log('Submitting values:', payload);
            await api.post('patient-visit/create', payload);
            setSubmitLoading(false);
            clearVisitData();
            navigate('/patients');
        } catch (error) {
            setSubmitLoading(false);
            console.error('Error submitting form:', error);
            message.error('Failed to register visit');
        }
    };





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

            <Card title={`Patient Visit - Registration #${patientRegNo}`} loading={loading}>
                {!visitType ? (
                    <VisitTypeSelector onSelect={setVisitType} />
                ) : (
                    <Form form={form} layout="vertical" onFinish={handleSubmit}>
                        {visitType === 'promotion' ? (
                            <PromotionVisitForm
                                treatmentData={treatmentData}
                                onTreatmentSelect={handleTreatmentSelect}
                                platforms={["Facebook","Feelo"]}
                            />
                        ) : (
                            <NormalVisitForm
                                visitSubType={visitSubType}
                                clinicData={clinicData}
                                treatmentData={treatmentData}
                                selectedClinic={selectedClinic}
                                onVisitTypeChange={handleVisitTypeChange}
                                onClinicChange={handleClinicChange}
                                onTreatmentSelect={handleTreatmentSelect}
                            />
                        )}

                        <Form.Item
                            label="Select Doctor"
                            name="doctor"
                            rules={[{ required: true, message: 'Please select doctor' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Search doctors"
                                onChange={handleDoctorChange}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {doctors.map(doctor => (
                                    <Select.Option key={doctor.id} value={doctor.id}>
                                        {doctor.doctor_name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <DoctorAvailability selectedDoctor={selectedDoctor} />

                        <Form.Item>
                            <Button
                                color="default"
                                variant="solid"
                                icon={<CheckOutlined />}
                                htmlType="submit"
                                style={{ marginRight: 8 }}
                                loading={submitLoading}
                            >
                                Submit Visit
                            </Button>
                            <Button variant="outlined" color="red" onClick={clearVisitData}>Cancel</Button>
                        </Form.Item>
                    </Form>
                )}

                <PriceCalculation
                    visitType={visitType}
                    visitSubType={visitSubType}
                    totalCost={totalCost}
                    selectedTreatments={selectedTreatments}
                    selectedClinic={selectedClinic}
                    selectedDoctor={selectedDoctor}
                    hospitalCharge={hospitalCharge}
                    customCharges={customCharges}
                    treatmentPriceData={treatmentPrice}
                />
            </Card>
        </div>
    );
};

export default PatientVisit;