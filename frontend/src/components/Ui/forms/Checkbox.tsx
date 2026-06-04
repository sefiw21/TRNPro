import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    containerClassName?: string;
}

// CHECKBOX CARD STYLES (Your exact 3-tier theme styles)
const checkboxCardStyles = `flex items-center gap-3.5 cursor-pointer group p-4 rounded-xl border transition-all duration-300
    bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm
    has-[:checked]:bg-blue-50/50 has-[:checked]:border-blue-300
    
    dark:bg-white/5 dark:border-white/5 dark:hover:border-white/10 dark:hover:bg-white/10
    dark:has-[:checked]:bg-blue-500/10 dark:has-[:checked]:border-blue-500/30
    
    oled:bg-transparent oled:border-white/10 oled:hover:border-white/20 oled:hover:bg-white/5
    oled:has-[:checked]:bg-white/5 oled:has-[:checked]:border-white/30`;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, containerClassName, className, ...props }, ref) => {
        return (
            <label className={twMerge(checkboxCardStyles, containerClassName)}>
                <div className="relative flex items-center justify-center shrink-0">
                    <input
                        type="checkbox"
                        ref={ref} // Crucial for React Hook Form integration!
                        {...props}
                        className={twMerge(
                            "peer appearance-none w-5 h-5 rounded-md border-2 transition-all duration-300 cursor-pointer outline-none focus:ring-4",
                            /* Light Mode */
                            "bg-white border-slate-300 checked:bg-blue-600 checked:border-blue-600 focus:ring-blue-500/20",
                            /* Theme Mode */
                            "dark:bg-transparent dark:border-white/20 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-blue-500/30",
                            /* OLED Mode */
                            "oled:bg-transparent oled:border-white/30 oled:checked:bg-white oled:checked:border-white oled:focus:ring-white/20",
                            className
                        )}
                    />
                    {/* The Animated Checkmark */}
                    <svg
                        className="absolute w-3.5 h-3.5 pointer-events-none opacity-0 scale-50 transition-all duration-300
                            peer-checked:opacity-100 peer-checked:scale-100 
                            text-white oled:peer-checked:text-black
                        "
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