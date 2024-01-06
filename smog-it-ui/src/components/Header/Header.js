import './Header.css';
import { MenuContext } from '../../contexts/MenuContext';
import { useContext } from 'react';
function Header() {
    const { expanded, toggle } = useContext(MenuContext);
    return (
        <header className={expanded ? "App-header expanded" : "App-header"} >
            <div>
                {!expanded && <button onClick={toggle}>
                    <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="MenuIcon">
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                    </svg>
                </button>}
                <h1>Gold River Smog</h1>
            </div>
        </header>
    );
}
export default Header;