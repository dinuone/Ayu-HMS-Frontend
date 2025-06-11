import React from 'react';
import { Input } from 'antd';


const points = [
    { id: 'right-shoulder', x: 130, y: 100, labelX: 30, labelY: 80 },
    { id: 'right-arm', x: 110, y: 140, labelX: 20, labelY: 130 },
    { id: 'right-hand', x: 90, y: 180, labelX: 10, labelY: 170 },

    { id: 'left-shoulder', x: 270, y: 100, labelX: 370, labelY: 80 },
    { id: 'left-arm', x: 290, y: 140, labelX: 380, labelY: 130 },
    { id: 'left-hand', x: 310, y: 180, labelX: 390, labelY: 170 },

    { id: 'right-knee', x: 130, y: 300, labelX: 30, labelY: 290 },
    { id: 'right-foot', x: 100, y: 350, labelX: 20, labelY: 340 },

    { id: 'left-knee', x: 270, y: 300, labelX: 370, labelY: 290 },
    { id: 'left-foot', x: 300, y: 350, labelX: 380, labelY: 340 },
];

function BodyParts(props) {
    return (
        <div
            style={{
                position: 'relative',
                width: 500,
                height: 500,
                border: '1px solid #ccc',
                margin: '0 auto',
            }}
        >
            {/* Stick figure image */}
            <img
                src="/body-img.jpeg" // Replace with your image path
                alt="Stick Figure"
                style={{ width: '100%', height: '100%', position: 'absolute' }}
            />

            {/* SVG lines */}
            <svg style={{ position: 'absolute', width: '100%', height: '100%' }}>
                {points.map((pt) => (
                    <line
                        key={pt.id}
                        x1={pt.x}
                        y1={pt.y}
                        x2={pt.labelX}
                        y2={pt.labelY}
                        stroke="black"
                    />
                ))}
            </svg>

            {/* Ant Design inputs */}
            {points.map((pt) => (
                <Input
                    key={pt.id}
                    defaultValue="2+"
                    size="small"
                    style={{
                        position: 'absolute',
                        left: pt.labelX,
                        top: pt.labelY,
                        width: 40,
                        padding: '2px 4px',
                    }}
                />
            ))}
        </div>
    );
}

export default BodyParts;