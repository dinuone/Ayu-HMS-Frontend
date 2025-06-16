
import { Card, Divider, } from 'antd';
import { useStreeRogaForm } from '../hooks/useStreeRogaForm.js';
import FormSections from "./FormSection.jsx";
import SubmitSection from "./Sections/SubmitSection.jsx";

function StreeRogaForm({visitId,regNumber,chitNumber}) {
    const {
        caseSheet,
        prescription,
        masterData,
        handleFieldChange,
        handleAddPrescription,
        handleRemovePrescription,
        handleSubmit,
        submitting
    } = useStreeRogaForm(visitId,regNumber,chitNumber);

    return (
       <>
           <FormSections
               caseSheet={caseSheet}
               prescription={prescription}
               masterData={masterData}
               onFieldChange={handleFieldChange}
               onAddPrescription={handleAddPrescription}
               onRemovePrescription={handleRemovePrescription}
           />

           <Divider />

           <SubmitSection onSubmit={handleSubmit} loading={submitting}/>
       </>
    );
}

export default StreeRogaForm;