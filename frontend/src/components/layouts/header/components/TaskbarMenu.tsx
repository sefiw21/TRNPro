import { Button } from "@/components/Ui/forms/Button";
import { ThemeToggle } from "@/components/Ui/ThemeToggle";
import { BookOpen, HelpCircle, MessageSquare, MoreVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const TaskbarMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Professional touch: Close the menu if the user clicks outside of it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            {/* The Trigger Button */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                size="icon"
                variant="ghost"
                aria-expanded={isOpen}
                aria-label="App settings and support"
                className={`rounded-full transition-colors duration-300
                    /* Light Mode */
                    text-slate-500 hover:text-slate-900 hover:bg-slate-200/50
                    /* Theme Mode */
                    dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/10
                    /* OLED Mode */
                    oled:text-slate-500 oled:hover:text-white oled:hover:bg-white/10
                    ${isOpen ? "bg-slate-200/50 dark:bg-white/10 oled:bg-white/10" : ""}
                `}
            >
                <MoreVertical className="w-5 h-5" />
            </Button>

            {/* The Dropdown Menu */}
            {isOpen && (
                <div
                    className="
                        absolute top-[calc(100%+8px)] right-0 z-50
                        w-56 origin-top-right rounded-xl 
                        animate-in fade-in zoom-in-95 duration-200
                        flex flex-col overflow-hidden transition-colors py-2
                        /* Light Mode */
                        bg-white text-slate-700 border border-slate-200 shadow-xl
                        /* Theme Mode */
                        dark:bg-[#282828] dark:text-[#aaaaaa] dark:border-[#3f3f3f] dark:shadow-[0_4px_32px_rgba(0,0,0,0.5)]
                        /* OLED Mode */
                        oled:bg-black oled:text-slate-400 oled:border-white/10 oled:shadow-none
                    "
                >
                    {/* Menu Items */}
                    <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-left w-full group transition-colors hover:bg-slate-100 dark:hover:bg-[#3f3f3f] oled:hover:bg-white/10">
                        <HelpCircle className="w-4 h-4 shrink-0 transition-colors text-slate-400 group-hover:text-slate-900 dark:text-[#aaaaaa] dark:group-hover:text-white oled:text-slate-500 oled:group-hover:text-white" />
                        <span className="transition-colors group-hover:text-slate-900 dark:group-hover:text-white oled:group-hover:text-white">Help Center</span>
                    </button>

                    <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-left w-full group transition-colors hover:bg-slate-100 dark:hover:bg-[#3f3f3f] oled:hover:bg-white/10">
                        <BookOpen className="w-4 h-4 shrink-0 transition-colors text-slate-400 group-hover:text-slate-900 dark:text-[#aaaaaa] dark:group-hover:text-white oled:text-slate-500 oled:group-hover:text-white" />
                        <span className="transition-colors group-hover:text-slate-900 dark:group-hover:text-white oled:group-hover:text-white">Platform Guidelines</span>
                    </button>

                    <div className="h-px w-full my-1 transition-colors bg-slate-200 dark:bg-[#3f3f3f] oled:bg-white/10" />
                    <ThemeToggle />

                    <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-left w-full group transition-colors hover:bg-slate-100 dark:hover:bg-[#3f3f3f] oled:hover:bg-white/10">
                        <MessageSquare className="w-4 h-4 shrink-0 transition-colors text-slate-400 group-hover:text-slate-900 dark:text-[#aaaaaa] dark:group-hover:text-white oled:text-slate-500 oled:group-hover:text-white" />
                        <span className="transition-colors group-hover:text-slate-900 dark:group-hover:text-white oled:group-hover:text-white">Send Feedback</span>
                    </button>
                </div>
            )}
        </div>
    );
};