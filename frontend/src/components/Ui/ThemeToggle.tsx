import { useThemeStore } from "@/store/useThemeStore";
import { MonitorIcon, MonitorOff, MoonIcon, SunIcon } from "lucide-react";

export function ThemeToggle() {
    const { theme, setTheme } = useThemeStore();

    const cycleTheme = () => {
        // 4-Way Cycle: Light -> Theme -> OLED -> System -> back to Light
        if (theme === "light") setTheme("theme");
        else if (theme === "theme") setTheme("oled");
        else if (theme === "oled") setTheme("system");
        else setTheme("light");
    };

    return (
        <button
            onClick={cycleTheme}
            aria-label="Cycle application theme"
            className="flex items-center px-4 py-2.5 text-sm text-left w-full group transition-colors cursor-pointer focus:outline-none
                /* Light Mode */
                hover:bg-slate-100 text-slate-700
                /* Theme Mode */
                dark:hover:bg-[#3f3f3f] dark:text-[#aaaaaa]
                /* OLED Mode */
                oled:hover:bg-white/10 oled:text-slate-400
            "
        >
            {/* 1. Classic Light Mode */}
            {theme === "light" && (
                <div className="flex items-center gap-3 w-full animate-in fade-in duration-300">
                    <SunIcon
                        className="w-4 h-4 shrink-0 transition-all duration-300 animate-in spin-in-90
                            text-slate-400 group-hover:text-slate-900 
                            dark:text-[#aaaaaa] dark:group-hover:text-white 
                            oled:text-slate-500 oled:group-hover:text-white
                        "
                    />
                    <span className="transition-colors group-hover:text-slate-900 dark:group-hover:text-white oled:group-hover:text-white">
                        Appearance: Light Mode
                    </span>
                </div>
            )}

            {/* 2. Your custom Blue Theme */}
            {theme === "theme" && (
                <div className="flex items-center gap-3 w-full animate-in fade-in duration-300">
                    <MoonIcon
                        className="w-4 h-4 shrink-0 transition-all duration-300 animate-in spin-in-90
                            text-slate-400 group-hover:text-slate-900 
                            dark:text-[#aaaaaa] dark:group-hover:text-white 
                            oled:text-slate-500 oled:group-hover:text-white
                        "
                    />
                    <span className="transition-colors group-hover:text-slate-900 dark:group-hover:text-white oled:group-hover:text-white">
                        Appearance: Deep Blue
                    </span>
                </div>
            )}

            {/* 3. Pure Black OLED */}
            {theme === "oled" && (
                <div className="flex items-center gap-3 w-full animate-in fade-in duration-300">
                    <MonitorOff
                        className="w-4 h-4 shrink-0 transition-all duration-300 animate-in spin-in-90
                            text-slate-400 group-hover:text-slate-900 
                            dark:text-[#aaaaaa] dark:group-hover:text-white 
                            oled:text-slate-500 oled:group-hover:text-white
                        "
                    />
                    <span className="transition-colors group-hover:text-slate-900 dark:group-hover:text-white oled:group-hover:text-white">
                        Appearance: OLED Black
                    </span>
                </div>
            )}

            {/* 4. Auto-Sync System */}
            {theme === "system" && (
                <div className="flex items-center gap-3 w-full animate-in fade-in duration-300">
                    <MonitorIcon
                        className="w-4 h-4 shrink-0 transition-all duration-300 animate-in spin-in-90
                            text-slate-400 group-hover:text-slate-900 
                            dark:text-[#aaaaaa] dark:group-hover:text-white 
                            oled:text-slate-500 oled:group-hover:text-white
                        "
                    />
                    <span className="transition-colors group-hover:text-slate-900 dark:group-hover:text-white oled:group-hover:text-white">
                        Appearance: System Default
                    </span>
                </div>
            )}
        </button>
    );
}