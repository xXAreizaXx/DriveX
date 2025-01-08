// MUI
import MuiDrawer from "@mui/material/Drawer";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

// Constants
import { drawerWidth, drawerMobileWidth, collapsedWidth } from "@constants/drawer";

interface ISlideDrawerProps {
    open: boolean;
}

export const SlideDrawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: open ? drawerWidth : collapsedWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
        display: "none",
    },
    [theme.breakpoints.between("sm", "md")]: {
        width: collapsedWidth,
        "& .MuiDrawer-paper": {
            width: collapsedWidth,
        },
    },
    "& .MuiDrawer-paper": {
        position: "relative",
        backgroundColor: theme.palette.background.default,
        width: open ? drawerWidth : collapsedWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        overflowX: "hidden",
    },
}));

export const SlideHeader = styled(Box)<ISlideDrawerProps>(({ theme, open }) => ({
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 12px 0px 12px",
    [theme.breakpoints.between("sm", "md")]: {
        justifyContent: "center",
        padding: "12px 0px 0px 0px",
    },
    ...(!open && {
        justifyContent: "center",
        padding: "12px 0px 0px 0px",
    }),
}));
