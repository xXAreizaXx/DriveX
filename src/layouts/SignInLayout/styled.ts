// MUI
import { Box } from "@mui/material";
import { styled as styledMUI } from "@mui/material/styles";

// Styled Components
import { styled } from "styled-components";

export const LoginContainer = styledMUI(Box)(({ theme }) => ({
    alignItems: "center",
    backgroundColor: theme?.palette?.background?.default,
    display: "flex",
    flexDirection: "column",
    height: "calc(100dvh - 3rem)",
    justifyContent: "space-between",
    padding: "24px",
}));

export const LoginMain = styled.main`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 24px;
    height: 100%;
    margin: 64px 0 0 0;
    width: 100%;
`;

export const LoginFooter = styled.footer`
    align-items: center;
    display: flex;
    justify-content: flex-end;
    width: 100%;
`;
