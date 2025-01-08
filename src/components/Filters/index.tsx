"use client";

// ReactJS
import { type SubmitErrorHandler, type SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

// Components
import { BtnPrimary } from "@components/Buttons";
import { InputField, InputSelect } from "@components/TextFields";

// MUI
import { FilterAlt, Search } from "@mui/icons-material";

// Utils
import { type TFilterTransferSchema, filterTransferSchema } from "@utils/schemas";

// External Dependencies
import { zodResolver } from "@hookform/resolvers/zod";

// Styled
import { FormContainer } from "./styled";

export function FilterTransfers(props: IFilterTransfersProps) {
    // Props
    const { setFilter } = props;

    // Translation
    const { t } = useTranslation();

    // Form
    const {
        control,
        formState: { errors },
        handleSubmit,
        register
    } = useForm<TFilterTransferSchema>({
        resolver: zodResolver(filterTransferSchema),
        mode: "all"
    });

    // Functions
    const onSubmit: SubmitHandler<TFilterTransferSchema> = async (data) => {
        setFilter(data as TFilterTransfer);
    };

    const onError: SubmitErrorHandler<TFilterTransferSchema> = (errors) => {
        console.error(errors);
    };

    return (
        <FormContainer as="form" onSubmit={handleSubmit(onSubmit, onError)}>
            <InputField
                control={control}
                errors={errors}
                icon={<Search />}
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
            <BtnPrimary type="submit">
                <FilterAlt />
            </BtnPrimary>
        </FormContainer>
    );
}