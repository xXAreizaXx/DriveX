"use client";

// NextJS
import { redirect } from "next/navigation";

// Context
import { useAuth } from "@contexts/AuthContext";

export default function RootPage() {
    // Hooks
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) redirect("/home");

    redirect("/login");
}