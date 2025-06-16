import React from 'react';
import {Card, InputNumber, Select, Row, Col, Input, Checkbox, Radio} from 'antd';

const { Option } = Select;

const CirculatorySystem = ({ data, onChange }) => {


    const volume = ["Sthula","Poorna","Sookshama","Soothravath"]

    console.log("circular data ::::::",data)

    return (

        <>
            <Card title="Blood Circulatory System" style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Pulse Rate</label>
                    <Input
                        value={data.pulseRate}
                        onChange={(e) => onChange('pulseRate', e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Rythem</label>
                    <Radio.Group
                        value={data.rythem}
                        onChange={(e) => onChange('rythem', e.target.value)}
                    >
                        <Radio value="Regular">Regular</Radio>
                        <Radio value="Irregular">Irregular</Radio>

                    </Radio.Group>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Volume</label>

                    <Checkbox.Group
                        options={volume}
                        value={data.volume}
                        onChange={(checkedValues) => onChange('volume', checkedValues)}

                    />

                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Character</label>
                    <Radio.Group
                        value={data.character}
                        onChange={(e) => onChange('character', e.target.value)}
                    >
                        <Radio value="Sthula">Sthula</Radio>
                        <Radio value="Poorna">Poorna</Radio>

                    </Radio.Group>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Dosha Predominance</label>
                    <Radio.Group
                        value={data.dosha}
                        onChange={(e) => onChange('dosha', e.target.value)}
                    >
                        <Radio value="Sthula">Sthula</Radio>
                        <Radio value="Poorna">Poorna</Radio>

                    </Radio.Group>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Blood Pressure</label>
                    <Input
                        value={data.bloodPressure}
                        onChange={(e) => onChange('bloodPressure', e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Liver</label>
                    <Input
                        value={data.liver}
                        onChange={(e) => onChange('liver', e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Spleen</label>
                    <Input
                        value={data.spleen}
                        onChange={(e) => onChange('spleen', e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Blood</label>
                    <Input
                        value={data.blood}
                        onChange={(e) => onChange('blood', e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Artery</label>
                    <Input
                        value={data.artery}
                        onChange={(e) => onChange('artery', e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Velus</label>
                    <Input
                        value={data.velus}
                        onChange={(e) => onChange('velus', e.target.value)}
                    />
                </div>
            </Card>

            <Card title="Lymphotic System" style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Pulse Rate</label>
                    <Input
                        value={data.lymphotic_pulseRate}
                        onChange={(e) => onChange('lymphotic_pulseRate', e.target.value)}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Blood Pressure</label>
                    <Input
                        value={data.lymphotic_bloodPressure}
                        onChange={(e) => onChange('lymphotic_bloodPressure', e.target.value)}
                    />
                </div>

            </Card>
        </>

    );
};

export default CirculatorySystem;