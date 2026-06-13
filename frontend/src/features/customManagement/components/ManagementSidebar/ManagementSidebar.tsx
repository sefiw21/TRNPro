import { MenuBarAndLogo } from "@/components/layouts/header/components/MenuBarAndLogo";
import { SidebarFooter } from "@/components/layouts/sidebar/components/SidebarFooter";
import { SidebarItem } from "@/components/layouts/sidebar/components/SidebarItem";
import { SideBarSection } from "@/components/layouts/sidebar/components/SideBarSection";
import { useSidebarContext } from "@/components/layouts/sidebar/context/SidebarContext";
import { Home, PlusCircle, type LucideIcon } from "lucide-react";
import { useLocation } from "react-router-dom";
export interface NavItem {
  icon: LucideIcon;
  label: string;
  url: string;
}
const ManagementSidebar = () => {
  const currentNavItems: NavItem[] = [
    { icon: Home, label: " Home", url: "/management" },

    {
      icon: PlusCircle,
      label: "Create new system",
      url: "/management/createSystem"
    }
  ]
  const { isLargeOpen, isSmallOpen, closeSidebar } = useSidebarContext();
  const location = useLocation();
  return (
    <>
      <aside
        className={`
        hidden lg:flex flex-col sticky top-16 md:top-20 left-0 
        z-50 
        h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] 
         bg-white border-r border-slate-200 text-slate-800 
        
        dark:bg-white/10 dark:border-white/4 dark:text-slate-200 

        oled:bg-white/10 oled:border-white/5 oled:text-slate-300
        
        backdrop-blur-xl 
        shrink-0 transition-all duration-500 ease-in-out 
        ${isLargeOpen ? "w-60" : "w-[88px]"}
      `}
      >
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain hover-scrollbar px-3 pt-2">
          <SideBarSection visibleItemCount={4} title="title">
            {currentNavItems.map((item, index) => (
              <SidebarItem
                size={isLargeOpen ? "l" : "s"}
                key={index}
                Icon={item.icon}
                title={item.label}
                url={item.url}
                isActive={location.pathname === item.url}
              />
            ))}
          </SideBarSection>
        </div>


      </aside>
      {isSmallOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-60 backdrop-blur-sm lg:hidden transition-colors duration-500
            bg-slate-900/20 
            dark:bg-black/40 
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
              fixed top-0 left-0 z-70 h-screen w-64 flex flex-col
              backdrop-blur-xl transition-all duration-300 ease-in-out lg:hidden
                   
             bg-white/90 border-r border-slate-200 text-slate-800
              
              dark:bg-white/10 dark:border-white/10 dark:text-slate-200
              
              oled:bg-white/10 oled:border-white/5 oled:text-slate-300
              
              ${isSmallOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        {/* Header */}
        <div className="flex items-center h-16 md:h-20 px-4 shrink-0 transition-colors duration-500
                border-b border-slate-200 
                dark:border-white/5 
                oled:border-white/5
              ">
          <MenuBarAndLogo SidebarOpen={false} />
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain py-6 px-3 hover-scrollbar">
          <SideBarSection visibleItemCount={4}>
            {currentNavItems.map((item, index) => (
              <SidebarItem
                size="l"
                key={index}
                Icon={item.icon}
                title={item.label}
                url={item.url}
                isActive={location.pathname === item.url}
              />
            ))}
          </SideBarSection>
          <SidebarFooter isLargeOpen={isLargeOpen} />
        </div>
      </aside>
    </>
  )
}

export default ManagementSidebar