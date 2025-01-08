"use client";

// ReactJS
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// Contexts
import { useSlideAction } from "@contexts/SlideActionContext";
import { useSnackbar } from "@contexts/SnackbarContext";

// Components
import { BtnPrimary, BtnSecondary } from "@components/Buttons";
import Loader from "@components/Loader";

// MUI
import { Typography } from "@mui/material";

// Services
import { deleteTransfer, getOneTransfer } from "@services/transfers";

// Styled
import { FooterForm, FormContainer, HeaderForm } from "./styled";

export default function DeleteFormTranfer() {
    // Contexts
    const { params, setOpen } = useSlideAction();
    const { setSnackbar } = useSnackbar();

    // Translations
    const { t } = useTranslation();

    // Query
    const { data: transfer, isLoading } = useQuery<TTransfer>({
        queryKey: ["transfer", params?.id],
        queryFn: () => getOneTransfer(params?.id as number)
            .then((res) => res?.data)
            .catch(() => []),
        enabled: !!params?.id
    });

    // Mutation
    const mutation = useMutation({
        mutationFn: (id: number) => deleteTransfer(id),
        onSuccess: () => {
            setSnackbar(
                t("Transfers.Delete.Success"),
                "success"
            );
            setOpen(false);
        },
        onError: () => {
            setSnackbar(
                t("Transfers.Delete.Error"),
                "error"
            );
        }
    });

    // Functions
    const handleDelete = () => {
        mutation.mutate(params?.id as number);
    };

    if (isLoading) return <Loader />;

    return (
        <FormContainer as="section">
            <HeaderForm>
                <Typography variant="h6" component="h2">
                    {t("Transfers.Delete.Subtitle")}
                </Typography>

                <Typography variant="body1">
                    {t("Transfers.Delete.Note")}
                </Typography>

                <Typography variant="body1">
                    ×   {transfer?.plate}
                </Typography>
            </HeaderForm>
            <FooterForm>
                <BtnSecondary onClick={() => setOpen(false)}>
                    {t("Constants.Btn.Cancel")}
                </BtnSecondary>
                <BtnPrimary onClick={handleDelete} isLoading={mutation?.status === "pending"}>
                    {t("Constants.Btn.Delete")}
                </BtnPrimary>
            </FooterForm>
        </FormContainer>
    );
}