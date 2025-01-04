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
                <Box sx={{ ...(!open && { display: "none" }) }}>
                    <Logo width={100} height={30} />
                </Box>
                <IconButton onClick={toggleDrawer}>
                    {open ? <KeyboardDoubleArrowLeft /> : <KeyboardDoubleArrowRight />}
                </IconButton>
            </SlideHeader>
            <Box sx={{ px: 2, pb: 2, display: "flex", flexDirection: "column", gap: 2, height: "100%" }}>
                <ListOfRoutes open={open} />
                <Box sx={{ mt: "auto", display: "flex", flexDirection: "column", gap: 1 }}>
                    <AvatarMenu isOpen={open} />
                </Box>
            </Box>
        </SlideDrawer>
    );
}