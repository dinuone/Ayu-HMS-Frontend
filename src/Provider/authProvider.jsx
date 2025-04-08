import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(() => {
        const stored = localStorage.getItem("authData");
        return stored ? JSON.parse(stored) : null;
    });

    const setAuth = (data) => {
        setAuthData(data);
        if (data) {
            localStorage.setItem("authData", JSON.stringify(data));
        } else {
            localStorage.removeItem("authData");
        }
    };

    const signOut = () => {
        console.log("sign out...");
        localStorage.removeItem("authData");
        setAuthData(null);
    };

    useEffect(() => {
        const storedAuth = localStorage.getItem("authData");
        if (storedAuth && !authData) {
            setAuthData(JSON.parse(storedAuth));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ authData, setAuth, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
