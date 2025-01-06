// NextJS
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

// Provider
import Provider from "@providers/Providers";

// Styles
import "./globals.css";

// Font
const dmSans = DM_Sans({
    display: "swap",
    subsets: ["latin"],
    variable: "--font-dm-sans",
    weight: ["300", "400", "500", "700"],
});

// Metadata
export const metadata: Metadata = {
    title: "DriveX",
    description: "CMS for DriveX",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${dmSans.variable} antialiased`}>
                <Provider>
                    {children}
                </Provider>
            </body>
        </html>
    );
}
