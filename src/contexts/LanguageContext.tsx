"use client";

// ReactJS
import { createContext, useContext, useState } from "react";

// I18N
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

// Locales
import EN from "@locales/en.json";
import ES from "@locales/es.json";

// Hooks
import useLocalStorage from "@hooks/useLocalStorage";

// Interfaces
interface IContextLanguage {
    language: "en" | "es";
    changeLanguage: (newLanguage: string) => void;
}

const LanguageContext = createContext<IContextLanguage>({
    language: "es",
    changeLanguage: (newLanguage: string) => {}
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    // Custom Hooks
    const [item, setItem] = useLocalStorage("language", "es");

    // useState
    const [language, setLanguage] = useState(item || "es");

    // Functions
    const changeLanguage = (newLanguage: string) => {
        setItem(newLanguage);
        setLanguage(newLanguage);
        i18next?.changeLanguage(newLanguage);
    };

    // I18N
    i18next.use(initReactI18next).init({
        fallbackLng: item || language,
        lng: item || language,
        debug: false,
        interpolation: {
            escapeValue: false
        },
        resources: {
            en: {
                translation: EN
            },
            es: {
                translation: ES
            }
        }
    });

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
