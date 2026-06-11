import { useEffect, useRef, useState } from "react";
import { features } from "../utils/Items.ts";

const FeatureSection = () => {
  // 1. Scroll Reveal State
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // 2. Intersection Observer (Watches when the user scrolls to this section)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative mt-20 lg:mt-32 pb-20 border-b border-white/5 min-h-[800px] overflow-hidden"
    >

      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-900/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      {/* --- HEADER SECTION --- */}
      <div
        className={`text-center max-w-3xl mx-auto px-4 transition-all duration-1000 ease-out
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          Core Features
        </span>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-100">
          Powerful Features for
          <span className="block mt-2 bg-linear-to-r from-blue-400 via-blue-500 to-amber-500 text-transparent bg-clip-text drop-shadow-sm">
            Your Life Journey
          </span>
        </h2>
      </div>

      {/* --- GRID SECTION --- */}
      <div className="max-w-7xl mx-auto mt-16 md:mt-24 px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {

            // Calculate a staggered delay for each card (e.g., card 1 = 100ms, card 2 = 200ms)
            const delay = `${(index + 1) * 150}ms`;

            return (
              <div
                key={index}
                style={{ transitionDelay: delay }} // Apply the dynamic stagger delay
                className={`group relative p-8 rounded-2xl bg-slate-900/40 backdrop-blur-sm border border-white/5 hover:border-blue-500/30 hover:bg-slate-800/50 transition-all duration-500 ease-out flex flex-col hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/20
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
                `}
              >
                {/* Icon Container - A beautiful glowing box for the icon */}
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-500">
                  <feature.icon className="w-6 h-6 text-blue-400 group-hover:text-amber-400 transition-colors duration-500" />
                </div>

                {/* Text Content */}
                <h3 className="text-xl text-slate-100 font-semibold mb-3 group-hover:text-blue-400 transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </p>

                {/* Decorative Bottom Line that expands on hover */}
                <div className="absolute bottom-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-blue-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default FeatureSection;