import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Bell, Brain, Cross, ExternalLink, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import eoct from "../../assets/eotc.png";
import mk from "../../assets/mk.png";
import { useAuth } from "../../providers/AuthProvider.tsx";
import { getUserRole } from "../../utils/getUserRole.tsx";
import { getAccessToken } from "../../utils/tokenUtils.ts";
import Button, { BackButton, TaskbarButton } from "../ui/Button.tsx";
import Logo from "../ui/Logo.tsx";
import Profile from "../ui/Profile.tsx";

const Home = () => {
  const navigate = useNavigate();
  const token = getAccessToken();
  const { isLoading, showUserDetail } = useAuth();
  const role = getUserRole(token?.toString() || null);

  // --- PREMIUM LOADING STATE ---
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#020617] text-white">
        <div className="flex flex-col items-center gap-6 animate-in fade-in duration-500">
          <div className="relative flex items-center justify-center w-16 h-16">
            <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-xs font-bold text-slate-400 tracking-[0.3em] uppercase animate-pulse">
            Loading Journey
          </p>
        </div>
      </div>
    );
  }

  // --- DATA ARRAYS ---
  const features = [
    {
      name: "Mental Life",
      url: "/mental",
      description: "Nourish your mind with wisdom and understanding.",
      icon: Brain,
      color: "from-amber-500 to-orange-600",
    },
    {
      name: "Physical Life",
      url: "/physical",
      description: "Honor your body as a temple through discipline.",
      icon: Heart,
      color: "from-emerald-500 to-teal-600",
    },
    {
      name: "Spiritual Life",
      url: "/spiritual",
      description: "Deepen your connection with God through prayer.",
      icon: Cross,
      color: "from-blue-500 to-indigo-600",
    },
  ];

  if (role === "admin") {
    features.push({
      name: "Admin",
      url: "/admin",
      description: "System management and analytics.",
      icon: BarChart3,
      color: "from-rose-500 to-pink-600",
    });
  }

  const externalSites = [
    {
      name: "የኢትዮጵያ ኦርቶዶክስ ተዋህዶ ቤተክርስቲያን ሥርዓት",
      url: "https://www.ethiopianorthodox.org/",
      description: "Official resources and teachings.",
      img: eoct,
    },
    {
      name: "ማህበረ ቅዱሳን",
      url: "https://eotcmk.org/a/",
      description: "Official resources and teachings.",
      img: mk,
    },
  ];

  // --- ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };


  return (
    <div className="min-h-screen w-full bg-[#020617] text-slate-200 selection:bg-amber-500/30 font-sans antialiased flex flex-col">

      {/* 1. FIXED AMBIENT BACKGROUND */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] -left-[10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] -right-[10%] w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[120px]" />
      </div>

      {/* 2. NAVBAR (Remove this block if rendering inside App.tsx Outlet) */}
      <nav className="sticky top-0 z-50 w-full border-b border-none bg-[#020617]/70 backdrop-blur-xl transition-all">
        <div className="w-full mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <BackButton className="hover:scale-105 transition-transform" />
            <Logo />
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="ghost"
              className="text-slate-400 hover:text-white hover:bg-white/5 transition-all rounded-full"
            >
              <Bell className="w-5 h-5" />
            </Button>
            <div className="hidden md:block h-8 w-px bg-white/10 mx-2" />
            <div className="flex items-center gap-3 bg-white/5 p-1.5 rounded-full border border-white/5">
              <TaskbarButton />
              <Profile />
            </div>
          </div>
        </div>
      </nav>

      {/* 3. MAIN CONTENT */}
      <main className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-12 md:pt-20 pb-20 flex-1">

        {/* Hero Section */}
        <header className="mb-16 md:mb-20 text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white to-slate-400 drop-shadow-sm pb-2">
              Journey
            </h1>
            <p className="text-slate-400 mt-4 text-lg md:text-xl max-w-2xl leading-relaxed">
              A sanctuary for your personal growth. Balance your <span className="text-amber-500 font-medium">mind</span>, <span className="text-emerald-500 font-medium">body</span>, and <span className="text-blue-500 font-medium">spirit</span>.
            </p>
          </motion.div>
        </header>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-24"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.name}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              onClick={() => navigate(feature.url)}
              className="group relative cursor-pointer"
            >
              {/* Outer Glow on Hover */}
              <div className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 rounded-[2.5rem]`} />

              {/* Card Container */}
              <div className="relative h-full p-px rounded-[2.5rem] bg-linear-to-b from-white/10 to-transparent group-hover:from-white/20 transition-all duration-300">
                <div className="bg-[#0f172a]/90 backdrop-blur-xl rounded-[2.45rem] p-8 md:p-10 h-full flex flex-col border border-white/5 overflow-hidden">

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${feature.color} flex items-center justify-center text-white mb-8 shadow-2xl shadow-black/50 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300`}>
                    <feature.icon size={28} strokeWidth={2.25} />
                  </div>

                  {/* Text */}
                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-500 transition-colors duration-300">
                    {feature.name}
                  </h2>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 grow">
                    {feature.description}
                  </p>

                  {/* Call to Action */}
                  <div className="flex items-center text-xs font-bold uppercase tracking-[0.2em] text-slate-500 group-hover:text-white transition-all duration-300 mt-auto">
                    Explore <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* External Resources Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-[#0f172a]/40 rounded-4xl p-8 md:p-10 border border-white/5 backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-black text-blue-500 uppercase tracking-[0.3em]">External Resources</h3>
            <div className="h-px grow bg-white/5 ml-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {externalSites.map((site) => (
              <a
                key={site.name}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 md:p-5 rounded-2xl bg-white/2 border border-white/5 hover:border-white/10 hover:bg-white/4 transition-all duration-300 group"
              >
                <div className="flex items-center gap-5 overflow-hidden">
                  {/* Image Container */}
                  <div className="w-14 h-14 shrink-0 flex items-center justify-center bg-[#020617]/50 rounded-xl group-hover:scale-105 transition-transform duration-300 p-2 border border-white/5">
                    <img
                      src={site.img}
                      alt={site.name}
                      className="w-full h-full object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                  {/* Site Name */}
                  <span className="text-slate-300 group-hover:text-white font-medium text-sm md:text-base truncate transition-colors">
                    {site.name}
                  </span>
                </div>
                {/* External Link Icon */}
                <div className="shrink-0 ml-4 w-8 h-8 rounded-full bg-white/0 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
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