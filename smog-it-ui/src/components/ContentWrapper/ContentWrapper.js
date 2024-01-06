import './ContentWrapper.css'
import { MenuContext } from '../../contexts/MenuContext';
import { useContext } from 'react';
function ContentWrapper({ children }) {
    const { expanded, toggle } = useContext(MenuContext);
    return (
        <div className={expanded ? 'content expanded': 'content'}>
            {children}
        </div>
    )
}
export default ContentWrapper;