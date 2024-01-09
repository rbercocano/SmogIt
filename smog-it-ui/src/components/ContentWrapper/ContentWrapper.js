import './ContentWrapper.css'
import { MenuContext } from '../../contexts/MenuContext';
import { useContext } from 'react';
import { OverlayLoadingContext } from '../../contexts/OverlayLoadingContext'
function ContentWrapper({ children }) {
    const { expanded } = useContext(MenuContext);
    const { loading } = useContext(OverlayLoadingContext);
    return (
        <>
            <div className={expanded ? 'content expanded' : 'content'}>
                {children}
            </div>
            {loading &&
                <div className={expanded ? 'app-loading expanded' : 'app-loading'}>
                    <div>
                        <h2>Loading...</h2>
                    </div>
                </div>
            }
        </>
    )
}
export default ContentWrapper;