import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

export const FormInputText = ({ name, control, label, disabled, rows, multiline, type }) => {
    return (        
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
                formState,
            }) => (
                <TextField type={type}
                    helperText={error ? error.message : null}
                    size="small"
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    label={label}
                    variant="outlined"
                    multiline={multiline}
                    minRows={rows}
                    disabled={disabled}
                />
            )}
        />
    );
};

FormInputText.defaultProps = {
    multiline: false,
    rows: 1,
    disabled: false,
    type: 'text'
};