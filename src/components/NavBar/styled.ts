// MUI
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";

// Constants
import { drawerWidth } from "@constants/drawer";

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
    padding: 12,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    width: "calc(100% - 72px)",
    ...(open && {
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        width: `calc(100% - ${drawerWidth}px)`,
    }),
}));
