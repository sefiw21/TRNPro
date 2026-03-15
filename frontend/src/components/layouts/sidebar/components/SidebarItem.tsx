import type { ElementType } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { buttonStyles } from "../../../ui/Button.tsx";
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
        buttonStyles({ variant: "ghost" }),

        "block relative transition-all duration-500 ease-in-out group border overflow-hidden w-full",
        size === "l"
          ? "h-12 rounded-2xl"
          : "h-16 rounded-2xl",

        // Active vs Inactive logic
        isActive
          ? "bg-white/10 text-slate-100 border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:bg-white/10 hover:text-slate-100 cursor-default"
          : "text-slate-400 border-transparent hover:bg-white/5 hover:text-slate-200"
      )}
    >


      <Icon
        className={twMerge(
          "absolute transition-all duration-500 ease-in-out",
          size === "l"
            ? "left-4 top-[50%] translate-x-0 -translate-y-[50%] w-6 h-6"
            : "left-[50%] top-2.5 -translate-x-[50%] translate-y-0 w-6 h-6",
          // Active state styling
          isActive
            ? "text-blue-500 group-hover:text-blue-500"
            : "text-slate-400 group-hover:text-slate-300"
        )}
        strokeWidth={isActive ? 2.5 : 2}
      />
      <span
        className={twMerge(
          "absolute left-12 ml-2 top-1/2 -translate-y-1/2 tracking-wide whitespace-nowrap transition-all duration-500 ease-in-out text-sm origin-left",
          size === "l"
            ? "opacity-100 scale-100"
            : "opacity-0 scale-75 pointer-events-none", // Scaling down slightly makes the fade out look much cleaner
          isActive
            ? "font-semibold text-slate-100 group-hover:text-slate-100"
            : "font-medium group-hover:text-slate-200"
        )}
      >
        {title}
      </span>

      {/* SMALL TEXT: Slides up from the bottom */}
      <span
        className={twMerge(
          "absolute bottom-1.5 left-0 w-full px-1 text-[10px] leading-tight text-center tracking-wider truncate transition-all duration-500 ease-in-out",
          size === "l"
            ? "opacity-0 translate-y-4 pointer-events-none scale-75"
            : "opacity-100 translate-y-0 scale-100",
          isActive
            ? "font-bold text-slate-100 group-hover:text-slate-100"
            : "font-medium group-hover:text-slate-200"
        )}
      >
        {title}
      </span>
    </Link>
  );
};