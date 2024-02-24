import './Header.css';
import { MenuContext } from '../../contexts/MenuContext';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
function Header() {
    const navigate = useNavigate();
    const { expanded, toggle } = useContext(MenuContext);
    const  userContext  = useContext(UserContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const profile = () => {
        setAnchorEl(null);
        navigate(`/profile`);
    }
    const logout = () => {
        setAnchorEl(null);
        userContext.logout();
        navigate(`/login`);
    }
    return (
        <header className={expanded ? "App-header expanded" : "App-header"} >
            <div>
                {!expanded && <button onClick={toggle}>
                    <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="MenuIcon">
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                    </svg>
                </button>}
                <h1>Gold River Smog</h1>
                <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: '30px', marginRight: '10px', cursor: 'pointer' }} onClick={handleClick}></FontAwesomeIcon>
                <Menu id="profile-menu"
                    style={{ marginTop: '10px' }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}>
                    <MenuItem onClick={profile}>
                        <FontAwesomeIcon icon={faUser} style={{ fontSize: '14px', marginRight: '5px', cursor: 'pointer' }}></FontAwesomeIcon>
                        <span>Profile</span>
                    </MenuItem>
                    <MenuItem onClick={logout}>
                        <FontAwesomeIcon icon={faSignOut} style={{ fontSize: '14px', marginRight: '5px', cursor: 'pointer' }}></FontAwesomeIcon>
                        <span>Logout</span>
                    </MenuItem>
                </Menu>
            </div>
        </header>
    );
}
export default Header;