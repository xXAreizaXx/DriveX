// ReactJS
import { useState } from "react";
import { useTranslation } from "react-i18next";

// MUI
import { Button, CircularProgress, IconButton, Menu, MenuItem } from "@mui/material";

export function BtnPrimary(props: IButtonProps) {
    // Props
    const { children, isDisabled, isLoading = false } = props;

    return <Button disabled={isDisabled} variant="contained" {...props}>
        {isLoading ? <CircularProgress sx={{ color: "white" }} /> : children}
    </Button>;
}

export function BtnSecondary(props: IButtonProps) {
    // Props
    const { children, isDisabled, isLoading } = props;

    return <Button disabled={isDisabled} variant="outlined" {...props}>
        {isLoading ? <CircularProgress /> : children}
    </Button>;
}

export function BtnAlternative(props: IButtonProps) {
    // Props
    const { children, isDisabled, isLoading } = props;

    return <Button disabled={isDisabled} variant="text" {...props}>
        {isLoading ? <CircularProgress /> : children}
    </Button>;
}

export function BtnMenu(props: IButtonProps) {
    // Props
    const { children, isDisabled, isOpen = false } = props;

    // Translate
    const { t } = useTranslation();

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

    if (!isOpen) {
        return (
            <div>
                <IconButton
                    onClick={handleClick}
                    sx={{ width: 40, height: 40, backgroundColor: "primary.main", color: "white" }}
                >
                    {children}
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    {props?.options?.map((option, index) => (
                        <MenuItem key={index} onClick={option?.onClick} sx={{ display: "flex", gap: "10px" }}>
                            {option?.icon}
                            {t(option?.label) || option?.label}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );

    }

    return (
        <div>
            <Button
                {...props}
                aria-controls={open ? "basic-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                disabled={isDisabled}
                id="basic-button"
                onClick={handleClick}
                sx={{ width: "100%", display: "flex", gap: "10px" }}
                variant="contained"
            >
                {children}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {props?.options?.map((option, index) => (
                    <MenuItem key={index} onClick={option?.onClick} sx={{ display: "flex", gap: "10px" }}>
                        {option?.icon}
                        {t(option?.label) || option?.label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}