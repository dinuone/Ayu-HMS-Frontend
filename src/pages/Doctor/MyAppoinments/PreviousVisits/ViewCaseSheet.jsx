import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate
import api from "../../../../Services/NetworkManager.js";
import { message, Card, Row, Col, Typography, Tag, Descriptions, Table, Divider, Spin, Empty, Button } from 'antd'; // Import Button
import {
    ArrowLeftOutlined, // Import ArrowLeftOutlined
    UserOutlined,
    CalendarOutlined,
    MedicineBoxOutlined,
    ExperimentOutlined,
    TeamOutlined,
    FileTextOutlined,
    CarryOutOutlined,
    InteractionOutlined,
    ScheduleOutlined,
    HeartOutlined,
    HistoryOutlined,
    UsergroupAddOutlined,
    BugOutlined,
    SolutionOutlined,
    EyeOutlined,
    AppleOutlined,
    BehanceOutlined
} from '@ant-design/icons';
import ViewGeneralCaseSheet from "./ViewGeneralCaseSheet.jsx";
import ViewStreeRogaCaseSheet from "./ViewStreeRogaCaseSheet.jsx";

const { Title, Text, Paragraph } = Typography;

function ViewCaseSheet() {
    const params = useParams();
    const navigate = useNavigate(); // Initialize navigate
    const [patientLog, setPatientLog] = useState(null);
    const [caseSheet, setCaseSheet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [visitData,setVisitData] = useState([]);

    // Function to handle go back action
    const handleGoBack = () => {
        navigate(-1); // Navigates to the previous page in history
    };


    function handleBack() {
        // Example: use window.history.back() or a router navigate
        window.history.back();
    }


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await api.get(`patient-log/get-patient-log-by-visit-id/${params.visitId}`);
                const data = res.data.data;
                setPatientLog(data);
                // Safely parse the case_sheet JSON
                if (data && typeof data.case_sheet === 'string') {
                    setCaseSheet(JSON.parse(data.case_sheet));
                }
            } catch (error) {
                console.log(error)
            } finally {

                setTimeout(()=>{
                    setLoading(false);
                },300)

            }
        };

        if (params.visitId) {
            fetchData();

        }

    }, [params.visitId]);


    useEffect(() => {
        if (caseSheet && patientLog?.patient_id) {
            fetchVisitHistory();
        }
    }, [caseSheet]);

    const fetchVisitHistory = async () => {
        setLoading(true);
        try {
            const res = await api.get(`patient-visit/get-by-patient/${patientLog.patient_id}`);
            setVisitData(res.data.data);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };


    console.log(patientLog)
    console.log(caseSheet)


    return (
        <>
            {patientLog?.casesheet_type === "General" && (
                <ViewGeneralCaseSheet
                    visitData={visitData}
                    patientLog={patientLog}
                    caseSheet={caseSheet}
                    loading={loading}
                    onBack={handleGoBack}
                />
            )}

            {patientLog?.casesheet_type === "Stree Roga" && (
                <ViewStreeRogaCaseSheet
                    patientLog={patientLog}
                    caseSheet={caseSheet}
                    loading={loading}
                    onBack={handleGoBack}
                    visitData={visitData}
                />
            )}
        </>
    );
}

export default ViewCaseSheet;