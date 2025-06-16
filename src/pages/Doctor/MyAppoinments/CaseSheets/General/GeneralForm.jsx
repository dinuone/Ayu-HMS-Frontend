import React, {useCallback, useEffect, useState} from 'react';
import {Button, Checkbox, Divider, Collapse, Row, Col, message, Typography} from 'antd';
import { MinusOutlined, CaretRightOutlined} from '@ant-design/icons';
import CardioVascularSystem from './Sections/CardioVascularSystem.jsx';
import RespiratorySystem from './Sections/RespiratorySystem.jsx'
import GastroIntestinalSystem from "./Sections/GastroIntestinalSystem.jsx";
import CirculatorySystem from "./Sections/CirculatorySystem.jsx";
import MuscularSystem from "./Sections/MuscularSystem.jsx";
import SkeletalSystem from "./Sections/SkeletalSystem.jsx";
import IntegumentarySystem from "./Sections/IntegumentarySystem.jsx";
import MotorFunctions from "./Sections/MotorFunctions.jsx";
import SensoryFunctions from "./Sections/SensoryFunctions.jsx";
import ReproductiveSystem from "./Sections/ReproductiveSystem.jsx";
import MedicalHistory from "../StreeRoga/Sections/MedicalHistory.jsx";
import PersonalHistory from "../StreeRoga/Sections/PersonalHistory.jsx";
import DiseaseCodeSelect from "../Common/DiseaseCodeSelect.jsx";
import TreatmentSelect from "../Common/TreatmentSelect.jsx";
import Prescription from "../Common/Prescription.jsx";
import ClinicSelect from "../Common/ClinicSelect.jsx";
import NextVisit from "../StreeRoga/Sections/NextVisit.jsx";
import Remarks from "../Common/Remarks.jsx";
import {useNavigate} from "react-router-dom";
import api from "../../../../../Services/NetworkManager.js";

const { Panel } = Collapse;

const systemComponents = {
    respiratory: RespiratorySystem,
    gastroIntestinal: GastroIntestinalSystem,
    cardiovascular: CardioVascularSystem,
    circulatory: CirculatorySystem,
    muscular: MuscularSystem,
    skeletal: SkeletalSystem,
    integumentary: IntegumentarySystem,
    motorFunctions:MotorFunctions,
    sensoryFunctions: SensoryFunctions,
    reproductiveSystem: ReproductiveSystem,

    // Add other systems here
};

const systemDisplayNames = {
    respiratory: "Respiratory System",
    cardiovascular: "Cardiovascular System",
    gastroIntestinal: "Gastro Intestinal System",
    circulatory: "Circulatory System",
    muscular: "Muscular System",
    skeletal: "Skeletal System",
    integumentary: "Integumentary System",
    motorFunctions: "Motor Functions",
    sensoryFunctions: "Sensory Functions",
    reproductiveSystem : "Reproductive System"

    // Add other systems here
};

const initalCaseSheet = {
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
    selectedDiseaseCodes:[],
    selectedTreatments:[],
    selectedClinics:[],
    nextVisitDate:'',
    remarks:''
}

const { Title } = Typography;

