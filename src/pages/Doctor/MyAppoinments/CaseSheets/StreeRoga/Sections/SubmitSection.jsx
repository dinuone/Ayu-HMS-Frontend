// SubmitSection.jsx
import React from 'react';
import { Button } from 'antd';

function SubmitSection({ onSubmit }) {
    return (
        <div style={{ textAlign: 'right', marginTop: 20 }}>
            <Button color="default" variant="solid" onClick={onSubmit}>
                Submit Case Sheet
            </Button>
        </div>
    );
}

export default SubmitSection;
