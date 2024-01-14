import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button as MuiButton, Tooltip } from "@mui/material";
Button.defaultProps = {
    onClick: () => { },
    type: 'button'
};
function Button({ faIcon, toolTipText, onClick, type }) {
    return (
        <Tooltip title={toolTipText}>
            <MuiButton size="smll" variant="contained" onClick={onClick} type={type}>
                <FontAwesomeIcon icon={faIcon}></FontAwesomeIcon>
            </MuiButton>
        </Tooltip>
    );
}
export default Button;