"use client";

// ReactJS
import { useMutation, useQuery } from "@tanstack/react-query";
import { type SubmitErrorHandler, type SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

// MUI
import { AltRoute, DirectionsCarFilledOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";

// Context
import { useSlideAction } from "@contexts/SlideActionContext";
import { useSnackbar } from "@contexts/SnackbarContext";

// Components
import { BtnPrimary, BtnSecondary } from "@components/Buttons";
import Loader from "@components/Loader";
import { InputField, InputSelect } from "@components/TextFields";

// Services
import { createTransfer } from "@services/transfers";
import { getUsers } from "@services/users";

// Utils
import { type TTransferSchema, transferSchema } from "@utils/schemas";

// External Dependencies
import { zodResolver } from "@hookform/resolvers/zod";

// Styled
import { BodyForm, ColForm, FooterForm, FormContainer, RowForm } from "./styled";

export default function CreateFormTranfer() {
    // Context
    const { setOpen } = useSlideAction();
    const { setSnackbar } = useSnackbar();

    // Translation
    const { t } = useTranslation();

    // Mutation
    const mutation = useMutation({
        mutationFn: (data: DtoTransfer) => createTransfer(data),
        onSuccess: () => {
            setSnackbar(
                t("Transfers.Create.Success"),
                "success"
            );
            setOpen(false);
        },
        onError: () => {
            setSnackbar(
                t("Transfers.Create.Error"),
                "error"
            );
        }
    });

    // Query
    const { data: users, isLoading } = useQuery<TUser[]>({
        queryKey: ["users"],
        queryFn: () => getUsers()
            .then((res) => {
                return res?.data ?? [];
            })
            .catch(() => [])
    });

    // Form
    const {
        control,
        formState: { errors, isValid },
        handleSubmit,
        register
    } = useForm<TTransferSchema>({
        resolver: zodResolver(transferSchema),
        mode: "all"
    });

    // Functions
    const onSubmit: SubmitHandler<TTransferSchema> = async (data) => {
        const refactoredData: DtoTransfer = {
            client: data?.client,
            created_at: new Date().toISOString(),
            plate: data?.plate,
            service: Number(data?.service),
            transmitter: data?.transmitter,
            type: data?.transferType
        };

        mutation.mutate(refactoredData);
    };

    const onError: SubmitErrorHandler<TTransferSchema> = (errors) => {
        console.error(errors);
    };

    if (isLoading) return <Loader />;

    return (
        <FormContainer as="form" onSubmit={handleSubmit(onSubmit, onError)}>
            <BodyForm>
                <ColForm>
                    <Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}>
                        <AltRoute sx={{ color: "primary.main", mr: 1 }} />
                        {t("Transfers.Info")}
                    </Typography>
                    <InputField
                        control={control}
                        errors={errors}
                        label={t("Transfers.Plate")}
                        name="plate"
                        placeholder={t("Transfers.PlatePlaceholder")}
                        register={register}
                    />
                    <InputSelect
                        control={control}
                        errors={errors}
                        label={t("Transfers.TransferType")}
                        name="transferType"
                        options={[
                            { label: t("Transfers.Sale"), value: "Venta" },
                            { label: t("Transfers.Cession"), value: "Cesión" }
                        ]}
                        placeholder={t("Transfers.TransferTypePlaceholder")}
                        register={register}
                    />
                </ColForm>
                <ColForm>
                    <Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}>
                        <DirectionsCarFilledOutlined sx={{ color: "primary.main", mr: 1 }} />
                        {t("Transfers.Vehicle")}
                    </Typography>
                    <RowForm>
                        <InputSelect
                            control={control}
                            errors={errors}
                            label={t("Transfers.Client")}
                            name="client"
                            options={users?.map((user) => ({ label: user?.name, value: user?.document })) ?? []}
                            placeholder={t("Transfers.ClientPlaceholder")}
                            register={register}
                        />
                        <InputSelect
                            control={control}
                            errors={errors}
                            label={t("Transfers.Transmitter")}
                            name="transmitter"
                            options={users?.map((user) => ({ label: user?.name, value: user?.document })) ?? []}
                            placeholder={t("Transfers.TransmitterPlaceholder")}
                            register={register}
                        />
                    </RowForm>
                    <InputField
                        control={control}
                        errors={errors}
                        label={t("Transfers.Service")}
                        name="service"
                        placeholder={t("Transfers.ServicePlaceholder")}
                        register={register}
                        type="number"
                    />
                </ColForm>
            </BodyForm>

            <FooterForm>
                <BtnSecondary onClick={() => setOpen(false)}>
                    {t("Constants.Btn.Cancel")}
                </BtnSecondary>
                <BtnPrimary type="submit" isDisabled={!isValid} isLoading={mutation?.status === "pending"}>
                    {t("Constants.Btn.Create")}
                </BtnPrimary>
            </FooterForm>
        </FormContainer>
    );
}