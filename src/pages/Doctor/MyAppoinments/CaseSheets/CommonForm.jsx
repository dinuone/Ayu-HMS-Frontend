import React, {useState} from 'react';
import {Button, Descriptions, Divider, Flex, Form, Input, Radio, Result} from 'antd';
import { Typography } from "antd";
import StreeRogaForm from "./StreeRoga/StreeRogaForm.jsx";
import GeneralForm from "./General/GeneralForm.jsx";

const { Title, Text } = Typography;

const options = [
    { label: 'General', value: 'General' },
    { label: 'Stree Roga', value: 'Stree Roga' },

];

function CommonForm({ visitData, patientData }) {
    const today = new Date().toISOString().split('T')[0];


    console.log(visitData)
    const items = [
        {
            key: '1',
            label: 'Hospital Name',
            children: 'Harendra Ayurveda Hospital Pvt(Ltd)',
        },
        {
            key: '2',
            label: 'Date',
            children: today,
        },
        {
            key: '3',
            label: 'Consultant Name',
            children: visitData?.doctor_name || 'N/A',
        },
        {
            key: '4',
            label: 'Patient Number',
            children: visitData?.chit_number || 'N/A',
        },
    ];

    const patientDetails = [
        {
            key: '1',
            label: 'Name',
            children: patientData?.name || 'N/A',
        },
        {
            key: '2',
            label: 'Age',
            children: patientData?.age || 'N/A',
        },
        {
            key: '3',
            label: 'Gender',
            children: patientData?.gender || 'N/A',
        },
        {
            key: '4',
            label: 'Marital status',
            children: patientData?.marital_status || 'N/A',
        },
        {
            key: '5',
            label: 'Address',
            children: patientData?.address_line_1 + "," + patientData?.address_line_1 || 'N/A',
        },
        {
            key: '6',
            label: 'Occupation',
            children: patientData.occupation || 'N/A',
        },

    ];


    const [selectedCategory, setSelectedCategory] = useState('General');


    return (
        <Flex vertical gap="middle">
            <Radio.Group
                size="large"
                options={options}
                defaultValue="General"
                optionType="button"
                buttonStyle="solid"
                onChange={(e) => setSelectedCategory(e.target.value)}
            />
            <div style={{ textAlign: 'left' }}>
                <Descriptions
                    column={2}
                    layout="horizontal"
                    size="small"
                    title="Hospital Information"
                    items={items}
                />
                <Divider/>

                <Descriptions
                    column={1}
                    layout="horizontal"
                    size="small"
                    title="Patient Details"
                    items={patientDetails}
                />

                <Divider/>



                {selectedCategory === 'Stree Roga' && patientData?.gender === "Female" ? (
                    <StreeRogaForm
                        visitId={visitData?.id}
                        regNumber={patientData?.registration_number}
                        chitNumber={visitData?.chit_number}
                    />
                ) : selectedCategory === 'Stree Roga' && (
                    <Result
                        status="warning"
                        title="Stree Roga form is only applicable for female patients."

                    />
                )}

                {selectedCategory === "General" && (
                    <GeneralForm
                        visitId={visitData?.id}
                        regNumber={patientData?.registration_number}
                        chitNumber={visitData?.chit_number}
                    />
                )}

            </div>
        </Flex>
    );
}

export default CommonForm;
