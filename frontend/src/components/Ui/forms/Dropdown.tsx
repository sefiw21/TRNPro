import { forwardRef, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export interface DropdownOption {
    label: string;
    value: string | number;
}

interface DropdownProps {
    label?: string;
    options: DropdownOption[];
    value: string | number | null;
    onChange: (value: string | number) => void;
    placeholder?: string;
    containerClassName?: string;
    className?: string;
    disabled?: boolean;
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
    (
        {
            label,
            options,
            value,
            onChange,
            placeholder = "Select an option...",
            containerClassName,
            className,
            disabled = false,
        },
        ref
    ) => {
        const [isOpen, setIsOpen] = useState(false);
        const dropdownRef = useRef<HTMLDivElement | null>(null);

        const selectedOption = options.find((opt) => opt.value === value);

        // Keep click-outside for mobile users or focus states
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, []);

        return (
            <div
                ref={(node) => {
                    dropdownRef.current = node;
                    if (typeof ref === "function") {
                        ref(node);
                    } else if (ref) {
                        ref.current = node;
                    }
                }}
                className={twMerge("relative w-full flex flex-col gap-1.5 group", containerClassName)}
                onMouseEnter={() => !disabled && setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                {label && (
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 oled:text-slate-400">
                        {label}
                    </span>
                )}

                <button
                    type="button"
                    disabled={disabled}
                    // 2. KEEP ONCLICK FOR MOBILE/ACCESSIBILITY
                    onClick={() => setIsOpen(!isOpen)}
                    className={twMerge(
                        "flex items-center justify-between w-full px-4 py-2.5 text-left text-sm rounded-lg border transition-all duration-200 outline-none",
                        "disabled:opacity-50 disabled:cursor-not-allowed",

                        /* Light Mode */
                        "bg-white border-slate-300 text-slate-700 hover:border-slate-400 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500",

                        /* Dark Mode */
                        "dark:bg-slate-900 dark:border-white/20 dark:text-slate-200 dark:hover:border-white/40 dark:focus:ring-blue-500/30 dark:focus:border-blue-500",

                        /* OLED Mode */
                        "oled:bg-black oled:border-white/30 oled:text-slate-300 oled:hover:border-white/50 oled:focus:ring-white/20 oled:focus:border-white",

                        className
                    )}
                >
                    <span className={!selectedOption ? "opacity-60" : ""}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={twMerge(
                            "transition-transform duration-200 shrink-0 ml-2",
                            isOpen ? "rotate-180" : "rotate-0"
                        )}
                    >
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>

                {isOpen && (
                    // 3. ADD "pt-2" INSTEAD OF "mt-2" TO CREATE A HOVER BRIDGE
                    <div className="absolute z-50 top-full left-0 w-full pt-2">
                        <ul
                            className={twMerge(
                                "max-h-60 overflow-y-auto rounded-lg border shadow-lg py-1 animate-in fade-in slide-in-from-top-2 duration-200",

                                /* Light Mode */
                                "bg-white border-slate-200 shadow-slate-200/50",

                                /* Dark Mode */
                                "dark:bg-slate-800 dark:border-white/10 dark:shadow-none",

                                /* OLED Mode */
                                "oled:bg-black oled:border-white/20 oled:shadow-none"
                            )}
                        >
                            {options.map((option) => (
                                <li
                                    key={option.value}
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={twMerge(
                                        "px-4 py-2.5 text-sm cursor-pointer transition-colors duration-150 flex items-center justify-between group",

                                        /* Light Mode */
                                        "text-slate-700 hover:bg-slate-100",
                                        value === option.value && "bg-blue-50 text-blue-600 font-medium",

                                        /* Dark Mode */
                                        "dark:text-slate-300 dark:hover:bg-slate-700/50",
                                        value === option.value && "dark:bg-slate-700 dark:text-blue-400 font-medium",

                                        /* OLED Mode */
                                        "oled:text-slate-400 oled:hover:bg-white/10 oled:hover:text-white",
                                        value === option.value && "oled:bg-white/15 oled:text-white font-medium"
                                    )}
                                >
                                    {option.label}

                                    {value === option.value && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="shrink-0"
                                        >
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    }
);

Dropdown.displayName = "Dropdown";