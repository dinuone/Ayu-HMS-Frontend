// FormSections.jsx
import React, { memo } from 'react';
import { Divider, Typography } from 'antd';
import ChiefComplaint from './Sections/ChiefComplaint.jsx';
import OtherComplaint from "./Sections/OtherComplaint.jsx";
import MenstrualHistory from "./Sections/MenstrualHistory.jsx";
import ObstetricHistory from "./Sections/ObstetricHistory.jsx";
import PresentIllness from "./Sections/PresentIllness.jsx";
import MedicalHistory from "./Sections/MedicalHistory.jsx";
import PersonalHistory from "./Sections/PersonalHistory.jsx";
import PhysicalExam from "./Sections/PhysicalExam.jsx";
import Investigations from "./Sections/Investigations.jsx";
import DifferentialDiagnosis from "./Sections/DifferentialDiagnosis.jsx";
import DiseaseCodeSelect from "../Common/DiseaseCodeSelect.jsx";
import AMADiagnosis from "./Sections/AMADiagnosis.jsx";
import TreatmentSelect from "../Common/TreatmentSelect.jsx";
import Prescription from "../Common/Prescription.jsx";
import ClinicSelect from "../Common/ClinicSelect.jsx";
import NextVisit from "./Sections/NextVisit.jsx";
import Remarks from "../Common/Remarks.jsx";


const { Title } = Typography;

const FormSections = memo(({caseSheet, prescription, masterData, onFieldChange, onAddPrescription, onRemovePrescription}) => {

    return (
        <>
            <ChiefComplaint
                value={caseSheet.chiefComplaint}
                onChange={(value) => onFieldChange('chiefComplaint', value)}
            />

            <Divider />
            <OtherComplaint
                value={caseSheet.otherComplaints}
                onChange={(value) => onFieldChange('otherComplaints', value)}
                onDetailChange={(value) => onFieldChange('otherComplaint_specify', value)}
            />

            <Divider />

            <PresentIllness
                data={caseSheet.historyOfPresentIllness}
                onChange={(field, value) => onFieldChange(`historyOfPresentIllness.${field}`, value)}
            />


            <Divider />
            <MedicalHistory
                data={caseSheet.previousMedicalHistory}
                onChange={(field, value) => onFieldChange(`previousMedicalHistory.${field}`, value)}
            />

            <Divider />
            <PersonalHistory
                data={caseSheet.personalHistory}
                onChange={(field, field2, value) => onFieldChange(`personalHistory.${field}.${field2}`, value)}
                onDetailChange={(field, field2, value) => onFieldChange(`personalHistory.${field}.${field2}`, value)}
            />

            <Divider />
            <PhysicalExam
                data={caseSheet.physicalExamination}
                onChange={(field, value) => onFieldChange(`physicalExamination.${field}`, value)}
            />

            <Divider />

            <MenstrualHistory
               data={caseSheet.menstrualHistory}
               onChange={(field, value) => onFieldChange(`menstrualHistory.${field}`, value)}
            />

             <Divider />

            <ObstetricHistory
                data={caseSheet.obstetricHistory}
                onChange={(field, value) => onFieldChange(`obstetricHistory.${field}`, value)}
            />

           <Divider />

            <Investigations
                value={caseSheet.investigation}
                onChange={(value) => onFieldChange('investigation', value)}
            />

            <Divider/>
            <DifferentialDiagnosis
                value={caseSheet.differentialDiagnosis}
                onChange={(value) => onFieldChange('differentialDiagnosis', value)}
            />

            <Divider />
            <Title level={5}>Diagnosis</Title>
            <DiseaseCodeSelect
                diseaseCodesFromDB={masterData.diseaseCodes}
                value={caseSheet.selectedDiseaseCodes}
                onChange={(value) => onFieldChange('selectedDiseaseCodes', value)}
            />

            <Divider />
            <AMADiagnosis
                data={caseSheet.diagnosingAMA}
                onChange={(field, value) => onFieldChange(`diagnosingAMA.${field}`, value)}
            />

            <Divider />
            <TreatmentSelect
                treatmentsFromDB={masterData.treatments}
                value={caseSheet.selectedTreatments}
                onChange={(value) => onFieldChange('selectedTreatments', value)}
            />

            <Divider />
            <Prescription
                drugs={masterData.drugs}
                items={prescription}
                onAdd={onAddPrescription}
                onRemove={onRemovePrescription}
            />

            <Divider />
            <ClinicSelect
                clinicsFromDB={masterData.clinics}
                value={caseSheet.selectedClinics}
                onChange={(value) => onFieldChange('selectedClinics', value)}
            />

            <NextVisit
                value={caseSheet.nextVisitDate}
                onChange={(value) => onFieldChange('nextVisitDate', value)}
            />
            <Remarks
                value={caseSheet.remarks}
                onChange={(value) => onFieldChange('remarks', value)}
            />
        </>
    );
});

export default FormSections;