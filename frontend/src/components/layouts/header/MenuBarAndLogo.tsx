import { Menu, X } from "lucide-react";
import Button from "../../ui/Button.tsx";
import Logo from "../../ui/Logo.tsx";
import { useSidebarContext } from "../sidebar/context/SidebarContext.tsx";

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
      className={`items-center shrink-0 gap-4 pl-4 ${hidden ? "hidden" : "flex"}`}
    >
      {home !== true && (
        <Button
          onClick={() => toggleSidebar()}
          variant="ghost"
          size="icon"
          aria-label="Toggle sidebar"
          className="relative w-10 h-10 rounded-full text-amber-50 hover:bg-white/10 focus:outline-none  active:scale-95 transition-all duration-200 ease-in-out flex items-center justify-center"
        >
          {SidebarOpen === true ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </Button>
      )}
      <Logo />
    </div>
  );
};
