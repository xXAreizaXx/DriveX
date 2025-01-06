"use client";

// NextJS
import Link from "next/link";
import { redirect } from "next/navigation";

// ReactJS
import { useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

// Context
import { useAuth } from "@contexts/AuthContext";

// Components
import { BtnPrimary } from "@components/Buttons";
import Loader from "@components/Loader";
import { InputField, InputFieldPassword } from "@components/TextFields";

// MUI
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";

// Utils
import { UserRole } from "@constants/roles";
import { type TLoginSchema, loginSchema } from "@utils/schemas";

// External Dependencies
import { zodResolver } from "@hookform/resolvers/zod";

// Styled
import { BodyForm, FormContainer, HeaderForm } from "./styled";

export default function LoginPage() {
    // Translation
    const { t } = useTranslation();

    // Hooks
    const { isAuthenticated, signIn, isInitialized, isLoading } = useAuth();

    // States
    const [role, setRole] = useState<UserRole>(UserRole.ADMIN);

    // Form
    const {
        control,
        formState: { errors, isValid },
        handleSubmit,
        register
    } = useForm<TLoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: "all"
    });

    // Functions
    const onSubmit: SubmitHandler<TLoginSchema> = async (data) => {
        await signIn({
            email: data.user,
            id: "1",
            role: role
        });
    };

    const onError: SubmitErrorHandler<TLoginSchema> = (errors) => {
        console.error(errors);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRole((event.target as HTMLInputElement).value as UserRole);
    };

    if (!isInitialized || isLoading) return <Loader />;

    if (isAuthenticated) redirect("/home");

    return (
        <FormContainer as="form" onSubmit={handleSubmit(onSubmit, onError)}>
            <HeaderForm>
                <Typography component="h2" fontWeight={600} variant="h5">
                    {t("Login.Title")}
                </Typography>

                <Typography component="p" fontWeight={400} variant="subtitle1">
                    {t("Login.Subtitle.SignIn")}
                </Typography>
            </HeaderForm>
            <BodyForm>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                        {t("Login.Role")}
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleChange}
                        row
                        value={role}
                    >
                        <FormControlLabel value={UserRole.ADMIN} control={<Radio />} label={t("Login.Admin")} />
                        <FormControlLabel value={UserRole.USER} control={<Radio />} label={t("Login.User")} />
                        <FormControlLabel value={UserRole.GUEST} control={<Radio />} label={t("Login.Guest")} />
                    </RadioGroup>
                </FormControl>
                <InputField
                    control={control}
                    errors={errors}
                    label={t("Login.User")}
                    name="user"
                    placeholder={t("Login.UserPlaceholder")}
                    register={register}
                    type="email"
                />
                <InputFieldPassword
                    control={control}
                    errors={errors}
                    label={t("Login.Password")}
                    name="password"
                    placeholder={t("Login.PasswordPlaceholder")}
                    register={register}
                />
                <Link href="/" style={{ textDecoration: "none" }}>
                    <Typography
                        component="p"
                        variant="body1"
                        fontWeight={500}
                        sx={{ cursor: "pointer", color: "primary.main" }}
                    >
                        {t("Login.ForgotPassword")}
                    </Typography>
                </Link>
            </BodyForm>
            <BtnPrimary type="submit" isDisabled={!isValid}>
                {t("Login.Enter")}
            </BtnPrimary>
        </FormContainer>
    );
}