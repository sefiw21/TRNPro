
const Loading = () => {
    return (<>
        <div className="min-h-screen flex flex-col items-center justify-center overflow-hidden font-sans transition-colors duration-700
            /* Light Mode */
            bg-slate-50
            /* Theme Mode */
            dark:bg-[#030614]
            /* OLED Mode */
            oled:bg-black
        ">
            <div className="relative flex flex-col items-center">

                {/* Ambient Atmosphere (Disabled in OLED to save battery and keep true black) */}
                <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] animate-pulse transition-colors duration-700
                    bg-blue-400/20 dark:bg-blue-600/10 oled:hidden
                "></div>
                <div className="absolute w-[300px] h-[300px] rounded-full blur-[80px] animate-[pulse_6s_ease-in-out_infinite] transition-colors duration-700
                    bg-cyan-400/10 dark:bg-cyan-500/5 oled:hidden
                "></div>

                {/* The Main Spinner Area */}
                <div className="relative group z-10">

                    {/* Outer Ring */}
                    <div className="w-40 h-40 rounded-full animate-[spin_10s_linear_infinite] p-px border transition-colors duration-500
                        border-slate-200 dark:border-blue-900/30 oled:border-white/10
                    ">
                        <div className="w-full h-full rounded-full border transition-colors duration-500
                            border-slate-300 dark:border-blue-500/20 oled:border-white/20
                        "></div>
                    </div>

                    {/* Orbiting Particle */}
                    <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
                        <div className="w-1.5 h-1.5 rounded-full absolute left-1/2 -top-1 transition-all duration-500
                            /* Light Mode: Solid Blue */
                            bg-blue-500 shadow-[0_0_8px_#3b82f6]
                            /* Theme Mode: Glowing Cyan */
                            dark:bg-cyan-400 dark:shadow-[0_0_12px_#22d3ee]
                            /* OLED Mode: Crisp White */
                            oled:bg-white oled:shadow-[0_0_8px_#ffffff]
                        "></div>
                    </div>

                    {/* Central Icon: Professional Wooden Cross */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-48 h-48 flex items-center justify-center">

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 650" className="w-full h-full drop-shadow-2xl">
                                <defs>
                                    {/* Professional Wood Texture Gradient */}
                                    <linearGradient id="walnutWood" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#3d2b1f" />
                                        <stop offset="50%" stopColor="#2a1d15" />
                                        <stop offset="100%" stopColor="#1e140f" />
                                    </linearGradient>

                                    {/* Electric Blue Backlight */}
                                    <filter id="proGlow" x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                                        <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.1  0 0 0 0 0.4  0 0 0 0 1  0 0 0 1 0" />
                                        <feMerge>
                                            <feMergeNode />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>

                                    <path id="crossShape" d="M 170 80 L 230 80 L 230 160 L 310 160 L 310 220 L 230 220 L 230 430 L 170 430 L 170 220 L 90 220 L 90 160 L 170 160 Z" />
                                    <clipPath id="crossClip">
                                        <use href="#crossShape" />
                                    </clipPath>
                                </defs>

                                {/* Backlight Spill (The Glow) - Disabled in OLED to save battery and keep pure black */}
                                <use href="#crossShape" fill="#1e40af" filter="url(#proGlow)" className="opacity-30 dark:opacity-80 oled:opacity-0 transition-opacity duration-500" />
                                <use href="#crossShape" fill="#60a5fa" filter="url(#proGlow)" className="opacity-10 dark:opacity-30 oled:opacity-0 transition-opacity duration-500" />

                                {/* The Wooden Cross */}
                                <use href="#crossShape" fill="url(#walnutWood)" />

                                {/* Subtle Wood Grain Overlay */}
                                <g clipPath="url(#crossClip)" opacity="0.1" stroke="#000" strokeWidth="2">
                                    <path d="M 175 60 Q 195 250, 185 450" fill="none" />
                                    <path d="M 195 60 Q 220 250, 205 450" fill="none" strokeWidth="4" />
                                    <path d="M 70 185 Q 200 195, 330 180" fill="none" />
                                </g>

                                {/* Beveled Edge Highlight for "High-End" look */}
                                <use href="#crossShape" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.1" transform="translate(1, 1)" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Text Content - Minimalist & Elegant */}
                <div className="mt-16 text-center z-10">
                    <h2 className="text-3xl font-extralight tracking-[0.5em] uppercase transition-colors duration-500
                        text-slate-800 dark:text-white/90 oled:text-white
                    ">
                        Debre Selam
                    </h2>

                    {/* Sleek Loading Bar */}
                    <div className="mt-6 w-32 h-px relative overflow-hidden mx-auto transition-colors duration-500
                        bg-slate-200 dark:bg-blue-900/50 oled:bg-white/10
                    ">
                        <div className="absolute inset-0 w-full animate-shimmer transition-colors duration-500
                            bg-linear-to-r from-transparent to-transparent
                            via-blue-500 dark:via-cyan-400 oled:via-white
                        "></div>
                    </div>

                    <p className="mt-6 text-[11px] tracking-[0.2em] font-semibold transition-colors duration-500
                        text-slate-400 dark:text-blue-400/60 oled:text-slate-500
                    ">
                        working on it...
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-shimmer {
                    animation: shimmer 3s infinite;
                }
            `}</style>
        </div>
    </>)
}
export default Loading