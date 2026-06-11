import { ChevronDown, ChevronUp } from "lucide-react";
import { Children, useState, type ReactNode } from "react";
import { Button } from "../../../Ui/forms/Button.tsx";

type SideBarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};

export const SideBarSection = ({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: SideBarSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const showExpandButton = visibleItemCount < childrenArray.length;

  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);
  const ExpIcon = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div className="flex flex-col z-50 gap-1 mb-4">
      {/* 1. THE TITLE */}
      {title && (
        <div className="text-xs font-bold px-3 mb-2 uppercase tracking-wider transition-colors duration-300
          text-slate-900
          dark:text-slate-400 
          oled:text-slate-500
        ">
          {title}
        </div>
      )}

      {visibleChildren}

      {/* 2. THE EXPAND BUTTON */}
      {showExpandButton && (
        <Button
          variant="ghost"
          // 'group' allows the child icon and text to react when the button itself is hovered
          className="group flex items-center gap-3 w-full justify-start mt-1 px-3 transition-colors duration-300"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* THE ICON */}
          <ExpIcon className="w-5 h-5 transition-colors duration-300
            text-slate-900 group-hover:text-slate-900 
            dark:text-slate-400 dark:group-hover:text-white
            oled:text-slate-500 oled:group-hover:text-white
          " />

          {/* THE TEXT */}
          <span className="text-sm font-medium transition-colors duration-300
            text-slate-900 group-hover:text-slate-900 
            dark:text-slate-300 dark:group-hover:text-white
            oled:text-slate-400 oled:group-hover:text-white
          ">
            {isExpanded ? "Show less" : "Show more"}
          </span>
        </Button>
      )}
    </div>
  );
};