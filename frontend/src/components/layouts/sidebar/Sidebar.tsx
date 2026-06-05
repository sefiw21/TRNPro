import { useLocation } from "react-router-dom";
import {
  managenentNavItems,
  mentalNavItems,
  physicalNavItems,
  spiritualNavItems,
  type NavItem,
} from "../../Ui/Icons.tsx";
import { MenuBarAndLogo } from "../header/components/MenuBarAndLogo.tsx";
import { SidebarFooter } from "./components/SidebarFooter.tsx";
import { SidebarItem } from "./components/SidebarItem.tsx";
import { SideBarSection } from "./components/SideBarSection.tsx";
import { useSidebarContext } from "./context/SidebarContext.tsx";

const Sidebar = () => {
  const { isLargeOpen, isSmallOpen, closeSidebar } = useSidebarContext();
  const location = useLocation();

  let currentNavItems: NavItem[] = [];
  if (location.pathname.startsWith("/mental")) {
    currentNavItems = mentalNavItems;
  } else if (location.pathname.startsWith("/spiritual")) {
    currentNavItems = spiritualNavItems;
  } else if (location.pathname.startsWith("/physical")) {
    currentNavItems = physicalNavItems;
  } else if (location.pathname.startsWith("/management")) {
    currentNavItems = managenentNavItems;
  }

  return (
    <>
      {/* =========================================
        1. DESKTOP SIDEBAR (Smooth Push/Pull) 
        ========================================= */}
      <aside
        className={`
        hidden lg:flex flex-col sticky top-16 md:top-20 left-0 
        z-50 
        h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] 
         bg-white/40 border-r border-slate-200 text-slate-800 
        
        dark:bg-transparent dark:border-white/5 dark:text-slate-200 

        oled:bg-transparent oled:border-white/5 oled:text-slate-300
        
        backdrop-blur-xl 
        shrink-0 transition-all duration-500 ease-in-out 
        ${isLargeOpen ? "w-60" : "w-[88px]"}
      `}
      >
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain hover-scrollbar px-3 pt-2">
          {/* Note: Ensure your SideBarSection and SidebarItem components also use adaptive text colors */}
          <SideBarSection visibleItemCount={4} title="title">
            {currentNavItems.map((item, index) => (
              <SidebarItem
                size={isLargeOpen ? "l" : "s"}
                key={index}
                Icon={item.icon}
                title={item.text}
                url={item.url}
                isActive={location.pathname === item.url}
              />
            ))}
          </SideBarSection>

          <SideBarSection visibleItemCount={4} title="title">
            {currentNavItems.map((item, index) => (
              <SidebarItem
                size={isLargeOpen ? "l" : "s"}
                key={index}
                Icon={item.icon}
                title={item.text}
                url={item.url}
                isActive={location.pathname === item.url}
              />
            ))}
          </SideBarSection>

          <SidebarFooter isLargeOpen={isLargeOpen} />
        </div>
      </aside>

      {/* =========================================
        2. MOBILE OVERLAY BACKDROP 
        ========================================= */}
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
        
        dark:bg-[#020617]/80 dark:border-white/10 dark:text-slate-200
        
        oled:bg-black/90 oled:border-white/5 oled:text-slate-300
        
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
                title={item.text}
                url={item.url}
                isActive={location.pathname === item.url}
              />
            ))}
          </SideBarSection>
          <SidebarFooter isLargeOpen={isLargeOpen} />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;