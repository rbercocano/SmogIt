
import { MenuContextProvider } from './MenuContext';
const AppContext = ({ children }) => {
    return (
        <MenuContextProvider>
            {children}
        </MenuContextProvider>
    );
};
export default AppContext;