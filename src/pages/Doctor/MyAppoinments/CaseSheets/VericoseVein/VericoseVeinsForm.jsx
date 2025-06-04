import React, { useState } from 'react';
import {Form, Input, Button, Checkbox, message, Row, Col, Select, Radio, Typography, Divider, List} from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TreatmentSelect from "./TreatmentSelect.jsx";
import DiseaseCodeSelect from "./DiseaseCodeSelect.jsx";
import {PlusOutlined} from "@ant-design/icons";

const { Title, Text } = Typography;

const otherComplaintOptions = ['Gastritis', 'Headache', 'Other'];

const primarySymptoms = [
    'Engorgement',
    'Heaviness',
    'Swelling',
    'Discoloration',
    'Itching',
    'Ulcers',
    'Other',
];

const painSides = ['Right', 'Left', 'Both'];
const illnessOptions = ['HTN', 'DM', 'CHO', 'THY', 'TB'];
const addictionOptions = ['Smoke', 'Alcohol', 'Betel chewing'];

const specialExamAreas = [
    'Visible veins',
    'Swelling',
    'Discoloration',
    'Tenderness',
    'Temperature'
];
const examSides = ['Left', 'Right', 'Both'];

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

const treatmentsFromDB = [
    { id: 1, name: 'Vein Stripping' },
    { id: 2, name: 'Sclerotherapy' },
    { id: 3, name: 'Laser Therapy' },
];

const diseaseCodesFromDB = [
    { id: 1, code: 'HTN', name: 'Hypertension' },
    { id: 2, code: 'DM', name: 'Diabetes Mellitus' },
    { id: 3, code: 'CHO', name: 'Coronary Heart Disease' },
    // ...etc
];

const drugList = [
    { id: 1, name: 'Paracetamol' },
    { id: 2, name: 'Ibuprofen' },
    // ... from DB
];

