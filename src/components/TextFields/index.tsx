/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// ReactJS
import { useState } from "react";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";

// MUI
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, type TextFieldVariants } from "@mui/material";

// Icons
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";

// Interfaces
interface InputFieldProps {
    control: Control<any>;
    errors: FieldErrors;
    icon?: React.ReactNode;
    label: string;
    name: string;
    placeholder: string;
    register: UseFormRegister<any>;
    type?: string;
    variant?: TextFieldVariants;
}

interface InputSelectProps {
    control: Control<any>;
    errors: FieldErrors;
    label: string;
    name: string;
    options: { label: string; value: string }[];
    placeholder: string;
    register: UseFormRegister<any>;
    variant?: TextFieldVariants;
}

export function InputField(props: InputFieldProps) {
    // Props
    const { label, name, placeholder, type = "text", variant = "outlined", ...rest } = props;

    // Form
    const { control, errors, register } = rest;

    // Translate
    const { t } = useTranslation();

    // Message Error
    const error = t(errors?.[name]?.message as string) ?? errors?.[name]?.message;

    return (
        <Controller
            {...register(name)}
            control={control}
            name={name}
            render={({ field }) => (
                <TextField
                    {...field}
                    {...props}
                    {...rest}
                    error={Boolean(error)}
                    fullWidth
                    helperText={error}
                    id="outlined-basic"
                    label={label}
                    placeholder={placeholder}
                    size="small"
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    {props.icon}
                                </InputAdornment>
                            )
                        }
                    }}
                    sx={{ backgroundColor: "background.paper" }}
                    variant={variant}
                />
            )}
        />
    );
}

export function InputFieldPassword(props: InputFieldProps) {
    // Props
    const { label, name, placeholder, type = "text", variant = "outlined", ...rest } = props;

    // Form
    const { control, errors, register } = rest;

    // Translate
    const { t } = useTranslation();

    // Message Error
    const error = t(errors?.[name]?.message as string) ?? errors?.[name]?.message;

    // State
    const [showPassword, setShowPassword] = useState<boolean>(false);

    // Functions
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault();

    return (
        <Controller
            {...register(name)}
            control={control}
            name={name}
            render={({ field }) => (
                <TextField
                    {...field}
                    {...props}
                    {...rest}
                    error={Boolean(error)}
                    helperText={error}
                    id="outlined-basic"
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {!showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    }}
                    label={label}
                    placeholder={placeholder}
                    size="small"
                    type={showPassword ? "text" : "password"}
                    variant={variant}
                />
            )}
        />
    );
}

export function InputSelect(props: InputSelectProps) {
    // Props
    const { label, name, options, variant = "outlined", ...rest } = props;

    // Form
    const { control, errors, register } = rest;

    // Translate
    const { t } = useTranslation();

    // Message Error
    const error = t(errors?.[name]?.message as string) ?? errors?.[name]?.message;

    return (
        <Controller
            {...register(name)}
            control={control}
            name={name}
            render={({ field }) => (
                <FormControl size="small" error={Boolean(error)} fullWidth>
                    <InputLabel id="demo-select-small-label">{label}</InputLabel>
                    <Select
                        {...field}
                        {...props}
                        {...rest}
                        error={Boolean(error)}
                        label={label}
                        labelId="demo-select-small-label"
                        size="small"
                    >
                        {options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {error && <FormHelperText>{error}</FormHelperText>}
                </FormControl>
            )}
        />
    );
}