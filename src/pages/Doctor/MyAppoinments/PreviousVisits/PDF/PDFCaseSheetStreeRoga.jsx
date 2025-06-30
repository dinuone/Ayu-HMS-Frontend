import { Document, Page, View, Text, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import dayjs from 'dayjs';

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        fontSize: 12,
        lineHeight: 1.5,
    },
    header: {
        textAlign: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 15,
        pageBreakInside: 'avoid',
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        borderBottom: '1px solid #000',
        paddingBottom: 5,
    },
    table: {
        width: '100%',
        marginBottom: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
        borderCollapse: 'collapse',
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCell: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
        padding: 5,
        fontSize: 10,
    },
    tableHeader: {
        backgroundColor: '#f0f0f0',
        fontWeight: 'bold',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 10,
        color: '#666',
    },
});

const tagStyle = {
    border: '1px solid #000',
    borderRadius: 3,
    padding: '3px 5px',
    marginRight: 5,
    marginBottom: 5
};

export const PDFCaseSheetStreeRoga = ({ patientLog, caseSheet, previousVisits }) => {
    // Helper component for description items
    const DescriptionItem = ({ label, children }) => (
        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
            <Text style={{ fontWeight: 'bold', width: '30%' }}>{label}:</Text>
            <Text style={{ width: '70%' }}>{children || 'N/A'}</Text>
        </View>
    );

    // Helper component for table rows
    const TableRow = ({ label, value }) => (
        <View style={styles.tableRow}>
            <View style={[styles.tableCell, { width: '40%' }]}>
                <Text style={{ fontWeight: 'bold' }}>{label}</Text>
            </View>
            <View style={[styles.tableCell, { width: '60%' }]}>
                <Text>{value || 'N/A'}</Text>
            </View>
        </View>
    );

    return (
        <Document>
            {/* Page 1 - Patient Information and Chief Complaint */}
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Harendra Ayurveda Hospital Pvt(Ltd)</Text>
                    <Text style={{ fontWeight: 'bold' }}>
                        Case Sheet - {patientLog?.casesheet_type || 'Stree Roga'}
                    </Text>
                    <Text>Generated on: {dayjs().format('DD MMM YYYY hh:mm A')}</Text>
                </View>

                {/* Hospital Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Hospital Information</Text>
                    <DescriptionItem label="Date" children={dayjs(patientLog?.visit_date).format('DD MMM YYYY')} />
                    <DescriptionItem label="Consultant Name" children={patientLog?.doctor_name} />
                    <DescriptionItem label="Patient Number" children={patientLog?.chit_number} />
                </View>

                {/* Patient Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Patient Details</Text>
                    <DescriptionItem label="Name" children={patientLog?.patient_data.name} />
                    <DescriptionItem label="Age" children={patientLog?.patient_data.age} />
                    <DescriptionItem label="Gender" children={patientLog?.patient_data.gender} />
                    <DescriptionItem label="Marital Status" children={patientLog?.patient_data.marital_status} />
                    <DescriptionItem
                        label="Address"
                        children={`${patientLog?.patient_data.address_line_1}, ${patientLog?.patient_data.address_line_2 || ''}`}
                    />
                    <DescriptionItem label="Occupation" children={patientLog?.patient_data.occupation} />
                </View>

                {/* Chief Complaint */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Chief Complaint</Text>
                    <Text>{caseSheet.chiefComplaint?.replace(/<[^>]+>/g, '') || 'No data'}</Text>
                </View>

                {/* Other Complaints */}
                {caseSheet.otherComplaints && caseSheet.otherComplaints.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Other Complaints</Text>
                        {caseSheet.otherComplaints.map((complaint, index) => (
                            <Text key={index}>• {complaint}</Text>
                        ))}
                    </View>
                )}
            </Page>

            {/* Page 2 - Menstrual History */}
            <Page size="A4" style={styles.page}>
                <Text style={styles.sectionTitle}>Menstrual History (Arthava Ithihasa)</Text>
                <View style={styles.table}>
                    <TableRow label="Pushpa Darshana (Menarche)" value={caseSheet.menstrualHistory?.pushpaDarshana} />
                    <TableRow label="Regular/Irregular" value={caseSheet.menstrualHistory?.regularIrregular} />

                    <View style={[styles.tableRow, { backgroundColor: '#f0f0f0' }]}>
                        <View style={[styles.tableCell, { width: '100%' }]}>
                            <Text style={{ fontWeight: 'bold' }}>Characteristic of Menstruation</Text>
                        </View>
                    </View>

                    <TableRow label="Color" value={caseSheet.menstrualHistory?.color} />
                    <TableRow label="Order" value={caseSheet.menstrualHistory?.order} />
                    <TableRow label="Other" value={caseSheet.menstrualHistory?.other} />
                    <TableRow label="Duration of Flow" value={caseSheet.menstrualHistory?.durationOfFlow} />
                    <TableRow label="Interval" value={caseSheet.menstrualHistory?.interval} />
                    <TableRow label="Pain" value={caseSheet.menstrualHistory?.pain} />
                    <TableRow label="Volume" value={caseSheet.menstrualHistory?.volume} />
                    <TableRow label="LMP" value={caseSheet.menstrualHistory?.lmp} />
                </View>

                <Text style={styles.sectionTitle}>Obstetric History (Prasawa Ithihasa)</Text>
                <View style={styles.table}>
                    <TableRow label="Number of Pregnancy" value={caseSheet.obstetricHistory?.numberOfPregnacy} />
                    <TableRow label="Labor" value={caseSheet.obstetricHistory?.labour} />
                    <TableRow label="Date of Last Delivery" value={caseSheet.obstetricHistory?.dateOfLastDelivery} />
                    <TableRow label="Particulars of Deliveries" value={caseSheet.obstetricHistory?.particularsOfDeliveries} />
                    <TableRow
                        label="History of Garbha Srava / Pata"
                        value={caseSheet.obstetricHistory?.historyOfGarbha}
                    />
                    <TableRow
                        label="Mudha Garbha Ithihasaya"
                        value={caseSheet.obstetricHistory?.mudhaGarbhaIthihasaya}
                    />
                    <TableRow
                        label="Contraceptive history"
                        value={caseSheet.obstetricHistory?.contraceptiveHistory?.replace(/<[^>]+>/g, '')}
                    />
                </View>
            </Page>

            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>History of Present Illness</Text>
                    <DescriptionItem label="Onset" children={caseSheet?.historyOfPresentIllness.onset} />
                    <DescriptionItem label="Progression" children={caseSheet?.historyOfPresentIllness.progression} />
                    <DescriptionItem label="Previous Treatment" children={caseSheet?.historyOfPresentIllness.previousTreatment} />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Previous Medical History</Text>
                    <DescriptionItem label="Previous joint problems" children={caseSheet?.previousMedicalHistory.previousJointProblem} />
                    <Text style={styles.sectionTitle}>Other Major Illness</Text>
                    <DescriptionItem label="HTN" children={caseSheet?.previousMedicalHistory.otherMajorIllness_HTN} />
                    <DescriptionItem label="DM" children={caseSheet?.previousMedicalHistory.otherMajorIllness_DM} />
                    <DescriptionItem label="CHO" children={caseSheet?.previousMedicalHistory.otherMajorIllness_CHO} />
                    <DescriptionItem label="THY" children={caseSheet?.previousMedicalHistory.otherMajorIllness_THY} />
                    <DescriptionItem label="TB" children={caseSheet?.previousMedicalHistory.otherMajorIllness_TB} />
                    <DescriptionItem label="Surgeries" children={caseSheet?.previousMedicalHistory.surgeries} />
                    <DescriptionItem label="Allergies" children={caseSheet?.previousMedicalHistory.allergies} />
                    <DescriptionItem label="Family history" children={caseSheet?.previousMedicalHistory.familyHistory} />
                </View>
            </Page>

            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Personal History</Text>
                    {caseSheet.personalHistory?.dietaryHabits?.option && (
                        <View style={tagStyle}>
                            <Text>{caseSheet.personalHistory.dietaryHabits.option}</Text>
                        </View>
                    )}
                    {caseSheet.personalHistory?.dietaryHabits?.meals && (
                        <View style={tagStyle}>
                            <Text>Meals: {caseSheet.personalHistory.dietaryHabits.meals}</Text>
                        </View>
                    )}
                    {caseSheet.personalHistory?.dietaryHabits?.waterIntake && (
                        <View style={tagStyle}>
                            <Text>Water: {caseSheet.personalHistory.dietaryHabits.waterIntake}</Text>
                        </View>
                    )}
                    {caseSheet.personalHistory?.dietaryHabits?.other && (
                        <View style={tagStyle}>
                            <Text>Other: {caseSheet.personalHistory.dietaryHabits.other}</Text>
                        </View>
                    )}
                </View>

                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>Sleep Patterns:</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5 }}>
                        {caseSheet.personalHistory?.sleepPatterns?.day && (
                            <View style={tagStyle}>
                                <Text>Day: {caseSheet.personalHistory.sleepPatterns.day}</Text>
                            </View>
                        )}
                        {caseSheet.personalHistory?.sleepPatterns?.night && (
                            <View style={tagStyle}>
                                <Text>Night: {caseSheet.personalHistory.sleepPatterns.night}</Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* Addiction */}
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>Addiction:</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5 }}>
                        {caseSheet.personalHistory?.addiction?.option?.map((item, index) => (
                            <View key={index} style={tagStyle}>
                                <Text>{item}</Text>
                            </View>
                        ))}
                        {caseSheet.personalHistory?.addiction?.other && (
                            <View style={tagStyle}>
                                <Text>{caseSheet.personalHistory.addiction.other}</Text>
                            </View>
                        )}
                    </View>
                </View>


            </Page>


            {/* Page 4 - Diagnosis and Prescription */}
            <Page size="A4" style={styles.page}>
                {/* Diagnosis */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Diagnosis</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {caseSheet.selectedDiseaseCodes?.map((item, index) => (
                            <View
                                key={index}
                                style={{
                                    border: '1px solid #000',
                                    borderRadius: 3,
                                    padding: '3px 5px',
                                    marginRight: 5,
                                    marginBottom: 5
                                }}
                            >
                                <Text>{item.name}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Prescription */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Prescription</Text>
                    {patientLog?.prescription?.length > 0 ? (
                        <View style={styles.table}>
                            {/* Table Header */}
                            <View style={[styles.tableRow, styles.tableHeader]}>
                                <View style={[styles.tableCell, { width: '40%' }]}>
                                    <Text>Medicine Name</Text>
                                </View>
                                <View style={[styles.tableCell, { width: '15%' }]}>
                                    <Text>Quantity</Text>
                                </View>
                                <View style={[styles.tableCell, { width: '30%' }]}>
                                    <Text>Instructions</Text>
                                </View>
                                <View style={[styles.tableCell, { width: '15%' }]}>
                                    <Text>Duration</Text>
                                </View>
                            </View>

                            {/* Table Rows */}
                            {patientLog.prescription.map((item, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <View style={[styles.tableCell, { width: '40%' }]}>
                                        <Text>{item.name}</Text>
                                    </View>
                                    <View style={[styles.tableCell, { width: '15%' }]}>
                                        <Text>{item.qty}</Text>
                                    </View>
                                    <View style={[styles.tableCell, { width: '30%' }]}>
                                        <Text>{item.instruction}</Text>
                                    </View>
                                    <View style={[styles.tableCell, { width: '15%' }]}>
                                        <Text>{item.duration}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <Text>No prescription data available</Text>
                    )}
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text>This document was generated electronically and does not require a signature.</Text>
                </View>
            </Page>
        </Document>
    );
};

// Helper component to render the PDF viewer for development
export const PDFViewerStreeRoga = ({ patientLog, caseSheet }) => (
    <PDFViewer width="100%" height="800px">
        <PDFCaseSheetStreeRoga patientLog={patientLog} caseSheet={caseSheet} />
    </PDFViewer>
);