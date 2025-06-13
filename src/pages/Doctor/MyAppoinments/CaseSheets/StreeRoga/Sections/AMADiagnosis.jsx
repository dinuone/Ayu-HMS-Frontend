import React, { memo } from 'react';
import {Col, Radio, Row, Typography} from 'antd';

const { Title } = Typography;

const amaQuestions = [
    {
        label: 'Appetite change',
        name: 'appetiteChange',
        options: ['Decrease appetite', 'Loss of interest to food', 'Normal'],
    },
    {
        label: 'Nausea / vomiting',
        name: 'nauseaVomiting',
        options: ['Yes', 'No'],
    },
    {
        label: 'Bowel movement',
        name: 'bowelMovement',
        options: ['Normal', 'Abnormal'],
    },
    {
        label: 'Coating in tongue',
        name: 'coatingInTongue',
        options: ['Yes', 'No'],
    },
    {
        label: 'Heaviness',
        name: 'heaviness',
        options: ['Yes', 'No'],
    },
    {
        label: 'Fatigue',
        name: 'fatigue',
        options: ['Yes', 'No'],
    },
];

const AMADiagnosis = memo(({data, onChange}) => {

    return (
        <>
            <Title level={5}>Diagnosing AMA Condition</Title>

            {amaQuestions.map(({ label, name, options }) => (
                <Row key={name} align="middle" gutter={12} style={{margin:'20px'}}>
                    <Col flex="150px">
                        {label}
                    </Col>
                    <Col flex="auto">
                        <Radio.Group
                            onChange={(e) => onChange(name, e.target.value)}
                        >
                            {options.map((opt) => (
                                <Radio key={opt} value={opt}>
                                    {opt}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </Col>
                </Row>
            ))}

        </>
    );
});

export default AMADiagnosis;