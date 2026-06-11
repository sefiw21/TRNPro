import { Facebook, Send, Youtube } from "lucide-react";

type SidebarFooterProps = {
    isLargeOpen: boolean;
};

export const SidebarFooter = ({ isLargeOpen }: SidebarFooterProps) => {
    // We use the current year dynamically so you never have to manually update it!
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className={`
                mt-auto shrink-0 transition-all duration-500 ease-in-out flex flex-col overflow-hidden pb-7
                border-t border-slate-200 dark:border-white/5 oled:border-white/5
                
                bg-linear-to-b from-transparent 
                to-slate-100 
                dark:to-black/20 
                oled:to-black 
                
                ${isLargeOpen ? "p-5 gap-4" : "p-3 gap-4 items-center"}
            `}
        >
            {/* 1. Branding & Mission */}
            <div className={`flex flex-col gap-1 transition-all duration-500`}>
                <span className="text-xs font-bold tracking-widest uppercase transition-colors duration-300
                    text-slate-800 
                    dark:text-slate-300 
                    oled:text-slate-400
                ">
                    ደብረ ሰላም
                </span>
                <span className="text-[10px] leading-relaxed italic transition-colors duration-300
                    text-slate-500 
                    dark:text-slate-400 
                    oled:text-slate-500
                ">
                    Nourishing the digital spiritual family.
                </span>
            </div>

            {/* 2. Social Links */}
            <div className={`flex items-center gap-4 cursor-pointer`}>
                <a
                    href="http://www.youtube.com/@MountofPeace-l2t"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-all duration-300 hover:scale-110
                        text-slate-400 hover:text-red-600 
                        dark:text-slate-500 dark:hover:text-red-500
                        oled:text-slate-600 oled:hover:text-red-500
                    "
                    title="YouTube Channel"
                >
                    <Youtube className="w-4 h-4" />
                </a>

                <a
                    href="https://t.me/MountofPeace"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-all duration-300 hover:scale-110
                        text-slate-400 hover:text-blue-500 
                        dark:text-slate-500 dark:hover:text-blue-400
                        oled:text-slate-600 oled:hover:text-blue-400
                    "
                    title="Telegram Channel"
                >
                    <Send className="w-4 h-4 ml-0.5" />
                </a>

                <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-all duration-300 hover:scale-110
                        text-slate-400 hover:text-blue-600 
                        dark:text-slate-500 dark:hover:text-blue-500
                        oled:text-slate-600 oled:hover:text-blue-500
                    "
                    title="Facebook Page"
                >
                    <Facebook className="w-4 h-4" />
                </a>
            </div>

            {/* 3. Copyright Line */}
            <div className="flex items-center w-full mt-1">
                <span className="text-[9px] font-medium uppercase tracking-widest whitespace-nowrap transition-colors duration-300
                    text-slate-500 
                    dark:text-slate-600 
                    oled:text-slate-600
                ">
                    © {currentYear} Debre Selam
                </span>
            </div>
        </footer>
    );
};