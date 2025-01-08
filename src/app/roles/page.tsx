"use client";

// HOC
import { withAuth } from "@HOC/withAuth";

// Context
import { useAuth } from "@contexts/AuthContext";

// MUI
import { Box, Chip, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";

// Constants
import { permissions } from "@constants/permissions";
import { UserRole } from "@constants/roles";
import { useTranslation } from "react-i18next";

// Types
interface GroupedPermissions {
    [module: string]: Array<{
        action: string;
        description: string;
        id: number;
        name: string;
    }>;
}

function RolesPage(): JSX.Element {
    // Context
    const { user } = useAuth();

    // Translation
    const { t } = useTranslation();

    // Functions
    const groupByModule = (permissionsList: string[]): GroupedPermissions => {
        return permissionsList.reduce((acc: GroupedPermissions, permission: string) => {
            const [action, module] = permission.split(":");

            if (!acc[module]) {
                acc[module] = [];
            }

            acc[module].push({
                action,
                ...(permissions[permission as keyof typeof permissions]),
            });

            return acc;
        }, {});
    };

    const groupedPermissions = groupByModule(user?.permissions || []);

    return (
        <Box>
            {Object.entries(groupedPermissions).map(([module, actions]) => (
                <Paper key={module} elevation={3} sx={{ mb: 4, p: 2, backgroundColor: "primary.50" }}>
                    <Typography variant="h5" sx={{ color: "primary.main", mb: 1 }}>
                        <Chip label={t(`Permission.${module.charAt(0).toUpperCase() + module.slice(1)}`)} color="primary" />
                    </Typography>
                    <List>
                        {actions.map(({ action, name, description, id }) => (
                            <ListItem key={id} sx={{ borderBottom: "1px solid", borderColor: "primary.100" }}>
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ fontWeight: "bold" }}>{t(name)}</Typography>}
                                    secondary={<Typography variant="body2" sx={{ color: "text.secondary" }}>{t(description)}</Typography>}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            ))}
        </Box>
    );
}

export default withAuth(RolesPage, {
    requiredRoles: [UserRole.ADMIN, UserRole.USER],
});

