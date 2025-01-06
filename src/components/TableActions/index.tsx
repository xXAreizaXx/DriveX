"use client";

// ReactJS
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Contexts
import { useSlideAction } from "@contexts/SlideActionContext";

// Components
import { BtnAlternative } from "@components/Buttons";

// MUI
import { Delete, Edit, List } from "@mui/icons-material";
import { Menu, MenuItem, Typography } from "@mui/material";

export default function TableActions({ module, params }: ITableActionsProps) {
    // Contexts
    const { setOpen, setModule, setParams } = useSlideAction();

    // Translations
    const { t } = useTranslation();

    // States
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // Constants
    const open = Boolean(anchorEl);

    // Functions
    const handleAction = (key: string) => {
        const moduleKey = `${module}-${key}`;

        const lngKey = module
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join("") + `.${key.charAt(0).toUpperCase() + key.slice(1)}`;

        const title = params?.title || `${lngKey}.Title`;

        const description = params?.description || `${lngKey}.Description`;

        setAnchorEl(null);
        setParams({ ...params, title, description });
        setModule(moduleKey as TModule);
        setOpen(true);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <BtnAlternative
                aria-controls={open ? "basic-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick as never}
            >
                <List />
            </BtnAlternative>
            <Menu
                anchorEl={anchorEl}
                id="basic-menu"
                onClose={handleClose}
                open={open}
            >
                <MenuItem onClick={() => handleAction("update")} sx={{ gap: 1 }}>
                    <Edit sx={{ color: "primary.main", fontSize: 20 }} />
                    <Typography variant="body2">{t("Constants.Update")}</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleAction("delete")} sx={{ gap: 1 }}>
                    <Delete sx={{ color: "primary.main", fontSize: 20 }} />
                    <Typography variant="body2">{t("Constants.Delete")}</Typography>
                </MenuItem>
            </Menu>
        </div>
    );
}