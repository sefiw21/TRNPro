import { MoreVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface MenuAction {
    label: string;
    icon: React.ReactNode;
    onClick: (e: React.MouseEvent) => void;
    isDestructive?: boolean;
}

interface ActionMenuProps {
    actions: MenuAction[];
}

export const ActionMenu = ({ actions }: ActionMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({
        top: 0,
        right: 0,
    });

    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const updatePosition = () => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();

        setPosition({
            top: rect.bottom + 8,
            right: window.innerWidth - rect.right,
        });
    };

    useEffect(() => {
        if (!isOpen) return;

        updatePosition();

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (
                menuRef.current &&
                !menuRef.current.contains(target) &&
                !buttonRef.current?.contains(target)
            ) {
                setIsOpen(false);
            }
        };

        const handleResize = () => updatePosition();

        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleResize, true);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleResize, true);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const toggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (!isOpen) {
            updatePosition();
        }

        setIsOpen((prev) => !prev);
    };

    return (
        <>
            <button
                ref={buttonRef}
                onClick={toggleMenu}
                className="p-2 rounded-xl outline-none transition-all duration-200 text-slate-500 hover:text-slate-900 dark:text-slate-400  dark:hover:text-white  oled:hover:text-white  hover:bg-slate-100  dark:hover:bg-slate-800/50  oled:hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-blue-500/50" >
                <MoreVertical className="w-5 h-5" />
            </button>

            {isOpen &&
                createPortal(
                    <div
                        ref={menuRef}
                        className="fixed 
                            z-999999
                            w-48
                            overflow-hidden 
                            rounded-xl 
                            border 
                            p-1.5
                            shadow-2xl 
                            backdrop-blur-md
                            transition-all
                            animate-in 
                            fade-in 
                            zoom-in-95 
                            duration-150
                            border-slate-200 
                            bg-white/90 
                            shadow-slate-200/50
                            dark:border-white/10 
                            dark:bg-slate-900/80 
                            dark:shadow-black/50
                            oled:border-white/10
                            oled:bg-black/80
                        "
                        style={{
                            top: position.top,
                            right: position.right,
                        }}
                    >
                        <div className="flex flex-col gap-0.5">
                            {actions.map((action, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        action.onClick(e);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 ${action.isDestructive ? `
                                     text-red-600 dark:text-red-400  oled:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10  oled:hover:bg-red-500/10 hover:text-red-700 dark:hover:text-red-300   ` : `
                                                    text-slate-700 
                                                    dark:text-slate-300 
                                                    oled:text-slate-300
                                                    hover:bg-slate-100 
                                                    dark:hover:bg-slate-800/50 
                                                    oled:hover:bg-white/10
                                                    hover:text-slate-900
                                                    dark:hover:text-white
                                                `
                                        }
                                    `}
                                >
                                    <span className="flex items-center justify-center opacity-80">
                                        {action.icon}
                                    </span>

                                    <span>{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
};