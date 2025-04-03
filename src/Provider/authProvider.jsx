import axios from "axios";
import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [authData, setAuthData] = useState(
        JSON.parse(localStorage.getItem("authData")) || { token: null, user: null }
    );

    useEffect(() => {
        if (authData.token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + authData.token;
            localStorage.setItem("authData", JSON.stringify(authData));  // Save the combined object
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("authData");
        }
    }, [authData]);


    const setAuth = (data) => {
        setAuthData(data);
    };

    // Memoized value of the authentication context
    const contextValue = useMemo(
        () => ({
            authData,
            setAuth,
        }),
        [authData]
    );

    // Provide the authentication context to the children components
    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider
