import React from 'react';
import {Modal, Button, message, Result} from 'antd';

const RegistrationSuccessModal = ({ visible, onCancel, qrCodeData, onDownload }) => {
    const handleDownload = () => {
        // Download the QR code
        const link = document.createElement('a');
        link.href = `data:image/png;base64,${qrCodeData}`;
        link.download = 'patient_qrcode.png';
        link.click();
    };

    return (
        <Modal
            open={visible}
            title="Registration Complete"
            onCancel={onCancel}
            footer={[
                <Button key="download" onClick={handleDownload}>
                    Download QR Code
                </Button>,
                <Button key="close" onClick={onCancel}>
                    Close
                </Button>,
            ]}
            width={600}
        >
            <div style={{ textAlign: 'center' }}>
                <Result
                    status="success"
                    title="Your registration is complete!"
                    subTitle="Click the button below to download your QR code."
                />

                <div>
                    <img
                        src={qrCodeData}
                        alt="QR Code"
                        style={{ width: 200, height: 200 }}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default RegistrationSuccessModal;
