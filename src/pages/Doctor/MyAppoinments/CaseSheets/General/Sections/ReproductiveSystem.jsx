import React from 'react';
import {Card, InputNumber, Select, Row, Col, Input, Checkbox} from 'antd';

const { Option } = Select;

const ReproductiveSystem = ({ data, onChange }) => {



    return (
        <Card title="Reproductive System" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Penis</label>
                <Input
                    value={data.penis}
                    onChange={(e) => onChange('penis', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Testis </label>
                <Input
                    value={data.testis}
                    onChange={(e) => onChange('testis', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Seminal Fluid</label>
                <Input
                    value={data.seminalfluid}
                    onChange={(e) => onChange('seminalfluid', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Breast</label>
                <Input
                    value={data.breast}
                    onChange={(e) => onChange('breast', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Breast Milk</label>
                <Input
                    value={data.breastMilk}
                    onChange={(e) => onChange('breastMilk', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Uterus</label>
                <Input
                    value={data.uterus}
                    onChange={(e) => onChange('uterus', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Fallopian Tubes</label>
                <Input
                    value={data.fallopianTubes}
                    onChange={(e) => onChange('fallopianTubes', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Ovary</label>
                <Input
                    value={data.ovary}
                    onChange={(e) => onChange('ovary', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Vagina</label>
                <Input
                    value={data.vagina}
                    onChange={(e) => onChange('vagina', e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 150 }}>Menstruation</label>
                <Input
                    value={data.menstruation}
                    onChange={(e) => onChange('menstruation', e.target.value)}
                />
            </div>
        </Card>
    );
};

export default ReproductiveSystem;