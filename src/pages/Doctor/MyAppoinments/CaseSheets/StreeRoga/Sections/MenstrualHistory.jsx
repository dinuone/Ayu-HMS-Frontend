import React, { memo } from 'react';
import {Input, Radio, Tag, Typography} from 'antd';

const { Title } = Typography;


const MenstrualHistory = memo(({data, onChange,readonly = false}) => {

    return (
        <>
            <Title level={5}>Menstrual History (Arthava Ithihasa)</Title>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 200 }}>Pushpa Darshana (Menarche)</label>
                <Input
                    readOnly={readonly}
                    value={data.pushpaDarshana}
                    onChange={(e) => onChange('pushpaDarshana', e.target.value)}
                    style={{ width: 500 }}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 200 }}>Regular /Irregular</label>
                {readonly ? (
                    <Tag color="red-inverse">
                        {data?.regularIrregular || 'Not selected'}
                    </Tag>
                ) :(
                    <Radio.Group
                        onChange={(e) => onChange('regularIrregular', e.target.value)}
                        value={data.regularIrregular}
                    >
                        <Radio value="Regular">Regular</Radio>
                        <Radio value="Irregular">Irregular</Radio>
                    </Radio.Group>
                )}

            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 200 }}>Characters of Menstruation</label>
                <Input
                    readOnly={readonly}
                    value={data.charactersOfMenstruation}
                    onChange={(e) => onChange('charactersOfMenstruation', e.target.value)}
                    style={{ width: 500 }}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 200 }}>Duration of Flow</label>
                <Input
                    readOnly={readonly}
                    value={data.durationOfFlow}
                    onChange={(e) => onChange('durationOfFlow', e.target.value)}
                    style={{ width: 500 }}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 200 }}>Interval</label>
                <Input
                    readOnly={readonly}
                    value={data.interval}
                    onChange={(e) => onChange('interval', e.target.value)}
                    style={{ width: 500 }}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 200 }}>Pain</label>
                {readonly ? (
                    <Tag color="red-inverse">
                        {data?.pain || 'Not selected'}
                    </Tag>
                ) :(
                    <Radio.Group
                        onChange={(e) => onChange('pain', e.target.value)}
                        value={data.pain}
                    >
                        <Radio value="Before">Before</Radio>
                        <Radio value="After">After</Radio>
                        <Radio value="During">During</Radio>
                    </Radio.Group>
                )}

            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 200 }}>Volume</label>
                {readonly ? (
                        <Tag color="red-inverse">
                            {data?.volume || 'Not selected'}
                        </Tag>
                    ) :(
                        <Radio.Group
                            onChange={(e) => onChange('volume', e.target.value)}
                            value={data.volume}
                        >
                            <Radio value="Less">Less</Radio>
                            <Radio value="Excessive">Excessive</Radio>
                            <Radio value="Normal">Normal</Radio>
                        </Radio.Group>
                    )}

            </div>


            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 200 }}>LMP</label>
                <Input
                    readOnly={readonly}
                    value={data.lmp}
                    onChange={(e) => onChange('lmp', e.target.value)}
                    style={{ width: 500 }}
                />
            </div>

        </>
    );
});

export default MenstrualHistory;