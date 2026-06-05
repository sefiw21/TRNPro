import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    containerClassName?: string;
}

export const RadioButton = forwardRef<HTMLInputElement, RadioProps>(
    ({ label, containerClassName, className, ...props }, ref) => {
        return (
            <label className={twMerge("flex items-center gap-3 cursor-pointer group", containerClassName)}>
                <div className="relative flex items-center justify-center shrink-0">
                    <input
                        type="radio"
                        ref={ref}
                        {...props}
                        className={twMerge(
                            // Sleeker border and layout
                            "peer appearance-none w-5 h-5 rounded-full border transition-all duration-200 cursor-pointer outline-none focus:ring-4",

                            /* Light Mode */
                            "bg-transparent border-slate-300 checked:bg-blue-600 checked:border-blue-600 focus:ring-blue-500/20",

                            /* Dark Mode */
                            "dark:border-white/20 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-blue-500/30",

                            /* OLED Mode */
                            "oled:border-white/30 oled:checked:bg-white oled:checked:border-white oled:focus:ring-white/20",

                            className
                        )}
                    />
                    {/* The Inner Animated Dot */}
                    <div
                        className="absolute w-2 h-2 rounded-full pointer-events-none opacity-0 scale-50 transition-all duration-200
                            peer-checked:opacity-100 peer-checked:scale-100 
                            bg-white oled:peer-checked:bg-black
                        "
                    />
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

RadioButton.displayName = "RadioButton";