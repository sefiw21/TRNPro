import type { ElementType } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useSidebarContext } from "../context/SidebarContext.tsx";

type SidebarItemProps = {
  Icon: ElementType;
  title?: string;
  url: string;
  size: "s" | "m" | "l";
  isActive?: boolean;
  onClick?: () => void;
};

export const SidebarItem = ({
  Icon,
  title,
  url,
  size,
  isActive,
  onClick,
}: SidebarItemProps) => {
  const { isSmallOpen, closeSidebar } = useSidebarContext();

  const handleClick = () => {
    onClick?.();
    isSmallOpen && closeSidebar();
  };

  return (
    <Link
      to={url}
      onClick={handleClick}
      className={twMerge(
        "flex items-center relative transition-all duration-500 ease-in-out group border overflow-hidden w-full shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        size === "l" ? "h-12 rounded-2xl" : "h-16 rounded-2xl",

        // WRAPPER BACKGROUNDS & BORDERS ONLY
        isActive
          ? [
            "cursor-default shadow-sm",
            "bg-blue-50/80 border-blue-200/50",
            "dark:bg-white/10 dark:border-white/10 dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]", // Theme
            "oled:bg-white/10 oled:border-white/5 oled:shadow-none" // OLED
          ].join(" ")
          : [
            "border-transparent cursor-pointer",
            "hover:bg-slate-200/50", // Light Mode Hover
            "dark:hover:bg-white/5", // Theme Hover
            "oled:hover:bg-white/5"  // OLED Hover
          ].join(" ")
      )}
    >
      {/* THE ICON */}
      <Icon
        className={twMerge(
          "absolute transition-all duration-500 ease-in-out",
          size === "l"
            ? "left-4 top-[50%] translate-x-0 -translate-y-[50%] w-6 h-6"
            : "left-[50%] top-2.5 -translate-x-[50%] translate-y-0 w-6 h-6",

          isActive
            ? "text-blue-600 dark:text-blue-500 oled:text-white"
            : "text-slate-500 dark:text-slate-400 oled:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-200 oled:group-hover:text-white"
        )}
        strokeWidth={isActive ? 2.5 : 2}
      />

      {/* LARGE TEXT */}
      <span
        className={twMerge(
          "absolute left-12 ml-2 top-1/2 -translate-y-1/2 tracking-wide whitespace-nowrap transition-all duration-500 ease-in-out text-sm origin-left",
          size === "l"
            ? "opacity-100 scale-100"
            : "opacity-0 scale-75 pointer-events-none",

          // 3. FIXED: Removed the `lg:` prefix so text-slate-900 applies universally in Light Mode!
          isActive
            ? "font-semibold text-slate-900 dark:text-white oled:text-white"
            : "font-medium text-slate-600 dark:text-slate-300 oled:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white oled:group-hover:text-white"
        )}
      >
        {title}
      </span>

      {/* SMALL TEXT */}
      <span
        className={twMerge(
          "absolute bottom-1.5 left-0 w-full px-1 text-[10px] leading-tight text-center tracking-wider truncate transition-all duration-500 ease-in-out",
          size === "l"
            ? "opacity-0 translate-y-4 pointer-events-none scale-75"
            : "opacity-100 translate-y-0 scale-100",

          // FIXED: Removed the `lg:` prefix here as well
          isActive
            ? "font-bold text-slate-900 dark:text-white oled:text-white"
            : "font-medium text-slate-600 dark:text-slate-300 oled:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white oled:group-hover:text-white"
        )}
      >
        {title}
      </span>
    </Link>
  );
};