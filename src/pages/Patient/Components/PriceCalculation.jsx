import React from 'react';
import { Col, Divider, Row } from 'antd';

const PriceCalculation = ({
                              visitType,
                              visitSubType,
                              totalCost,
                              selectedTreatments,
                              selectedClinic,
                              selectedDoctor,
                              hospitalCharge,
                              customCharges
                          }) => {
    if (!(selectedTreatments.length > 0 || (selectedClinic && selectedDoctor))) {
        return null;
    }

    return (
        <div style={{
            marginTop: 16,
            padding: '12px 16px',
            backgroundColor: '#fafafa',
            borderRadius: 4,
            border: '1px solid #d9d9d9'
        }}>
            <Row justify="space-between">
                <Col>
                    <strong>
                        {visitType === 'feelo' ? 'Selected Treatments:' :
                            visitSubType === 'TREATMENT' ? 'Selected Treatments:' : 'Clinic Visit Details:'}
                    </strong>
                </Col>
                <Col>
                    <h2>Total: LKR {totalCost}</h2>
                </Col>
            </Row>
            <Divider style={{ margin: '12px 0' }} />

            {/* Feelo Visit - Only show treatments */}
            {visitType === 'feelo' && (
                selectedTreatments.map(treatment => (
                    <Row key={treatment.id} justify="space-between" style={{ marginBottom: 8 }}>
                        <Col>{treatment.name}</Col>
                        <Col>LKR {treatment.price.toFixed(2)}</Col>
                    </Row>
                ))
            )}

            {/* Normal Visit - Treatment type */}
            {visitType === 'normal' && visitSubType === 'TREATMENT' && (
                <>
                    {selectedDoctor && (
                        <>
                            <Row justify="space-between" style={{ marginBottom: 8 }}>
                                <Col><strong>Doctor:</strong> {selectedDoctor.doctor_name}</Col>
                            </Row>

                            <Row justify="space-between" style={{ marginBottom: 8 }}>
                                <Col>Doctor Fee</Col>
                                <Col>LKR {selectedDoctor.doctor_fee.toFixed(2)}</Col>
                            </Row>
                        </>

                    )}


                    {selectedTreatments.map(treatment => (
                        <Row key={treatment.id} justify="space-between" style={{ marginBottom: 8 }}>
                            <Col>{treatment.name}</Col>
                            <Col>LKR {treatment.price.toFixed(2)}</Col>
                        </Row>
                    ))}

                    <Row justify="space-between" style={{ marginBottom: 8 }}>
                        <Col>Hospital Charge</Col>
                        <Col>LKR {hospitalCharge.toFixed(2)}</Col>
                    </Row>
                    {Object.entries(customCharges).map(([key, value]) => (
                        <Row justify="space-between" key={key} style={{ marginBottom: 8 }}>
                            <Col>{key.charAt(0).toUpperCase() + key.slice(1)}</Col>
                            <Col>LKR {parseFloat(value).toFixed(2)}</Col>
                        </Row>
                    ))}
                </>
            )}

            {/* Normal Visit - Clinic type */}
            {visitType === 'normal' && visitSubType === 'CLINIC /OPD' && (
                <>
                    {selectedClinic && (
                        <Row justify="space-between" style={{ marginBottom: 8 }}>
                            <Col><strong>Clinic:</strong> {selectedClinic.name}</Col>
                        </Row>
                    )}
                    {selectedDoctor && (
                        <>
                            <Row justify="space-between" style={{ marginBottom: 8 }}>
                                <Col><strong>Doctor:</strong> {selectedDoctor.doctor_name}</Col>
                            </Row>
                            <Row justify="space-between" style={{ marginBottom: 8 }}>
                                <Col>Doctor Fee</Col>
                                <Col>LKR {selectedDoctor.doctor_fee.toFixed(2)}</Col>
                            </Row>
                            <Row justify="space-between" style={{ marginBottom: 8 }}>
                                <Col>Hospital Charge</Col>
                                <Col>LKR {hospitalCharge.toFixed(2)}</Col>
                            </Row>
                            {Object.entries(customCharges).map(([key, value]) => (
                                <Row justify="space-between" key={key} style={{ marginBottom: 8 }}>
                                    <Col>{key.charAt(0).toUpperCase() + key.slice(1)}</Col>
                                    <Col>LKR {parseFloat(value).toFixed(2)}</Col>
                                </Row>
                            ))}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default PriceCalculation;