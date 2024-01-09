import { createContext, useCallback, useReducer } from 'react'
export const OverlayLoadingContext = createContext();
export const OverlayLoadingContextProvider = ({ children }) => {

    const initialState = {
        loading: false
    };
    const reducer = (state, action) => {
        switch (action.type) {
            case 'SHOW':
                return {
                    loading: !state.loading
                };

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const setOverlayLoading = useCallback(() => {
        dispatch({
            type: 'SHOW'
        })

    }, []);
    return (
        <OverlayLoadingContext.Provider value={{ ...state, setOverlayLoading }}>
            {children}
        </OverlayLoadingContext.Provider>
    );

}