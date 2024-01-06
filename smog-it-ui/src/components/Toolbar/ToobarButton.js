import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button as MuiButton, Tooltip } from "@mui/material";

function Button({ faIcon, toolTipText }) {
    return (
        <Tooltip title={toolTipText}>
            <MuiButton size="smll" variant="contained">
                <FontAwesomeIcon icon={faIcon}></FontAwesomeIcon>
            </MuiButton>
        </Tooltip>
    );
}
export default Button;