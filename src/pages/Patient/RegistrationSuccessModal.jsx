import React, { useState } from 'react';
import { Modal, Button, Result, Divider, Radio } from 'antd';
import { ArrowRightOutlined, DownloadOutlined } from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const RegistrationSuccessModal = ({ visible, onCancel, qrCodeData, patientRegNo  }) => {
    console.log("visible",visible);
    const navigate = useNavigate();

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = qrCodeData;
        link.download = 'patient_qrcode.png';
        link.click();
    };

    const nagivateToPatientVisit = () => {
        navigate(`/patient-visit/${patientRegNo}`)
    }

    return (
        <Modal
            open={visible}
            title="Registration Process"
            onCancel={onCancel}
            footer={[

                <Button
                    key="next"
                    variant="solid"
                    color="default"
                    icon={<ArrowRightOutlined />}
                    onClick={nagivateToPatientVisit}
                >
                    Continue
                </Button>
            ]}
            width={600}
        >
            <Result
                status="success"
                title="Your registration is complete!"
                subTitle="Click the button below to download your QR code."
            />
            <div style={{ textAlign: 'center' }}>
                <img src={qrCodeData} alt="QR Code" style={{ width: 200, height: 200 }} />
                <Divider />
                <Button icon={<DownloadOutlined />} variant="solid" color="orange" onClick={handleDownload}>
                    Download QR Code
                </Button>
            </div>

        </Modal>
    );
};


export default RegistrationSuccessModal;