function VericoseVeinsForm(props) {
    const [form] = Form.useForm();
    const [chiefComplaint, setChiefComplaint] = useState('');
    const [previousJointProblem, setPreviousJointProblem] = useState('');
    const [surgeries, setSurgeries] = useState('');
    const [allergies, setAllergies] = useState('');
    const [familyHistory, setFamilyHistory] = useState('');
    const [differentialdiagnosis, setDifferentialdiagnosis] = useState('');

    const [showOtherInput, setShowOtherInput] = useState(false);

    const [prescription, setPrescription] = useState([]); // standalone
    const [currentDrug, setCurrentDrug] = useState(null);
    const [qty, setQty] = useState('');
    const [instruction, setInstruction] = useState('');

    const [caseSheet, setCaseSheet] = useState({
        chiefComplaint: '',
        otherComplaints: [],
        primarySymptoms: {},
        previousJointProblem:'',
        majorIllness: {
            HTN: false,
            DM: false,
            CHO: false,
            THY: false,
            TB: false,
        },
        dietaryHabits: {
            option: '',
            otherText: '',
        },
        sleepPattern: '',
        bowel: { type: '', note: '' },
        bladder: { type: '', note: '' },
        addiction: [],
        specialExamination: {},
        investigations: {
            bloodTest: '',
            imagingTest: '',
            otherTest: ''
        },
        differentialdiagnosis:differentialdiagnosis,
        diagnosingAMA:{},
        treatments: [],
        diseaseCodes: [],
        prescription: [],
    });




    const handleMajorIllnessChange = (checkedValues) => {
        const updatedIllnesses = {};
        illnessOptions.forEach((illness) => {
            updatedIllnesses[illness] = checkedValues.includes(illness);
        });

        setCaseSheet((prev) => ({
            ...prev,
            majorIllness: updatedIllnesses,
        }));
    };

    const handleSleepPatternInputChange = (e) => {
        const value = e.target.value;
        setCaseSheet((prev) => ({
            ...prev,
            sleepPattern: value,
        }));
    };

    const handleSymptomSideChange = (symptom) => (e) => {
        const value = e.target.value;
        setCaseSheet((prev) => ({
            ...prev,
            primarySymptoms: {
                ...prev.primarySymptoms,
                [symptom]: value,
            },
        }));
    };

    const handleDietaryChange = (e) => {
        const value = e.target.value;
        setCaseSheet((prev) => ({
            ...prev,
            dietaryHabits: {
                ...prev.dietaryHabits,
                option: value,
                otherText: value !== 'Other' ? '' : prev.dietaryHabits.otherText,
            },
        }));
    };


    const handleOtherDietaryTextChange = (e) => {
        setCaseSheet((prev) => ({
            ...prev,
            dietaryHabits: {
                ...prev.dietaryHabits,
                otherText: e.target.value,
            },
        }));
    };

    const handleBowelChange = (e) => {
        const value = e.target.value;
        setCaseSheet((prev) => ({
            ...prev,
            bowel: {
                ...prev.bowel,
                type: value,
                note: value === 'Other' ? prev.bowel.note : ''
            }
        }));
    };

    const handleBladderChange = (e) => {
        const value = e.target.value;
        setCaseSheet((prev) => ({
            ...prev,
            bladder: {
                ...prev.bladder,
                type: value,
                note: value === 'Other' ? prev.bladder.note : ''
            }
        }));
    };

    const handleBowelNoteChange = (e) => {
        const value = e.target.value;
        setCaseSheet((prev) => ({
            ...prev,
            bowel: {
                ...prev.bowel,
                note: value
            }
        }));
    };

    const handleBladderNoteChange = (e) => {
        const value = e.target.value;
        setCaseSheet((prev) => ({
            ...prev,
            bladder: {
                ...prev.bladder,
                note: value
            }
        }));
    };

    const handleAddictionChange = (checkedValues) => {
        setCaseSheet((prev) => ({
            ...prev,
            addiction: checkedValues,
        }));
    };

    const handleSpecialExamChange = (symptom) => (e) => {
        const value = e.target.value;
        setCaseSheet((prev) => ({
            ...prev,
            specialExamination: {
                ...prev.specialExamination,
                [symptom]: value,
            },
        }));
    };

    const handleInvestigationChange = (field) => (e) => {
        const value = e.target.value;
        setCaseSheet((prev) => ({
            ...prev,
            investigations: {
                ...prev.investigations,
                [field]: value,
                ...(field === 'imagingTest' && value !== 'Other' ? { imagingTestOther: '' } : {})
            }
        }));
    };

    const handleTestOtherInput = (e) => {
        setCaseSheet((prev) => ({
            ...prev,
            investigations: {
                ...prev.investigations,
                otherTest: e.target.value
            }
        }));
    };

    const handleRemove = (index) => {
        const updated = prescription.filter((_, i) => i !== index);
        setPrescription(updated);
        setCaseSheet((prev) => ({ ...prev, prescription: updated }));
    };

    const handleEdit = (index) => {
        const item = prescription[index];
        setCurrentDrug({ id: item.id, name: item.name });
        setQty(item.qty);
        setInstruction(item.instruction);

        // Remove the old one so it can be updated on re-add
        const updated = prescription.filter((_, i) => i !== index);
        setPrescription(updated);
        setCaseSheet((prev) => ({ ...prev, prescription: updated }));
    };


    const onFinish = (values) => {
        const finalCaseSheet = {
            ...caseSheet,
            chiefComplaint: values.chiefComplaint,
            otherComplaints: values.otherComplaints || [],
            username: values.username,
        };

        setCaseSheet(finalCaseSheet);
        console.log('📄 Final Case Sheet:', finalCaseSheet);
        message.success('Form submitted successfully!');
        // You can now pass `finalCaseSheet` to parent or API
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
        >
            <Title level={5}>Chief Complain</Title>
            <Form.Item name="chiefComplaint">
                <ReactQuill
                    theme="snow"
                    value={chiefComplaint}
                    onChange={(value) => {
                        setChiefComplaint(value);
                        form.setFieldsValue({ chiefComplaint: value });
                    }}
                />
            </Form.Item>

            <Divider />
            <Title level={5}>Other Complaint</Title>
            <Form.Item  name="otherComplaints">
                <Checkbox.Group
                    options={otherComplaintOptions}
                    onChange={(checkedValues) => setShowOtherInput(checkedValues.includes('Other'))}/>
            </Form.Item>

            {showOtherInput && (
                <Form.Item
                    label="Please specify"
                    name="otherComplaintText"
                    rules={[{ required: true, message: 'Please specify the complaint' }]}
                >
                    <Input.TextArea rows={5} />
                </Form.Item>
            )}

            <Title level={5}>Primary Symptoms</Title>
            <Row gutter={[16, 16]}>
                    {primarySymptoms.map((symptom) =>
                        symptom === 'Other' ? (
                            <Col span={24} key={symptom}>
                                <Form.Item
                                    name={['primarySymptoms', 'Other']}
                                    label="Other (specify)"

                                >
                                    <Input placeholder="Specify other symptom" />
                                </Form.Item>
                            </Col>
                        ) : (
                            <Col span={24} key={symptom} style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ minWidth: 100, fontWeight: 'bold' }}>{symptom}</div>
                                <div style={{ margin: '0 8px' }}>|</div>
                                <Form.Item
                                    name={['primarySymptoms', symptom]}
                                    noStyle
                                    rules={[{ required: true, message: `Please select a side for ${symptom}` }]}
                                >
                                    <Radio.Group
                                        value={caseSheet.primarySymptoms[symptom]}
                                        onChange={handleSymptomSideChange(symptom)}
                                    >
                                        {painSides.map((side) => (
                                            <Radio key={side} value={side}>
                                                {side}
                                            </Radio>
                                        ))}
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        )
                    )}
                </Row>

            <Divider />
            <Title level={5}>History of Present Illness</Title>
            <Form.Item
                label="Trigger Factors"
                name='triggerFactors'
            >
                <Radio.Group>
                    <Radio value="Prolonged Standing">Prolonged Standing</Radio>
                    <Radio value="Sitting">Sitting</Radio>
                    <Radio value="Pregnancy">Pregnancy</Radio>
                    <Radio value="Obesity">Obesity</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                label="Progression"
                name='progression'
            >
                <Input.TextArea rows={3} placeholder="Describe progression" />
            </Form.Item>

            <Form.Item
                label="Previous Treatment"
                name='previousTreatment'
            >
                <Radio.Group>
                    <Radio value="Vein Stripping">Vein Stripping</Radio>
                    <Radio value="Sclerotherapy">Sclerotherapy</Radio>
                </Radio.Group>
            </Form.Item>

            <Divider />
            <Title level={5}>Previous Medical History</Title>
            <Form.Item label="Previous joint problems" name="previousJoinProblem">
                <ReactQuill
                    theme="snow"
                    value={previousJointProblem}
                    onChange={(value) => {
                        setPreviousJointProblem(value);
                        form.setFieldsValue({ previousJointProblem: value });
                    }}
                />
            </Form.Item>

            <Form.Item label="Other Major Illness" name="majorIllness">
                <Checkbox.Group
                    options={illnessOptions}
                    onChange={handleMajorIllnessChange}
                />
            </Form.Item>

            <Form.Item label="Surgeries" name="surgeries">
                <ReactQuill
                    theme="snow"
                    value={surgeries}
                    onChange={(value) => {
                        setSurgeries(value);
                        form.setFieldsValue({ surgeries: value });
                    }}
                />
            </Form.Item>

            <Form.Item label="Allergies" name="allergies">
                <ReactQuill
                    theme="snow"
                    value={allergies}
                    onChange={(value) => {
                        setAllergies(value);
                        form.setFieldsValue({ allergies: value });
                    }}
                />
            </Form.Item>

            <Form.Item label="Family history" name="faimlyHistory">
                <ReactQuill
                    theme="snow"
                    value={familyHistory}
                    onChange={(value) => {
                        setFamilyHistory(value);
                        form.setFieldsValue({ familyHistory: value });
                    }}
                />
            </Form.Item>

            <Divider />
            <Title level={5}>Personal History</Title>

            <Form.Item label="Dietary Habits" >
                <Radio.Group
                    value={caseSheet.dietaryHabits.option}
                    onChange={handleDietaryChange}
                >
                    <Radio value="Vegetarian">Vegetarian</Radio>
                    <Radio value="Skip Meals">Skip Meals</Radio>
                    <Radio value="Other">Other</Radio>
                </Radio.Group>

                {caseSheet.dietaryHabits.option === 'Other' && (
                    <Form.Item
                        style={{ marginTop: 8 }}
                        name="dietaryOtherText"
                        rules={[{ required: true, message: 'Please specify dietary habit' }]}
                    >
                        <Input
                            placeholder="Please specify"
                            value={caseSheet.dietaryHabits.otherText}
                            onChange={handleOtherDietaryTextChange}
                        />
                    </Form.Item>
                )}
            </Form.Item>

            <Form.Item
                label="Sleep Pattern"
                name="sleepPattern"
            >
                <Input
                    value={caseSheet.sleepPattern}
                    onChange={handleSleepPatternInputChange}
                    placeholder="e.g. Normal, Disturbed, Insomnia"
                />
            </Form.Item>


            <Form.Item label="Bowel">
                <Radio.Group
                    value={caseSheet.bowel.type}
                    onChange={handleBowelChange}
                >
                    <Radio value="D">D (Day)</Radio>
                    <Radio value="N">N (Night)</Radio>
                    <Radio value="Other">Other</Radio>
                </Radio.Group>

                {caseSheet.bowel.type === 'Other' && (
                    <Form.Item
                        style={{ marginTop: 8 }}
                        name="bowelNote"
                        rules={[{ required: true, message: 'Please specify if Bowel is Other' }]}
                    >
                        <Input.TextArea
                            placeholder="Specify bowel issue"
                            rows={3}
                            value={caseSheet.bowel.note}
                            onChange={handleBowelNoteChange}
                        />
                    </Form.Item>
                )}
            </Form.Item>

            <Form.Item label="Bladder" >
                <Radio.Group
                    value={caseSheet.bladder.type}
                    onChange={handleBladderChange}
                >
                    <Radio value="D">D (Day)</Radio>
                    <Radio value="N">N (Night)</Radio>
                    <Radio value="Other">Other</Radio>
                </Radio.Group>

                {caseSheet.bladder.type === 'Other' && (
                    <Form.Item
                        style={{ marginTop: 8 }}
                        name="bladderNote"
                        rules={[{ required: true, message: 'Please specify if Bladder is Other' }]}
                    >
                        <Input.TextArea
                            placeholder="Specify bladder issue"
                            rows={3}
                            value={caseSheet.bladder.note}
                            onChange={handleBladderNoteChange}
                        />
                    </Form.Item>
                )}
            </Form.Item>

            <Form.Item label="Addiction" name="addiction">
                <Checkbox.Group
                    options={addictionOptions}
                    value={caseSheet.addiction}
                    onChange={handleAddictionChange}
                />
            </Form.Item>

            <Divider />
            <Title level={5}>Physical Examination</Title>


            <Divider />
            <Title level={5}>Special Examination</Title>
            <Row gutter={[16, 16]}>
                    {specialExamAreas.map((symptom) => (
                        <Col span={24} key={symptom} style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ minWidth: 130, fontWeight: 'bold' }}>{symptom}</div>
                            <div style={{ margin: '0 8px' }}>|</div>
                            <Form.Item
                                name={['specialExamination', symptom]}
                                noStyle
                                rules={[{ required: true, message: `Please select a side for ${symptom}` }]}
                            >
                                <Radio.Group
                                    value={caseSheet.specialExamination[symptom]}
                                    onChange={handleSpecialExamChange(symptom)}
                                >
                                    {examSides.map((side) => (
                                        <Radio key={side} value={side}>
                                            {side}
                                        </Radio>
                                    ))}
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    ))}
                </Row>

            <Divider />
            <Title level={5}>Investigations</Title>

            <Form.Item
                label="Blood Test"
                name={['investigations', 'bloodTest']}
            >
                <Radio.Group
                    value={caseSheet.investigations.bloodTest}
                    onChange={handleInvestigationChange('bloodTest')}
                >
                    <Radio value="FBC">FBC</Radio>
                    <Radio value="ESR">ESR</Radio>
                    <Radio value="CRP">CRP</Radio>
                </Radio.Group>
            </Form.Item>

            {/* Imaging Test */}
            <Form.Item
                label="Imaging Test"
                name={['investigations', 'imagingTest']}
            >
                <Radio.Group
                    value={caseSheet.investigations.imagingTest}
                    onChange={handleInvestigationChange('imagingTest')}
                >
                    <Radio value="Duplex ultrasound">Duplex ultrasound</Radio>
                    <Radio value="Doppler ultrasound">Doppler ultrasound</Radio>
                    <Radio value="Venography">Venography</Radio>
                </Radio.Group>
            </Form.Item>

            {/* Other */}
            <Form.Item
                label="Other"
            >
                <Input
                    placeholder="Specify other investigation"
                    value={caseSheet.investigations.other}
                    onChange={(e) =>
                        setCaseSheet((prev) => ({
                            ...prev,
                            investigations: {
                                ...prev.investigations,
                                other: e.target.value,
                            },
                        }))
                    }
                />
            </Form.Item>

            <Divider />
            <Title level={5}>Differential Diagnosis</Title>
            <Form.Item name="differentialdiagnosis">
                <ReactQuill
                    theme="snow"
                    value={differentialdiagnosis}
                    onChange={(value) => {
                        setDifferentialdiagnosis(value);
                        form.setFieldsValue({ differentialdiagnosis: value });
                    }}
                />
            </Form.Item>

            <Divider />
            <Title level={5}>Diagnosis</Title>
            <DiseaseCodeSelect
                diseaseCodesFromDB={diseaseCodesFromDB}
                caseSheet={caseSheet}
                setCaseSheet={setCaseSheet}
            />

            <Divider/>
            <Title level={5}>Diagnosing AMA Condition</Title>
            {amaQuestions.map(({ label, name, options }) => (
                <Form.Item
                    key={name}
                    name={['diagnosingAMA', name]}
                    rules={[{ required: true, message: `Please select an option for ${label}` }]}
                >
                    <Row align="middle" gutter={16}>
                        <Col flex="150px">
                            {label}
                        </Col>
                        <Col flex="auto">
                            <Radio.Group
                                onChange={(e) =>
                                    setCaseSheet((prev) => ({
                                        ...prev,
                                        diagnosingAMA: {
                                            ...prev.diagnosingAMA,
                                            [name]: e.target.value,
                                        },
                                    }))
                                }
                            >
                                {options.map((opt) => (
                                    <Radio key={opt} value={opt}>
                                        {opt}
                                    </Radio>
                                ))}
                            </Radio.Group>
                        </Col>
                    </Row>
                </Form.Item>
            ))}

            <Divider />
            <Title level={5}>Treatments</Title>
            <TreatmentSelect
                treatmentsFromDB={treatmentsFromDB}
                caseSheet={caseSheet}
                setCaseSheet={setCaseSheet}
            />

            <Divider />
            <Title level={5}>Presctiption</Title>
            <Form layout="inline" style={{ marginBottom: '16px' }}>
                <Form.Item label="Drug Name">
                    <Select
                        showSearch
                        placeholder="Select drug"
                        style={{ width: 160 }}
                        onChange={(value) => {
                            const selected = drugList.find((d) => d.id === value);
                            setCurrentDrug(selected);
                        }}
                        value={currentDrug?.id}
                    >
                        {drugList.map((drug) => (
                            <Select.Option key={drug.id} value={drug.id}>
                                {drug.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Qty">
                    <Input value={qty} onChange={(e) => setQty(e.target.value)} style={{ width: 80 }} />
                </Form.Item>
                <Form.Item label="Instruction">
                    <Input value={instruction} onChange={(e) => setInstruction(e.target.value)} />
                </Form.Item>
                <Form.Item label="Action">
                    <Button
                        icon={<PlusOutlined />}
                        variant="solid"
                        color="orange"
                        onClick={() => {
                            if (!currentDrug || !qty || !instruction) return;

                            const newEntry = {
                                id: currentDrug.id,
                                name: currentDrug.name,
                                qty,
                                instruction,
                            };

                            const updatedList = [...prescription, newEntry];
                            setPrescription(updatedList);
                            setCaseSheet((prev) => ({ ...prev, prescription: updatedList }));

                            // Clear fields
                            setCurrentDrug(null);
                            setQty('');
                            setInstruction('');
                        }}
                    >
                        Add
                    </Button>
                </Form.Item>
            </Form>


            <List
                style={{ marginBottom: '16px' }}
                bordered
                dataSource={prescription}
                renderItem={(item, index) => (
                    <List.Item
                        actions={[
                            <Button size="small" onClick={() => handleEdit(index)}>Edit</Button>,
                            <Button size="small" danger onClick={() => handleRemove(index)}>Remove</Button>
                        ]}
                    >
                        {item.name} - Qty: {item.qty}, Instruction: {item.instruction}
                    </List.Item>
                )}
            />

            <Form.Item>
                <Button variant="solid" color="default" htmlType="submit">
                    Submit Case Sheet
                </Button>
            </Form.Item>
        </Form>
    );
}

export default VericoseVeinsForm;
