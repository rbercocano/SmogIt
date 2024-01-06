import Button from './ToobarButton'
import './Toolbar.css'
function Toolbar({ children }) {
    return (
        <div className='smogit-toolbar'>
            {children}
        </div>
    )
}
export default Object.assign(Toolbar, { Button });