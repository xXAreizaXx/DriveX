// NextJS
import type { Metadata } from "next";

// Layout
import AppLayout from "@layouts/AppLayout";

// Metadata
export const metadata: Metadata = {
    title: "DriveX | Roles",
    description: "CMS for DriveX",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return <AppLayout>{children}</AppLayout>;
}
