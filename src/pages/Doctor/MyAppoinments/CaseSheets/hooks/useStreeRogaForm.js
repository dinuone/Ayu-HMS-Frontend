// hooks/useStreeRogaForm.js
import { useState, useEffect, useCallback } from 'react';
import api from '../../../../../Services/NetworkManager.js';
import { message } from 'antd';
import {useNavigate} from "react-router-dom";

const initialCaseSheet = {
    chiefComplaint: '',
    otherComplaints: [],
    otherComplaint_specify:'',
    menstrualHistory: {
        pushpaDarshana: '',
        regularIrregular: '',
        charactersOfMenstruation_color:'',
        charactersOfMenstruation_order:'',
        charactersOfMenstruation_other:'',
        lmp: '',
        durationOfFlow:'',
        interval:'',
        pain:'',
        pain_specify:'',
        volume:'',
        volume_specify:''
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
    investigation:"",
    differentialDiagnosis:'',
    diagnosingAMA:{},
    selectedDiseaseCodes:[],
    selectedTreatments:[],
    selectedClinics:[],
    nextVisitDate:'',
    remarks:''
};

export function useStreeRogaForm(visitId,regNumber,chitNumber) {
    const [submitting, setSubmitting] = useState(false);
    const [caseSheet, setCaseSheet] = useState(initialCaseSheet);
    const [prescription, setPrescription] = useState([]);
    const navigate = useNavigate()
    const [masterData, setMasterData] = useState({
        diseaseCodes: [],
        drugs: [],
        treatments: [],
        clinics: [],
    });


    // Fetch master data on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('patient-log/get-master-data');
                setMasterData(res.data.data);
            } catch (error) {
                console.log(error)

            }
        };

        fetchData();
    }, []);

    // Generic field change handler
    const handleFieldChange = useCallback((path, value) => {
        setCaseSheet(prev => {
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

    // Add prescription item
    const handleAddPrescription = useCallback((item) => {
        setPrescription(prev => [...prev, item]);
    }, []);

    // Remove prescription item
    const handleRemovePrescription = useCallback((index) => {
        setPrescription(prev => prev.filter((_, i) => i !== index));
    }, []);

    // Form submission
    const handleSubmit = useCallback(async () => {
        setSubmitting(true);

        // TODO : UpLoad documents
        var isAssignedToClinics = false;
        if (caseSheet.selectedClinics.length > 0) {
            isAssignedToClinics = true;
        }

        const payload = {
            patient_reg_no: regNumber,
            visit_id: visitId,
            casesheet: JSON.stringify(caseSheet),
            prescription: prescription,
            is_assigned_to_clinic: isAssignedToClinics,
            next_visit_date: caseSheet.nextVisitDate,
            chit_number: chitNumber,
            treatments: caseSheet.selectedTreatments,
            clinics: caseSheet.selectedClinics,
            diagnosis: caseSheet.selectedDiseaseCodes,
            remarks: caseSheet.remarks,
            casesheet_type:"Stree Roga"
        }

        console.log("payload -----", payload)

        try {
            const res = await api.post('patient-log/Create', payload);
            if (res.status === 200) {
                setCaseSheet(initialCaseSheet);
                setPrescription([]);
            }
        } catch (error) {
           console.log(error)
        } finally {
            setSubmitting(false); // Stop loading
            navigate('/my-appointment-list')
        }

        // Add your submission logic here
    }, [caseSheet, prescription, visitId, regNumber, chitNumber]);

    return {
        caseSheet,
        prescription,
        masterData,
        handleFieldChange,
        handleAddPrescription,
        handleRemovePrescription,
        handleSubmit,
        submitting
    };
}