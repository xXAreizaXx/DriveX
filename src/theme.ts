"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    cssVariables: true,
    palette: {
        common: {
            black: "#000",
            white: "#fff",
        },
        background: {
            default: "#fff4ed",
        },
        primary: {
            50: "#fff4ed",
            100: "#ffe6d5",
            200: "#feccaa",
            300: "#fdac74",
            400: "#fb8a3c",
            500: "#f97316",
            600: "#ea670c",
            700: "#c2570c",
            800: "#9a4a12",
            900: "#7c3d12",
            main: "#f97316",
        },
    },
    typography: {
        fontFamily: "var(--font-dm-sans)",
    },
});

export default theme;
