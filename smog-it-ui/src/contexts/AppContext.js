
import { MenuContextProvider } from './MenuContext';
import { OverlayLoadingContextProvider } from './OverlayLoadingContext';
const AppContext = ({ children }) => {
    return (
        <MenuContextProvider>
            <OverlayLoadingContextProvider>
                {children}
            </OverlayLoadingContextProvider>
        </MenuContextProvider>
    );
};
export default AppContext;