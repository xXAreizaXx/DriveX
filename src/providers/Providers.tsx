"use client";

// Providers
import AuthProvider from "@contexts/AuthContext";
import { LanguageProvider } from "@contexts/LanguageContext";
import { SlideActionProvider } from "@contexts/SlideActionContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { ReactQueryClientProvider } from "./ReactQueryProvider";
import StyledProvider from "./StyledProvider";

// Styles
import theme from "../theme";

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <SlideActionProvider>
                <StyledProvider>
                    <AppRouterCacheProvider>
                        <LanguageProvider>
                            <ReactQueryClientProvider>
                                <ThemeProvider theme={theme}>
                                    {children}
                                </ThemeProvider>
                            </ReactQueryClientProvider>
                        </LanguageProvider>
                    </AppRouterCacheProvider>
                </StyledProvider>
            </SlideActionProvider>
        </AuthProvider>
    );
}
