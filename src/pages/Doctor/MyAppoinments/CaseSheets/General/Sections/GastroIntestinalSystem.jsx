import React from 'react';
import {Card, InputNumber, Select, Row, Col, Input, Checkbox} from 'antd';

const { Option } = Select;

const GastroIntestinalSystem = ({ data, onChange }) => {



    const foodIntakeValues = ["Pravara", "Madya", "Avara"]
    const foodDigestionValues = ["Pravara", "Madya", "Avara"]

    return (
        <Card title="Gastro Intestinal System" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Mouth</label>
                <Input
                    value={data.mouth}
                    onChange={(e) => onChange('Mouth', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Tongue</label>
                <Input
                    value={data.tongue}
                    onChange={(e) => onChange('tongue', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Abdomen</label>
                <Input
                    value={data.abdomen}
                    onChange={(e) => onChange('abdomen', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Ambilties</label>
                <Input
                    value={data.ambilties}
                    onChange={(e) => onChange('ambilties', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Food Intake</label>
                <Checkbox.Group
                    options={foodIntakeValues}
                    value={data.foodIntake}
                    onChange={(checkedValues) => onChange('foodIntake', checkedValues)}

                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Food Digestion</label>
                <Checkbox.Group
                    options={foodDigestionValues}
                    value={data.foodDigestion}
                    onChange={(checkedValues) => onChange('foodDigestion', checkedValues)}

                />
            </div>

        </Card>
    );
};

export default GastroIntestinalSystem;