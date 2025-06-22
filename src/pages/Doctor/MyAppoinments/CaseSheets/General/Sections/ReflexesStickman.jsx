import React from 'react';
import { Card, Input } from 'antd';

// A small, reusable input component for the reflex points.
// Using an Ant Design Input component.
const ReflexInput = ({ value, onChange, placeholder,readonly = false }) => (
    <Input
        value={value}
        onChange={onChange}
        style={{ width: 80, textAlign: 'center' }}
        size="small"
        placeholder={placeholder}
    />
);

// Style object to position the inputs absolutely over the SVG drawing.
const inputStyle = {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
};

// The main component that renders the stickman and the input fields.
const ReflexesStickman = ({ data = {}, onChange }) => {



    // An array to define all the input points, their positions, and labels.
    // This makes the JSX cleaner and easier to manage.
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

    return (
        <Card title="Reflexes - Stickman Diagram">
            {/* The main container for the stickman. Using relative positioning
                so we can position the input fields absolutely inside it. */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '400px', height: '500px', margin: '0 auto' }}>

                {/* Stickman Drawing using SVG. The coordinates are set to draw
                    a figure that resembles the one in your image. */}
                <svg width="100%" height="100%" viewBox="0 0 300 450">
                    {/* Head */}
                    <circle cx="150" cy="50" r="30" stroke="black" strokeWidth="2" fill="none" />
                    {/* Body */}
                    <line x1="150" y1="80" x2="150" y2="200" stroke="black" strokeWidth="2" />

                    {/* Left Arm */}
                    <line x1="150" y1="110" x2="90" y2="160" stroke="black" strokeWidth="2" />
                    <line x1="90" y1="160" x2="60" y2="210" stroke="black" strokeWidth="2" />

                    {/* Right Arm */}
                    <line x1="150" y1="110" x2="210" y2="160" stroke="black" strokeWidth="2" />
                    <line x1="210" y1="160"x2="240" y2="210" stroke="black" strokeWidth="2" />

                    {/* Left Leg */}
                    <line x1="150" y1="200" x2="110" y2="300" stroke="black" strokeWidth="2" />
                    <line x1="110" y1="300" x2="100" y2="400" stroke="black" strokeWidth="2" />
                    <line x1="100" y1="400" x2="125" y2="410" stroke="black" strokeWidth="2" />


                    {/* Right Leg */}
                    <line x1="150" y1="200" x2="190" y2="300" stroke="black" strokeWidth="2" />
                    <line x1="190" y1="300" x2="200" y2="400" stroke="black" strokeWidth="2" />
                    <line x1="200" y1="400" x2="175" y2="410" stroke="black" strokeWidth="2" />
                </svg>

                {/* We map over the reflexPoints array to render each input field.
                    This keeps the code clean and avoids repetition. */}
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
        </Card>
    );
};

export default ReflexesStickman;