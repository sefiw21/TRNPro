import { ChevronDown, ChevronUp } from "lucide-react";
import { Children, useState, type ReactNode } from "react";
import Button from "../../../ui/Button.tsx";

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
    <div className="flex flex-col gap-2 mt-7 overflow-auto">
      {title && <div className="text-lg font-semibold px-3">{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button
          variant="ghost"
          className="flex items-center gap-2 w-full justify-start"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <ExpIcon className="w-6 h-6" />
          <div>{isExpanded ? "less" : "more"}</div>
        </Button>
      )}
    </div>
  );
};
