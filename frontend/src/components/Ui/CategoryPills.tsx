import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Assuming you have a base Button component. 
// For this specific UI, we will apply custom classes directly to standard buttons 
// inside the map to ensure the glassmorphism styling is perfect.

type CategoryPillsProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

const SCROLL_AMOUNT = 300; // Increased slightly for smoother desktop UX

const CategoryPills = ({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillsProps) => {
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // --- DRAG LOGIC STATES ---
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  // Function to update arrow visibility based on scroll position
  const updateArrows = () => {
    if (containerRef.current == null) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

    // Add a tiny buffer (1px) to prevent layout rounding errors
    setIsLeftVisible(scrollLeft > 1);
    setIsRightVisible(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(updateArrows);
    observer.observe(container);
    container.addEventListener("scroll", updateArrows);

    // Give the DOM a tiny moment to render before checking initially
    setTimeout(updateArrows, 100);

    return () => {
      observer.disconnect();
      container.removeEventListener("scroll", updateArrows);
    };
  }, [categories]);

  // --- MOUSE DRAG HANDLERS ---
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();

    const x = e.pageX - containerRef.current.offsetLeft;
    const distance = x - startX;

    if (Math.abs(distance) > 5) {
      setHasMoved(true);
      containerRef.current.scrollLeft = scrollLeft - distance;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // --- BUTTON SCROLLING ---
  const scrollToLeft = () => {
    containerRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  };

  const scrollToRight = () => {
    containerRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
  };

  return (
    <div className="relative overflow-hidden w-full group py-2">
      {/* Scrollable Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`flex whitespace-nowrap gap-3 overflow-x-auto select-none px-2 ${isDragging ? "cursor-grabbing scroll-auto" : "cursor-grab scroll-smooth"
          }`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Hide default scrollbar for webkit */}
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>

        {categories.map((item) => {
          const isSelected = item === selectedCategory;
          return (
            <button
              key={item}
              onClick={() => {
                if (!hasMoved) onSelect(item);
              }}
              className={`
                relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shrink-0 border 
                ${isSelected
                  ? `
                    /* ACTIVE PILL */
                    /* Light Mode: High contrast ink */
                    bg-slate-900 text-white border-slate-900 shadow-md hover:bg-slate-800
                    /* Theme Mode: Glowing white */
                    dark:bg-white dark:text-[#020617] dark:border-white dark:shadow-[0_0_15px_rgba(255,255,255,0.2)] dark:hover:bg-slate-200
                    /* OLED Mode: Minimalist white outline, keeping background black */
                    oled:bg-transparent oled:text-white oled:border-white oled:shadow-none oled:hover:bg-white/10
                    `
                  : `
                    /* INACTIVE PILL */
                    /* Light Mode */
                    bg-slate-100/70 text-slate-600 border-slate-200 hover:bg-slate-200 hover:text-slate-900 hover:border-slate-300
                    /* Theme Mode */
                    dark:bg-white/5 dark:text-slate-300 dark:border-white/10 dark:hover:bg-white/10 dark:hover:text-white dark:hover:border-white/20
                    /* OLED Mode */
                    oled:bg-transparent oled:text-slate-500 oled:border-white/10 oled:hover:bg-white/5 oled:hover:text-white oled:hover:border-white/20
                    `
                }
              `}
            >
              {item}
            </button>
          );
        })}
      </div>

      {/* Left Arrow Overlay (Matches App Background) */}
      <div
        className={`absolute left-0 top-0 bottom-0 flex items-center w-24 pointer-events-none z-10 transition-opacity duration-300 ${isLeftVisible ? "opacity-100" : "opacity-0"
          }
          /* Gradients to blend into the parent background perfectly */
          bg-linear-to-r 
          from-white via-white/80 to-transparent 
          dark:from-[#020617] dark:via-[#020617]/80 
          oled:from-black oled:via-black/80
        `}
      >
        <button
          onClick={scrollToLeft}
          className="ml-2 w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-md pointer-events-auto transition-all shadow-lg hover:scale-105 border
            /* Light Mode */
            bg-white/80 border-slate-200 text-slate-700 hover:bg-slate-100
            /* Theme Mode */
            dark:bg-white/10 dark:border-white/10 dark:text-white dark:hover:bg-white/20
            /* OLED Mode */
            oled:bg-black/50 oled:border-white/20 oled:text-slate-300 oled:hover:bg-white/10 oled:hover:text-white
          "
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Right Arrow Overlay (Matches App Background) */}
      <div
        className={`absolute right-0 top-0 bottom-0 flex justify-end items-center w-24 pointer-events-none z-10 transition-opacity duration-300 ${isRightVisible ? "opacity-100" : "opacity-0"
          }
          /* Gradients to blend into the parent background perfectly */
          bg-linear-to-l 
          from-white via-white/80 to-transparent 
          dark:from-[#020617] dark:via-[#020617]/80 
          oled:from-black oled:via-black/80
        `}
      >
        <button
          onClick={scrollToRight}
          className="mr-2 w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-md pointer-events-auto transition-all shadow-lg hover:scale-105 border
            /* Light Mode */
            bg-white/80 border-slate-200 text-slate-700 hover:bg-slate-100
            /* Theme Mode */
            dark:bg-white/10 dark:border-white/10 dark:text-white dark:hover:bg-white/20
            /* OLED Mode */
            oled:bg-black/50 oled:border-white/20 oled:text-slate-300 oled:hover:bg-white/10 oled:hover:text-white
          "
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CategoryPills;