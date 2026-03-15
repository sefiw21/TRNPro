
const Loading = () => {
    return (<>
        <div className="min-h-screen bg-[#030614] flex flex-col items-center justify-center overflow-hidden font-sans">
            <div className="relative flex flex-col items-center">

                {/* Professional Deep Blue Atmosphere */}
                <div className="absolute w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[80px] animate-[pulse_6s_ease-in-out_infinite]"></div>

                {/* The Main Spinner Area */}
                <div className="relative group">

                    {/* Outer Ring - Sophisticated Slate/Blue */}
                    <div className="w-40 h-40 rounded-full border border-blue-900/30 animate-[spin_10s_linear_infinite] p-px">
                        <div className="w-full h-full rounded-full border border-blue-500/20"></div>
                    </div>

                    {/* Orbiting Blue Particle */}
                    <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] absolute left-1/2 -top-1"></div>
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

                                {/* Backlight Spill (The Glow) */}
                                <use href="#crossShape" fill="#1e40af" filter="url(#proGlow)" opacity="0.8" />
                                <use href="#crossShape" fill="#60a5fa" filter="url(#proGlow)" opacity="0.3" />

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
                <div className="mt-16 text-center">
                    <h2 className="text-3xl font-extralight tracking-[0.5em] uppercase text-white/90">
                        Debre Selam
                    </h2>

                    {/* Sleek Blue Loading Bar */}
                    <div className="mt-6 w-32 h-px bg-blue-900/50 relative overflow-hidden mx-auto">
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-cyan-400 to-transparent w-full animate-shimmer"></div>
                    </div>

                    <p className="mt-6 text-[11px] text-blue-400/60 tracking-[0.2em]  font-semibold">
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