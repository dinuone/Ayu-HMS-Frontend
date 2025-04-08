import { Navigate } from "react-router-dom";
import { useAuth } from "../Provider/authProvider.jsx";
import { useEffect, useRef, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ children }) {
    const { authData, signOut } = useAuth();
    const [loading, setLoading] = useState(true);
    const hasChecked = useRef(false); // 👈 track once

    useEffect(() => {
        const checkTokenValidity = () => {
            if (hasChecked.current) return;
            hasChecked.current = true;

            if (authData?.token) {
                try {
                    const decodedToken = jwtDecode(authData.token);
                    const currentTime = Math.floor(Date.now() / 1000);
                    if (decodedToken.exp < currentTime) {
                        signOut();
                    }
                } catch (err) {
                    console.error("Token error", err);
                    signOut();
                }
            } else {
                signOut();
            }

            setLoading(false);
        };

        checkTokenValidity();
    }, [authData, signOut]);

    if (loading) {
        return (
            <div className="full-page-loader">
                <Spin size="large" indicator={<LoadingOutlined spin />} />
            </div>
        );
    }

    return authData ? <>{children}</> : <Navigate to="/" />;
}
