
import { MenuContextProvider } from './MenuContext';
import { OverlayLoadingContextProvider } from './OverlayLoadingContext';
import { UserContextPrivder } from './UserContext';
const AppContext = ({ children }) => {
    return (
        <UserContextPrivder>
            <MenuContextProvider>
                <OverlayLoadingContextProvider>
                    {children}
                </OverlayLoadingContextProvider>
            </MenuContextProvider>
        </UserContextPrivder>
    );
};
export default AppContext;