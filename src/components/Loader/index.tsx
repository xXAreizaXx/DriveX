// MUI
import CircularProgress from "@mui/material/CircularProgress";

// Styled
import { LoaderContainer } from "./styled";

export default function Loader() {
    return <LoaderContainer>
        <CircularProgress />
    </LoaderContainer>;
}