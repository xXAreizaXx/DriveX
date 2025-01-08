// MUI
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { Box } from "@mui/material";

// Constants
import { drawerWidth, drawerMobileWidth, collapsedWidth } from "@constants/drawer";

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    alignItems: "center",
    backgroundColor: "#fdac74",
    display: "flex",
    flexDirection: "row",
    height: 64,
    justifyContent: "space-between",
    padding: "12px",
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    width: `calc(100% - ${collapsedWidth}px)`,
    [theme.breakpoints.down("sm")]: {
        height: 56,
        padding: "8px",
        width: "100%",
        marginLeft: 0,
    },
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            marginLeft: 0,
        },
    }),
}));

export const MobileDrawer = styled(MuiDrawer)(({ theme }) => ({
    "& .MuiDrawer-paper": {
        width: drawerMobileWidth,
        backgroundColor: theme.palette.background.default,
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
        "& .MuiIconButton-root": {
            color: theme.palette.text.primary,
        },
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    "& .MuiBackdrop-root": {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
}));

export const SlideHeader = styled(Box)({
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 12px 0px 12px",
});
