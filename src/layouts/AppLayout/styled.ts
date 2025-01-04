// MUI
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const AppContainer = styled(Box)({
    display: "flex",
});

export const AppContent = styled(Box)(({ theme }) => ({
    backgroundColor: theme?.palette?.background?.default,
    flexGrow: 1,
    height: "100dvh",
}));

export const AppChildren = styled(Box)(({ theme }) => ({
    overflow: "auto",
    height: "calc(100dvh - 7rem)",
    padding: theme?.spacing(3),
}));
