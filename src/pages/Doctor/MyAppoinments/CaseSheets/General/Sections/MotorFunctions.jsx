import React from 'react';
import { Card, Select, Input } from 'antd';
import ReflexesStickman from "./ReflexesStickman.jsx";

const { Option } = Select;

const tableCellStyle = {
    padding: '8px 12px',
    textAlign: 'center',
    border: '1px solid #d9d9d9',
};

const tableHeaderStyle = {
    ...tableCellStyle,
    backgroundColor: '#fafafa',
    fontWeight: 'bold',
};

const MotorFunctions = ({ data = {}, onChange,readonly = false }) => {

    return (

        <>
            <Card title="Motor Functions" style={{ marginBottom: 16 }}>
                <table style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #d9d9d9' }}>
                    <thead>
                    <tr>
                        <th style={tableHeaderStyle}></th>
                        <th style={tableHeaderStyle}></th>
                        <th style={tableHeaderStyle}>R</th>
                        <th style={tableHeaderStyle}>L</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Power */}
                    <tr>
                        <td style={tableCellStyle} rowSpan="2">Power</td>
                        <td style={tableCellStyle}>Lower Limb</td>
                        <td style={tableCellStyle}>
                            <Input
                                size="small"
                                value={data?.powerRightLower}
                                onChange={e => onChange('powerRightLower', e.target.value)}
                                placeholder="--/5"
                            />
                        </td>
                        <td style={tableCellStyle}>
                            <Input
                                size="small"
                                value={data?.powerLeftLower}
                                onChange={e => onChange('powerLeftLower', e.target.value)}
                                placeholder="--/5"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td style={tableCellStyle}>Upper Limb</td>
                        <td style={tableCellStyle}>
                            <Input
                                size="small"
                                value={data?.powerRightUpper}
                                onChange={e => onChange('powerRightUpper', e.target.value)}
                                placeholder="--/5"
                            />
                        </td>
                        <td style={tableCellStyle}>
                            <Input
                                size="small"
                                value={data?.powerLeftUpper}
                                onChange={e => onChange('powerLeftUpper', e.target.value)}
                                placeholder="--/5"
                            />
                        </td>
                    </tr>

                    {/* Tone */}
                    <tr>
                        <td style={tableCellStyle} rowSpan="2">Tone</td>
                        <td style={tableCellStyle}>Lower Limb</td>
                        <td style={tableCellStyle}>
                            <Select
                                value={data?.toneRightLower}
                                onChange={value => onChange('toneRightLower', value)}
                                style={{ width: '100%' }}
                                placeholder="Select"
                                size="small"
                            >
                                <Option value="Normal">Normal</Option>
                                <Option value="Hypo">Hypo</Option>
                                <Option value="Hyper">Hyper</Option>
                            </Select>
                        </td>
                        <td style={tableCellStyle}>
                            <Select
                                value={data?.toneLeftLower}
                                onChange={value => onChange('toneLeftLower', value)}
                                style={{ width: '100%' }}
                                placeholder="Select"
                                size="small"
                            >
                                <Option value="Normal">Normal</Option>
                                <Option value="Hypo">Hypo</Option>
                                <Option value="Hyper">Hyper</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td style={tableCellStyle}>Upper Limb</td>
                        <td style={tableCellStyle}>
                            <Select
                                value={data?.toneRightUpper}
                                onChange={value => onChange('toneRightUpper', value)}
                                style={{ width: '100%' }}
                                placeholder="Select"
                                size="small"
                            >
                                <Option value="Normal">Normal</Option>
                                <Option value="Hypo">Hypo</Option>
                                <Option value="Hyper">Hyper</Option>
                            </Select>
                        </td>
                        <td style={tableCellStyle}>
                            <Select
                                value={data?.toneLeftUpper}
                                onChange={value => onChange('toneLeftUpper', value)}
                                style={{ width: '100%' }}
                                placeholder="Select"
                                size="small"
                            >
                                <Option value="Normal">Normal</Option>
                                <Option value="Hypo">Hypo</Option>
                                <Option value="Hyper">Hyper</Option>
                            </Select>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </Card>

            <ReflexesStickman
                data={data}
                onChange={onChange}/>

            <Card>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Gait</label>
                    <Input
                        readOnly={readonly}
                        value={data.gait}
                        onChange={(e) => onChange('gait', e.target.value)}
                    />
                </div>
            </Card>
                
        </>



    );
};

export default MotorFunctions;
