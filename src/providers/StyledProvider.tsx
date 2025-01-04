"use client";
 
// NextJS
import { useServerInsertedHTML } from "next/navigation";

// ReactJS
import React, { useState } from "react";

// Styled Components
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
 
export default function StyledProvider({ children }: { children: React.ReactNode }) {
    // States
    const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());
 
    // Render
    useServerInsertedHTML(() => {
        const styles = styledComponentsStyleSheet.getStyleElement();
        styledComponentsStyleSheet.instance.clearTag();
        return <>{styles}</>;
    });
 
    if (typeof window !== "undefined") return <>{children}</>;
 
    return <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
        {children}
    </StyleSheetManager>;
}