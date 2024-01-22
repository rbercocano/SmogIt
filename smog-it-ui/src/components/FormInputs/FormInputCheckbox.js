import { Controller } from "react-hook-form";
import { FormControlLabel, Checkbox } from '@mui/material';
export const FormInputCheckbox = ({ name, control, label }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
                formState,
            }) => (
                <FormControlLabel control={<Checkbox onChange={onChange} />} label={label} name={name} checked={value} />
            )}
        />
    );
};
