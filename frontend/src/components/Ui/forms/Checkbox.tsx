import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    containerClassName?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, containerClassName, className, ...props }, ref) => {
        return (
            <label className={twMerge("flex items-center gap-3 cursor-pointer group", containerClassName)}>
                <div className="relative flex items-center justify-center shrink-0">
                    <input
                        type="checkbox"
                        ref={ref}
                        {...props}
                        className={twMerge(
                            // Square shape (rounded-md) and standard border-2
                            "peer appearance-none w-5 h-5 rounded-md border-2 transition-all duration-200 cursor-pointer outline-none focus:ring-4",

                            /* Light Mode */
                            "bg-transparent border-slate-300 checked:bg-blue-600 checked:border-blue-600 focus:ring-blue-500/20",

                            /* Theme Mode */
                            "dark:border-white/20 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-blue-500/30",

                            /* OLED Mode */
                            "oled:border-white/30 oled:checked:bg-white oled:checked:border-white oled:focus:ring-white/20",

                            className
                        )}
                    />
                    {/* The Animated Checkmark */}
                    <svg
                        className="absolute w-3.5 h-3.5 pointer-events-none opacity-0 scale-50 transition-all duration-200
                            peer-checked:opacity-100 peer-checked:scale-100 
                            text-white oled:peer-checked:text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <span className="text-sm font-medium transition-colors 
                    text-slate-700 group-hover:text-slate-900 
                    dark:text-slate-300 dark:group-hover:text-white 
                    oled:text-slate-400 oled:group-hover:text-white
                ">
                    {label}
                </span>
            </label>
        );
    }
);

Checkbox.displayName = "Checkbox";