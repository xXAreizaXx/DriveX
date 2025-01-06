// MUI
import { Box } from "@mui/material";
import { styled as styledMUI } from "@mui/material/styles";

// Styled Components
import { styled } from "styled-components";

export const FormContainer = styledMUI(Box)(({ theme }) => ({
    backgroundColor: theme?.palette?.background?.paper,
    borderRadius: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
    padding: "32px",
    width: "50%",
}));

export const HeaderForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const BodyForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;
