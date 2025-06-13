import React, { useState } from 'react';
import { Row, Col, Select, Input, Button, List, Divider, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

function Prescription({ drugs, items = [], onAdd, onRemove }) {
    const [currentDrug, setCurrentDrug] = useState(null);
    const [qty, setQty] = useState('');
    const [instruction, setInstruction] = useState('');
    const [duration, setDuration] = useState('');

    const handleAdd = () => {
        if (!currentDrug || !qty || !instruction) return;

        const newEntry = {
            id: currentDrug.id,
            name: currentDrug.name,
            qty,
            instruction,
            duration,
        };

        onAdd(newEntry);

        // Reset form fields
        setCurrentDrug(null);
        setQty('');
        setInstruction('');
        setDuration('');
    };

    return (
        <>
            <Divider />
            <Title level={5}>Prescription</Title>

            <Row gutter={16} style={{ marginBottom: '16px' }} align="middle">
                <Col>
                    <label style={{marginRight:'10px'}}>Drug Name</label>
                    <Select
                        showSearch
                        placeholder="Select drug"
                        style={{ width: 250 }}
                        onChange={(value) => {
                            const selected = drugs.find((d) => d.id === value);
                            setCurrentDrug(selected);
                        }}
                        value={currentDrug?.id}
                    >
                        {drugs.map((drug) => (
                            <Select.Option key={drug.id} value={drug.id}>
                                {drug.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>

                <Col>
                    <label style={{marginRight:'10px'}}>Qty</label>
                    <Input
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        style={{ width: 80 }}
                    />
                </Col>

                <Col>
                    <label style={{marginRight:'10px'}}>Instruction</label>
                    <Input
                        value={instruction}
                        onChange={(e) => setInstruction(e.target.value)}
                        style={{ width: 150 }}
                    />
                </Col>

                <Col>
                    <label style={{marginRight:'10px'}}>Duration</label>
                    <Input
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        style={{ width: 120 }}
                    />
                </Col>

                <Col>

                    <Button
                        icon={<PlusOutlined />}
                        variant="solid"
                        color="orange"
                        onClick={handleAdd}
                        style={{ display: 'block' }}
                    >
                        Add
                    </Button>
                </Col>
            </Row>

            <List
                bordered
                dataSource={items}
                renderItem={(item, index) => (
                    <List.Item
                        actions={[
                            <Button size="small" danger onClick={() => onRemove(index)}>
                                Remove
                            </Button>
                        ]}
                    >
                        {item.name} - Qty: {item.qty}, Instruction: {item.instruction}, Duration: {item.duration}
                    </List.Item>
                )}
            />
        </>
    );
}

export default Prescription;