const GeneralForm = ({visitId,regNumber,chitNumber}) => {
    const [selectedSystems, setSelectedSystems] = useState([]);
    const [caseSheetData, setCaseSheetData] = useState(initalCaseSheet);
    const [activePanels, setActivePanels] = useState([]);
    const [prescription, setPrescription] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [masterData, setMasterData] = useState({
        diseaseCodes: [],
        drugs: [],
        treatments: [],
        clinics: [],
    });

    const handleSystemToggle = (system) => {
        if (selectedSystems.includes(system)) {
            setSelectedSystems(selectedSystems.filter(s => s !== system));

            // Remove data for deselected system
            const newData = { ...caseSheetData };
            delete newData[system];
            setCaseSheetData(newData);
        } else {
            setSelectedSystems([...selectedSystems, system]);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);

        // TODO : UpLoad documents
        var isAssignedToClinics = false;
        if (caseSheetData.selectedClinics.length > 0) {
            isAssignedToClinics = true;
        }

        const payload = {
            patient_reg_no: regNumber,
            visit_id: visitId,
            casesheet: JSON.stringify(caseSheetData),
            prescription: prescription,
            is_assigned_to_clinic: isAssignedToClinics,
            next_visit_date: caseSheetData.nextVisitDate,
            chit_number: chitNumber,
            treatments: caseSheetData.selectedTreatments,
            clinics: caseSheetData.selectedClinics,
            diagnosis: caseSheetData.selectedDiseaseCodes,
            remarks: caseSheetData.remarks
        }

        console.log("payload -----", payload)

        try {
            const res = await api.post('patient-log/Create', payload);
            if (res.status === 200) {
                message.success('Case sheet saved successfully');
                setCaseSheetData(initalCaseSheet);
                setPrescription([]);
            }
        } catch (error) {
            message.error(error.response?.data?.message || 'Failed to submit case sheet');
        } finally {
            setLoading(false); // Stop loading
            navigate('/my-appointment-list')
        }

        // Add your submission logic here
    }

    const handleSystemChange = useCallback((path, value) => {

        setCaseSheetData(prev => {
            const paths = path.split('.');
            const newState = {...prev};
            let current = newState;

            for (let i = 0; i < paths.length - 1; i++) {
                if (!current[paths[i]]) current[paths[i]] = {};
                current[paths[i]] = {...current[paths[i]]};
                current = current[paths[i]];
            }

            current[paths[paths.length - 1]] = value;
            return newState;
        });
    }, []);

    const handlePanelChange = (keys) => {
        setActivePanels(keys);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('patient-log/get-master-data');
                setMasterData(res.data.data);
            } catch (error) {
                message.error(error.response?.data?.message || 'Failed to fetch data');

            }
        };

        fetchData();
    }, []);

    // Add prescription item
    const handleAddPrescription = ((item) => {
        setPrescription(prev => [...prev, item]);
    })

    // Remove prescription item
    const handleRemovePrescription = ((index) => {
        setPrescription(prev => prev.filter((_, i) => i !== index));
    })

    console.log("case sheet data --------------->",caseSheetData)

    return (
        <>
            <MedicalHistory
                data={caseSheetData?.previousMedicalHistory || {}}
                onChange={(field, value) => handleSystemChange(`previousMedicalHistory.${field}`, value)}
            />

            <Divider/>

            <PersonalHistory
                data={caseSheetData?.personalHistory || {}}
                onChange={(field, field2, value) => handleSystemChange(`personalHistory.${field}.${field2}`, value)}
                onDetailChange={(field, field2, value) => handleSystemChange(`personalHistory.${field}.${field2}`, value)}
            />

            <Divider/>

            <div style={{ marginBottom: 24 }}>
                <h3>Select Body Systems:</h3>
                <Row gutter={16}>
                    {Object.keys(systemComponents).map(system => (
                        <Col span={8} key={system}>
                            <Checkbox
                                checked={selectedSystems.includes(system)}
                                onChange={() => handleSystemToggle(system)}
                            >
                                {systemDisplayNames[system]}
                            </Checkbox>
                        </Col>
                    ))}
                </Row>
            </div>

            <Divider />

            <Collapse
                activeKey={activePanels}
                bordered={false}
                defaultActiveKey={['1']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                onChange={handlePanelChange}
            >
                {selectedSystems.map(system => {
                    const SystemComponent = systemComponents[system];
                    return (
                        <Panel
                            key={system}
                            header={systemDisplayNames[system]}
                            extra={
                                <Button
                                    type="text"
                                    icon={<MinusOutlined />}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSystemToggle(system);
                                    }}
                                />
                            }
                        >
                            <SystemComponent
                                data={caseSheetData[system] || {}}
                                onChange={(field, value) => handleSystemChange(`${system}.${field}`, value)}
                            />
                        </Panel>
                    );
                })}
            </Collapse>


            <Divider />
            <Title level={5}>Diagnosis</Title>
            <DiseaseCodeSelect
                diseaseCodesFromDB={masterData.diseaseCodes}
                value={caseSheetData?.selectedDiseaseCodes || {}}
                onChange={(value) => handleSystemChange('selectedDiseaseCodes', value)}
            />

            <Divider />
            <TreatmentSelect
                treatmentsFromDB={masterData.treatments}
                value={caseSheetData.selectedTreatments}
                onChange={(value) => handleSystemChange('selectedTreatments', value)}
            />

            <Divider />
            <Prescription
                drugs={masterData.drugs}
                items={prescription}
                onAdd={handleAddPrescription}
                onRemove={handleRemovePrescription}
            />

            <Divider />
            <ClinicSelect
                clinicsFromDB={masterData.clinics}
                value={caseSheetData.selectedClinics || {}}
                onChange={(value) => handleSystemChange('selectedClinics', value)}
            />

            <NextVisit
                value={caseSheetData.nextVisitDate || {}}
                onChange={(value) => handleSystemChange('nextVisitDate', value)}
            />
            <Remarks
                value={caseSheetData.remarks || {}}
                onChange={(value) => handleSystemChange('remarks', value)}
            />

            <div style={{ textAlign: 'right', marginTop: 20 }}>
                <Button color="default" variant="solid" loading={loading} onClick={handleSubmit} >
                    Submit Case Sheet
                </Button>
            </div>
        </>
    );
};

export default GeneralForm;