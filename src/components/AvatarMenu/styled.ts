// MUI
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

interface IBtnAvatarProps {
    isOpen: boolean;
}

export const BtnAvatar = styled(Button)<IBtnAvatarProps>(({ isOpen }) => ({
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    width: "100%",

    ...(!isOpen && {
        padding: "0px",
    }),
}));
