import { LogOut as LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Button from "../../../components/ui/Button.tsx";
import { useAuth } from "../../../providers/AuthProvider.tsx";
import { userAPI } from "../service/auth.service.ts";

interface LogOutProps {
  text?: string;
  size: "s" | "m" | "l";
}

const LogOut = ({ text = "Log Out", size }: LogOutProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 1. Tell the backend to destroy the session/cookie
      await userAPI.logOut();
      // 2. Clear out your frontend React state
      logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out cleanly", error);
    }
  };

  return (
    <Button
      title={text}
      variant="ghost"
      onClick={handleLogout}
      className={twMerge(
        // 1. BASE: Always w-full. Absolute context for choreography.
        "block relative mb-3 transition-all duration-500 ease-in-out group border-none overflow-hidden w-full",

        // 2. HEIGHT MORPH: Smoothly adjust the height of the button container
        size === "l" ? "h-12 rounded-2xl" : "h-16 rounded-2xl",

        // 3. HOVER THEME: Soft rose glow to indicate an "exit" action
        "text-slate-400 border-transparent hover:bg-rose-500/10 hover:border-rose-500/20 hover:text-rose-400"
      )}
    >
      {/* ICON: Flawless flight path using explicit X and Y coordinates */}
      <LogOutIcon
        className={twMerge(
          "absolute transition-all duration-500 ease-in-out",
          // Position Choreography
          size === "l"
            ? "left-4 top-[50%] translate-x-0 -translate-y-[50%] w-5 h-5"
            : "left-[50%] top-2.5 -translate-x-[50%] translate-y-0 w-6 h-6",
          // Scale up slightly and turn rose on hover
          "group-hover:text-rose-400 group-hover:scale-110"
        )}
        strokeWidth={2}
      />

      {/* LARGE TEXT (Side): Shrinks and fades seamlessly */}
      <span
        className={twMerge(
          "absolute left-12 top-1/2 -translate-y-1/2 tracking-wide whitespace-nowrap transition-all duration-500 ease-in-out text-sm origin-left",
          size === "l"
            ? "opacity-100 scale-100"
            : "opacity-0 scale-75 pointer-events-none",
          "font-medium group-hover:text-rose-400"
        )}
      >
        {text}
      </span>

      {/* SMALL TEXT (Bottom): Scales and slides up from the bottom */}
      <span
        className={twMerge(
          "absolute bottom-1.5 left-0 w-full px-1 text-[10px] leading-tight text-center tracking-wider truncate transition-all duration-500 ease-in-out",
          size === "l"
            ? "opacity-0 translate-y-4 pointer-events-none scale-75"
            : "opacity-100 translate-y-0 scale-100",
          "font-medium group-hover:text-rose-400"
        )}
      >
        {text}
      </span>
    </Button>
  );
};

export default LogOut;