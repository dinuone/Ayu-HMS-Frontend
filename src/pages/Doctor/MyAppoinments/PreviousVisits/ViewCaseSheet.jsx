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

    // Function to handle go back action
    const handleGoBack = () => {
        navigate(-1); // Navigates to the previous page in history
    };


    function handleBack() {
        // Example: use window.history.back() or a router navigate
        window.history.back();
    }

    function handleDownload() {
        // Download patientLog and caseSheet JSON as file (simple example)
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ patientLog, caseSheet }, null, 2));
        const dlAnchorElem = document.createElement('a');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", `case_sheet_${patientLog.id}.json`);
        dlAnchorElem.click();
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


    console.log(patientLog)
    console.log(caseSheet)

    const previousVisits = [
        { id: 1, date: '2025-06-15', doctor_name: 'Dr. Smith', summary: 'Follow-up visit for hypertension.' },
        { id: 2, date: '2025-05-10', doctor_name: 'Dr. Jones', summary: 'Initial consultation and diagnosis.' },
        // ...
    ]
    return (
        <>
            {patientLog?.casesheet_type === "General" && (
                <ViewGeneralCaseSheet
                    patientLog={patientLog}
                    caseSheet={caseSheet}

                />
            )}

            {patientLog?.casesheet_type === "Stree Roga" && (
                <ViewStreeRogaCaseSheet
                    patientLog={patientLog}
                    caseSheet={caseSheet}
                    loading={loading}
                    onBack={handleGoBack}
                    onDownload={handleDownload}
                    previousVisits={previousVisits}
                />
            )}
        </>
    );
}

export default ViewCaseSheet;