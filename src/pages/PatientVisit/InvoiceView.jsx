import React, { useRef } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import {
    Typography,
    Card,
    Descriptions,
    Divider,
    Tag,
    Button,
    Space,
    message,
    Row,
    Col
} from 'antd';
import html2pdf from 'html2pdf.js';
import { LeftOutlined, DownloadOutlined, CheckCircleFilled } from "@ant-design/icons";

const { Title, Text } = Typography;

function InvoiceView() {
    const { invoiceNo } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const invoice = location.state?.invoice;

    const invoiceRef = useRef();

    if (!invoice) {
        return (
            <Card>
                <Text type="danger">No invoice data passed. Please return to the previous page.</Text>
                <br />
                <Button type="primary" onClick={() => navigate(-1)}>Go Back</Button>
            </Card>
        );
    }

    const handleDownloadPDF = () => {
        const element = invoiceRef.current;
        const opt = {
            margin: 10,
            filename: `Invoice-${invoice.invoice_no}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                letterRendering: true,
                useCORS: true
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait',
                putOnlyUsedFonts: true
            },
            pagebreak: {
                mode: ['avoid-all', 'css', 'legacy']
            }
        };
        html2pdf().set(opt).from(element).save();
    };

    const handleMarkAsComplete = () => {
        message.success('Invoice marked as complete!');
    };

    const invoiceDate = new Date(invoice.created_at).toLocaleDateString();

    console.log(invoice)

    return (
        <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
            <Button
                onClick={() => navigate(-1)}
                icon={<LeftOutlined />}
                style={{ marginBottom: 16 }}
            >
                Back
            </Button>

            <div ref={invoiceRef} style={{
                backgroundColor: 'white',
                padding: '40px',
                border: '1px solid #f0f0f0',
                pageBreakInside: 'avoid'
            }}>
                {/* Invoice Header */}
                <div style={{ pageBreakAfter: 'avoid' }}>
                    <Row justify="space-between" align="bottom" style={{ marginBottom: 40 }}>
                        <Col>
                            <Title level={2} style={{ margin: 0, color: '#1890ff' }}>MEDICAL INVOICE</Title>
                            <Text type="secondary">Harendra Ayurveda - HMS</Text>
                        </Col>
                        <Col style={{ textAlign: 'right' }}>
                            <Title level={3} style={{ margin: 0 }}>#{invoice.invoice_no}</Title>
                            <Text type="secondary">Date: {invoice.created_at}</Text>
                        </Col>
                    </Row>

                    {/* From/To Sections */}
                    <Row gutter={32} style={{ marginBottom: 40, pageBreakAfter: 'avoid' }}>
                        <Col span={12}>
                            <div style={{ backgroundColor: '#fafafa', padding: 16, borderRadius: 8 }}>
                                <Text strong>From:</Text>
                                <Title level={5} style={{ margin: '8px 0' }}>Harendra Ayurveda Hospital Pvt(Ltd)</Title>
                                <Text>123 Hospital Street</Text><br />
                                <Text>Medical City, 10000</Text><br />
                                <Text>Phone: (123) 456-7890</Text><br />
                                <Text>Email: billing@hospital.com</Text>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div style={{ backgroundColor: '#fafafa', padding: 16, borderRadius: 8 }}>
                                <Text strong>To:</Text>
                                <Title level={5} style={{ margin: '8px 0' }}>{invoice.patient_data.name}</Title>
                                <Text>Registration: {invoice.patient_data.registration_number}</Text><br />
                                <Text>Age/Gender: {invoice.patient_data.age} / {invoice.patient_data.gender}</Text><br />
                                <Text>NIC: {invoice.patient_data.nic_number}</Text><br />
                                <Text>Contact: {invoice.patient_data.contact_no}</Text>
                            </div>
                        </Col>
                    </Row>
                </div>

                {/* Services Rendered */}
                <div style={{ marginBottom: 40, pageBreakAfter: 'avoid' }}>
                    <Title level={4} style={{ marginBottom: 16 }}>Invoice Details</Title>
                    <table style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        pageBreakInside: 'avoid'
                    }}>
                        <thead>
                        <tr style={{ backgroundColor: '#f0f0f0' }}>
                            <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Description</th>
                            <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>Amount (LKR)</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>Doctor Consultation ({invoice.doctor_name})</td>
                            <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>{invoice.doctor_fee.toLocaleString()}</td>
                        </tr>
                        <tr style={{ backgroundColor: '#fafafa' }}>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>Hospital Charges</td>
                            <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>{invoice.sub_total.hospitalCharge.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>Treatment Charges :
                                {invoice.treatments && invoice.treatments.map((treatment) => (
                                        <Text style={{fontWeight:"bold"}}> {treatment.name},</Text>
                                    ))
                                }
                            </td>
                            <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>{invoice.sub_total.treatmentCharge.toLocaleString()}</td>
                        </tr>
                        <tr style={{ backgroundColor: '#fafafa' }}>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>Prescription Cost</td>
                            <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>{invoice.sub_total.prescriptionCost.toLocaleString()}</td>
                        </tr>
                        {invoice.invoice_description?.rates?.custom_charge &&
                            Object.entries(JSON.parse(invoice.invoice_description.rates.custom_charge)).map(([key, value]) => (
                                <tr key={key}>
                                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{key}</td>
                                    <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>{value.toLocaleString()}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>

                {/* Summary */}
                <div style={{ pageBreakAfter: 'avoid' }}>
                    <Row justify="end" style={{ marginBottom: 40 }}>
                        <Col span={8}>
                            <table style={{ width: '100%' }}>
                                <tbody>
                                <tr>
                                    <td style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}><Text strong>Subtotal:</Text></td>
                                    <td style={{ padding: '8px 0', textAlign: 'right', borderBottom: '1px solid #f0f0f0' }}>
                                        {(invoice.total_amount - (invoice.tax_amount || 0)).toLocaleString()} LKR
                                    </td>
                                </tr>
                                {invoice.tax_amount && (
                                    <tr>
                                        <td style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}><Text strong>Tax:</Text></td>
                                        <td style={{ padding: '8px 0', textAlign: 'right', borderBottom: '1px solid #f0f0f0' }}>
                                            {invoice.tax_amount.toLocaleString()} LKR
                                        </td>
                                    </tr>
                                )}
                                <tr>
                                    <td style={{ padding: '8px 0' }}><Text strong>Total:</Text></td>
                                    <td style={{ padding: '8px 0', textAlign: 'right' }}>
                                        <Title level={4} style={{ margin: 0 }}>{invoice.total_amount.toLocaleString()} LKR</Title>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                </div>

                {/*/!* Payment Info *!/*/}
                {/*<div style={{*/}
                {/*    marginBottom: 40,*/}
                {/*    pageBreakBefore: 'always', // Force new page for payment info*/}
                {/*    pageBreakAfter: 'avoid'*/}
                {/*}}>*/}
                {/*    <Title level={4} style={{ marginBottom: 16 }}>Payment Information</Title>*/}
                {/*    <div style={{*/}
                {/*        backgroundColor: '#fafafa',*/}
                {/*        padding: 16,*/}
                {/*        borderRadius: 8,*/}
                {/*        pageBreakInside: 'avoid'*/}
                {/*    }}>*/}
                {/*        <Text strong>Payment Status:</Text> <Tag color="green">Paid</Tag><br />*/}
                {/*        <Text strong>Payment Method:</Text> <Tag color="blue">Cash</Tag><br />*/}
                {/*        <Text strong>Due Date:</Text> {new Date(invoice.due_date || new Date().setDate(new Date().getDate() + 30)).toLocaleDateString()}*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/* Footer */}
                <Divider />
                <Row justify="space-between" style={{ pageBreakBefore: 'avoid' }}>
                    <Col>
                        <Text type="secondary">Thank you for choosing our services</Text>
                    </Col>
                    <Col>
                        <Text type="secondary">Harendra Ayurveda - HMS</Text>
                    </Col>
                </Row>
            </div>

            {/* Action Buttons */}
            <div style={{ marginTop: 24, textAlign: 'center' }}>
                <Space>
                    <Button
                        type="primary"
                        onClick={handleDownloadPDF}
                        icon={<DownloadOutlined />}
                        size="large"
                    >
                        Download PDF
                    </Button>
                    <Button
                        type="default"
                        onClick={handleMarkAsComplete}
                        icon={<CheckCircleFilled />}
                        size="large"
                    >
                        Mark as Complete
                    </Button>
                </Space>
            </div>
        </div>
    );
}

export default InvoiceView;