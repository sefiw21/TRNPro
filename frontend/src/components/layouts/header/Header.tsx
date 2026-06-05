import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface HeaderProps {
  leftContent?: ReactNode;
  centerContent?: ReactNode | string;
  rightContent?: ReactNode;
  className?: string; // Allows overriding styles if needed on specific pages
}

export const Header = ({ leftContent, centerContent, rightContent, className }: HeaderProps) => {
  return (
    <header className={twMerge(
      "sticky top-0 z-50 h-16 md:h-20 px-2 md:px-3 flex gap-4 justify-between items-center backdrop-blur-xl border-b transition-all duration-500",
      /* 1. Light Mode: Frosty white glass */
      "bg-white/80 border-slate-200",
      /* 2. Theme Mode: Deep blue glass */
      "dark:bg-[#020610]/80 dark:border-white/5",
      /* 3. OLED Mode: Pure black glass */
      "oled:bg-black/90 oled:border-white/5",
      className
    )}>

      {/* LEFT SECTION */}
      {leftContent && (
        <div className="flex shrink-0">
          {leftContent}
        </div>
      )}

      {/* CENTER SECTION */}
      {centerContent && (
        <div className="flex-1 flex justify-center items-center max-w-[720px] mx-auto">
          {centerContent}
        </div>
      )}

      {/* RIGHT SECTION */}
      {rightContent && (
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {rightContent}
        </div>
      )}

    </header>
  );
};