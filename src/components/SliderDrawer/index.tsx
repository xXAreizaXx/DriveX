"use client";

// ReactJS
import { useTranslation } from "react-i18next";

// Context
import { useSlideAction } from "@contexts/SlideActionContext";

// MUI
import { Box, Drawer, Paper, Typography } from "@mui/material";

export default function SliderDrawer() {
    // Hooks
    const { open, setOpen, slideComponent, params } = useSlideAction();

    // Translate
    const { t } = useTranslation();

    // Functions
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Drawer anchor="right" open={open} onClose={toggleDrawer}>
            <Box sx={{ width: 450, height: "100%" }} role="presentation">
                <Paper sx={{ p: 2, backgroundColor: "primary.main", borderRadius: "0px", boxShadow: "none" }}>
                    <Typography variant="h6" component="h2">
                        {t(params?.title as string)}
                    </Typography>
                    <Typography variant="body1" component="p">
                        {t(params?.description as string)}
                    </Typography>
                </Paper>
                <Paper sx={{ p: 2, borderRadius: "0px", boxShadow: "none", height: "calc(100% - 8rem)" }}>
                    {slideComponent}
                </Paper>
            </Box>
        </Drawer>
    );
}