// MUI
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Container = styled(Box)(({ theme }) => ({
    alignItems: "center",
    display: "flex",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
}));