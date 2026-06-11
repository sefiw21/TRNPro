import { Facebook, MapPin, Send, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#020617] pt-16 pb-8 border-t border-white/5 overflow-hidden">

      {/* Subtle Background Glow to match the Hero section */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Column 1: Brand & Socials (Takes up 2 columns on large screens) */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <Link to="/" className="flex items-baseline gap-1.5 mb-4 group outline-none">
              <span className="text-xl font-bold text-slate-300 tracking-tight transition-colors group-hover:text-white">
                ደብረ
              </span>
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-br from-blue-400 to-blue-600 bg-clip-text text-transparent transition-all duration-500 group-hover:from-blue-300 group-hover:to-blue-500">
                ሰላም
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              Rooted in centuries of sacred tradition. Connecting the faithful through digital innovation and spiritual peace.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <SocialIcon href="https://youtube.com" Icon={Youtube} hoverColor="hover:text-red-500" />
              <SocialIcon href="tg://resolve?domain=MountofPeace" Icon={Send} hoverColor="hover:text-blue-400" />
              <SocialIcon href="https://facebook.com" Icon={Facebook} hoverColor="hover:text-blue-600" />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-slate-100 font-semibold tracking-wide mb-5">Explore</h3>
            <ul className="space-y-3">
              <FooterLink to="/lessons" text="Spiritual Lessons" />
              <FooterLink to="/songs" text="Orthodox Mezmur" />
              <FooterLink to="/calendar" text="Church Calendar" />
              <FooterLink to="/library" text="Smart Library" />
            </ul>
          </div>

          {/* Column 3: Community */}
          <div>
            <h3 className="text-slate-100 font-semibold tracking-wide mb-5">Community</h3>
            <ul className="space-y-3">
              <FooterLink to="/about" text="About Us" />
              <FooterLink to="/contact" text="Contact" />
              <FooterLink to="/donate" text="Donate" />
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Location */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium tracking-wider text-slate-500 uppercase">
          <p>© {currentYear} Debre Selam. Mount of Peace.</p>

          {/* Proudly displaying Bahir Dar */}
          <div className="flex items-center gap-1.5 text-blue-500/80 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
            <MapPin className="w-3.5 h-3.5" />
            <span>Developed in Bahir Dar</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Helper Components for Clean Code ---

const FooterLink = ({ to, text }: { to: string; text: string }) => (
  <li>
    <Link
      to={to}
      className="group flex items-center text-sm text-slate-400 hover:text-blue-400 transition-colors duration-300"
    >
      <span className="w-0 h-[1px] bg-blue-500 mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2" />
      {text}
    </Link>
  </li>
);

const SocialIcon = ({ href, Icon, hoverColor }: { href: string; Icon: any; hoverColor: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 transition-all duration-300 hover:bg-white/10 hover:scale-110 hover:-translate-y-1 ${hoverColor}`}
  >
    <Icon className="w-4 h-4" />
  </a>
);