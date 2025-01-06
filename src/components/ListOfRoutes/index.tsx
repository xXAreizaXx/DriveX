// NextJS
import { usePathname, useRouter } from "next/navigation";

// ReactJS
import { useTranslation } from "react-i18next";

// MUI
import { List, ListItem, Tooltip, Typography } from "@mui/material";

// Constants
import { Route, routes } from "@constants/routes";

// Contexts
import { useAuth } from "@contexts/AuthContext";

// Styled
import { CustomListItem } from "./styled";

// Interfaces
interface IListOfRoutesProps {
    open?: boolean;
}

interface ICustonItemProps extends Route {
    isOpen?: boolean;
}

export function CustomItem(props: ICustonItemProps) {
    // Props
    const { href, icon, isOpen, label } = props;

    // Translate
    const { t } = useTranslation();

    // Pathname
    const pathname = usePathname();

    // Navigation
    const { push } = useRouter();

    // Constants
    const isActive = pathname === href;

    if (!isOpen) {
        return (
            <Tooltip title={t(label)} placement="right">
                <ListItem disablePadding>
                    <CustomListItem isActive={isActive} open={isOpen} onClick={() => push(href)}>
                        {icon ? icon : <Typography variant="body2">{t(label)}</Typography>}
                    </CustomListItem>
                </ListItem>
            </Tooltip>
        );
    }

    return (
        <ListItem disablePadding>
            <CustomListItem isActive={isActive} open={isOpen} onClick={() => push(href)}>
                {icon}
                <Typography variant="body2">{t(label)}</Typography>
            </CustomListItem>
        </ListItem>
    );
}

export default function ListOfRoutes(props: IListOfRoutesProps) {
    const { hasPermission } = useAuth();

    const filteredRoutes = routes.filter(route =>
        !route.requiredPermission || hasPermission(route.requiredPermission)
    );

    return (
        <List component="nav" sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1, p: 0 }}>
            {filteredRoutes.map((item, index) => (
                <CustomItem key={index} isOpen={props?.open} {...item} />
            ))}
        </List>
    );
}