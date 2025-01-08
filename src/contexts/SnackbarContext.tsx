import { createContext, useContext } from "react";

type Severity = "success" | "error" | "warning" | "info";

interface SnackbarContextType {
    open: boolean;
    message: string;
    severity: Severity;
    autoHideDuration: number;
    setSnackbar: (message: string, severity?: Severity, duration?: number) => void;
    closeSnackbar: () => void;
}

export const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export function useSnackbar() {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error("useSnackbar must be used within a SnackbarProvider");
    }
    return context;
}
