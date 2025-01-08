// ReactJS
import { ReactNode, useState } from "react";

// Context
import { SnackbarContext } from "@contexts/SnackbarContext";

// MUI
import { Alert, Snackbar } from "@mui/material";

interface SnackbarProviderProps {
    children: ReactNode;
}

export function SnackbarProvider({ children }: SnackbarProviderProps) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<"success" | "error" | "warning" | "info">("success");
    const [autoHideDuration, setAutoHideDuration] = useState(6000);

    const setSnackbar = (
        message: string,
        severity: "success" | "error" | "warning" | "info" = "success",
        duration: number = 6000
    ) => {
        setMessage(message);
        setSeverity(severity);
        setAutoHideDuration(duration);
        setOpen(true);
    };

    const closeSnackbar = () => {
        setOpen(false);
    };

    return (
        <SnackbarContext.Provider
            value={{
                open,
                message,
                severity,
                autoHideDuration,
                setSnackbar,
                closeSnackbar,
            }}
        >
            {children}
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={open} autoHideDuration={autoHideDuration} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity={severity} variant="filled" sx={{ width: "100%" }}>
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
}
