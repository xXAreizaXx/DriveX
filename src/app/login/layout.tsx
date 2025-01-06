// NextJS
import type { Metadata } from "next";

// Layout
import SignInLayout from "@layouts/SignInLayout";

// Metadata
export const metadata: Metadata = {
    title: "DriveX | Login",
    description: "CMS for DriveX",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <SignInLayout>
            {children}
        </SignInLayout>
    );
}
