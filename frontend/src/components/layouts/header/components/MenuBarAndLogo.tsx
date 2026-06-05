import { Sidebar, X } from "lucide-react";
import { Button } from "../../../Ui/forms/Button.tsx";
import { useSidebarContext } from "../../sidebar/context/SidebarContext.tsx";
import Logo from "./Logo.tsx";

type MenuBarAndLogoProps = {
  hidden?: boolean;
  SidebarOpen?: boolean;
  home?: boolean;
};

export const MenuBarAndLogo = ({
  hidden = false,
  SidebarOpen,
  home,
}: MenuBarAndLogoProps) => {
  const { toggleSidebar } = useSidebarContext();

  return (
    <div
      className={`items-center shrink-0 gap-2 md:gap-3 transition-opacity duration-300 ${hidden ? "hidden" : "flex"
        }`}
    >
      {home !== true && (
        <Button
          onClick={() => toggleSidebar()}
          variant="ghost"
          size="icon"
          aria-label={SidebarOpen ? "Close sidebar" : "Open sidebar"}
          className="relative rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-95 transition-all duration-300 ease-in-out flex items-center justify-center shrink-0
            text-slate-600 hover:text-slate-900 hover:bg-slate-200/60    
            dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10
            oled:text-slate-400 oled:hover:text-white oled:hover:bg-white/10
          "
        >
          {SidebarOpen === true ? (
            <X
              className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 hover:rotate-90"
              strokeWidth={2}
            />
          ) : (
            <Sidebar
              className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300"
              strokeWidth={2}
            />
          )}
        </Button>
      )}
      <Logo />
    </div>
  );
};
