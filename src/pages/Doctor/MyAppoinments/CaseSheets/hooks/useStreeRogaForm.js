
import { useState } from 'react';

export default function useStreeRogaForm() {
    const [caseSheet, setCaseSheet] = useState({
        // Initial state
    });

    const [prescription, setPrescription] = useState([]);

    // Generic field updater
    const setCaseSheetField = (path, value) => {
        setCaseSheet(prev => {
            const paths = path.split('.');
            const newState = {...prev};
            let current = newState;

            for (let i = 0; i < paths.length - 1; i++) {
                current[paths[i]] = {...current[paths[i]]};
                current = current[paths[i]];
            }

            current[paths[paths.length - 1]] = value;
            return newState;
        });
    };

    const addPrescriptionItem = (item) => {
        setPrescription(prev => [...prev, item]);
    };

    const removePrescriptionItem = (index) => {
        setPrescription(prev => prev.filter((_, i) => i !== index));
    };

    return {
        caseSheet,
        setCaseSheetField,
        prescription,
        addPrescriptionItem,
        removePrescriptionItem,
        // other state and handlers
    };
}