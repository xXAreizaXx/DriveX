"use client";

// ReactJS
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

// Context
import { useLanguage } from "@contexts/LanguageContext";

// MUI
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

// Icons
import { Language } from "@mui/icons-material";

// Styled
import { StyledMenu } from "./styled";

export default function Translate() {
    // Language
    const { changeLanguage, language } = useLanguage();

    // Translation
    const { t } = useTranslation();

    // State
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // Constants
    const open = Boolean(anchorEl);

    // Functions
    const handleLanguage = useCallback((language: string) => {
        changeLanguage(language);
        setAnchorEl(null);
    }, [changeLanguage]);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                color="inherit"
                disableElevation
                endIcon={<KeyboardArrowDownIcon />}
                id="language-button"
                onClick={handleClick}
                sx={{ display: "flex", gap: 1, backgroundColor: "primary.main", borderColor: "primary.main" }}
                variant="outlined"
            >
                <Language />
                {t(`Language.${language}`)}
            </Button>
            <StyledMenu
                anchorEl={anchorEl}
                id="demo-customized-menu"
                MenuListProps={{ "aria-labelledby": "demo-customized-button" }}
                onClose={handleClose}
                open={open}
            >
                <MenuItem onClick={() => handleLanguage("es")} disableRipple>
                    {t("Language.es")}
                </MenuItem>
                <MenuItem onClick={() => handleLanguage("en")} disableRipple>
                    {t("Language.en")}
                </MenuItem>
            </StyledMenu>
        </>
    );
}