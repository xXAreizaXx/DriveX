"use client";

// HOC
import { withAuth } from "@HOC/withAuth";

// MUI
import { Typography } from "@mui/material";

// Constants
import { UserRole } from "@constants/roles";

function HomePage() {
    return <Typography>Home</Typography>;
}

export default withAuth(HomePage, {
    requiredRoles: [UserRole.ADMIN, UserRole.USER, UserRole.GUEST],
});
