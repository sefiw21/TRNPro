import { useLocation } from "react-router-dom";
import LogOut from "../../../features/auth/components/LogOutBtn.tsx";
import {
  mentalNavItems,
  physicalNavItems,
  spiritualNavItems,
  type NavItem,
} from "../../ui/Icons.tsx";
import { MenuBarAndLogo } from "../header/MenuBarAndLogo.tsx";
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
  }

  return (
    <>
      {/* =========================================
          1. DESKTOP SIDEBAR (Smooth Push/Pull) 
          ========================================= */}
      <aside
        className={`
          hidden lg:flex flex-col sticky top-16 md:top-20 left-0 z-40 
          h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] 
          bg-[#020617]/90 backdrop-blur-xl 
          overflow-hidden shrink-0 transition-[width] duration-500 ease-in-out
          ${isLargeOpen ? "w-60" : "w-[88px]"}
        `}
      >
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col shrink-0 px-3 py-6 transition-all duration-500">
          <SideBarSection visibleItemCount={7}>
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
        </div>
        <LogOut size={isLargeOpen ? "l" : "s"} text="Log Out" />


      </aside>

      {/* =========================================
          2. MOBILE OVERLAY BACKDROP 
          ========================================= */}
      {isSmallOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* =========================================
          3. MOBILE SIDEBAR (Slide-out Drawer) 
          ========================================= */}
      <aside
        className={`
          fixed top-0 left-0 z-70 h-screen w-72 flex flex-col
          bg-[#0f172a] backdrop-blur-2xl border-r border-white/5 shadow-2xl shadow-black/50
          transition-transform duration-300 ease-in-out lg:hidden
          ${isSmallOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header: Clean bottom border stretching edge-to-edge */}
        <div className="flex items-center h-16 md:h-20 px-4 border-b border-white/5 shrink-0">
          <MenuBarAndLogo SidebarOpen={true} />
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar">
          <SideBarSection visibleItemCount={7}>
            {currentNavItems.map((item, index) => (
              <SidebarItem
                size="l" // Always "l" because the mobile drawer is always fully expanded
                key={index}
                Icon={item.icon}
                title={item.text}
                url={item.url}
                isActive={location.pathname === item.url}
              />
            ))}
          </SideBarSection>
        </div>
        <LogOut size={isLargeOpen ? "l" : "s"} text="Log Out" />
      </aside>
    </>
  );
};

export default Sidebar;