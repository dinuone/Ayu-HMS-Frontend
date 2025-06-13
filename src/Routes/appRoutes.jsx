import {Navigate, Outlet, useRoutes} from "react-router-dom";
import React, {Suspense} from "react";
import {useAuth} from "../Provider/authProvider.jsx";
import ProtectedRoute from "./protectedRoutes.jsx";
import Login from "../pages/Login.jsx";

import NotFound from "../pages/Notfound.jsx";
import DashboardLayout from "../Layout/DashboardLayout.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import BranchList from "../pages/Branch/BranchList.jsx";
import DrugCategoryList from "../pages/DrugCategory/DrugCategoryList.jsx";
import DiseaseCodeList from "../pages/DiseaseCode/DiseaseCodeList.jsx";
import TreatmentCategoryList from "../pages/TreatmentCategory/TreatmentCategoryList.jsx";
import ClinicCategoryList from "../pages/ClinicCategory/ClinicCategoryList.jsx";
import RatesConfiguration from "../pages/Rates/RatesConfiguration.jsx";
import TreatmentList from "../pages/Treatment/TreatmentList.jsx";
import DrugList from "../pages/Drugs/DrugList.jsx";
import PatientList from "../pages/Patient/PatientList.jsx";
import PatientVisit from "../pages/Patient/PatientVisit.jsx";
import DoctorAssignList from "../pages/DoctorAssign/DoctorAssignList.jsx";
import OfferList from "../pages/Offer/OfferList.jsx";
import PatientVisitList from "../pages/PatientVisit/PatientVisitList.jsx";
import PatientVisitView from "../pages/PatientVisit/PatientVisitView.jsx";
import MyAppoinmentList from "../pages/Doctor/MyAppoinments/MyAppoinmentList.jsx";
import ViewAppointment from "../pages/Doctor/MyAppoinments/ViewAppointment.jsx";
import InvoiceView from "../pages/PatientVisit/InvoiceView.jsx";

// Lazy load components
const UserList = React.lazy(() => import("../pages/User/UserList.jsx"));



const RootRoute = () => {
    const { authData } = useAuth();

    return authData ? <Navigate to="/dashboard" /> : <Login />;
};

export default function AppRoutes (){

    return useRoutes([
        {
            path: '/',
            element: <RootRoute/>,
        },
        {
            element: (
                <ProtectedRoute>
                    <DashboardLayout>
                        <Suspense>
                            <Outlet/>
                        </Suspense>
                    </DashboardLayout>
                </ProtectedRoute>
            ),
            children: [
                {path: 'dashboard', element: <Dashboard/>},
                {path: 'users', element: <UserList/>},
                {path: 'branches', element:<BranchList/>},
                {path: 'drugs-category',element:<DrugCategoryList/>},
                {path: 'drugs',element:<DrugList/>},
                {path: 'disease-codes',element:<DiseaseCodeList/>},
                {path: 'treatment-category',element:<TreatmentCategoryList/>},
                {path: 'clinic-category',element:<ClinicCategoryList/>},
                {path: 'rates-config',element:<RatesConfiguration/>},
                {path: 'treatment',element:<TreatmentList/>},
                {path: 'patients', element:<PatientList/>},
                {path: 'doctor-assign',element:<DoctorAssignList/>},
                {path: 'patient-visit/:patientRegNo', element:<PatientVisit/>},
                {path: 'offer',element:<OfferList/>},
                {path: 'patients-visit', element:<PatientVisitList/>},
                {path: 'view-patient-visit/:visitId',element:<PatientVisitView/>},
                {path: 'my-appointment-list',element:<MyAppoinmentList/>},
                {path: 'view-appointment/:visitId',element:<ViewAppointment/>},
                {path: 'view-invoice/:invoiceNo',element:<InvoiceView/>},
            ],
        },
        {
            path: '*',
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <NotFound/>
                </Suspense>
            ),
        },
    ]);
};


