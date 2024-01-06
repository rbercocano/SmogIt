import './Menu.css'
import { MenuContext } from '../../contexts/MenuContext';
import {  useContext } from 'react';
function Menu({children}) {
    const { expanded, toggle } = useContext(MenuContext);
    return (
        <div className="menu">
            <div className={expanded ? "expanded":null}>
                <div className="top">
                    {expanded &&
                        <button tabIndex="0" type="button" onClick={toggle}>
                        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ChevronLeftIcon">
                            <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
                        </svg>
                        <span ></span>
                    </button>
                    }
                </div>
                <hr></hr>
                <nav>
                    {children}
                </nav>
            </div>
        </div>
    );
}
export default Menu;