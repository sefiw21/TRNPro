import { MenuBarAndLogo } from "@/components/layouts/header/components/MenuBarAndLogo";
import { SidebarFooter } from "@/components/layouts/sidebar/components/SidebarFooter";
import { SidebarItem } from "@/components/layouts/sidebar/components/SidebarItem";
import { SideBarSection } from "@/components/layouts/sidebar/components/SideBarSection";
import { useSidebarContext } from "@/components/layouts/sidebar/context/SidebarContext";
import type { Company } from "@/features/systems/types/createSystemtype";
import { FormIcon, LayoutDashboardIcon, RollerCoasterIcon, Settings2Icon, Users2Icon, type LucideIcon } from "lucide-react";
import { useParams } from "react-router-dom";

export interface NavItem {
    icon: LucideIcon;
    label: string;
    url: string;
    exact?: boolean;
}

interface WorkspaceSidebarProps {
    system?: Company;
}

const WorkspaceSidebar = ({ system }: WorkspaceSidebarProps) => {
    const { isLargeOpen, isSmallOpen, closeSidebar } = useSidebarContext();

    // 2. Extract the 'id' directly from the URL parameters
    const { id } = useParams<{ id: string }>();

    // 3. Make the URL parameter the primary source of truth. 
    // It will instantly grab "8c7ecf35..." from the web address.
    const systemId = id || system?.id || "";
    const basePath = `/Systems/${systemId}`;

    const currentNavItems: NavItem[] = [
        {
            icon: LayoutDashboardIcon,
            label: "System Dashboard",
            url: basePath,
            exact: true
        },
        { icon: FormIcon, label: "Form Builder", url: `${basePath}/FormBuilder` },
        { icon: Users2Icon, label: "Members", url: `${basePath}/members` },
        { icon: RollerCoasterIcon, label: "Roles", url: `${basePath}/roles` },
        { icon: Settings2Icon, label: "Settings", url: `${basePath}/settings` },
    ];


    return (
        <>
            {/* =========================================
          1. DESKTOP SIDEBAR (Sticky)
          ========================================= */}
            <aside
                className={`
          hidden lg:flex flex-col sticky top-16 md:top-20 left-0 
          z-50 
          h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] 
          bg-white border-r border-slate-200 text-slate-800 
          
          dark:bg-white/10 dark:border-white/5 dark:text-slate-200 
          oled:bg-white/10 oled:border-white/5 oled:text-slate-300
          
          backdrop-blur-xl 
          shrink-0 transition-all duration-500 ease-in-out 
          ${isLargeOpen ? "w-60" : "w-[88px]"}
        `}
            >
                <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain hover-scrollbar px-3 pt-2">
                    <SideBarSection visibleItemCount={4} title="System Menu">
                        {currentNavItems.map((item, index) => (
                            <SidebarItem
                                size={isLargeOpen ? "l" : "s"}
                                key={index}
                                Icon={item.icon}
                                title={item.label}
                                url={item.url}
                                exact={item.exact}
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
                    className="fixed inset-0 z-60 backdrop-blur-sm lg:hidden transition-colors duration-500 bg-slate-900/20 dark:bg-black/40 oled:bg-black/80"
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
                <div className="flex items-center h-16 md:h-20 px-4 shrink-0 transition-colors duration-500 border-b border-slate-200 dark:border-white/5 oled:border-white/5">
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
                                exact={item.exact}
                            />
                        ))}
                    </SideBarSection>
                    <SidebarFooter isLargeOpen={isLargeOpen} />
                </div>
            </aside>
        </>
    );
};

export default WorkspaceSidebar;