import ParsedJwt from "./ParsedJwt";
import {AuthenticationInfo} from "./AuthenticationInfo";
import {decodeToken, isExpired} from 'react-jwt';

export const extractJwtData = (token: string | undefined): ParsedJwt | null => {
    if(!token) return null;

    return isExpired(token) ? null : decodeToken(token) as {username: string, exp: number};
};

export const getAuthenticationInfoFromJwt  = (parsedToken: ParsedJwt): AuthenticationInfo => {
    if (!parsedToken.username || !parsedToken.exp) {
        return {authenticated: false};
    }
    return {
        authenticated: true,
        info: {
            exp: parsedToken.exp,
            username: parsedToken.username,
        }
    };
};