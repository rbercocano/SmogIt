import './MenuItem.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function MenuItem({ text, icon, link }) {
    return (
        <div className="menu-item">
            <div className="icon">
                <FontAwesomeIcon icon={icon} />
            </div>
            <div>
                <Link to={link}>{text}</Link>
            </div>
        </div>
    );
}

export default MenuItem;