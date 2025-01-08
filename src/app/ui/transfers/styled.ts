// MUI
import { Box } from "@mui/material";
import { styled as styledMUI } from "@mui/material/styles";

// Styled Components
import { styled } from "styled-components";

export const FormContainer = styledMUI(Box)({
    display: "flex",
    height: "100%",
    justifyContent: "space-between",
    flexDirection: "column",
});

export const BodyForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const RowForm = styled.div`
    display: flex;
    gap: 8px;
    width: 100%;
`;

export const ColForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const HeaderForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const FooterForm = styled.footer`
    display: flex;
    justify-content: space-between;
`;