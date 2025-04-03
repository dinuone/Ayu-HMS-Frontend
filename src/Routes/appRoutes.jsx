// src/AppRoutes/appRoutes.jsx

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../Provider/authProvider.jsx";
import { ProtectedRoute } from "./protectedRoutes.jsx";
import Login from "../pages/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import NotFound from "../pages/NotFound.jsx"; // Import the NotFound component

const AppRoutes = () => {
    const { authData } = useAuth();

    // Define routes accessible only to authenticated users
    const authRoutes = [
        {
            path: "/",
            element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
            children: [
                {
                    path: "/dashboard",
                    element: <Dashboard />,
                },
            ],
        },
    ];

    // Define routes accessible only to non-authenticated users
    const publicRoutes = [
        {
            path: "/",
            element: <Login />,
        },
    ];

    const router = createBrowserRouter([
        ...publicRoutes,
        ...(!authData.token ? publicRoutes : []),
        ...authRoutes,
        {
            path: "*",  // Catch-all route for undefined paths
            element: <NotFound />,
        },
    ]);

    return <RouterProvider router={router} />;
};

export default AppRoutes;
