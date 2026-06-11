import { useEffect, useState } from "react";
// Ensure these paths match your actual folder structure
import HeroVideo from '../../../assets/videos/HeroVideo.mp4';
import HeroVideo2 from '../../../assets/videos/HeroVideo2.mp4';

const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // A tiny delay ensures the browser paints the invisible state first
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center mt-10 lg:mt-24 px-4 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 w-full max-w-2xl h-64 bg-blue-600/10 blur-[100px] -z-10 rounded-full pointer-events-none" />

      {/* 1. Main Headline (Drifts in from the left) */}
      <h1
        className={`text-4xl sm:text-5xl lg:text-7xl font-bold text-center tracking-tight transition-all duration-700 ease-out
          ${isMounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}
        `}
      >
        Welcome to{" "}
        <span className=" text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-cyan-400 to-indigo-600">
          Debre Selam
        </span>
      </h1>

      {/* 2. Subtitle Description (Drifts in slightly after) */}
      <p
        className={`mt-6 text-base sm:text-lg lg:text-xl text-center text-slate-400 max-w-2xl leading-relaxed transition-all duration-700 delay-150 ease-out
          ${isMounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}
        `}
      >
        Rooted in centuries of sacred tradition and timeless wisdom. A digital
        sanctuary designed to nourish your soul and guide your spirit. Discover
        the beauty of faith through modern connection and ancient truth.
      </p>

      {/* 3. Call to Action Buttons */}
      <div
        className={`mt-10 flex flex-col sm:flex-row gap-6 items-center transition-all duration-700 delay-300 ease-out
          ${isMounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}
        `}
      >
        <a
          href="#explore"
          className="group relative px-6 py-3 bg-amber-600/10 text-amber-500 font-semibold rounded-full border border-amber-500/30 hover:bg-amber-500 hover:text-white hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-300"
        >
          Explore Sacred Teachings
          <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
            →
          </span>
        </a>
        <a
          href="#about"
          className="text-sm font-medium text-slate-400 hover:text-white hover:underline underline-offset-4 transition-colors"
        >
          Our Story
        </a>
      </div>

      {/* 4. Video Showcase Grid */}
      <div
        className={`w-full max-w-5xl mt-16 flex flex-col md:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-500 ease-out
          ${isMounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}
        `}
      >
        {/* Video 1 */}
        <div className="relative w-full md:w-1/2 rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-white/5 group hover:scale-[1.02] hover:shadow-blue-500/30 transition-all duration-500">
          <div className="absolute inset-0 bg-linear-to-t from-[#020617] via-transparent to-transparent opacity-60 z-10 pointer-events-none" />
          <video
            className="w-full h-auto object-cover aspect-video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={HeroVideo} type="video/mp4" />
          </video>
        </div>

        {/* Video 2 */}
        <div className="relative w-full md:w-1/2 rounded-2xl overflow-hidden shadow-2xl shadow-amber-900/20 border border-white/5 group hover:scale-[1.02] hover:shadow-amber-500/30 transition-all duration-500">
          <div className="absolute inset-0 bg-linear-to-t from-[#020617] via-transparent to-transparent opacity-60 z-10 pointer-events-none" />
          <video
            className="w-full h-auto object-cover aspect-video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={HeroVideo2} type="video/mp4" />
          </video>
        </div>
      </div>

    </div>
  );
};

export default HeroSection;