// Componets
import AvatarMenu from "@components/AvatarMenu";
import ListOfRoutes from "@components/ListOfRoutes";
import Logo from "@components/Logo";

// MUI
import { Box, IconButton } from "@mui/material";

// Icons
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from "@mui/icons-material";

// Styled
import { SlideDrawer, SlideHeader } from "./styled";

export default function SlideBar({ open, toggleDrawer }: { open: boolean; toggleDrawer: () => void }) {
    return (
        <SlideDrawer variant="permanent" open={open}>
            <SlideHeader open={open}>
                {open && <Logo width={80} height={64} />}
                <IconButton onClick={toggleDrawer}>
                    {open ? <KeyboardDoubleArrowLeft /> : <KeyboardDoubleArrowRight />}
                </IconButton>
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