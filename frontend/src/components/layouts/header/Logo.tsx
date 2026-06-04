import LOGO from "../../../assets/LOGO.png";
const Logo = () => {
  return (
    <div className="flex items-center group cursor-pointer select-none shrink-0">
      <div className="relative flex items-center justify-center shrink-0">
        {/* Tamed Core Glow (blur-lg instead of blur-xl so it doesn't stretch the header) */}
        <div className="absolute inset-0 bg-blue-600/20 blur-3xl group-hover:bg-blue-500/40 transition-all duration-300" />

        {/* Standardized Header Image Size (w-10 to w-11 is the sweet spot for headers) */}
        <img
          src={LOGO}
          alt="Debre Selam Icon"
          className="w-full h-10 md:w-9 md:h-9 object-cover  z-10 transition-transform duration-300 scale-150"
        />
      </div>

      {/* Dense Text Branding */}
      <div className="flex  justify-center ">
        {/* Combined the Amharic words for cleaner code and spacing */}
        <div className="flex flex-col w-max pr-2 items-center gap-0 ">
          <span className=" sm:text-sm font-bold text-gray-400 tracking-tight">
            ደብረ
            <span className="md:text-2xl pr-2 text-2xl  font-bold tracking-tight bg-linear-to-br from-blue-400 to-blue-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-blue-300  group-hover:to-blue-500">
              ሰላም
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Logo;
