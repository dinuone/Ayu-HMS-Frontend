import React from 'react';
import { Button, Card, Col, Form, Row, Select, message } from 'antd';
import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import {useVisitLogic} from "./helper/useVisitLogic.js";
import VisitTypeSelector from "./Components/VisitTypeSelector.jsx";
import FeeloVisitForm from "./Forms/FeeloVisitForm.jsx";
import NormalVisitForm from "./Forms/NormalVisitForm.jsx";
import DoctorAvailability from "./Components/DoctorAvailability.jsx";
import PriceCalculation from "./Components/PriceCalculation.jsx";


const PatientVisit = () => {
    const { patientRegNo } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();

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
    } = useVisitLogic(patientRegNo,form);

    const preparePayload = () => {
        // Base payload structure
        const payload = {
            patient_id: parseInt(patientRegNo), // Assuming patientRegNo is from props/params
            clinic_category_id: selectedClinic?.id || 0,
            remarks: "", // You might want to add a remarks field in your form
            patient_type: 1, // Default value, adjust as needed
            visit_type: visitType === 'feelo' ? 2 : 1, // Example mapping
            treatments: [],
            doctor_id: selectedDoctor?.id || 0,
            doctor_name: selectedDoctor?.doctor_name || "",
            feelo_app_ref: visitType === 'feelo' ? form.getFieldValue('feeloReference') || "" : ""
        };

        // Add treatments if they exist
        if (selectedTreatments.length > 0) {
            payload.treatments = selectedTreatments.map(treatment => ({
                id: treatment.id,
                name: treatment.name
            }));
        }

        // Additional logic for clinic/OPD vs treatment visits
        if (visitSubType === 'CLINIC /OPD') {
            payload.visit_type = 1; // Example value for clinic visit
        } else if (visitSubType === 'TREATMENT') {
            payload.visit_type = 2; // Example value for treatment visit
        }

        return payload;
    };

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
            const payload = preparePayload();
            console.log('Submitting payload:', payload);
            const response = await api.post('patient-visit/create', payload);
            message.success('Visit created successfully!');
            clearVisitData();
            navigate('/patients');
        } catch (error) {
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
                        {visitType === 'feelo' ? (
                            <FeeloVisitForm
                                treatmentData={treatmentData}
                                onTreatmentSelect={handleTreatmentSelect}
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
                                type="primary"
                                icon={<CheckOutlined />}
                                htmlType="submit"
                                style={{ marginRight: 8 }}
                                loading={loading}
                            >
                                Submit Visit
                            </Button>
                            <Button onClick={clearVisitData}>Cancel</Button>
                        </Form.Item>
                    </Form>
                )}

                <PriceCalculation
                    visitSubType={visitSubType}
                    totalCost={totalCost}
                    selectedTreatments={selectedTreatments}
                    selectedClinic={selectedClinic}
                    selectedDoctor={selectedDoctor}
                    hospitalCharge={hospitalCharge}
                    customCharges={customCharges}
                    visitType={visitType}
                />
            </Card>
        </div>
    );
};

export default PatientVisit;