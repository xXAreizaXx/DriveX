export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  GUEST = "GUEST"
}

export interface Permission {
  description: string;
  id: number;
  name: string;
}

export const PERMISSIONS = {
    DELETE_TRANSFERS: "delete:transfers",
    DELETE_USERS: "delete:users",
    MANAGE_ROLES: "manage:roles",
    READ_DASHBOARD: "read:dashboard",
    READ_ROLES: "read:roles",
    READ_TRANSFERS: "read:transfers",
    READ_USERS: "read:users",
    UPDATE_TRANSFERS: "update:transfers",
    WRITE_TRANSFERS: "write:transfers",
    WRITE_USERS: "write:users",

} as const;

export const ROLE_PERMISSIONS = {
    [UserRole.ADMIN]: [
        PERMISSIONS.DELETE_TRANSFERS,
        PERMISSIONS.DELETE_USERS,
        PERMISSIONS.MANAGE_ROLES,
        PERMISSIONS.READ_DASHBOARD,
        PERMISSIONS.READ_ROLES,
        PERMISSIONS.READ_TRANSFERS,
        PERMISSIONS.READ_USERS,
        PERMISSIONS.UPDATE_TRANSFERS,
        PERMISSIONS.WRITE_TRANSFERS,
        PERMISSIONS.WRITE_USERS,
    ],
    [UserRole.USER]: [
        PERMISSIONS.READ_DASHBOARD,
        PERMISSIONS.READ_ROLES,
        PERMISSIONS.READ_TRANSFERS,
        PERMISSIONS.READ_USERS,
        PERMISSIONS.WRITE_TRANSFERS
    ],
    [UserRole.GUEST]: [
        PERMISSIONS.READ_DASHBOARD,
        PERMISSIONS.READ_TRANSFERS
    ],
};
