import LOGO from "../../../../assets/LOGO.png";

const Logo = () => {
  return (
    <div className="group flex items-center gap-2.5 cursor-pointer select-none">

      {/* 1. Icon Container */}
      <div className="relative flex items-center justify-center w-10 h-10 md:w-11 md:h-11 shrink-0">
        {/* Tamed & Themed Glow Effect: Only visible on hover for a cleaner default state */}
        <div className="absolute inset-0 rounded-full blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100
          bg-blue-500/20 
          dark:bg-blue-400/20 
          oled:bg-blue-500/30"
        />

        {/* Proper Image Containment (Replaced scale-150 with object-contain & hover scale) */}
        <img
          src={LOGO}
          alt="Debre Selam Icon"
          className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* 2. Typography Container */}
      <div className="flex flex-col justify-center overflow-hidden">
        {/* items-baseline keeps differently sized text perfectly aligned at the bottom */}
        <h1 className="flex items-baseline gap-1.5 m-0 leading-none tracking-tight">

          {/* "Debre" - Neutral themed color */}
          <span className="text-lg md:text-xl font-bold transition-colors duration-300
            text-slate-800 
            dark:text-slate-100 
            oled:text-white"
          >
            ደብረ
          </span>

          {/* "Selam" - Brand Gradient */}
          <span className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text transition-all duration-300
            bg-gradient-to-br from-blue-600 to-blue-500
            dark:from-blue-400 dark:to-blue-300
            oled:from-blue-500 oled:to-blue-400
            group-hover:from-blue-500 group-hover:to-blue-400"
          >
            ሰላም
          </span>

        </h1>

        {/* Optional: English Subtitle that slides in/fades in on hover for a premium feel */}
        <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100
          text-slate-500 
          dark:text-slate-400 
          oled:text-slate-500"
        >
          Debre Selam
        </span>
      </div>

    </div>
  );
};

export default Logo;