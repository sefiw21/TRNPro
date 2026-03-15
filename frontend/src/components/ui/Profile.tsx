import { Camera, Mail, Shield, User } from "lucide-react";
import { useEffect, useRef } from "react";
import { useAuth } from "../../providers/AuthProvider";

export const Profile = () => {
    const { user, showUserDetail, showProfileDetail } = useAuth();

    // Create a ref that will wrap BOTH the button and the dropdown menu
    const menuRef = useRef<HTMLDivElement>(null);

    // This hook listens for clicks anywhere on the page
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // If the menu is OPEN, AND the click happened OUTSIDE of our menuRef area...
            if (showUserDetail && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                showProfileDetail(); // Close the menu
            }
        };

        // Attach the listener
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup listener on unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showUserDetail, showProfileDetail]);

    return (
        // Wrapper div receives the ref. Anything clicked inside here keeps the menu open.
        <div ref={menuRef} className="relative group">

            {/* The Avatar Button */}
            <button
                onClick={() => showProfileDetail()}
                className="w-10 h-10 rounded-full flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-300 hover:scale-105"
                title="Profile details"
                aria-label="Open profile menu"
            >
                {user?.profilePicture ? (
                    <img
                        src={user.profilePicture}
                        alt={user.fullName || "User Profile"}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-amber-500/50 transition-all duration-300"
                    />
                ) : (
                    <div className="w-full h-full rounded-full bg-linear-to-br from-slate-700 to-slate-900 ring-2 ring-white/10 group-hover:ring-amber-500/50 flex items-center justify-center transition-all duration-300 relative overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                        <span className="relative z-10 text-lg font-bold text-slate-200 uppercase tracking-widest drop-shadow-md">
                            {user?.fullName ? user.fullName.charAt(0) : "U"}
                        </span>
                    </div>
                )}
            </button>

            {/* The Dropdown Menu (Now rendered right here inside the ref wrapper) */}
            {showUserDetail && <ProfileDetail />}
        </div>
    );
};


export const ProfileDetail = () => {
    const { user } = useAuth();

    return (
        <div className="absolute top-[calc(100%+16px)] right-0 z-70 w-72 origin-top-right rounded-2xl bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 animate-in fade-in zoom-in-95 duration-200">

            {/* Header Section (Add Image) */}
            <div className="p-6 flex flex-col items-center border-b border-white/5 bg-white/2 rounded-t-2xl">
                <button className="group relative w-20 h-20 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center hover:bg-slate-700 transition-colors mb-3 overflow-hidden">
                    {user?.profilePicture ? (
                        <>
                            <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity" />
                            <Camera className="absolute text-white/80 w-6 h-6 z-10" />
                        </>
                    ) : (
                        <Camera className="text-slate-400 group-hover:text-white transition-colors w-8 h-8" />
                    )}
                </button>
                <span className="text-sm font-medium text-amber-500 hover:text-amber-400 cursor-pointer transition-colors">
                    {user?.profilePicture ? "Change Profile Photo" : "Add Profile Photo"}
                </span>
            </div>

            {/* User Info Section */}
            <div className="p-2">
                <div className="flex flex-col gap-1 p-3">
                    {/* Name */}
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                            <User className="w-4 h-4 text-slate-400" />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Username</span>
                            <span className="text-sm text-slate-200 font-medium truncate">{user?.fullName || "Not set"}</span>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                            <Mail className="w-4 h-4 text-slate-400" />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Email</span>
                            <span className="text-sm text-slate-200 font-medium truncate">{user?.email || "Not set"}</span>
                        </div>
                    </div>

                    {/* Role */}
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                            <Shield className="w-4 h-4 text-slate-400" />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Role</span>
                            <span className="text-sm text-slate-200 font-medium capitalize truncate">{user?.role || "User"}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Profile;