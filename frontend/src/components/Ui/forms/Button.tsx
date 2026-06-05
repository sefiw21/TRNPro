import { cva, type VariantProps } from "class-variance-authority";
import { ArrowLeft } from "lucide-react";
import type { ComponentProps } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

// 1. BASE STYLES & VARIANTS
export const buttonStyles = cva(
  // Base classes applied to ALL buttons (Fixed typo and added duration for smooth theming)
  ["transition-all", "duration-300", "focus:outline-none", "cursor-pointer"],
  {
    variants: {
      variant: {
        // Pairs light mode slate with dark mode frosty glass
        default: [
          "bg-slate-200", "hover:bg-slate-300", "text-slate-900", // Light Mode
          "dark:bg-white/10", "dark:hover:bg-white/20", "dark:text-white" // Dark Mode
        ],
        // Invisible until hovered. Perfect for icon buttons.
        ghost: [
          "bg-transparent",
          "hover:bg-slate-200/70", "text-slate-600", // Light Mode
          "dark:hover:bg-white/10", "dark:text-slate-300", "dark:hover:text-white" // Dark Mode
        ],
        // A strong, high-contrast button. Inverts based on theme.
        dark: [
          "bg-slate-900", "hover:bg-slate-800", "text-white", // Light Mode
          "dark:bg-white", "dark:hover:bg-slate-200", "dark:text-slate-900" // Dark Mode
        ],
      },
      size: {
        default: ["rounded-lg", "px-4", "py-2", "font-medium", "text-sm"],
        icon: [
          "rounded-full",
          "w-10",
          "h-10",
          "flex",
          "items-center",
          "justify-center",
          "shrink-0" // Prevents the button from squishing in flex containers
        ],
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">;

// 2. THE MAIN BUTTON EXPORT
export const Button = ({ variant, size, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(buttonStyles({ variant, size }), className)}
    />
  );
};

// 3. THE BACK BUTTON
export const BackButton = ({ variant = "ghost", size = "icon", className, ...props }: ButtonProps) => {
  const navigate = useNavigate();

  return (
    <button
      {...props}
      onClick={() => navigate(-1)}
      // Fixed syntax: Just pass the string directly, twMerge handles the rest
      className={twMerge(
        buttonStyles({ variant, size }),
        className
      )}
    >
      <ArrowLeft size={20} />
    </button>
  );
};



