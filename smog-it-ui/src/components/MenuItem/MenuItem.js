import './MenuItem.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip } from "@mui/material";
import { MenuContext } from '../../contexts/MenuContext';
import { useContext } from 'react';
function MenuItem({ text, icon, link }) {
    const { expanded } = useContext(MenuContext);
    return (
        <div className="menu-item">
            <Link to={link}>
                <div className="icon">
                    {!expanded &&
                        <Tooltip title={text} placement="right-start" >
                            <FontAwesomeIcon icon={icon} />
                        </Tooltip>
                    }
                    {expanded && <FontAwesomeIcon icon={icon} />}
                </div>
                <span>{text}</span>
            </Link>
        </div>
    );
}

export default MenuItem;