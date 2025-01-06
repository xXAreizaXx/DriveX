"use client";

// ReactJS
import { useState } from "react";

// Components
import NavBar from "@components/NavBar";
import SlideBar from "@components/SlideBar";
import SliderDrawer from "@components/SliderDrawer";

// MUI
import { Toolbar } from "@mui/material";

// Styled
import { AppChildren, AppContainer, AppContent } from "./styled";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    // State
    const [open, setOpen] = useState(true);

    // Functions
    const toggleSlider = () => {
        setOpen(!open);
    };

    return (
        <AppContainer>
            <SlideBar open={open} toggleDrawer={toggleSlider} />
            <NavBar open={open} />
            <AppContent>
                <Toolbar />
                <AppChildren>
                    {children}
                </AppChildren>
            </AppContent>
            <SliderDrawer />
        </AppContainer>
    );
}