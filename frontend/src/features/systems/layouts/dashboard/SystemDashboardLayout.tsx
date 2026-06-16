import { SidebarContextProvider } from "@/components/layouts/sidebar/context/SidebarContext";
import { Outlet } from "react-router-dom";
import { DashboardHeader } from "./components/SystemDashboardHeader";
import DashboardSidebar from "./components/SystemDashboardSidebar";


const SystemDashboardLayout = () => {
    return (
        <SidebarContextProvider>

            <div className="h-screen w-full overflow-hidden flex flex-col font-sans antialiased transition-colors duration-500
        bg-slate-50 text-slate-900 selection:bg-blue-500/30
        dark:bg-[#00020a] dark:text-slate-200 dark:selection:bg-amber-500/30
        oled:bg-black oled:text-slate-300 oled:selection:bg-white/20">

                <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] -left-[10%] w-[600px] h-[600px] rounded-full blur-[120px] transition-colors duration-700
                bg-blue-400/20 dark:bg-blue-600/10 oled:hidden" />
                    <div className="absolute bottom-[-10%] -right-[10%] w-[600px] h-[600px] rounded-full blur-[120px] transition-colors duration-700
                bg-amber-400/20 dark:bg-amber-600/10 oled:hidden" />
                </div>

                <DashboardHeader />
                <div className="flex flex-1 overflow-hidden relative z-10">
                    <DashboardSidebar />

                    <main className="flex-1 min-w-0 overflow-y-auto custom-scrollbar scroll-smooth transition-colors duration-500
                bg-white/40 dark:bg-[#0f172a]/20 oled:bg-transparent">

                        <div className="w-full  mx-auto px-4 md:px-8 py-8">
                            <Outlet />
                        </div>

                    </main>

                </div>
            </div>
        </SidebarContextProvider>

    );
};

export default SystemDashboardLayout;