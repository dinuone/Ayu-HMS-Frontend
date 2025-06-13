
import { Card, Divider, } from 'antd';
import { useStreeRogaForm } from '../hooks/useStreeRogaForm.js';
import FormSections from "./FormSection.jsx";
import SubmitSection from "./Sections/SubmitSection.jsx";

function StreeRogaForm({visitId,regNumber,chitNumber}) {
    const {
        caseSheet,
        prescription,
        masterData,
        loading,
        handleFieldChange,
        handleAddPrescription,
        handleRemovePrescription,
        handleSubmit,
    } = useStreeRogaForm(visitId,regNumber,chitNumber);

    return (
        <Card loading={loading}>
            <FormSections
                caseSheet={caseSheet}
                prescription={prescription}
                masterData={masterData}
                onFieldChange={handleFieldChange}
                onAddPrescription={handleAddPrescription}
                onRemovePrescription={handleRemovePrescription}
            />

            <Divider />

            <SubmitSection onSubmit={handleSubmit} />
        </Card>
    );
}

export default StreeRogaForm;