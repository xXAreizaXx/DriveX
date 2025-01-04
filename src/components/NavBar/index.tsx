// NextJS
import { usePathname } from "next/navigation";

// ReactJS
import { useTranslation } from "react-i18next";

// MUI
import { Typography } from "@mui/material";

// Styled
import { AppBar } from "./styled";

export default function NavBar({ open }: { open: boolean }) {
    // Translation
    const { t } = useTranslation();

    // Pathname
    const pathname = usePathname();

    // Functions
    const getRoute = (pathname: string) => {
        const route = pathname.slice(1).replace(/-/g, "").replace(/\b\w/g, (c) => c.toUpperCase())?.replace("/", ".");

        return t(`Constants.Routes.${route}`);
    };

    // Constants
    const route = pathname === "/home"
        ? t("Constants.Welcome") + "!"
        : getRoute(pathname);

    return (
        <AppBar position="absolute" open={open} elevation={0}>
            <Typography component="h1" noWrap fontWeight={600} variant="h5" sx={{ flexGrow: 1, color: "black" }}>
                {route}
            </Typography>
        </AppBar>
    );
}