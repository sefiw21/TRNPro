import LOGO from "../../assets/LOGO.png";
const Logo = () => {
  return (
    <div className="flex items-center px-1 group cursor-pointer select-none shrink-0">
      {/* Compact Icon Container */}
      <div className="relative flex items-center justify-center shrink-0">
        {/* Tamed Core Glow (blur-lg instead of blur-xl so it doesn't stretch the header) */}
        <div className="absolute inset-0 bg-blue-600/20 blur-lg rounded-full group-hover:bg-blue-500/40 transition-all duration-300" />

        {/* Standardized Header Image Size (w-10 to w-11 is the sweet spot for headers) */}
        <img
          src={LOGO}
          alt="Debre Selam Icon"
          className="w-10 h-10 md:w-11 md:h-11  object-contain z-10 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Dense Text Branding */}
      <div className="flex flex-col justify-center">
        {/* Combined the Amharic words for cleaner code and spacing */}
        <div className="flex items-baseline leading-none">
          <span className="text-lg sm:text-sm font-black tracking-tight bg-linear-to-br from-blue-400 to-blue-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-blue-300 group-hover:to-blue-500">
            ደብረ ሰላም
          </span>
        </div>

        {/* Minimalist Subtext */}
        {/* <div className="flex items-center mt-1">
          <span className="text-[10px] uppercase sm:text-sm tracking-[0.2em] font-bold text-blue-400/80 group-hover:text-blue-300 transition-colors">
            Mount of Peace
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default Logo;
