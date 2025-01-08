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
import { getOneTransfer, updateTransfer } from "@services/transfers";
import { getUsers } from "@services/users";

// Utils
import { type TTransferSchema, transferSchema } from "@utils/schemas";

// External Dependencies
import { zodResolver } from "@hookform/resolvers/zod";

// Styled
import { useEffect } from "react";
import { BodyForm, ColForm, FooterForm, FormContainer, RowForm } from "./styled";

export default function UpdateFormTranfer() {
    // Context
    const { setOpen, params } = useSlideAction();
    const { setSnackbar } = useSnackbar();

    // Translation
    const { t } = useTranslation();

    // Mutation
    const mutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: DtoTransfer }) => updateTransfer(id, data),
        onSuccess: () => {
            setSnackbar(
                t("Transfers.Update.Success"),
                "success"
            );
            setOpen(false);
        },
        onError: () => {
            setSnackbar(
                t("Transfers.Update.Error"),
                "error"
            );
        }
    });

    // Query
    const { data: transfer, isLoading } = useQuery<TTransfer>({
        queryKey: ["transfer", params?.id],
        queryFn: () => getOneTransfer(params?.id as number)
            .then((res) => res?.data)
            .catch(() => []),
        enabled: !!params?.id
    });

    const { data: users, isLoading: isLoadingUsers } = useQuery<TUser[]>({
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
        register,
        reset
    } = useForm<TTransferSchema>({
        defaultValues: {
            client: transfer?.client,
            plate: transfer?.plate,
            service: transfer?.service?.toString(),
            transmitter: transfer?.transmitter,
            transferType: transfer?.type
        },
        resolver: zodResolver(transferSchema),
        mode: "all"
    });

    // Functions
    const onSubmit: SubmitHandler<TTransferSchema> = async (data) => {
        const refactoredData: DtoTransfer = {
            client: data?.client,
            created_at: transfer?.created_at as string,
            plate: data?.plate,
            service: Number(data?.service),
            transmitter: data?.transmitter,
            type: data?.transferType
        };

        mutation.mutate({ id: params?.id as number, data: refactoredData });
    };

    const onError: SubmitErrorHandler<TTransferSchema> = (errors) => {
        console.error(errors);
    };

    const handleClose = () => {
        reset();
        setOpen(false);
    };

    // Effects
    useEffect(() => {
        if (!transfer) return;

        reset({
            client: transfer?.client,
            plate: transfer?.plate,
            service: transfer?.service?.toString(),
            transmitter: transfer?.transmitter,
            transferType: transfer?.type
        });
    }, [transfer]);

    if (isLoading || isLoadingUsers) return <Loader />;

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
                <BtnSecondary onClick={handleClose}>
                    {t("Constants.Btn.Cancel")}
                </BtnSecondary>
                <BtnPrimary type="submit" isDisabled={!isValid} isLoading={mutation?.status === "pending"}>
                    {t("Constants.Btn.Update")}
                </BtnPrimary>
            </FooterForm>
        </FormContainer>
    );
}
