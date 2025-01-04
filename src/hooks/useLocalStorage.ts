"use client";

// ReactJS
import { useState } from "react";

export default function useLocalStorage(key: string, initialValue = "") {
    // State
    const [storedValue, setStoredValue] = useState(() => {
        try {
            let item: string | null = null;

            if (typeof window !== "undefined") {
                item = window.localStorage.getItem(key);
            }

            return item !== null ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    // Functions
    const setValue = (value: unknown) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);

            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch {
            console.error("Algo salió mal");
        }
    };

    return [storedValue, setValue];
}
