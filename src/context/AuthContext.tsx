import {createContext, useCallback, useState} from "react";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        password: "",
    });

    console.log("registerInfo", import.meta.env.VITE_SERVICE_API_URL);

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    return (
    <AuthContext.Provider
        value={{
            user,
            registerInfo,
            updateRegisterInfo
        }}
    >
        {children}
    </AuthContext.Provider>)
}
