"use client";

// ReactJS
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// MUI
import { IconButton, InputAdornment, TextField, type TextFieldVariants } from "@mui/material";

// Icons
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";

// Interfaces
interface InputFieldProps {
    control: Control<any>;
    errors: FieldErrors;
    label: string;
    name: string;
    placeholder: string;
    register: UseFormRegister<any>;
    type?: string;
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
                    helperText={error}
                    id="outlined-basic"
                    label={label}
                    placeholder={placeholder}
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
                    InputProps={{
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
                    }}
                    label={label}
                    placeholder={placeholder}
                    type={showPassword ? "text" : "password"}
                    variant={variant}
                />
            )}
        />
    );
}