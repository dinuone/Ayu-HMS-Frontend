import React from 'react';
import {Card, InputNumber, Select, Row, Col, Input, Checkbox, Tag, Radio} from 'antd';

const { Option } = Select;

const GastroIntestinalSystem = ({ data, onChange,readonly = false }) => {



    const foodIntakeValues = ["Pravara", "Madya", "Avara"]
    const foodDigestionValues = ["Pravara", "Madya", "Avara"]

    return (
        <Card title="Gastro Intestinal System" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Mouth</label>
                <Input
                    readOnly={readonly}
                    value={data.mouth}
                    onChange={(e) => onChange('Mouth', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Tongue</label>
                <Input
                    readOnly={readonly}
                    value={data.tongue}
                    onChange={(e) => onChange('tongue', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Abdomen</label>
                <Input
                    readOnly={readonly}
                    value={data.abdomen}
                    onChange={(e) => onChange('abdomen', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Umbillcus</label>
                <Input
                    readOnly={readonly}
                    value={data.umbillcus}
                    onChange={(e) => onChange('umbillcus', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Food Intake</label>
                {readonly ? (
                    <>
                        {data.foodIntake.length === 0 ? (
                            <Tag color="red-inverse">None</Tag>
                        ) : (
                            data.foodIntake.map((val) => (
                                <Tag key={val}  color="red-inverse" style={{ marginBottom: 6 }}>
                                    {val}
                                </Tag>
                            ))
                        )}

                    </>
                ) : (
                    <Checkbox.Group
                        options={foodIntakeValues}
                        value={data.foodIntake}
                        onChange={(checkedValues) => onChange('foodIntake', checkedValues)}

                    />
                )}

            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Food Digestion</label>
                {readonly ? (
                    <>
                        {data.foodDigestion.length === 0 ? (
                            <Tag color="red-inverse">None</Tag>
                        ) : (
                            data.foodDigestion.map((val) => (
                                <Tag key={val}  color="red-inverse" style={{ marginBottom: 6 }}>
                                    {val}
                                </Tag>
                            ))
                        )}

                    </>
                ) : (
                    <Checkbox.Group
                        options={foodDigestionValues}
                        value={data.foodDigestion}
                        onChange={(checkedValues) => onChange('foodDigestion', checkedValues)}

                    />
                )}

            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <label style={{ width: 150 }}>Agni type</label>
            
                                {readonly ? (
                                    <Tag color="red-inverse">
                                        {data?.agni || 'Not selected'}
                                    </Tag>
                                ) :(

                                    <Radio.Group
                                        value={data.agni}
                                        onChange={(e) => onChange('agni', e.target.value)}
                                    >
                                        <Radio value="Sama Agni">Sama Agni</Radio>
                                        <Radio value="Vishama Agni">Vishama Agni</Radio>
                                        <Radio value="Tikshna Agni">Tikshna Agni</Radio>
                                        <Radio value="Mandagni">Mandagni</Radio>
                                        <Radio value="Bhasmaka Agni">Bhasmaka Agni</Radio>
                                    </Radio.Group>

                                )}
                </div>

        </Card>
    );
};

export default GastroIntestinalSystem;