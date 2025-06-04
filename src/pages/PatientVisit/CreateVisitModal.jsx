import {useEffect, useRef, useState} from 'react';
import {Modal, Input, Button, Space, Typography, Divider, Card, Radio, message} from 'antd';
import { QrcodeOutlined, IdcardOutlined } from '@ant-design/icons';
import { Scanner } from '@yudiel/react-qr-scanner';
import api from "../../Services/NetworkManager.js";
import {useNavigate} from "react-router-dom";

const { Text } = Typography;

const CreateVisitModal = ({ visible, onCancel, onSuccess }) => {
    const [inputMethod, setInputMethod] = useState('nic');
    const [nic, setNic] = useState('');
    const [scanning, setScanning] = useState(false);
    const [error, setError] = useState('');
    const scannerContainerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (visible) {
            setNic('');
            setError('');
            setScanning(false);
        }
    }, [visible]);

    const handleScan = (data) => {
        if (data) {
            setScanning(false);
            onSuccess(data);
        }
    };

    const handleCancel = () => {
        setScanning(false);
        setNic('')
        setTimeout(() => {
            onCancel();
        },100)
    };


    const handleError = (err) => {
        console.error(err);
        setError('Failed to scan QR code');
    };

    const handleSubmit = async () => {
        if (inputMethod === 'nic' && !nic.trim()) {
            setError('Please enter NIC number');
            return;
        }

        if (inputMethod === 'nic') {
            try{
                const response = await api.get(`patient-visit/check-account/${nic.trim()}`);
                console.log(response)
                if(response.data.data.account_exisit){
                    const regNo = response.data.data.patient_reg_no;
                    navigate(`/patient-visit/${regNo}`)
                }else{
                    message.error("cannot found patient account, please register a new patient");
                }
            }catch (err){
                message.error(error.response?.data?.data?.message || 'Operation failed');
            }
            onSuccess(nic);
        } else {
            setScanning(true);
        }
    };

    return (
        <Modal
            title="Create New Patient Visit"
            open={visible}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={handleSubmit}
                    disabled={inputMethod === 'nic' && !nic.trim()}
                >
                    {inputMethod === 'qr' ? (scanning ? 'Scanning...' : 'Start Scan') : 'Continue'}
                </Button>,
            ]}
            width={600}
        >
            <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                <Card
                    hoverable
                    onClick={() => {
                        setInputMethod('nic');
                        setError('');
                    }}
                    style={{
                        width: '50%',
                        border: inputMethod === 'nic' ? '2px solid #1890ff' : '1px solid #d9d9d9',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        padding: 16,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}

                >
                    <div style={{
                        backgroundColor: inputMethod === 'nic' ? '#e6f7ff' : '#fafafa',
                        borderRadius: '50%',
                        width: 64,
                        height: 64,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 12,
                        transition: 'all 0.3s',
                    }}>
                        <IdcardOutlined style={{ fontSize: 32, color: inputMethod === 'nic' ? '#1890ff' : '#666' }} />
                    </div>
                    <Text strong style={{ fontSize: 16, marginBottom: 4 }}>NIC Number</Text>
                    <Text type="secondary">Manually enter patient's NIC</Text>
                </Card>

                <Card
                    hoverable
                    onClick={() => {
                        setInputMethod('qr');
                        setError('');
                    }}
                    style={{
                        width: '50%',
                        border: inputMethod === 'qr' ? '2px solid #1890ff' : '1px solid #d9d9d9',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                    }}
                    bodyStyle={{
                        padding: 16,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <div style={{
                        backgroundColor: inputMethod === 'qr' ? '#e6f7ff' : '#fafafa',
                        borderRadius: '50%',
                        width: 64,
                        height: 64,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 12,
                        transition: 'all 0.3s',
                    }}>
                        <QrcodeOutlined style={{ fontSize: 32, color: inputMethod === 'qr' ? '#1890ff' : '#666' }} />
                    </div>
                    <Text strong style={{ fontSize: 16, marginBottom: 4 }}>Scan QR Code</Text>
                    <Text type="secondary">Scan patient's QR code</Text>
                </Card>
            </div>

            {inputMethod === 'nic' && (
                <div style={{ marginTop: 16 }}>
                    <Input
                        placeholder="Enter patient NIC number"
                        value={nic}
                        onChange={(e) => setNic(e.target.value)}
                        size="large"
                        prefix={<IdcardOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                </div>
            )}

            {inputMethod === 'qr' && scanning && (
                <div style={{ marginTop: 16, borderRadius: 8, overflow: 'hidden' }} ref={scannerContainerRef}>
                    <Scanner
                        onError={handleError}
                        constraints={{
                            facingMode: 'environment',
                        }}

                        sound={true}
                        styles={{
                            container: {
                                width: '100%',
                                height: 300,
                            },
                            video: {
                                objectFit: 'cover',
                            },
                        }}
                     onScan={handleScan}
                    />
                    <div style={{ textAlign: 'center', marginTop: 8 }}>
                        <Text type="secondary">Point camera at patient's QR code</Text>
                    </div>
                </div>
            )}

            {error && (
                <div style={{ marginTop: 16 }}>
                    <Text type="danger">{error}</Text>
                </div>
            )}

            <Divider />
            <Text type="secondary" style={{ display: 'block', textAlign: 'center' }}>
                {inputMethod === 'nic'
                    ? 'Enter the patient identification number to continue'
                    : 'Scan the patient QR code to automatically fill details'}
            </Text>
        </Modal>
    );
};

export default CreateVisitModal;