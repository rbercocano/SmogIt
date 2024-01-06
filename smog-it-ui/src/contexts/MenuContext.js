import { createContext, useCallback, useReducer } from 'react'
export const MenuContext = createContext();
export const MenuContextProvider = ({ children }) => {

    const initialState = {
        expanded: true
    };
    const reducer = (state, action) => {
        switch (action.type) {
            case 'TOGGLE':
                return {
                    expanded: !state.expanded
                };

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const toggle = useCallback(() => {
        dispatch({
            type: 'TOGGLE'
        })

    }, []);
    return (
        <MenuContext.Provider value={{ ...state, toggle }}>
            {children}
        </MenuContext.Provider>
    );

}