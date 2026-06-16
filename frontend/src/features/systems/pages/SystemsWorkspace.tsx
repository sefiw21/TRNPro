import { ActivityIcon, FormIcon, Users2Icon } from "lucide-react";
import { useParams } from "react-router-dom";

export const SystemsWorkspace = () => {
    // 1. Grab the ID from the URL (e.g., "sys_123")
    const { id } = useParams<{ id: string }>();

    // 2. In a real app, you might fetch system summary stats here
    // const { data: systemInfo } = useSystemSummary(id);

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">

            {/* Workspace Welcome Header */}
            <div className="p-8 rounded-3xl border border-slate-200/60 dark:border-white/10 oled:border-white/10
                bg-linear-to-br from-white/60 to-white/30 
                dark:from-white/10 dark:to-white/5 
                oled:from-white/10 oled:to-transparent backdrop-blur-xl relative overflow-hidden"
            >
                {/* Decorative background flare */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 dark:bg-blue-500/10 blur-[50px] rounded-full pointer-events-none" />

                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white oled:text-white relative z-10">
                    System Overview
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-xl relative z-10">
                    Welcome to your workspace for System ID: <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-black/50 text-blue-600 dark:text-blue-400">{id}</code>.
                    From here, you can monitor activity, manage members, and build forms.
                </p>
            </div>

            {/* Quick Stats / Shortcuts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <WorkspaceStatCard
                    title="Active Members"
                    value="12"
                    icon={Users2Icon}
                    trend="+2 this week"
                />
                <WorkspaceStatCard
                    title="Forms Deployed"
                    value="4"
                    icon={FormIcon}
                    trend="All operational"
                />
                <WorkspaceStatCard
                    title="Recent Activity"
                    value="89"
                    icon={ActivityIcon}
                    trend="Actions today"
                />
            </div>
        </div>
    );
};

// A quick reusable component specifically for this workspace page
const WorkspaceStatCard = ({ title, value, icon: Icon, trend }: any) => (
    <div className="p-6 rounded-2xl border border-slate-200/60 dark:border-white/5 oled:border-white/5
        bg-white/40 dark:bg-white/5 oled:bg-white/5 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</h3>
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Icon className="w-5 h-5" />
            </div>
        </div>
        <div className="text-3xl font-bold text-slate-900 dark:text-white oled:text-white">
            {value}
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-500 mt-2">
            {trend}
        </div>
    </div>
);

export default SystemsWorkspace;