import React, { memo } from 'react';
import {Input, Radio, Typography} from 'antd';

const { Title } = Typography;


const MenstrualHistory = memo(({data, onChange}) => {

    return (
        <>
            <Title level={5}>Menstrual History (Arthava Ithihasa)</Title>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 200 }}>Pushpa Darshana (Menarche)</label>
                <Input
                    value={data.pushpaDarshana}
                    onChange={(e) => onChange('pushpaDarshana', e.target.value)}
                    style={{ width: 500 }}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 200 }}>Regular /Irregular</label>
                <Radio.Group
                    onChange={(e) => onChange('regularIrregular', e.target.value)}
                    value={data.regularIrregular}
                >
                    <Radio value="Regular">Regular</Radio>
                    <Radio value="Irregular">Irregular</Radio>
                </Radio.Group>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 200 }}>Characters of Menstruation</label>
                <Input
                    value={data.charactersOfMenstruation}
                    onChange={(e) => onChange('charactersOfMenstruation', e.target.value)}
                    style={{ width: 500 }}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 200 }}>Duration of Flow</label>
                <Input
                    value={data.durationOfFlow}
                    onChange={(e) => onChange('durationOfFlow', e.target.value)}
                    style={{ width: 500 }}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 200 }}>Interval</label>
                <Input
                    value={data.interval}
                    onChange={(e) => onChange('interval', e.target.value)}
                    style={{ width: 500 }}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 200 }}>Pain</label>
                <Radio.Group
                    onChange={(e) => onChange('pain', e.target.value)}
                    value={data.pain}
                >
                    <Radio value="Before">Before</Radio>
                    <Radio value="After">After</Radio>
                    <Radio value="During">During</Radio>
                </Radio.Group>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 200 }}>Volume</label>
                <Radio.Group
                    onChange={(e) => onChange('volume', e.target.value)}
                    value={data.volume}
                >
                    <Radio value="Less">Less</Radio>
                    <Radio value="Excessive">Excessive</Radio>
                    <Radio value="Normal">Normal</Radio>
                </Radio.Group>
            </div>


            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 200 }}>LMP</label>
                <Input
                    value={data.lmp}
                    onChange={(e) => onChange('lmp', e.target.value)}
                    style={{ width: 500 }}
                />
            </div>

        </>
    );
});

export default MenstrualHistory;