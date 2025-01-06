// MUI
import { Box } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

// Constants
import { drawerWidth } from "@constants/drawer";

interface ISlideDrawerProps {
    open: boolean;
}

export const SlideDrawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
        position: "relative",
        backgroundColor: theme.palette.background.default,
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(9),
        }),
    },
}));

export const SlideHeader = styled(Box)<ISlideDrawerProps>(({ open }) => ({
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 12px 0px 12px",

    ...(!open && {
        justifyContent: "center",
    }),
}));
