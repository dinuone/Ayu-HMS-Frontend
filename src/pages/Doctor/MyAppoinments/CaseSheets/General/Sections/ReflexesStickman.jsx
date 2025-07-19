import React from 'react';
import {Card, Button, Input} from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';

const ReflexInput = ({ value, onChange, placeholder,readonly = false }) => (
    <Input
        value={value}
        onChange={onChange}
        style={{ width: 80, textAlign: 'center' }}
        size="small"
        placeholder={placeholder}
    />
);

const inputStyle = {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
};

const ReflexesStickman = ({ data = {}, onChange }) => {
    const reflexPoints = [
        { name: 'rBiceps', label: 'Biceps', top: '28%', left: '35%' },
        { name: 'lBiceps', label: 'Biceps', top: '28%', left: '65%' },
        { name: 'rTriceps', label: 'Triceps', top: '38%', left: '22%' },
        { name: 'lTriceps', label: 'Triceps', top: '38%', left: '78%' },
        { name: 'rBrachio', label: 'Brachio', top: '48%', left: '18%' },
        { name: 'lBrachio', label: 'Brachio', top: '48%', left: '82%' },
        { name: 'rKnee', label: 'Knee', top: '70%', left: '37%' },
        { name: 'lKnee', label: 'Knee', top: '70%', left: '63%' },
        { name: 'rAnkle', label: 'Ankle', top: '90%', left: '35%' },
        { name: 'lAnkle', label: 'Ankle', top: '90%', left: '65%' },
    ];

    const handleArrowClick = (side, direction) => {
        const key = `${side}Arrow`;
        const newValue = data[key] === direction ? null : direction;

        // Clear the other side's value
        const oppositeKey = side === 'left' ? 'rightArrow' : 'leftArrow';

        onChange(key, newValue);
        if (newValue) {
            onChange(oppositeKey, null); // Deselect the opposite side
        }
    };


    return (
        <Card title="Reflexes - Stickman Diagram">
            <div style={{ position: 'relative', width: '100%', maxWidth: '400px', height: '500px', margin: '0 auto' }}>
                <svg width="100%" height="100%" viewBox="0 0 300 450">
                    {/* Stickman drawing (same as you already have) */}
                    <circle cx="150" cy="50" r="30" stroke="black" strokeWidth="2" fill="none" />
                    <line x1="150" y1="80" x2="150" y2="200" stroke="black" strokeWidth="2" />
                    <line x1="150" y1="110" x2="90" y2="160" stroke="black" strokeWidth="2" />
                    <line x1="90" y1="160" x2="60" y2="210" stroke="black" strokeWidth="2" />
                    <line x1="150" y1="110" x2="210" y2="160" stroke="black" strokeWidth="2" />
                    <line x1="210" y1="160" x2="240" y2="210" stroke="black" strokeWidth="2" />
                    <line x1="150" y1="200" x2="110" y2="300" stroke="black" strokeWidth="2" />
                    <line x1="110" y1="300" x2="100" y2="400" stroke="black" strokeWidth="2" />
                    <line x1="100" y1="400" x2="125" y2="410" stroke="black" strokeWidth="2" />
                    <line x1="150" y1="200" x2="190" y2="300" stroke="black" strokeWidth="2" />
                    <line x1="190" y1="300" x2="200" y2="400" stroke="black" strokeWidth="2" />
                    <line x1="200" y1="400" x2="175" y2="410" stroke="black" strokeWidth="2" />
                </svg>

                {reflexPoints.map(point => (
                    <div key={point.name} style={{ ...inputStyle, top: point.top, left: point.left }}>
                        <ReflexInput
                            placeholder={point.label}
                            value={data[point.name]}
                            onChange={(e) => onChange(point.name, e.target.value)}
                        />
                    </div>
                ))}
            </div>

            {/* Arrow Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
                {/* Left Side Arrows */}
                <div style={{ textAlign: 'center' }}>
                    <div>Left</div>
                    <Button
                        icon={<UpOutlined />}
                        onClick={() => handleArrowClick('left', 'up')}
                        size="small"
                        style={{ margin: '4px' }}
                    />
                    <Button
                        icon={<DownOutlined />}
                        onClick={() => handleArrowClick('left', 'down')}
                        size="small"
                        style={{ margin: '4px' }}
                    />
                    <div>Value: {data.leftArrow || 0}</div>
                </div>

                {/* Right Side Arrows */}
                <div style={{ textAlign: 'center' }}>
                    <div>Right</div>
                    <Button
                        icon={<UpOutlined />}
                        onClick={() => handleArrowClick('right', 'up')}
                        size="small"
                        style={{ margin: '4px' }}
                    />
                    <Button
                        icon={<DownOutlined />}
                        onClick={() => handleArrowClick('right', 'down')}
                        size="small"
                        style={{ margin: '4px' }}
                    />
                    <div>Value: {data.rightArrow || 0}</div>
                </div>
            </div>
        </Card>
    );
};

export default ReflexesStickman;
