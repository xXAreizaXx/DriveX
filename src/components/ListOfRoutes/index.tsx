// NextJS
import { usePathname, useRouter } from "next/navigation";

// ReactJS
import { JSX } from "react";
import { useTranslation } from "react-i18next";

// MUI
import { List, ListItem, Tooltip, Typography } from "@mui/material";

// Constants
import { routes } from "@constants/routes";

// Styled
import { CustomListItem } from "./styled";

// Interfaces
interface IListOfRoutesProps {
    open?: boolean;
}

interface ICustonItemProps {
    href: string;
    icon?: JSX.Element;
    isOpen?: boolean;
    label: string;
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
    const isActived = pathname === href;

    if (!isOpen) {
        return (
            <Tooltip title={t(label)} placement="right">
                <ListItem disablePadding>
                    <CustomListItem isActived={isActived} open={isOpen} onClick={() => push(href)}>
                        {icon ? icon : <Typography variant="body2">{t(label)}</Typography>}
                    </CustomListItem>
                </ListItem>
            </Tooltip>
        );
    }

    return (
        <ListItem disablePadding>
            <CustomListItem isActived={isActived} open={isOpen} onClick={() => push(href)}>
                {icon}
                <Typography variant="body2">{t(label)}</Typography>
            </CustomListItem>
        </ListItem>
    );
}

export default function ListOfRoutes(props: IListOfRoutesProps) {
    return (
        <List component="nav" sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1 }}>
            {routes.map((item, index) => <CustomItem key={index} isOpen={props?.open} {...item} />)}
        </List>
    );
}