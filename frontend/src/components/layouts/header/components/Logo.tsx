import LOGO from "../../../../assets/LOGO.png";
import TempoLogo from "../../../../assets/TempoLogo.png";

interface LogoProps {
  logoUrl?: string;
  systemName?: string;
  system?: boolean;
}

const Logo = ({ system, logoUrl, systemName }: LogoProps) => {

  const imageClass =
    "w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105";

  return (
    <div className="group flex items-center gap-2.5 select-none cursor-pointer">

      <div className="relative flex items-center justify-center w-10 h-10 md:w-11 md:h-11 shrink-0">

        <div
          className="
            absolute inset-0 rounded-full blur-xl
            opacity-0 transition-all duration-500
            group-hover:opacity-100
            bg-blue-500/20
            dark:bg-blue-400/20
            oled:bg-blue-500/30
          "
        />
        <img
          src={!system ? LOGO : (logoUrl || TempoLogo)}
          alt={`${systemName ?? "Debre Selam"} logo`}
          className={imageClass}
          title={`${logoUrl ? "your Logo" : "click to upload you own logo"}`}

        />
      </div>

      <div className="flex flex-col justify-center overflow-hidden">
        <h1 className="flex items-baseline gap-1.5 m-0 leading-none tracking-tight">

          {!systemName && (
            <div>
              <span
                className="
                text-lg md:text-xl font-bold
                text-slate-800
                dark:text-slate-100
                oled:text-white
              "
              >
                ደብረ
              </span>
              <span
                className="
                text-xl md:text-2xl font-extrabold
                text-transparent bg-clip-text
                bg-linear-to-br
                from-blue-600 to-blue-500
                dark:from-blue-400 dark:to-blue-300
                oled:from-blue-500 oled:to-blue-400
              "
              >
                ሰላም
              </span>
            </div>
          )}
        </h1>

        <span
          className="
            text-[10px] md:text-xs
            font-semibold
            tracking-[0.2em]
            uppercase
            opacity-0
            -translate-x-4
            transition-all duration-300
            group-hover:translate-x-0
            group-hover:opacity-100
            text-slate-500
            dark:text-slate-400
            oled:text-slate-500
          "
        >
          {`${systemName ? systemName : "Debre Selam"}`}
        </span>
      </div>

    </div>
  );
};


export default Logo;