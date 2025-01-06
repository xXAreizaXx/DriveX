// MUI
import { AdminPanelSettings, DirectionsCar, HomeOutlined } from "@mui/icons-material";

// Constants
import { PERMISSIONS } from "./roles";

export interface Route {
    icon: React.ReactNode;
    label: string;
    href: string;
    requiredPermission?: string;
}

export const routes: Route[] = [
    {
        icon: <HomeOutlined />,
        label: "Constants.Routes.Home",
        href: "/home",
        requiredPermission: PERMISSIONS.READ_DASHBOARD
    },
    {
        icon: <DirectionsCar />,
        label: "Constants.Routes.Transfers",
        href: "/transfers",
        requiredPermission: PERMISSIONS.READ_TRANSFERS
    },
    {
        icon: <AdminPanelSettings />,
        label: "Constants.Routes.Roles",
        href: "/roles",
        requiredPermission: PERMISSIONS.READ_ROLES
    },
];