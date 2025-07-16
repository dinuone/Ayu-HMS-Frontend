import React from 'react';
import {Card, InputNumber, Select, Row, Col, Input, Checkbox, Radio, Tag} from 'antd';

const { Option } = Select;

const CirculatorySystem = ({ data, onChange,readonly = false }) => {


    const volume = ["Sthula","Poorna","Sookshama","Soothravath"]

    console.log("circular data ::::::",data)

    return (

        <>
            <Card title="Blood Circulatory System" style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Pulse Rate</label>
                    <Input
                        readOnly={readonly}
                        value={data.pulseRate}
                        onChange={(e) => onChange('pulseRate', e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Rythem</label>
                    {readonly ? (
                        <Tag color="red-inverse">
                            {data?.rythem || 'Not selected'}
                        </Tag>
                    ) :(
                        <Radio.Group
                            value={data.rythem}
                            onChange={(e) => onChange('rythem', e.target.value)}
                        >
                            <Radio value="Regular-Regular">Regular-Regular</Radio>
                            <Radio value="Irregular-Irregular">Irregular-Irregular</Radio>
                            <Radio value="Irregular-Regular">Irregular-Regular</Radio>

                        </Radio.Group>
                    )}

                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Volume</label>
                    {readonly ? (
                        <>
                            {data.volume.length === 0 ? (
                                <Tag color="red-inverse">None</Tag>
                            ) : (
                                data.volume.map((val) => (
                                    <Tag key={val}  color="red-inverse" style={{ marginBottom: 6 }}>
                                        {val}
                                    </Tag>
                                ))
                            )}

                        </>
                    ) : (
                        <Checkbox.Group
                            options={volume}
                            value={data.volume}
                            onChange={(checkedValues) => onChange('volume', checkedValues)}

                        />
                    )}


                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Character</label>
                    {readonly ? (
                        <Tag color="red-inverse">
                            {data?.character || 'Not selected'}
                        </Tag>
                    ) :(
                        <Radio.Group
                            value={data.character}
                            onChange={(e) => onChange('character', e.target.value)}
                        >
                            <Radio value="Mrudu">Mrudu</Radio>
                            <Radio value="Katina">Katina</Radio>

                        </Radio.Group>
                    )}

                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Dosha Predominance</label>
                    {readonly ? (
                        <>
                            {data.dosha.length === 0 ? (
                                <Tag color="red-inverse">None</Tag>
                            ) : (
                                data.dosha.map((val) => (
                                    <Tag key={val}  color="red-inverse" style={{ marginBottom: 6 }}>
                                        {val}
                                    </Tag>
                                ))
                            )}

                        </>
                    ) : (
                        <Checkbox.Group
                            options={["Vata","Pitta","Kapha"]}
                            value={data.dosha}
                            onChange={(checkedValues) => onChange('dosha', checkedValues)}

                        />
                    )}


                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Blood Pressure</label>
                    <Input
                        readOnly={readonly}
                        value={data.bloodPressure}
                        onChange={(e) => onChange('bloodPressure', e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Liver</label>
                    <Input
                        readOnly={readonly}
                        value={data.liver}
                        onChange={(e) => onChange('liver', e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Spleen</label>
                    <Input
                        readOnly={readonly}
                        value={data.spleen}
                        onChange={(e) => onChange('spleen', e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Blood</label>
                    <Input
                        readOnly={readonly}
                        value={data.blood}
                        onChange={(e) => onChange('blood', e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Artery</label>
                    <Input
                        readOnly={readonly}
                        value={data.artery}
                        onChange={(e) => onChange('artery', e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Velus</label>
                    <Input
                        readOnly={readonly}
                        value={data.velus}
                        onChange={(e) => onChange('velus', e.target.value)}
                    />
                </div>
            </Card>

            <Card title="Lymphotic System" style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Pulse Rate</label>
                    <Input
                        readOnly={readonly}
                        value={data.lymphotic_pulseRate}
                        onChange={(e) => onChange('lymphotic_pulseRate', e.target.value)}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Blood Pressure</label>
                    <Input
                        readOnly={readonly}
                        value={data.lymphotic_bloodPressure}
                        onChange={(e) => onChange('lymphotic_bloodPressure', e.target.value)}
                    />
                </div>

            </Card>
        </>

    );
};

export default CirculatorySystem;