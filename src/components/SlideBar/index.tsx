// Components
import AvatarMenu from "@components/AvatarMenu";
import ListOfRoutes from "@components/ListOfRoutes";
import Logo from "@components/Logo";

// MUI
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from "@mui/icons-material";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";

// ReactJS
import { useEffect } from "react";

// Styled
import { SlideDrawer, SlideHeader } from "./styled";

export default function SlideBar({ open, toggleDrawer }: { open: boolean; toggleDrawer: () => void }) {
    // Theme
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

    // Effects
    useEffect(() => {
        if (isTablet && open) {
            toggleDrawer();
        }
    }, [isTablet, open, toggleDrawer]);

    return (
        <SlideDrawer variant="permanent" open={open}>
            <SlideHeader open={open}>
                {open && <Logo width={80} height={64} />}
                {!isTablet && (
                    <IconButton onClick={toggleDrawer}>
                        {open ? <KeyboardDoubleArrowLeft /> : <KeyboardDoubleArrowRight />}
                    </IconButton>
                )}
            </SlideHeader>
            <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2, height: "100%" }}>
                <ListOfRoutes open={open} />
                <Box sx={{ mt: "auto", display: "flex", flexDirection: "column", gap: 1 }}>
                    <AvatarMenu isOpen={open} />
                </Box>
            </Box>
        </SlideDrawer>
    );
}