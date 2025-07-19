import React from 'react';
import {Col, Divider, Row, Typography} from 'antd';

const { Text } = Typography;

const PriceCalculation = ({
                              visitType,
                              visitSubType,
                              totalCost,
                              selectedTreatments,
                              selectedClinic,
                              selectedDoctor,
                              hospitalCharge,
                              customCharges,
                              treatmentPriceData
                          }) => {
    if (!(selectedTreatments.length > 0 || (selectedClinic && selectedDoctor))) {
        return null;
    }

    console.log("TOTAL COST :::::", totalCost);
    console.log("VISIT TYPE :::::",visitType)
    console.log("TREATMENT PRICE DATA::::::",treatmentPriceData);

    const treatments = treatmentPriceData?.treatments || [];
    const totalOriginalPrice = treatmentPriceData?.totalOriginalPrice || 0;
    const totalDiscountedPrice = treatmentPriceData?.totalDiscountedPrice || 0;
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
                        {visitType === 'promotion' ? 'Selected Treatments:' :
                            visitSubType === 'TREATMENT' ? 'Selected Treatments:' : 'Clinic Visit Details:'}
                    </strong>
                </Col>
                <Col>
                    <h2>
                        Total: LKR {visitType === 'promotion' ? totalDiscountedPrice.toFixed(2) : totalCost}
                    </h2>
                </Col>
            </Row>
            <Divider style={{ margin: '12px 0' }} />

            {/* Feelo Visit - Only show treatments */}
            {visitType === 'promotion' && (
                <>
                    {treatments.map((treatment, index) => (
                        <Row key={index} justify="space-between" style={{ marginBottom: 8 }}>
                            <Col span={12}>{treatment.name}</Col>
                            <Col style={{ textAlign: 'right' }}>
                                {treatment.discountPercentage > 0 ? (
                                    <>
                                        <Text delete style={{ marginRight: 8 }}>
                                            LKR {treatment.originalPrice.toFixed(2)}
                                        </Text>
                                        <Text strong style={{ color: 'green' }}>
                                            LKR {treatment.discountedPrice.toFixed(2)}
                                        </Text>
                                        <br />
                                        <Text type="secondary">
                                            ({treatment.discountPercentage}% off)
                                        </Text>
                                    </>
                                ) : (
                                    <Text>LKR {treatment.originalPrice.toFixed(2)}</Text>
                                )}
                            </Col>
                        </Row>
                    ))}

                    <Divider />
                    <Row justify="space-between" style={{ marginTop: 8 }}>
                        <Col><strong>Subtotal:</strong></Col>
                        <Col><strong>LKR {totalDiscountedPrice.toFixed(2)}</strong></Col>
                    </Row>
                </>
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