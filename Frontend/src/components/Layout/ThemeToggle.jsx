import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

function ThemeToggle({ className = "" }) {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border border-app-line bg-app-card text-app-muted transition hover:bg-app-hover hover:text-app-text ${className}`}
        >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}

export default ThemeToggle;
