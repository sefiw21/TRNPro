import { useThemeStore } from "@/store/useThemeStore";
import { useEffect } from "react";

export function useSystemThemeSync() {
    const theme = useThemeStore((state) => state.theme);

    useEffect(() => {
        // If the user manually selected light, theme, or oled, stop listening to the OS.
        if (theme !== "system") return;

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        // The function that runs when the OS changes from light to dark (or vice versa)
        const handleChange = (e: MediaQueryListEvent) => {
            const root = document.documentElement;

            // 1. Always wipe the slate clean
            root.classList.remove("light", "dark");
            root.removeAttribute("data-theme");

            // 2. Apply the new OS preference
            if (e.matches) {
                // If OS goes dark, we default to your favorite custom Blue Theme
                root.classList.add("dark");
            } else {
                // If OS goes light
                root.classList.add("light");
            }
        };

        // Start listening
        mediaQuery.addEventListener("change", handleChange);

        // Stop listening when the component unmounts to prevent memory leaks
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme]);
}