import { MenuBarAndLogo } from "@/components/layouts/header/components/MenuBarAndLogo";
import { SidebarFooter } from "@/components/layouts/sidebar/components/SidebarFooter";
import { SidebarItem } from "@/components/layouts/sidebar/components/SidebarItem";
import { SideBarSection } from "@/components/layouts/sidebar/components/SideBarSection";
import { useSidebarContext } from "@/components/layouts/sidebar/context/SidebarContext";
import { Home, PlusCircle, type LucideIcon } from "lucide-react";

// 1. Updated interface to accept the exact flag
export interface NavItem {
  icon: LucideIcon;
  label: string;
  url: string;
  exact?: boolean;
}

const DashboardSidebar = () => {
  const currentNavItems: NavItem[] = [
    { icon: Home, label: "Home", url: "/systems", exact: true },

    {
      icon: PlusCircle,
      label: "Create new system",
      url: "/systems/create-system",
    },
  ];
  const { isLargeOpen, isSmallOpen, closeSidebar } = useSidebarContext();

  // Notice useLocation is completely gone!

  return (
    <>
      {/* =========================================
          1. DESKTOP SIDEBAR (Sticky)
          ========================================= */}
      <aside
        className={`
          hidden lg:flex flex-col sticky top-16 md:top-20 left-0 
          z-50 shrink-0 transition-all duration-500 ease-in-out 
          h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] 
          backdrop-blur-xl
          
          bg-white/80 border-r border-slate-200 text-slate-700
          dark:bg-slate-900/80 dark:border-white/10 dark:text-slate-300 
          oled:bg-black/80 oled:border-white/10 oled:text-slate-300
          
          ${isLargeOpen ? "w-60" : "w-[88px]"}
        `}
      >
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain hover-scrollbar px-3 pt-2">
          <SideBarSection visibleItemCount={4} title="Management">
            {currentNavItems.map((item, index) => (
              // 4. Look how clean this mapping is now! 
              <SidebarItem
                size={isLargeOpen ? "l" : "s"}
                key={index}
                Icon={item.icon}
                title={item.label}
                url={item.url}
                exact={item.exact} // We pass the flag down here
              />
            ))}
          </SideBarSection>
        </div>
      </aside>

      {/* =========================================
          2. MOBILE OVERLAY BACKDROP
          ========================================= */}
      {isSmallOpen && (
        <div
          onClick={closeSidebar}
          className="
            fixed inset-0 z-60 backdrop-blur-sm lg:hidden transition-all duration-500
            bg-slate-900/40 
            dark:bg-slate-900/60 
            oled:bg-black/80
          "
          aria-hidden="true"
        />
      )}

      {/* =========================================
          3. MOBILE SIDEBAR (Slide-out Drawer) 
          ========================================= */}
      <aside
        className={`
          fixed top-0 left-0 z-[70 h-screen w-64 flex flex-col
          backdrop-blur-2xl transition-all duration-300 ease-in-out lg:hidden
          
          bg-white/95 border-r border-slate-200 text-slate-800
          dark:bg-slate-900/95 dark:border-white/10 dark:text-slate-200
          oled:bg-black/95 oled:border-white/10 oled:text-slate-300
          
          ${isSmallOpen
            ? "translate-x-0 shadow-2xl shadow-slate-900/20 dark:shadow-black/50"
            : "-translate-x-full"
          }
        `}
      >
        <div className="flex items-center h-16 md:h-20 px-4 shrink-0 transition-colors duration-500 border-b border-slate-200 dark:border-white/10 oled:border-white/10">
          <MenuBarAndLogo SidebarOpen={false} />
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain py-6 px-3 hover-scrollbar">
          <SideBarSection visibleItemCount={4}>
            {/* 5. Don't forget to clean up the mobile mapping too! */}
            {currentNavItems.map((item, index) => (
              <SidebarItem
                size="l"
                key={index}
                Icon={item.icon}
                title={item.label}
                url={item.url}
                exact={item.exact} // Pass the flag down here as well
              />
            ))}
          </SideBarSection>
          <SidebarFooter isLargeOpen={isLargeOpen} />
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;