// MUI
import { ListItemButton } from "@mui/material";
import { styled } from "@mui/material/styles";

interface IListItemButtonProps {
    isActived?: boolean;
    open?: boolean;
}

export const CustomListItem = styled(ListItemButton)<IListItemButtonProps>(({ theme, isActived, open }) => ({
    alignItems: "center",
    borderRadius: 8,
    display: "flex",
    gap: "0.5rem",
    
    "&:hover": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.main,
    },

    ...(isActived && {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.main,
    }),

    ...(!open && {
        width: "100%",
        justifyContent: "center",
    }),
}));