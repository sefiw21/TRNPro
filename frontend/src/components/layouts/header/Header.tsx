import { Breadcrumbs } from "@/components/Ui/Breadcrumbs";
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
      // 1. Changed to flex-col to stack the top nav and bottom breadcrumbs
      "sticky top-0 z-50 flex flex-col w-full backdrop-blur-xl border-b transition-all duration-500",
      /* Light Mode: Frosty white glass */
      "bg-white/80 border-slate-200",
      /* Theme Mode: Deep blue glass */
      "dark:bg-[#020610]/80 dark:border-white/5",
      /* OLED Mode: Pure black glass */
      "oled:bg-black/90 oled:border-white/5",
      className
    )}>

      {/* --- TOP ROW: Main Header Actions --- */}
      {/* 2. Moved the height and horizontal flex alignment here */}
      <div className="flex justify-between items-center h-14 md:h-16 px-2 md:px-3 w-full">

        {/* LEFT SECTION */}
        <div className="flex shrink-0 w-1/3">
          {leftContent}
        </div>

        {/* CENTER SECTION */}
        <div className="flex-1 flex justify-center items-center w-1/3">
          {centerContent}
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center justify-end gap-2 md:gap-3 shrink-0 w-1/3">
          {rightContent}
        </div>

      </div>

      {/* --- BOTTOM ROW: Breadcrumbs (VS Code Style) --- */}
      {/* 3. Created a dedicated full-width row underneath with a subtle top border */}
      <div className="flex items-center w-full px-2 md:px-4 pb-2 pt-1 min-h-7 border-t border-slate-200/50 dark:border-white/5 oled:border-white/5">
        <Breadcrumbs />
      </div>

    </header>
  );
};