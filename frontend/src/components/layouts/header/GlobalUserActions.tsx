
import Profile from "@/features/profile/Profile";
import { Bell } from "lucide-react";
import { Button } from "../../Ui/forms/Button";
import { TaskbarMenu } from "./TaskbarMenu";

export function GlobalUserActions() {
    return (
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <Button size="icon" variant="ghost" className="rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white oled:text-slate-500 oled:hover:text-white">
                <Bell className="w-5 h-5" />
            </Button>

            <div className="hidden md:block h-6 w-px mx-1 bg-slate-300 dark:bg-white/10 oled:bg-white/5" />

            <Profile />
            <TaskbarMenu />
        </div>
    );
}