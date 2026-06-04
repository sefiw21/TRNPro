import { Camera, Shield } from "lucide-react";
import { useEffect, useRef } from "react";
// Assuming LogOutBtn is a button you click. If it renders its own UI, you might need to adjust it to fit this sleek row style.
import LogOut from "../auth/components/LogOutBtn";
import { useAuth } from "../auth/providers/AuthProvider";

export const Profile = () => {
    const { user, showUserDetail, showProfileDetail } = useAuth();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (showUserDetail && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                showProfileDetail();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showUserDetail, showProfileDetail]);

    return (
        <div ref={menuRef} className="relative">
            {/* The Avatar Button (Kept your existing logic) */}
            <button
                onClick={() => showProfileDetail()}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-transform active:scale-95"
            >
                {user?.profilePicture ? (
                    <img
                        src={user.profilePicture}
                        alt={user.fullName || "User"}
                        className="w-full h-full rounded-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full rounded-full bg-blue-800 flex items-center justify-center">
                        <span className="text-white text-sm sm:text-base font-medium uppercase">
                            {user?.fullName ? user.fullName.charAt(0) : "U"}
                        </span>
                    </div>
                )}
            </button>

            {showUserDetail && <ProfileDetail />}
        </div>
    );
};

export const ProfileDetail = () => {
    const { user } = useAuth();

    return (
        <div
            className="
                absolute top-[calc(100%+8px)] right-0 z-50
                w-72 sm:w-[300px] 
                origin-top-right rounded-xl 
                animate-in fade-in zoom-in-95 duration-200
                flex flex-col overflow-hidden transition-colors
                /* 1. Light Mode */
                bg-white text-slate-900 border border-slate-200 shadow-xl
                /* 2. Theme Mode */
                dark:bg-[#282828] dark:text-white dark:border-[#3f3f3f] dark:shadow-[0_4px_32px_rgba(0,0,0,0.5)]
                /* 3. OLED Mode */
                oled:bg-black oled:text-slate-200 oled:border-white/10 oled:shadow-none
            "
        >
            {/* 1. HORIZONTAL HEADER */}
            <div className="flex items-start px-4 py-4 gap-4">
                {/* Avatar Left */}
                <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden relative group cursor-pointer transition-colors bg-slate-200 dark:bg-slate-700 oled:bg-slate-800">
                    {user?.profilePicture ? (
                        <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-lg font-medium uppercase transition-colors text-white bg-blue-600 dark:bg-blue-800 oled:bg-blue-900">
                            {user?.fullName ? user.fullName.charAt(0) : "U"}
                        </div>
                    )}
                    {/* Hover overlay for camera */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Camera className="w-4 h-4 text-white" />
                    </div>
                </div>

                {/* Info Right */}
                <div className="flex flex-col overflow-hidden min-w-0">
                    <span className="text-base font-medium truncate">{user?.fullName || "Not set"}</span>
                    <span className="text-sm truncate mt-0.5 transition-colors text-slate-500 dark:text-[#aaaaaa] oled:text-slate-400">
                        {user?.email || "No email"}
                    </span>

                    {/* 3. ACTION LINK */}
                    <button
                        onClick={alert}
                        className="text-sm text-left mt-2 transition-colors
                            text-blue-600 hover:text-blue-800
                            dark:text-[#3ea6ff] dark:hover:text-blue-300
                            oled:text-blue-400 oled:hover:text-blue-300
                        "
                    >
                        Manage your profile
                    </button>
                </div>
            </div>

            {/* 6. SUBTLE DIVIDER */}
            <div className="h-px w-full transition-colors bg-slate-200 dark:bg-[#3f3f3f] oled:bg-white/10" />

            {/* Menu Items Container */}
            <div className="py-2 flex flex-col">

                {/* 4 & 5. NAKED ICONS & EDGE-TO-EDGE HOVER */}
                <button
                    className="flex items-center gap-4 px-4 py-2 text-left w-full group transition-colors
                        hover:bg-slate-100
                        dark:hover:bg-[#3f3f3f]
                        oled:hover:bg-white/10
                    "
                >
                    <Shield
                        className="w-5 h-5 shrink-0 transition-colors
                            text-slate-500 group-hover:text-slate-900
                            dark:text-[#aaaaaa] dark:group-hover:text-white
                            oled:text-slate-500 oled:group-hover:text-white
                        "
                    />
                    <div className="flex flex-col transition-colors">
                        <span className="text-sm transition-colors text-slate-700 group-hover:text-slate-900 dark:text-white oled:text-slate-300 oled:group-hover:text-white">
                            Account Role
                        </span>
                        <span className="text-[11px] uppercase tracking-wider transition-colors text-slate-500 dark:text-[#aaaaaa] oled:text-slate-500">
                            {user?.role || "User"}
                        </span>
                    </div>
                </button>

                {/* You can add more YouTube-style list items here (Settings, Appearance, etc.) */}
                <LogOut size="l" text="Sign out" />
            </div>

            <div className="h-px w-full transition-colors bg-slate-200 dark:bg-[#3f3f3f] oled:bg-white/10" />

            {/* Footer / Logout */}
            <div className="py-2 flex justify-center items-center">
                <span className="text-xs transition-colors text-slate-400 dark:text-[#aaaaaa] oled:text-slate-500">
                    Footer
                </span>
            </div>
        </div>
    );
};

export default Profile;