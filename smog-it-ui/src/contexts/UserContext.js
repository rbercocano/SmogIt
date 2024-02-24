import { createContext, useCallback, useReducer } from 'react'
import { encrypt, decrypt } from '../utils/encryptionUtils.js'
export const UserContext = createContext();
export const UserContextPrivder = ({ children }) => {

    const initialState = {
        userData: null
    };
    const reducer = (state, action) => {
        switch (action.type) {
            case 'LOGIN':
                return {
                    userData: action.payload
                };
            case 'LOGOUT':
                return {
                    userData: null
                };

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const isAuthenticated = useCallback(() => {
        let sessionData = localStorage.getItem('user-token');
        if (sessionData) {
            sessionData = JSON.parse(decrypt(sessionData));
            if (state.userData === null)
                createToken(sessionData);
            return true;
        }
        return false;
    });
    const createToken = useCallback((data) => {
        dispatch({
            type: 'LOGIN', payload: data
        });
        localStorage.setItem('user-token', encrypt(JSON.stringify(data)));
    }, []);
    const logout = useCallback(() => {
        localStorage.removeItem('user-token');
        dispatch({
            type: 'LOGOUT'
        });

    }, []);
    return (
        <UserContext.Provider value={{ ...state, createToken, logout, isAuthenticated }}>
            {children}
        </UserContext.Provider>
    );

}