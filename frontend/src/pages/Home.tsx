import { GlobalUserActions } from "@/components/layouts/header/components/GlobalUserActions.tsx";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, BarChart3, Brain, Cross, ExternalLink, Heart, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import eoct from "../assets/eotc.png";
import mk from "../assets/mk.png";
import youtube from "../assets/youtube.png";
import Logo from "../components/layouts/header/components/Logo.tsx";
import { BackButton } from "../components/Ui/forms/Button.tsx";
import { useAuth } from "../features/auth/providers/AuthProvider.tsx";
import { getUserRole } from "../utils/getUserRole.ts";
import { getAccessToken } from "../utils/tokenUtils.ts";

const Home = () => {
  const navigate = useNavigate();
  const token = getAccessToken();
  const { isLoading } = useAuth();
  const role = getUserRole(token?.toString() || null);

  // --- PREMIUM LOADING STATE ---
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#020617] text-white">
        <div className="flex flex-col items-center gap-6 animate-in fade-in duration-700">
          <div className="relative flex items-center justify-center w-14 h-14">
            <div className="absolute inset-0 border-2 border-white/10 rounded-full" />
            <div className="absolute inset-0 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
          </div>
          <p className="text-[10px] font-bold text-slate-500 tracking-[0.4em] uppercase">
            Loading Journey
          </p>
        </div>
      </div>
    );
  }

  // --- DATA ARRAYS ---
  const features = [
    {
      name: "Management",
      url: "/systems",
      description: "Architect the geometry of your daily existence with crystalline precision.",
      icon: LayoutDashboard,
      // "Bioluminescent Grid" - Deep cyan shifting through bright emerald into dark teal
      color: "from-cyan-300 via-emerald-500 to-teal-900",
    },
    {
      name: "Mental Life",
      url: "/mental",
      description: "Cultivate an inner sanctuary of boundless intellect and quiet clarity.",
      icon: Brain,
      // "Solar Flare" - Blinding amber melting into rose, ending in deep fuchsia
      color: "from-amber-200 via-rose-500 to-fuchsia-800",
    },
    {
      name: "Physical Life",
      url: "/physical",
      description: "Forge your earthly vessel into a resilient instrument of enduring vitality.",
      icon: Heart,
      // "Earth & Glacier" - Shocking lime green cutting through rich earth tones
      color: "from-lime-400 via-green-600 to-stone-800",
    },
    {
      name: "Spiritual Life",
      url: "/spiritual",
      description: "Ascend the quiet peaks of faith and breathe the eternal mysteries of God.",
      icon: Cross,
      // "Deep Cosmos" - Ethereal violet collapsing into the darkest midnight indigo
      color: "from-violet-300 via-purple-600 to-indigo-950",
    },
  ];

  if (role === "admin") {
    features.push({
      name: "Admin",
      url: "/admin",
      description: "Orchestrate the digital realm with absolute vision and sovereign control.",
      icon: BarChart3,
      // "Crimson Matrix" - Glowing rose sinking into aggressive crimson and dark slate
      color: "from-rose-400 via-red-600 to-slate-900",
    });
  }
  const externalSites = [
    {
      name: "አክሊል ዘሰሎሞን _ Aklil Zesolomon",
      url: "http://www.youtube.com/@aklil_zesolomon",
      description: "A rich collection of Orthodox Mezmur, hymns, and spiritual narrations.",
      img: youtube,
    },
    {
      name: "6 ሚዲያ - 6 Media",
      url: "https://youtube.com/channel/UCt4JYpaBdSf9TKkEBI5tuww",
      description: "Church updates, Psalms, sermons (Sibket), and Father's traditions.",
      img: youtube,
    },
    {
      name: "★彡HOPE彡★",
      url: "https://youtube.com/@tesfamulugeta-w5k",
      description: "Uplifting spiritual content, prayers, and selected teachings.",
      img: youtube,
    },
    {
      name: "ሐኖስ ቲዩብ - Hanos Tube",
      url: "http://www.youtube.com/@Hanos_Tube",
      description: "Soothing Begena melodies, meditative content, and life lessons.",
      img: youtube,
    },
    {
      name: "ምክረ ቅዱሳን | Mekre Kidusan",
      url: "http://www.youtube.com/@Mekerekidusan",
      description: "Deep patristic advice and life-changing lessons from early Fathers.",
      img: youtube,
    },
    {
      name: "Lisane Orthodox - ልሳነ ኦርቶዶክስ",
      url: "http://www.youtube.com/@lisaneorthodox",
      description: "Comprehensive teachings, dogmatic lessons, and Tewahedo updates.",
      img: youtube,
    },
    {
      name: "የኢትዮጵያ ኦርቶዶክስ ተዋህዶ ቤተክርስቲያን ሥርዓት",
      url: "https://www.ethiopianorthodox.org/",
      description: "Foundational patriarchal website detailing church dogma and history.",
      img: eoct,
    },
    {
      name: "ማህበረ ቅዱሳን",
      url: "https://eotcmk.org/a/",
      description: "Official Mahibere Kidusan portal for theological articles and news.",
      img: mk,
    },
  ];

  // --- ANIMATION VARIANTS (Fixed the stagger link!) ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  return (
    <div className="min-h-screen w-full font-sans antialiased flex flex-col relative transition-colors duration-700 ease-in-out
      /* 1. LIGHT MODE & SYSTEM (If OS is Light) */
      bg-slate-50 text-slate-800 selection:bg-blue-500/30
      
      /* 2. THEME MODE (Deep Blue) & SYSTEM (If OS is Dark) */
      dark:bg-[#020617] dark:text-slate-200 dark:selection:bg-cyan-500/30
      
      /* 3. OLED MODE (Pure Black) */
      oled:bg-black oled:text-slate-300 oled:selection:bg-white/20
    ">

      {/* FIXED AMBIENT BACKGROUND */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] -left-[10%] w-[500px] h-[500px] rounded-full blur-[120px] transition-colors duration-1000
          bg-blue-400/20 
          dark:bg-blue-600/15 
          oled:bg-white/5 
        " />
        <div className="absolute bottom-[-10%] -right-[10%] w-[500px] h-[500px] rounded-full blur-[120px] transition-colors duration-1000
          bg-amber-400/20 
          dark:bg-cyan-600/10 
          oled:bg-white/5 
        " />
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-xl transition-colors duration-500
        bg-white/70 border-b border-slate-200/80 
        dark:bg-[#020617]/80 dark:border-white/5 
        oled:bg-black/80 oled:border-white/5
      ">
        <div className="w-full mx-auto px-4 lg:px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton className="hover:scale-105 transition-transform" />
            <Logo />
          </div>
          <GlobalUserActions />
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-10 md:pt-16 pb-24 flex-1">

        {/* Hero Section */}
        <header className="mb-12 md:mb-16 text-left relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 transition-colors duration-500
              text-slate-900 dark:text-white oled:text-slate-100
            ">
              Your{" "}
              <span className="italic font-normal text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(34,211,238,0.4)]
                bg-linear-to-r from-blue-600 via-cyan-400 to-indigo-600 
                oled:from-slate-400 oled:via-white oled:to-slate-500 oled:drop-shadow-none
              ">
                Journey
              </span>
            </h1>

            <p className="text-base md:text-lg max-w-2xl leading-relaxed font-light tracking-wide transition-colors duration-500
              text-slate-600 dark:text-slate-300 oled:text-slate-400
            ">
              A sanctuary for personal growth. Balance your{" "}
              <span className="font-semibold tracking-normal
                text-cyan-600 dark:text-cyan-400 oled:text-slate-200
              ">mind</span>,{" "}
              <span className="font-semibold tracking-normal
                text-blue-600 dark:text-blue-500 oled:text-slate-200
              ">body</span>, and{" "}
              <span className="font-semibold tracking-normal
                text-indigo-600 dark:text-indigo-400 oled:text-slate-200
              ">spirit</span>.
            </p>
          </motion.div>
        </header>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-24"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.name}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              onClick={() => navigate(feature.url)}
              className="group cursor-pointer outline-none h-full"
            >
              <div className="relative p-6 lg:p-7 rounded-tl-[3rem] rounded-tr-lg rounded-br-[4rem] rounded-bl-2xl flex flex-col h-full overflow-hidden z-0 backdrop-blur-2xl transition-all duration-500
                bg-white/60 border border-slate-200 hover:border-slate-300 shadow-xl shadow-slate-200/50
                dark:bg-[#020617]/40 dark:border-white/5 dark:hover:border-white/10 dark:shadow-black/60
                oled:bg-black/40 oled:border-white/5 oled:hover:border-white/20 oled:shadow-none
              ">

                {/* Color Points - Muted in OLED mode */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-30 group-hover:opacity-80 group-hover:scale-125 transition-all duration-700 -z-10
                  bg-linear-to-br ${feature.color} oled:opacity-10 oled:group-hover:opacity-30
                `} />
                <div className={`absolute -bottom-12 -left-4 w-40 h-24 rounded-[100%] blur-[50px] opacity-20 group-hover:opacity-60 group-hover:-translate-y-4 transition-all duration-700 -z-10
                  bg-linear-to-r ${feature.color} oled:opacity-10 oled:group-hover:opacity-20
                `} />

                {/* Header Row */}
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-4">
                    {/* Inner Icon Pebble */}
                    <div className={`w-11 h-11 rounded-tl-2xl rounded-tr-sm rounded-br-2xl rounded-bl-sm flex items-center justify-center shrink-0 backdrop-blur-md transition-all duration-300
                      bg-opacity-10 border shadow-sm
                      bg-linear-to-br ${feature.color}
                      border-slate-200 group-hover:border-slate-300 
                      dark:border-white/10 dark:group-hover:border-white/30 dark:shadow-lg
                      oled:border-white/5 oled:group-hover:border-white/20 oled:bg-white/5
                    `}>
                      <feature.icon size={18} strokeWidth={2} className="transition-colors duration-300
                        text-slate-600 group-hover:text-slate-900 
                        dark:text-slate-200 dark:group-hover:text-white
                        oled:text-slate-300 oled:group-hover:text-white
                      " />
                    </div>

                    <h2 className="text-lg font-bold tracking-wide transition-colors duration-300
                      text-slate-800 group-hover:text-black 
                      dark:text-slate-100 dark:group-hover:text-white
                      oled:text-slate-200 oled:group-hover:text-white
                    ">
                      {feature.name}
                    </h2>
                  </div>

                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300
                    bg-slate-100 group-hover:bg-slate-200 
                    dark:bg-white/5 dark:group-hover:bg-white/10
                    oled:bg-transparent oled:border oled:border-white/10 oled:group-hover:bg-white/10
                  ">
                    <ArrowRight className="w-4 h-4 transition-all duration-300 group-hover:-rotate-45
                      text-slate-400 group-hover:text-slate-700 
                      dark:group-hover:text-white
                      oled:text-slate-500 oled:group-hover:text-white
                    " />
                  </div>
                </div>

                <p className="text-sm leading-relaxed pl-[60px] relative z-10 transition-colors duration-300
                  text-slate-500 group-hover:text-slate-700 
                  dark:text-slate-400 dark:group-hover:text-slate-300
                  oled:text-slate-500 oled:group-hover:text-slate-300
                ">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* External Resources Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="rounded-4px p-6 md:p-10 backdrop-blur-md transition-colors duration-500 border
            bg-white/70 border-slate-200 shadow-xl 
            dark:bg-slate-900/30 dark:border-white/5 dark:shadow-2xl
            oled:bg-black oled:border-white/10 oled:shadow-none
          "
        >
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-xs font-bold uppercase tracking-widest transition-colors duration-500
              text-slate-500 dark:text-slate-400 oled:text-slate-500
            ">External Resources</h3>
            <div className="h-px grow transition-colors duration-500
              bg-linear-to-r from-slate-300 to-transparent
              dark:from-white/10 
              oled:from-white/5
            " />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {externalSites.map((site) => (
              <a
                key={site.name}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300
                  bg-slate-50/50 border-slate-200 hover:border-blue-400/30 hover:bg-slate-100 
                  dark:bg-white/2 dark:border-white/5 dark:hover:border-blue-500/30 dark:hover:bg-white/4
                  oled:bg-transparent oled:border-white/5 oled:hover:border-white/20 oled:hover:bg-white/5
                "
              >
                <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl overflow-hidden border transition-colors
                  bg-slate-200 border-slate-300 group-hover:border-blue-400/40 
                  dark:bg-black/50 dark:border-white/5 dark:group-hover:border-blue-500/20
                  oled:bg-black oled:border-white/10 oled:group-hover:border-white/30
                ">
                  <img
                    src={site.img}
                    alt={site.name}
                    className="w-full h-full object-cover transition-all duration-500
                      opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105
                      dark:opacity-70
                      oled:opacity-50 oled:grayscale
                    "
                  />
                </div>

                <div className="flex flex-col flex-1 min-w-0 justify-center pr-2">
                  <span className="font-semibold text-sm truncate transition-colors duration-300
                    text-slate-700 group-hover:text-blue-600 
                    dark:text-slate-200 dark:group-hover:text-blue-400
                    oled:text-slate-300 oled:group-hover:text-white
                  ">
                    {site.name}
                  </span>
                  <span className="text-[11px] leading-tight mt-1 line-clamp-2 transition-colors duration-300
                    text-slate-500 dark:text-slate-400 oled:text-slate-500
                  ">
                    {site.description}
                  </span>
                </div>

                <div className="shrink-0 mt-1 w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                    text-blue-500 dark:text-blue-400 oled:text-white
                  " />
                </div>
              </a>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default Home;