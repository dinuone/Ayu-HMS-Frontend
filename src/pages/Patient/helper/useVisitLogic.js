import { useState, useEffect } from 'react';
import api from "../../../Services/NetworkManager.js";
import {Form} from "antd";


export const useVisitLogic = (patientRegNo,form) => {
    const [visitType, setVisitType] = useState(null);
    const [visitSubType, setVisitSubType] = useState(null);
    const [selectedTreatments, setSelectedTreatments] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [loading, setLoading] = useState(false);
    const [clinicData, setClinicData] = useState([]);
    const [treatmentData, setTreatmentData] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [selectedClinic, setSelectedClinic] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [hospitalCharge, setHospitalCharge] = useState(0);
    const [customCharges, setCustomCharges] = useState({});
    const [doctorShift, setDoctorShift] = useState(null);


    const getCurrentDay = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[new Date().getDay()];
    };

    const getCurrentShift = () => {
        const hours = new Date().getHours();
        if (hours < 12) return 'First Half';
        if (hours < 21) return 'Second Half';
    };

    const getRates = async () => {
        try {
            const res = await api.get(`rates/list`);
            setHospitalCharge(res.data.data.hospital_charge);
            const parsedCustom = JSON.parse(res.data.data.custom_charge);
            setCustomCharges(parsedCustom);
        } catch (err) {
            console.log(err);
        }
    };

    const calculateTotalCostForClinic = () => {
        if (!selectedDoctor) return 0;

        const doctorFee = selectedDoctor?.doctor_fee || 0;
        const hospitalFee = hospitalCharge || 0;
        const customChargeTotal = Object.values(customCharges).reduce((acc, val) => acc + Number(val), 0);
        return (doctorFee + hospitalFee + customChargeTotal).toFixed(2);
    };

    const calculateTotalCostForFeelo = () => {
        if (!selectedTreatments || selectedTreatments.length === 0) return 0;

        return selectedTreatments.reduce((total, treatment) => {
            return total + (treatment.price || 0);
        }, 0).toFixed(2);

    };

    const calculateTotalForTreatments = () => {
        // Convert all values to numbers before calculation
        const treatmentCost = selectedTreatments.reduce((total, treatment) => {
            return total + (treatment.price || 0);
        }, 0); // Removed toFixed() here

        const doctorFee = Number(selectedDoctor?.doctor_fee) || 0;
        const customChargeTotal = Object.values(customCharges).reduce((acc, val) => acc + Number(val), 0);
        const hospitalFee = Number(hospitalCharge) || 0;

        const total = doctorFee + hospitalFee + customChargeTotal + treatmentCost;

        console.log("doctorFee", doctorFee, "customChargeTotal", customChargeTotal,
            "hospitalFee", hospitalFee, "treatmentFee", treatmentCost);
        console.log("total", total);

        return total.toFixed(2); // Apply toFixed() only at the end
    }

    const handleTreatmentSelect = async (values) => {
        const newTreatments = treatmentData.filter(t => values.includes(t.id));
        setSelectedTreatments(newTreatments);

        try {
            const res = await api.post(`patient-visit/get-available-dcotors-for-treatments`, { treatments: values });
            setDoctors(res.data.data);
            setSelectedDoctor(null);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchTreatments = async () => {
        try{
            const res = await api.get(`treatment/list`);
            setTreatmentData(res.data.data);
        }catch (err)
        {
            console.log(err);
        }
    }

    const getClinicsOrTreatments = async (type) => {
        try {
            const res = await api.get(`patient-visit/get-available-clinics-or-treatments/${type}`);
            if (type === 1) {
                setClinicData(res.data.data);
            } else {
                setTreatmentData(res.data.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleVisitTypeChange = (value) => {
        const type = value === "CLINIC /OPD" ? 1 : 2;
        setDoctors([]);
        setSelectedDoctor(null);
        setSelectedClinic(null);
        setSelectedTreatments([]);
        setVisitSubType(value);
        getClinicsOrTreatments(type);
    };

    const checkDoctorAvailability = (doctor) => {
        const currentDay = getCurrentDay();
        const currentShift = getCurrentShift();

        return doctor.available_days.some(day => {
            const isSameDay = day.day.toLowerCase() === currentDay.toLowerCase();
            if (day.shift === "Full Day" && isSameDay) {
                return true;
            } else {
                const available = day.shift === currentShift && isSameDay;
                setDoctorShift(day.shift);
                return available;
            }
        });
    };

    const handleClinicChange = async (clinicName) => {
        const clinic = clinicData.find(c => c.name === clinicName);
        if (!clinic) return;

        setSelectedClinic(clinic);
        setSelectedDoctor(null);

        try {
            const res = await api.get(`patient-visit/get-available-doctors-for-clinic/${clinic.id}`);
            setDoctors(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDoctorChange = (doctorId) => {
        const doctor = doctors.find(doc => doc.id === doctorId);
        setSelectedDoctor(doctor);
        if (doctor) {
            const isAvailable = checkDoctorAvailability(doctor);
            if (!isAvailable) {
                console.warn(`This doctor is not available today (${getCurrentDay()}) during the ${getCurrentShift()}`);
            }
        }
    };

    const clearVisitData = () => {
        // Reset all state values to their initial state
        setVisitType(null);
        setVisitSubType(null);
        setSelectedTreatments([]);
        setSelectedDoctor(null);
        setLoading(false);
        setClinicData([]);
        setTreatmentData([]);
        setTotalCost(0);
        setSelectedClinic(null);
        setDoctors([]);
        setHospitalCharge(0);
        setCustomCharges({});
        setDoctorShift(null);

        // Reset the form fields
        form.resetFields(); // Make sure you have access to the form instance

        // Refetch treatments data to repopulate the treatments list
        fetchTreatments();
        getRates();

        console.log("All state data cleared");
    };

    useEffect(() => {
        getRates();
        fetchTreatments()
    }, []);



    useEffect(() => {
        if (visitType === 'feelo') {
            const total = calculateTotalCostForFeelo()
            setTotalCost(total)
        }
    }, [selectedTreatments, visitSubType]);

    useEffect(() => {
        if (visitType === 'normal' && visitSubType === "CLINIC /OPD") {
            const total = calculateTotalCostForClinic();
            setTotalCost(total);
        }
    }, [selectedDoctor, selectedClinic, hospitalCharge, customCharges, visitSubType]);

    useEffect(() => {
        if(visitType === 'normal' && visitSubType === "TREATMENT") {
            const total = calculateTotalForTreatments()
            setTotalCost(total);
        }
    }, [selectedTreatments,selectedDoctor,visitSubType]);

    return {
        visitType,
        setVisitType,
        visitSubType,
        selectedTreatments,
        selectedDoctor,
        loading,
        setLoading,
        clinicData,
        treatmentData,
        totalCost,
        selectedClinic,
        doctors,
        hospitalCharge,
        customCharges,
        doctorShift,
        handleTreatmentSelect,
        handleVisitTypeChange,
        checkDoctorAvailability,
        handleClinicChange,
        handleDoctorChange,
        clearVisitData,
    };
};