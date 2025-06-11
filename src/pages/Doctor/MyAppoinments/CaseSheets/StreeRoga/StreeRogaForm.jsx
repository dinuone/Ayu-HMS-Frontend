import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Checkbox,
    message,
    Row,
    Col,
    Select,
    Radio,
    Typography,
    Divider,
    List,
    Card,
    DatePicker
} from 'antd';
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

function StreeRogaForm() {
    const [form] = Form.useForm();

    const [showOtherInput, setShowOtherInput] = useState(false);
    const [prescription, setPrescription] = useState([]); // standalone
    const [currentDrug, setCurrentDrug] = useState(null);
    const [qty, setQty] = useState('');
    const [instruction, setInstruction] = useState('');

    const [loading , setLoading] = useState(true);

    const [caseSheet, setCaseSheet] = useState({
        chiefComplaint: '',
        otherComplaints: [],
        menstrualHistory: {
            pushpaDarshana: '',
            regularIrregular: '',
            charactersOfMenstruation:'',
            lmp: '',
            durationOfFlow:'',
            pain:'',
            volume:'',
        },
        obstetricHistory:{
            numberOfPregnacy:'',
            labour:'',
            dateOfLastDelivery:'',
            particularsOfDeliveries:'',
            historyOfGarbha:'',
            mudhaGarbhaIthihasaya:'',
            contraceptiveHistory:''
        },
        previousMedicalHistory:{
            previousJointProblem:'',
            otherMajorIllness_HTN:'',
            otherMajorIllness_DM:'',
            otherMajorIllness_CHO:'',
            otherMajorIllness_THY:'',
            otherMajorIllness_TB:'',
            surgeries:'',
            allergies:'',
            familyHistory:'',
        },
        historyOfPresentIllness:{
            onset:'',
            progression:'',
            previousTreatment:''
        },
        dietaryHabits:{
            options:''
        },
        treatments: [],
        diseaseCodes: [],
        prescription: [],

    });


    setTimeout(() => {
        setLoading(false);
    }, 500)


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
        <Card loading={loading}>
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
                        value={caseSheet.chiefComplaint}
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                chiefComplaint: e.target.value,
                            }))
                        }
                    />
                </Form.Item>

                <Divider />
                <Title level={5}>Other Complaint</Title>
                <Form.Item name="otherComplaints" label="Select Complaints">
                    <Checkbox.Group
                        options={caseSheet.otherComplaints}
                        value={caseSheet.selectedOtherComplaints}
                        onChange={(checkedValues) => {
                            setCaseSheet((prev) => ({
                                ...prev,
                                selectedOtherComplaints: checkedValues,
                            }));
                            setShowOtherInput(checkedValues.includes('Other'));
                        }}
                    />
                </Form.Item>

                {showOtherInput && (
                    <Form.Item label="Please specify">
                        <Input
                            value={caseSheet.otherComplaintDetail}
                            onChange={(e) =>
                                setCaseSheet((prev) => ({
                                    ...prev,
                                    otherComplaintDetail: e.target.value,
                                }))
                            }
                        />
                    </Form.Item>
                )}

                <Divider />
                <Title level={5}>Menstrual History (Arthava Ithihasa)</Title>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Pushpa Darshana (Menarche)</label>
                    <Input
                        value={caseSheet.menstrualHistory.pushpaDarshana}
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                menstrualHistory: {
                                    ...prev.menstrualHistory,
                                    pushpaDarshana: e.target.value,
                                },
                            }))
                        }
                        style={{ width: 500 }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Regular /Irregular</label>
                    <Radio.Group
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                menstrualHistory: {
                                    ...prev.menstrualHistory,
                                    regularIrregular: e.target.value,
                                },
                            }))
                        }
                        value={caseSheet.menstrualHistory.regularIrregular}
                    >
                        <Radio value="Regular">Regular</Radio>
                        <Radio value="Irregular">Irregular</Radio>
                    </Radio.Group>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Characters of Menstruation</label>
                    <Input
                        value={caseSheet.menstrualHistory.charactersOfMenstruation}
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                menstrualHistory: {
                                    ...prev.menstrualHistory,
                                    charactersOfMenstruation: e.target.value,
                                },
                            }))
                        }
                        style={{ width: 500 }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Duration of Flow</label>
                    <Input
                        value={caseSheet.menstrualHistory.durationOfFlow}
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                menstrualHistory: {
                                    ...prev.menstrualHistory,
                                    durationOfFlow: e.target.value,
                                },
                            }))
                        }
                        style={{ width: 500 }}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Interval</label>
                    <Input
                        value={caseSheet.menstrualHistory.durationOfFlow}
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                menstrualHistory: {
                                    ...prev.menstrualHistory,
                                    durationOfFlow: e.target.value,
                                },
                            }))
                        }
                        style={{ width: 500 }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Pain</label>
                    <Radio.Group
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                menstrualHistory: {
                                    ...prev.menstrualHistory,
                                    pain: e.target.value,
                                },
                            }))
                        }
                        value={caseSheet.menstrualHistory.pain}
                    >
                        <Radio value="Before">Before</Radio>
                        <Radio value="After">After</Radio>
                        <Radio value="During">During</Radio>
                    </Radio.Group>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Volume</label>
                    <Radio.Group
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                menstrualHistory: {
                                    ...prev.menstrualHistory,
                                    volume: e.target.value,
                                },
                            }))
                        }
                        value={caseSheet.menstrualHistory.volume}
                    >
                        <Radio value="Less">Less</Radio>
                        <Radio value="Excessive">Excessive</Radio>
                        <Radio value="Normal">Normal</Radio>
                    </Radio.Group>
                </div>


                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>LMP</label>
                    <Input
                        value={caseSheet.menstrualHistory.lmp}
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                menstrualHistory: {
                                    ...prev.menstrualHistory,
                                    lmp: e.target.value,
                                },
                            }))
                        }
                        style={{ width: 500 }}
                    />
                </div>

                <Divider />
                <Title level={5}>Obstetric History (Prasawa Ithihasa)</Title>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Number of Pregnancy</label>
                    <Input
                        type="number"
                        value={caseSheet.obstetricHistory.numberOfPregnacy}
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                obstetricHistory: {
                                    ...prev.obstetricHistory,
                                    numberOfPregnacy: e.target.value,
                                },
                            }))
                        }
                        style={{ width: 100 }}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Labor</label>
                    <Radio.Group
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                obstetricHistory: {
                                    ...prev.obstetricHistory,
                                    labour: e.target.value,
                                },
                            }))
                        }
                        value={caseSheet.obstetricHistory.labour}
                    >
                        <Radio value="NVD">NVD</Radio>
                        <Radio value="Induced">Induced</Radio>
                        <Radio value="LSCS">LSCS</Radio>
                    </Radio.Group>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Date of Delivery</label>
                    <DatePicker
                        format="YYYY-MM-DD"
                        onChange={(date, dateString) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                obstetricHistory: {
                                    ...prev.obstetricHistory,
                                    dateOfLastDelivery: dateString,
                                },
                            }))
                        }
                        style={{ width: 200 }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Particulars of Deliveries</label>
                    <Input
                        value={caseSheet.obstetricHistory.particularsOfDeliveries}
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                obstetricHistory: {
                                    ...prev.obstetricHistory,
                                    particularsOfDeliveries: e.target.value,
                                },
                            }))
                        }
                        style={{ width: 500 }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>History of Garbha Srava / Pata</label>
                    <Input
                        value={caseSheet.obstetricHistory.historyOfGarbha}
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                obstetricHistory: {
                                    ...prev.obstetricHistory,
                                    historyOfGarbha: e.target.value,
                                },
                            }))
                        }
                        style={{ width: 500 }}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Mudha Garbha Ithihasaya</label>
                    <Input
                        value={caseSheet.obstetricHistory.mudhaGarbhaIthihasaya}
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                obstetricHistory: {
                                    ...prev.obstetricHistory,
                                    mudhaGarbhaIthihasaya: e.target.value,
                                },
                            }))
                        }
                        style={{ width: 500 }}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Contraceptive history</label>
                    <ReactQuill
                        theme="snow"
                        value={caseSheet.obstetricHistory.contraceptiveHistory}
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                obstetricHistory: {
                                    ...prev.obstetricHistory,
                                    contraceptiveHistory: e.target.value,
                                },
                            }))
                        }
                    />

                </div>




                <Divider />
                <Title level={5}>History of Present Illness</Title>
                <Form.Item
                    label="Onset"
                    name="onset"
                >
                    <Radio.Group
                        value={caseSheet.historyOfPresentIllness.onset}
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                historyOfPresentIllness: {
                                    ...prev.historyOfPresentIllness,
                                    onset: e.target.value,
                                },
                            }))
                        }

                    >
                        <Radio value="Gradual">Gradual</Radio>
                        <Radio value="Sudden">Sudden</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="Progression"
                    name='progression'
                >
                    <ReactQuill
                        theme="snow"
                        value={caseSheet.historyOfPresentIllness.progression}
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                historyOfPresentIllness: {
                                    ...prev.historyOfPresentIllness,
                                    progression: e.target.value,
                                },
                            }))
                        }
                    />

                </Form.Item>

                <Form.Item
                    label="Previous treatment"
                    name='previousTreatment'
                >
                    <ReactQuill
                        theme="snow"
                        value={caseSheet.historyOfPresentIllness.previousTreatment}
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                historyOfPresentIllness: {
                                    ...prev.historyOfPresentIllness,
                                    previousTreatment: e.target.value,
                                },
                            }))
                        }
                    />
                </Form.Item>

                <Divider />
                <Title level={5}>Previous Medical History</Title>
                <Form.Item label="Previous joint problems" name="previousJoinProblem">
                    <ReactQuill
                        theme="snow"
                        value={caseSheet.previousMedicalHistory.previousJointProblem}
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                previousMedicalHistory: {
                                    ...prev.previousMedicalHistory,
                                    previousJointProblem: e.target.value,
                                },
                            }))
                        }

                    />
                </Form.Item>

                <label style={{ width: 150 }}>Other Major Illness</label>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>HTN</label>
                    <Input
                        value={caseSheet.previousMedicalHistory.otherMajorIllness_HTN}
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                previousMedicalHistory: {
                                    ...prev.previousMedicalHistory,
                                    otherMajorIllness_HTN: e.target.value,
                                },
                            }))
                        }
                        style={{ width: 500 }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>DM</label>
                    <Input
                        value={caseSheet.previousMedicalHistory.otherMajorIllness_DM}
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                previousMedicalHistory: {
                                    ...prev.previousMedicalHistory,
                                    otherMajorIllness_DM: e.target.value,
                                },
                            }))
                        }
                        style={{ width: 500 }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>CHO</label>
                    <Input
                        value={caseSheet.previousMedicalHistory.otherMajorIllness_CHO}
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                previousMedicalHistory: {
                                    ...prev.previousMedicalHistory,
                                    otherMajorIllness_CHO: e.target.value,
                                },
                            }))
                        }
                        style={{ width: 500 }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>THY</label>
                    <Input
                        value={caseSheet.previousMedicalHistory.otherMajorIllness_THY}
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                previousMedicalHistory: {
                                    ...prev.previousMedicalHistory,
                                    otherMajorIllness_THY: e.target.value,
                                },
                            }))
                        }
                        style={{ width: 500 }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>TB</label>
                    <Input
                        value={caseSheet.previousMedicalHistory.otherMajorIllness_TB}
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                previousMedicalHistory: {
                                    ...prev.previousMedicalHistory,
                                    otherMajorIllness_TB: e.target.value,
                                },
                            }))
                        }
                        style={{ width: 500 }}
                    />
                </div>

                <Form.Item label="Surgeries" name="surgeries">
                    <ReactQuill
                        theme="snow"
                        value={caseSheet.previousMedicalHistory.surgeries}
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                previousMedicalHistory: {
                                    ...prev.previousMedicalHistory,
                                    surgeries: e.target.value,
                                },
                            }))
                        }
                    />
                </Form.Item>

                <Form.Item label="Allergies" name="allergies">
                    <ReactQuill
                        theme="snow"
                        value={caseSheet.previousMedicalHistory.allergies}
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                previousMedicalHistory: {
                                    ...prev.previousMedicalHistory,
                                    allergies: e.target.value,
                                },
                            }))
                        }
                    />
                </Form.Item>

                <Form.Item label="Family history" name="faimlyHistory">
                    <ReactQuill
                        theme="snow"
                        value={caseSheet.previousMedicalHistory.familyHistory}
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                previousMedicalHistory: {
                                    ...prev.previousMedicalHistory,
                                    familyHistory: e.target.value,
                                },
                            }))
                        }
                    />
                </Form.Item>

                <Divider />
                <Title level={5}>Personal History</Title>
                {/*TODO Personal History Changes - >  Ref Images  */}

                {/*<Form.Item label="Dietary Habits" >*/}
                {/*    <Radio.Group*/}
                {/*        value={caseSheet.dietaryHabits.option}*/}
                {/*        onChange={handleDietaryChange}*/}
                {/*    >*/}
                {/*        <Radio value="Vegetarian">Vegetarian</Radio>*/}
                {/*        <Radio value="Skip Meals">Skip Meals</Radio>*/}
                {/*        <Radio value="Other">Other</Radio>*/}
                {/*    </Radio.Group>*/}

                {/*    {caseSheet.dietaryHabits.option === 'Other' && (*/}
                {/*        <Form.Item*/}
                {/*            style={{ marginTop: 8 }}*/}
                {/*            name="dietaryOtherText"*/}
                {/*            rules={[{ required: true, message: 'Please specify dietary habit' }]}*/}
                {/*        >*/}
                {/*            <Input*/}
                {/*                placeholder="Please specify"*/}
                {/*                value={caseSheet.dietaryHabits.otherText}*/}
                {/*                onChange={handleOtherDietaryTextChange}*/}
                {/*            />*/}
                {/*        </Form.Item>*/}
                {/*    )}*/}
                {/*</Form.Item>*/}

                {/*<Form.Item*/}
                {/*    label="Sleep Pattern"*/}
                {/*    name="sleepPattern"*/}
                {/*>*/}
                {/*    <Input*/}
                {/*        value={caseSheet.sleepPattern}*/}
                {/*        onChange={handleSleepPatternInputChange}*/}
                {/*        placeholder="e.g. Normal, Disturbed, Insomnia"*/}
                {/*    />*/}
                {/*</Form.Item>*/}


                {/*<Form.Item label="Bowel">*/}
                {/*    <Radio.Group*/}
                {/*        value={caseSheet.bowel.type}*/}
                {/*        onChange={handleBowelChange}*/}
                {/*    >*/}
                {/*        <Radio value="D">D (Day)</Radio>*/}
                {/*        <Radio value="N">N (Night)</Radio>*/}
                {/*        <Radio value="Other">Other</Radio>*/}
                {/*    </Radio.Group>*/}

                {/*    {caseSheet.bowel.type === 'Other' && (*/}
                {/*        <Form.Item*/}
                {/*            style={{ marginTop: 8 }}*/}
                {/*            name="bowelNote"*/}
                {/*            rules={[{ required: true, message: 'Please specify if Bowel is Other' }]}*/}
                {/*        >*/}
                {/*            <Input.TextArea*/}
                {/*                placeholder="Specify bowel issue"*/}
                {/*                rows={3}*/}
                {/*                value={caseSheet.bowel.note}*/}
                {/*                onChange={handleBowelNoteChange}*/}
                {/*            />*/}
                {/*        </Form.Item>*/}
                {/*    )}*/}
                {/*</Form.Item>*/}

                {/*<Form.Item label="Bladder" >*/}
                {/*    <Radio.Group*/}
                {/*        value={caseSheet.bladder.type}*/}
                {/*        onChange={handleBladderChange}*/}
                {/*    >*/}
                {/*        <Radio value="D">D (Day)</Radio>*/}
                {/*        <Radio value="N">N (Night)</Radio>*/}
                {/*        <Radio value="Other">Other</Radio>*/}
                {/*    </Radio.Group>*/}

                {/*    {caseSheet.bladder.type === 'Other' && (*/}
                {/*        <Form.Item*/}
                {/*            style={{ marginTop: 8 }}*/}
                {/*            name="bladderNote"*/}
                {/*            rules={[{ required: true, message: 'Please specify if Bladder is Other' }]}*/}
                {/*        >*/}
                {/*            <Input.TextArea*/}
                {/*                placeholder="Specify bladder issue"*/}
                {/*                rows={3}*/}
                {/*                value={caseSheet.bladder.note}*/}
                {/*                onChange={handleBladderNoteChange}*/}
                {/*            />*/}
                {/*        </Form.Item>*/}
                {/*    )}*/}
                {/*</Form.Item>*/}

                {/*<Form.Item label="Addiction" name="addiction">*/}
                {/*    <Checkbox.Group*/}
                {/*        options={addictionOptions}*/}
                {/*        value={caseSheet.addiction}*/}
                {/*        onChange={handleAddictionChange}*/}
                {/*    />*/}
                {/*</Form.Item>*/}

                <Divider />
                <Title level={5}>Physical Examination</Title>


                <Divider />
                {/*<Title level={5}>Special Examination</Title>*/}
                {/*<Row gutter={[16, 16]}>*/}
                {/*    {specialExamAreas.map((symptom) => (*/}
                {/*        <Col span={24} key={symptom} style={{ display: 'flex', alignItems: 'center' }}>*/}
                {/*            <div style={{ minWidth: 130, fontWeight: 'bold' }}>{symptom}</div>*/}
                {/*            <div style={{ margin: '0 8px' }}>|</div>*/}
                {/*            <Form.Item*/}
                {/*                name={['specialExamination', symptom]}*/}
                {/*                noStyle*/}
                {/*                rules={[{ required: true, message: `Please select a side for ${symptom}` }]}*/}
                {/*            >*/}
                {/*                <Radio.Group*/}
                {/*                    value={caseSheet.specialExamination[symptom]}*/}
                {/*                    onChange={handleSpecialExamChange(symptom)}*/}
                {/*                >*/}
                {/*                    {examSides.map((side) => (*/}
                {/*                        <Radio key={side} value={side}>*/}
                {/*                            {side}*/}
                {/*                        </Radio>*/}
                {/*                    ))}*/}
                {/*                </Radio.Group>*/}
                {/*            </Form.Item>*/}
                {/*        </Col>*/}
                {/*    ))}*/}
                {/*</Row>*/}

                {/*<Divider />*/}
                {/*<Title level={5}>Investigations</Title>*/}

                {/*<Form.Item*/}

                {/*    name='investigations'*/}
                {/*>*/}
                {/*    <Input.TextArea*/}
                {/*        placeholder=""*/}
                {/*        rows={3}*/}
                {/*        value={caseSheet.bladder.note} // need change*/}
                {/*        onChange={handleBladderNoteChange}*/}
                {/*    />*/}
                {/*</Form.Item>*/}





                {/*<Divider />*/}
                {/*<Title level={5}>Differential Diagnosis</Title>*/}
                {/*<Form.Item name="differentialdiagnosis">*/}
                {/*    <ReactQuill*/}
                {/*        theme="snow"*/}
                {/*        value={differentialdiagnosis}*/}
                {/*        onChange={(value) => {*/}
                {/*            setDifferentialdiagnosis(value);*/}
                {/*            form.setFieldsValue({ differentialdiagnosis: value });*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</Form.Item>*/}

                {/*<Divider />*/}
                {/*<Title level={5}>Diagnosis</Title>*/}
                {/*<DiseaseCodeSelect*/}
                {/*    diseaseCodesFromDB={diseaseCodesFromDB}*/}
                {/*    caseSheet={caseSheet}*/}
                {/*    setCaseSheet={setCaseSheet}*/}
                {/*/>*/}

                {/*<Divider/>*/}
                {/*<Title level={5}>Diagnosing AMA Condition</Title>*/}
                {/*{amaQuestions.map(({ label, name, options }) => (*/}
                {/*    <Form.Item*/}
                {/*        key={name}*/}
                {/*        name={['diagnosingAMA', name]}*/}
                {/*        rules={[{ required: true, message: `Please select an option for ${label}` }]}*/}
                {/*    >*/}
                {/*        <Row align="middle" gutter={16}>*/}
                {/*            <Col flex="150px">*/}
                {/*                {label}*/}
                {/*            </Col>*/}
                {/*            <Col flex="auto">*/}
                {/*                <Radio.Group*/}
                {/*                    onChange={(e) =>*/}
                {/*                        setCaseSheet((prev) => ({*/}
                {/*                            ...prev,*/}
                {/*                            diagnosingAMA: {*/}
                {/*                                ...prev.diagnosingAMA,*/}
                {/*                                [name]: e.target.value,*/}
                {/*                            },*/}
                {/*                        }))*/}
                {/*                    }*/}
                {/*                >*/}
                {/*                    {options.map((opt) => (*/}
                {/*                        <Radio key={opt} value={opt}>*/}
                {/*                            {opt}*/}
                {/*                        </Radio>*/}
                {/*                    ))}*/}
                {/*                </Radio.Group>*/}
                {/*            </Col>*/}
                {/*        </Row>*/}
                {/*    </Form.Item>*/}
                {/*))}*/}

                <Divider />
                <Title level={5}>Treatments</Title>
                <TreatmentSelect
                    treatmentsFromDB={treatmentsFromDB}
                    caseSheet={caseSheet}
                    setCaseSheet={setCaseSheet}
                />

                <Divider />
                <Title level={5}>Prescription</Title>
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
                    <Form.Item label="Duration">
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

                {/*TODO : Next Visit Date - Specific Date selection */}

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
        </Card>

    );
}

export default StreeRogaForm;
