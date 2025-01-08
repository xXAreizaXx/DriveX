// NextJS
import { usePathname } from "next/navigation";

// ReactJS
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// MUI
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";

// Components
import AvatarMenu from "@components/AvatarMenu";
import ListOfRoutes from "@components/ListOfRoutes";
import Logo from "@components/Logo";
import Translate from "@components/Translate";

// Styled
import { AppBar, MobileDrawer, SlideHeader } from "./styled";

interface MobileDrawerContentProps {
    onClose: () => void;
}

const MobileDrawerContent = ({ onClose }: MobileDrawerContentProps) => {
    return (
        <>
            <SlideHeader>
                <Logo width={80} height={64} />
                <IconButton onClick={onClose} sx={{ color: "black" }}>
                    <CloseIcon />
                </IconButton>
            </SlideHeader>
            <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2, height: "100%" }}>
                <ListOfRoutes open={true} />
                <Box sx={{ mt: "auto", display: "flex", flexDirection: "column", gap: 1 }}>
                    <AvatarMenu isOpen={true} />
                </Box>
            </Box>
        </>
    );
};

export default function NavBar({ open }: { open: boolean }) {
    // Theme
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
    
    // States
    const [mobileOpen, setMobileOpen] = useState(false);

    // Translation
    const { t } = useTranslation();

    // Pathname
    const pathname = usePathname();

    // Effects
    useEffect(() => {
        if (!isMobile && mobileOpen) {
            setMobileOpen(false);
        }
    }, [isMobile]);

    // Functions
    const getRoute = (pathname: string) => {
        const route = pathname.slice(1).replace(/-/g, "").replace(/\b\w/g, (c) => c.toUpperCase())?.replace("/", ".");
        return t(`Constants.Routes.${route}`);
    };

    const handleMobileDrawer = () => {
        setMobileOpen(!mobileOpen);
    };

    // Constants
    const route = pathname === "/home"
        ? t("Constants.Welcome") + "!"
        : getRoute(pathname);

    const showHamburger = isMobile;
    const showDrawer = !isMobile && !isTablet;
    const drawerOpen = showDrawer ? open : false;

    return (
        <>
            <AppBar position="absolute" open={drawerOpen} elevation={0}>
                {showHamburger && (
                    <IconButton
                        color="inherit"
                        aria-label={mobileOpen ? "close drawer" : "open drawer"}
                        edge="start"
                        onClick={handleMobileDrawer}
                        sx={{ mr: 2, color: "black" }}
                    >
                        {mobileOpen ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>
                )}
                <Typography 
                    component="h1" 
                    noWrap 
                    fontWeight={600} 
                    variant="h5" 
                    sx={{ 
                        flexGrow: 1, 
                        color: "black",
                        fontSize: { xs: "1.125rem", sm: "1.5rem" }
                    }}
                >
                    {route}
                </Typography>
                <Translate />
            </AppBar>
            {showHamburger && (
                <MobileDrawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleMobileDrawer}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            borderRight: "none",
                        }
                    }}
                >
                    <MobileDrawerContent onClose={handleMobileDrawer} />
                </MobileDrawer>
            )}
        </>
    );
}