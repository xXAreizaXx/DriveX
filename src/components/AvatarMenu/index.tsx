// ReactJS
import { useState } from "react";
import { useTranslation } from "react-i18next";

// MUI
import { Avatar, Box, Divider, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";

// Context
import { useAuth } from "@contexts/AuthContext";

// Utils
import { shortViewText } from "@utils/functions";

// Icons
import { ExpandMoreOutlined, LogoutOutlined } from "@mui/icons-material";

// Styled
import { BtnAvatar } from "./styled";

interface IAvatarMenuProps {
    isOpen: boolean;
}

export default function AvatarMenu(props: IAvatarMenuProps) {
    // Translate
    const { t } = useTranslation();

    // Auth
    const { user, logout } = useAuth();

    // States
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // Constants
    const open = Boolean(anchorEl);

    // Functions
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <BtnAvatar
                aria-controls={open ? "basic-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                id="basic-button"
                isOpen={props.isOpen}
                onClick={handleClick}
                variant="text"
            >
                <Box sx={{ display: "flex", gap: "10px" }}>
                    <Avatar sx={{ width: 40, height: 40, backgroundColor: "primary.main", color: "white" }}>JA</Avatar>
                    {props.isOpen && (
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                            <Typography component="p" noWrap fontWeight={600} variant="body2" sx={{ flexGrow: 1, color: "black" }}>
                                {user?.role}
                            </Typography>
                            <Typography component="p" noWrap fontWeight={400} variant="body2" sx={{ flexGrow: 1, color: "black" }}>
                                {shortViewText(user?.email as string)}
                            </Typography>
                        </Box>
                    )}
                </Box>
                {props.isOpen && <ExpandMoreOutlined sx={{ color: "black" }} />}
            </BtnAvatar>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ horizontal: "right", vertical: "top" }}
                id="account-menu"
                onClick={handleClose}
                onClose={handleClose}
                open={open}
                sx={{ width: "20rem" }}
                transformOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={handleClose}>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                        <Avatar sx={{ width: 40, height: 40, backgroundColor: "primary.main", color: "white" }}>JA</Avatar>
                        {props.isOpen && (
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                <Typography component="p" noWrap fontWeight={600} variant="body2" sx={{ flexGrow: 1, color: "black" }}>
                                    {user?.role}
                                </Typography>
                                <Typography component="p" noWrap fontWeight={400} variant="body2" sx={{ flexGrow: 1, color: "black" }}>
                                    {user?.email}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </MenuItem>
                <Divider />
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <LogoutOutlined />
                    </ListItemIcon>
                    {t("Constants.Menu.Logout")}
                </MenuItem>
            </Menu>
        </div>
    );
}