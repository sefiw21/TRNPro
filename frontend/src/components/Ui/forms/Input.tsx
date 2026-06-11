import { Eye, EyeOff } from "lucide-react";
import React, { forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";

// 1. Defined our 3-tier theme styles outside the component to keep it clean
const inputStyles = `w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 outline-none
    /* Light Mode */
    bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 
    hover:border-slate-400 
    focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15
    
    /* Theme Mode (Deep Blue) */
    dark:bg-[#0f172a]/50 dark:border dark:border-white/10 dark:text-white dark:placeholder-slate-500 
    dark:hover:border-white/20 dark:focus:bg-[#0f172a]/90 dark:focus:border-blue-500 dark:focus:ring-2 dark:focus:ring-blue-500/30
    
    /* OLED Mode */
    oled:bg-transparent oled:border oled:border-white/20 oled:text-white oled:placeholder-slate-600 
    oled:hover:border-white/40 oled:focus:bg-black oled:focus:border-white/60 oled:focus:ring-1 oled:focus:ring-white/20`;

// 2. Added optional label and error props
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, containerClassName, className, type = "text", ...props }, ref) => {
        // State to track password visibility
        const [showPassword, setShowPassword] = useState(false);

        // Determine the actual HTML input type based on state
        const isPasswordType = type === "password";
        const currentType = isPasswordType && showPassword ? "text" : type;

        return (
            <div className={twMerge("w-full", containerClassName)}>
                {/* Render the label only if one is provided */}
                {label && (
                    <label className="block text-sm font-medium mb-1.5 ml-1 transition-colors text-slate-700 dark:text-slate-300 oled:text-slate-400">
                        {label}
                    </label>
                )}

                {/* Relative wrapper needed to position the eye icon inside the input */}
                <div className="relative">
                    <input
                        type={currentType}
                        ref={ref} // Crucial for React Hook Form integration
                        className={twMerge(
                            inputStyles,
                            // If it's a password field, add right padding so text doesn't hide behind the icon
                            isPasswordType && "pr-11",
                            // If there is an error, override the borders to be red!
                            error && "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20 dark:border-rose-500 dark:focus:border-rose-500 oled:border-rose-500 oled:focus:border-rose-500",
                            className
                        )}
                        {...props}
                    />

                    {/* Render the eye toggle ONLY if the developer passed type="password" */}
                    {isPasswordType && (
                        <button
                            type="button" // CRUCIAL: Prevents the button from accidentally submitting the form
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50
                                text-slate-400 hover:text-slate-700 hover:bg-slate-200/50
                                dark:text-slate-500 dark:hover:text-slate-300 dark:hover:bg-white/10
                                oled:text-slate-600 oled:hover:text-slate-400 oled:hover:bg-white/10
                            "
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                        </button>
                    )}
                </div>

                {/* Render the error message only if one exists */}
                {error && (
                    <p className="text-rose-500 dark:text-rose-400 text-[11px] font-medium mt-2 ml-2 flex items-center gap-1.5 animate-pulse">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";