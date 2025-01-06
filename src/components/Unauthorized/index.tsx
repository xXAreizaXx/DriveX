// NextJS
import Image from "next/image";

// ReactJS
import { useTranslation } from "react-i18next";

// Styled
import { Typography } from "@mui/material";
import { Container } from "./styled";


export default function Unauthorized() {
    // Translation
    const { t } = useTranslation();

    return (
        <Container>
            <Image
                alt="Unauthorized"
                height={300}
                src="/unauthorized.svg"
                width={300}
            />
            <Typography variant="h6">
                {t("Unauthorized.Title")}
            </Typography>
            <Typography variant="body1">
                {t("Unauthorized.Subtitle")}
            </Typography>
        </Container>
    );
}