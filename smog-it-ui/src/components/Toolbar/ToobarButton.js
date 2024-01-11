import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button as MuiButton, Tooltip } from "@mui/material";
Button.defaultProperties = {
    onClick: () => { }
};
function Button({ faIcon, toolTipText, onClick }) {
    return (
        <Tooltip title={toolTipText}>
            <MuiButton size="smll" variant="contained" onClick={onClick}>
                <FontAwesomeIcon icon={faIcon}></FontAwesomeIcon>
            </MuiButton>
        </Tooltip>
    );
}
export default Button;