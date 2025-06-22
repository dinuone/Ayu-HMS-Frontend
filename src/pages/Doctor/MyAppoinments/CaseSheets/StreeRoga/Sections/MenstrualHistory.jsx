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
                        <Radio value="Irregular-Regular">Irregular-Regular</Radio>
                        <Radio value="Irregular-Irregular">Irregular-Irregular</Radio>
                    </Radio.Group>
                )}

            </div>

            <div style={{ marginBottom: 16 }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 8 }}>
                    Characteristic of Menstruation
                </label>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                    <label style={{ width: 100 }}>Color</label>
                    <Input
                        readOnly={readonly}
                        value={data.charactersOfMenstruation_color}
                        onChange={(e) => onChange('charactersOfMenstruation_color', e.target.value)}
                        style={{ width: 400 }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                    <label style={{ width: 100 }}>Order</label>
                    <Input
                        readOnly={readonly}
                        value={data.charactersOfMenstruation_order}
                        onChange={(e) => onChange('charactersOfMenstruation_order', e.target.value)}
                        style={{ width: 400 }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ width: 100 }}>Other</label>
                    <Input
                        readOnly={readonly}
                        value={data.charactersOfMenstruation_other}
                        onChange={(e) => onChange('charactersOfMenstruation_other', e.target.value)}
                        style={{ width: 400 }}
                    />
                </div>
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

            <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                    <label style={{ width: 200 }}>Pain</label>
                    {readonly ? (
                        <Tag color="red-inverse">{data?.pain || 'Not selected'}</Tag>
                    ) : (
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
            </div>

            {!readonly && data.pain && (
                <>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                        <label style={{ width: 200, marginTop: 6 }}>{`${data.pain} Specify`}</label>
                        <Input.TextArea
                            rows={4}
                            value={data.pain_specify}
                            onChange={(e) => onChange('pain_specify', e.target.value)}
                            style={{ width: 500 }}
                        />
                    </div>
                </>
            )}


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

            {!readonly && data.volume && (
                <>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                        <label style={{ width: 200, marginTop: 6 }}>{`${data.volume} Specify`}</label>
                        <Input.TextArea
                            rows={4}
                            value={data.volume_specify}
                            onChange={(e) => onChange('volume_specify', e.target.value)}
                            style={{ width: 500 }}
                        />
                    </div>
                </>
            )}


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