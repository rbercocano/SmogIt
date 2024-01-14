import { Controller } from "react-hook-form";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { FormHelperText } from "@mui/material";

export const FormInputSelect = ({ name, control, label, items, onSelectItem }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error }, formState }) => {
                const handleSelectChange = (e) => {
                    onChange(e);
                    if (onSelectItem)
                        onSelectItem(e);
                };

                return (
                    <FormControl fullWidth size="small">
                        <InputLabel error={!!error}>{label}</InputLabel>
                        <Select
                            value={value}
                            label={label}
                            error={!!error}
                            onChange={handleSelectChange}>
                            {items.map(v =>
                                <MenuItem key={v.value} value={v.value}>{v.text}</MenuItem>
                            )}
                        </Select>
                        {error && <FormHelperText error>{error.message}</FormHelperText>}
                    </FormControl>
                );
            }}
        />
    );
};

export default FormInputSelect;
