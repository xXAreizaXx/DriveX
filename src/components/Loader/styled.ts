// MUI
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const LoaderContainer = styled(Box)(({ theme }) => ({
    alignItems: "center",
    backgroundColor: theme?.palette?.background?.default,
    display: "flex",
    height: "100%",
    justifyContent: "center",
    width: "100%",
}));
