import {Navigate, Outlet, useRoutes} from "react-router-dom";
import React, {Suspense} from "react";
import {useAuth} from "../Provider/authProvider.jsx";
import ProtectedRoute from "./protectedRoutes.jsx";
import Login from "../pages/Login.jsx";

import NotFound from "../pages/Notfound.jsx";
import DashboardLayout from "../Layout/DashboardLayout.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";

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
                {path: 'user-list', element: <UserList/>},
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


