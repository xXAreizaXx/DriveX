// MUI
import { ListItemButton } from "@mui/material";
import { styled } from "@mui/material/styles";

interface IListItemButtonProps {
    isActive?: boolean;
    open?: boolean;
}

export const CustomListItem = styled(ListItemButton)<IListItemButtonProps>(({ theme, isActive, open }) => ({
    alignItems: "center",
    borderRadius: 8,
    color: theme.palette.primary.main,
    display: "flex",
    gap: "0.5rem",

    "&:hover": {
        backgroundColor: "#f97316",
        color: "#9a4a12",
    },

    ...(isActive && {
        backgroundColor: "#f97316",
        color: "#9a4a12",
    }),

    ...(!open && {
        width: "100%",
        justifyContent: "center",
    }),
}));