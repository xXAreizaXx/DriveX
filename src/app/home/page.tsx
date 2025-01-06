"use client";

// ReactJS
import { useState } from "react";

// MUI
import { Box, Button, Drawer, Paper, Typography } from "@mui/material";

// HOC
import { withAuth } from "@HOC/withAuth";

// Constants
import { UserRole } from "@constants/roles";

function HomePage() {
    // State
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <div>
            <Button onClick={toggleDrawer(true)}>Open drawer</Button>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 450 }} role="presentation" onClick={toggleDrawer(false)}>
                    <Paper sx={{ p: 2, backgroundColor: "primary.main", borderRadius: "0px", boxShadow: "none" }}>
                        <Typography variant="h5" component="div">
                            Side panel
                        </Typography>
                    </Paper>
                </Box>
            </Drawer>
        </div>
    );
}

export default withAuth(HomePage, {
    requiredRoles: [UserRole.ADMIN, UserRole.USER, UserRole.GUEST],
});
