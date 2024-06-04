import {createContext, useContext, useEffect, useState} from "react";
import {AuthenticationInfo} from "../../common/types/AuthenticationInfo";
import Cookies from "universal-cookie";
import api from "../../common/api";
import {extractJwtData, getAuthenticationInfoFromJwt} from "./AuthUtils";

export type AuthContextType = {
    authInfo: AuthenticationInfo,
    setToken: (token?: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
    authInfo: {authenticated: false},
    setToken: () => {
    }
});

const useAuth = () => {
    const val = useContext(AuthContext);
    if (!val) {
        throw new Error('AuthContext Provider is required');
    }
    return val;
};

export const AuthContextProvider = ({children}) => {
    const cookies = new Cookies();
    const [token, setToken] = useState<string | undefined | null>(() => {
        const token = cookies.get('tchat-jwt-token') as string | null;
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        return token;
    });

    const initAuthenticationInfo = () => {
        console.debug(token);
        if (!token) {
            return {authenticated: false};
        }

        const extracted = extractJwtData(token);
        return !extracted ? {authenticated: false} : getAuthenticationInfoFromJwt(extracted);
    };

    const [authInfo, setAuthInfo] = useState<AuthenticationInfo>(initAuthenticationInfo());

    useEffect(() => setAuthInfo(initAuthenticationInfo()), [token]);

    const setTokenIntercept = (token?: string) => {
        const extracted = extractJwtData(token);
        if (!token) {
            cookies.remove('tchat-jwt-token');
            api.defaults.headers.common['Authorization'] = undefined;
        } else {
            cookies.set('tchat-jwt-token', token, {expires: new Date(extracted!.exp * 1000)});
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        setToken(token);
    };

    return (
        <AuthContext.Provider value={{authInfo: authInfo, setToken: setTokenIntercept}}>
            {children}
        </AuthContext.Provider>)
}

export default useAuth;
