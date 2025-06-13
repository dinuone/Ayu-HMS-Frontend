import React, {useEffect, useRef, useState} from 'react';
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
import TreatmentSelect from "../Common/TreatmentSelect.jsx";
import DiseaseCodeSelect from "../Common/DiseaseCodeSelect.jsx";
import {PlusOutlined} from "@ant-design/icons";
import api from "../../../../../Services/NetworkManager.js";
import ClinicSelect from "../Common/ClinicSelect.jsx";

const { Title, Text } = Typography;

const otherComplaintOptions = ['Gastritis', 'Headache', 'Other'];

const addictionOptions = ['Smoke', 'Alcohol', 'Betel chewing', 'Other'];

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

function StreeRogaForm_old() {
    const formRef = useRef();;


    const [showOtherInput, setShowOtherInput] = useState(false);
    const [prescription, setPrescription] = useState([]); // standalone
    const [currentDrug, setCurrentDrug] = useState(null);
    const [qty, setQty] = useState('');
    const [instruction, setInstruction] = useState('');
    const [duration, setDuration] = useState('')

    const [loading , setLoading] = useState(true);
    const [diseaseCodes, setDiseaseCodes] = useState([]);
    const [treatments, setTreatments] = useState([]);
    const [drugs, setDrugs] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [nextVisitDate,setNextVisitDate]= useState('');
    const [remark,setRemark]= useState(null);

    const [selectedTreatments, setSelectedTreatments] = useState([]);
    const [selectedDieaseCodes, setSelectedDieaseCodes] = useState([]);
    const [selectedClinic, setSelectedClinic] = useState([]);


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
        personalHistory:{
            dietaryHabits: {
                option: '',
                meals: '',
                waterIntake: '',
                other: ''
            },
            sleepPatterns:{
               day:'',
               night:''
            },
            addiction:{
                option: [],
                other:''
            },
            bath:'',
            exercise:'',
        },
        physicalExamination:{
            pulse:'',
            bp:'',
            weight:''
        },
        investigation:{
            bloodTest:[],
            imagingTest:[],
            other:''
        },
        differentialDiagnosis:'',
        diagnosingAMA:{}

    });


    setTimeout(() => {
        setLoading(false);
    }, 500)



    useEffect(() => {
        fetchMasterData()
    }, []);

    const fetchMasterData = async () => {
        try {
            const res = await api.get('patient-log/get-master-data');
            const { diseaseCodes, drugs, treatments, clinics } = res.data.data;
            setDiseaseCodes(diseaseCodes);
            setDrugs(drugs);
            setTreatments(treatments);
            setClinics(clinics);
        } catch (error) {
            message.error(error.response?.data?.message || 'Failed to fetch data');
        }
    };

    const handleRemove = (index) => {
        const updated = prescription.filter((_, i) => i !== index);
        setPrescription(updated);
        setCaseSheet((prev) => ({ ...prev, prescription: updated }));
    };



    const handleSubmit = async () => {
        console.log("casesheet ----",caseSheet)
        console.log("prescription ----",prescription)
        console.log("selectedTreatments ----",selectedTreatments)
        console.log("selectedClinic ----",selectedClinic)
        console.log("selectedDieaseCodes ----",selectedDieaseCodes)
        console.log("next visit date ---",nextVisitDate)
    }

    return (
        <Card loading={loading} ref={formRef}>

                <Title level={5}>Chief Complaint</Title>
                <ReactQuill
                    theme="snow"
                    value={caseSheet.chiefComplaint}
                    onChange={(value) =>
                        setCaseSheet((prev) => ({
                            ...prev,
                            chiefComplaint: value,
                        }))
                    }

                />

                <Divider />
                <Title level={5}>Other Complaint</Title>
                <Checkbox.Group
                    options={otherComplaintOptions}
                    value={caseSheet.selectedOtherComplaints}
                    onChange={(checkedValues) => {
                        setCaseSheet((prev) => ({
                            ...prev,
                            selectedOtherComplaints: checkedValues,
                        }));
                        setShowOtherInput(checkedValues.includes('Other'));
                    }}
                />

                {showOtherInput && (
                    <>
                        <label style={{ width: 200 }}>Please specify</label>
                        <Input
                            value={caseSheet.otherComplaintDetail}
                            onChange={(e) =>
                                setCaseSheet((prev) => ({
                                    ...prev,
                                    otherComplaintDetail: e.target.value,
                                }))
                            }
                        />
                    </>

                )}

                <Divider />
                <Title level={5}>Menstrual History (Arthava Ithihasa)</Title>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 200 }}>Pushpa Darshana (Menarche)</label>
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
                    <label style={{ width: 200 }}>Regular /Irregular</label>
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
                    <label style={{ width: 200 }}>Characters of Menstruation</label>
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
                    <label style={{ width: 200 }}>Duration of Flow</label>
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
                    <label style={{ width: 200 }}>Interval</label>
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
                    <label style={{ width: 200 }}>Pain</label>
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
                    <label style={{ width: 200 }}>Volume</label>
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
                    <label style={{ width: 200 }}>LMP</label>
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
                    <label style={{ width: 200 }}>Number of Pregnancy</label>
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
                    <label style={{ width: 200 }}>Labor</label>
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
                    <label style={{ width: 200 }}>Date of Delivery</label>
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
                    <label style={{ width: 200 }}>Particulars of Deliveries</label>
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
                    <label style={{ width: 200 }}>History of Garbha Srava / Pata</label>
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
                    <label style={{ width: 200 }}>Mudha Garbha Ithihasaya</label>
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

                <label style={{ width: 150 }}>Contraceptive history</label>
                <ReactQuill
                    theme="snow"
                    value={caseSheet.obstetricHistory.contraceptiveHistory}
                    onChange={(value) =>
                        setCaseSheet((prev) => ({
                            ...prev,
                            obstetricHistory: {
                                ...prev.obstetricHistory,
                                contraceptiveHistory: value,
                            },
                        }))
                    }


                />


                <Divider />
                <Title level={5}>History of Present Illness</Title>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 80 }}>Onset</label>
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
                </div>



                <label style={{ width: 200 }}>Progression</label>
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


                <label style={{ width: 200 }}>Previous treatment</label>
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

                <Divider />
                <Title level={5}>Previous Medical History</Title>

                <label style={{ width: 200 }}>Previous joint problems</label>
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
                    />
                </div>

                <label style={{ width: 200 }}>Surgeries</label>
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

                <label style={{ width: 200 }}>Allergies</label>
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

                <label style={{ width: 200 }}>Family history</label>
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

                <Divider />
                <Title level={5}>Personal History</Title>
                {/*TODO Personal History Changes - >  Ref Images  */}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label style={{ width: 150 }}>Dietary Habits</label>
                        <Radio.Group
                            value={caseSheet.personalHistory.dietaryHabits.option}
                            onChange={(e) => {
                                const value = e.target.value;
                                setCaseSheet((prev) => ({
                                    ...prev,
                                    personalHistory: {
                                        ...prev.personalHistory,
                                        dietaryHabits: {
                                            ...prev.personalHistory.dietaryHabits,
                                            option: value,
                                        },
                                    },
                                }));
                            }}
                        >
                            <Radio value="Vegetarian">Vegetarian</Radio>
                            <Radio value="Non Vegetarian">Non Vegetarian</Radio>
                        </Radio.Group>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label style={{ width: 150 }}>Meals</label>
                        <Input
                            placeholder="e.g., 3 meals per day"
                            value={caseSheet.personalHistory.dietaryHabits.meals}
                            onChange={(e) =>
                                setCaseSheet((prev) => ({
                                    ...prev,
                                    personalHistory: {
                                        ...prev.personalHistory,
                                        dietaryHabits: {
                                            ...prev.personalHistory.dietaryHabits,
                                            meals: e.target.value,
                                        },
                                    },
                                }))
                            }
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label style={{ width: 150 }}>Water Intake</label>
                        <Input
                            placeholder="e.g., 2 liters/day"
                            value={caseSheet.personalHistory.dietaryHabits.waterIntake}
                            onChange={(e) =>
                                setCaseSheet((prev) => ({
                                    ...prev,
                                    personalHistory: {
                                        ...prev.personalHistory,
                                        dietaryHabits: {
                                            ...prev.personalHistory.dietaryHabits,
                                            waterIntake: e.target.value,
                                        },
                                    },
                                }))
                            }
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label style={{ width: 150 }}>Other</label>
                        <Input
                            placeholder="Specify if any"
                            value={caseSheet.personalHistory.dietaryHabits.other}
                            onChange={(e) =>
                                setCaseSheet((prev) => ({
                                    ...prev,
                                    personalHistory: {
                                        ...prev.personalHistory,
                                        dietaryHabits: {
                                            ...prev.personalHistory.dietaryHabits,
                                            other: e.target.value,
                                        },
                                    },
                                }))
                            }
                        />
                    </div>
                </div>


                <label style={{ width: 150 }}>Sleep Patterns</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label style={{ width: 150 }}>Day</label>
                        <Input
                            value={caseSheet.personalHistory.sleepPatterns.day}
                            onChange={(e) =>
                                setCaseSheet((prev) => ({
                                    ...prev,
                                    personalHistory: {
                                        ...prev.personalHistory,
                                        sleepPatterns: {
                                            ...prev.personalHistory.sleepPatterns,
                                            day: e.target.value,
                                        },
                                    },
                                }))
                            }
                            style={{width:500}}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label style={{ width: 150 }}>Night</label>
                        <Input
                            value={caseSheet.personalHistory.sleepPatterns.night}
                            onChange={(e) =>
                                setCaseSheet((prev) => ({
                                    ...prev,
                                    personalHistory: {
                                        ...prev.personalHistory,
                                        sleepPatterns: {
                                            ...prev.personalHistory.sleepPatterns,
                                            night: e.target.value,
                                        },
                                    },
                                }))
                            }
                            style={{width:500}}
                        />
                    </div>
                </div>



                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label style={{ width: 150 }}>Addiction</label>
                        <Checkbox.Group
                            options={addictionOptions}
                            value={caseSheet.personalHistory.addiction.option}
                            onChange={(checkedValues) =>
                                setCaseSheet((prev) => ({
                                    ...prev,
                                    personalHistory: {
                                        ...prev.personalHistory,
                                        addiction: {
                                            ...prev.personalHistory.addiction,
                                            option: checkedValues,
                                            other: checkedValues.includes('Other') ? prev.personalHistory.addiction.other : '',
                                        },
                                    },
                                }))
                            }
                        />
                    </div>

                    {caseSheet.personalHistory.addiction.option.includes('Other') && (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <label style={{ width: 150 }}>Specify Other</label>
                            <Input
                                placeholder="Enter details"
                                value={caseSheet.personalHistory.addiction.other}
                                onChange={(e) =>
                                    setCaseSheet((prev) => ({
                                        ...prev,
                                        personalHistory: {
                                            ...prev.personalHistory,
                                            addiction: {
                                                ...prev.personalHistory.addiction,
                                                other: e.target.value,
                                            },
                                        },
                                    }))
                                }
                            />
                        </div>
                    )}
                </div>



                <Divider />
                <Title level={5}>Physical Examination</Title>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16}}>
                    <label style={{ width: 150 }}>Pulse</label>
                    <Input
                        value={caseSheet.physicalExamination.pulse}
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                physicalExamination: {
                                    ...prev.physicalExamination,
                                    pulse: e.target.value,
                                },
                            }))
                        }
                        style={{width:500}}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>B/P</label>
                    <Input
                        value={caseSheet.physicalExamination.bp}
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                physicalExamination: {
                                    ...prev.physicalExamination,
                                    bp: e.target.value,
                                },
                            }))
                        }
                        style={{width:500}}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Weight</label>
                    <Input
                        value={caseSheet.physicalExamination.weight}
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                physicalExamination: {
                                    ...prev.physicalExamination,
                                    weight: e.target.value,
                                },
                            }))
                        }
                        style={{width:500}}
                    />
                </div>

                <Divider />
                <Title level={5}>Investigations</Title>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Blood Test</label>
                    <Radio.Group
                        value={caseSheet.investigation.bloodTest}
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                investigation: {
                                    ...prev.investigation,
                                    bloodTest: e.target.value,
                                },
                            }))
                        }

                    >
                        <Radio value="FBC">FBC</Radio>
                        <Radio value="ESR">ESR</Radio>
                        <Radio value="CRP">CRP</Radio>
                    </Radio.Group>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Imaging Test</label>
                    <Radio.Group
                        value={caseSheet.investigation.imagingTest}
                        onChange={(e) =>
                            setCaseSheet((prev) => ({
                                ...prev,
                                investigation: {
                                    ...prev.investigation,
                                    imagingTest: e.target.value,
                                },
                            }))
                        }

                    >
                        <Radio value="X ray">X ray</Radio>
                        <Radio value="MRI">MRI</Radio>
                    </Radio.Group>
                </div>


                <Divider />
                <Title level={5}>Differential Diagnosis</Title>
                <ReactQuill
                    theme="snow"
                    value={caseSheet.differentialDiagnosis}
                    onChange={(e) =>
                        setCaseSheet((prev) => ({
                            ...prev,
                            differentialDiagnosis: e.target.value,
                        }))
                    }
                />

                <Divider />
                <Title level={5}>Diagnosis</Title>
                <DiseaseCodeSelect
                    diseaseCodesFromDB={diseaseCodes}
                    selectedDiseaseCodes={selectedDieaseCodes}
                    setSelectedDiseaseCodes={setSelectedDieaseCodes}
                />

                <Divider/>
                <Title level={5}>Diagnosing AMA Condition</Title>
                {amaQuestions.map(({ label, name, options }) => (
                    <Row key={name} align="middle" gutter={16}>
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
                ))}

                <Divider />
                <Title level={5}>Treatments</Title>
                <TreatmentSelect
                    treatmentsFromDB={treatments}
                    treatments={selectedTreatments}
                    setTreatments={setSelectedTreatments}
                />

                <Divider />
                <Title level={5}>Prescription</Title>
                <Row gutter={16} style={{ marginBottom: '16px' }} align="middle">
                    <Col>
                        <label>Drug Name</label>
                        <Select
                            showSearch
                            placeholder="Select drug"
                            style={{ width: 250 }}
                            onChange={(value) => {
                                const selected = drugs.find((d) => d.id === value);
                                setCurrentDrug(selected);
                            }}
                            value={currentDrug?.id}
                        >
                            {drugs.map((drug) => (
                                <Select.Option key={drug.id} value={drug.id}>
                                    {drug.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Col>

                    <Col>
                        <label>Qty</label>
                        <Input
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            style={{ width: 80 }}
                        />
                    </Col>

                    <Col>
                        <label>Instruction</label>
                        <Input value={instruction} onChange={(e) => setInstruction(e.target.value)} />
                    </Col>

                    <Col>
                        <label>Duration</label>
                        <Input value={duration} onChange={(e) => setDuration(e.target.value)} />
                    </Col>

                    <Col>
                        <label>&nbsp;</label> {/* For spacing */}
                        <Button
                            icon={<PlusOutlined />}
                            type="primary"
                            onClick={() => {
                                if (!currentDrug || !qty || !instruction) return;

                                const newEntry = {
                                    id: currentDrug.id,
                                    name: currentDrug.name,
                                    qty,
                                    instruction,
                                    duration
                                };

                                const updatedList = [...prescription, newEntry];
                                setPrescription(updatedList);
                                setCurrentDrug(null);
                                setQty('');
                                setInstruction('');
                                setDuration('');
                            }}
                        >
                            Add
                        </Button>
                    </Col>
                </Row>


                <List
                    style={{ marginBottom: '16px' }}
                    bordered
                    dataSource={prescription}
                    renderItem={(item, index) => (
                        <List.Item
                            actions={[
                                <Button size="small" danger onClick={() => handleRemove(index)}>Remove</Button>
                            ]}
                        >
                            {item.name} - Qty: {item.qty}, Instruction: {item.instruction},  Duration : {item.duration}
                        </List.Item>
                    )}
                />

                <Divider/>

                <ClinicSelect
                    clinicsFromDB={clinics}
                    selectedClinics={selectedClinic}
                    setSelectedClinics={setSelectedClinic}
                />

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Next Visit Date</label>
                    <DatePicker
                        format="YYYY-MM-DD"
                        onChange={(date, dateString) => setNextVisitDate(dateString)}
                        style={{ width: 200 }}
                    />
                </div>

                <div style={{marginBottom: 16 }}>
                    <label style={{ width: 150 }}>Remark</label>
                    <ReactQuill
                        theme="snow"
                        value={remark}
                        onChange={(value) => setRemark(value)}
                    />
                </div>

                <Divider />



                <div style={{ marginTop: 16, display: 'flex', gap: 16 }}>

                    <Button variant="solid" color="default" onClick={() => handleSubmit()}>
                        Submit Case Sheet
                    </Button>
                </div>

        </Card>

    );
}

export default StreeRogaForm_old;
