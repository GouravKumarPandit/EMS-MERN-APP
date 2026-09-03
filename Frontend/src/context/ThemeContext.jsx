import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "ems-theme";
const ThemeContext = createContext(null);

function getInitialTheme() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === "light" || stored === "dark") {
            return stored;
        }
    } catch {
        // Keep the default theme if storage is unavailable.
    }
    return "dark";
}

function applyTheme(theme) {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    document.documentElement.style.colorScheme = theme;
}

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        applyTheme(theme);
        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((current) => (current === "dark" ? "light" : "dark"));
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider");
    }
    return context;
}
