import { Button } from "@/components/Ui/forms";
import { Mic } from "lucide-react";

interface SearchBarprops {
  search?: string;
  setSearch: (value: React.SetStateAction<string>) => void;
  showFilters?: () => void;
  toggleFilters?: boolean;
}
const SearchBar = ({
  search,
  setSearch,
  showFilters,
  toggleFilters,
}: SearchBarprops) => {
  return (
    <div className="flex justify-center items-center max-w-2xl mx-auto gap-2">
      {/* Search Container */}
      <div className="relative w-full group">
        {/* Search Input */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full px-6 py-3 pr-12 rounded-full text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30
            /* 1. Light Mode */
            bg-slate-100 border border-slate-300 text-slate-900 placeholder:text-slate-500 hover:bg-slate-200/70
            /* 2. Theme Mode */
            dark:bg-white/5 dark:border-white/10 dark:text-slate-100 dark:placeholder:text-slate-400 dark:hover:bg-white/10
            /* 3. OLED Mode */
            oled:bg-transparent oled:border-white/20 oled:text-white oled:placeholder:text-slate-500 oled:hover:bg-white/5
          "
        />

        {/* Search Icon */}
        <button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-105 active:scale-95 group-focus-within:bg-blue-600
            bg-slate-200 hover:bg-slate-300
            dark:bg-white/10 dark:hover:bg-white/20
            oled:bg-white/10 oled:hover:bg-white/20
          "
        >
          <svg
            className="w-5 h-5 transition-colors duration-300 group-focus-within:text-white
              text-slate-500 dark:text-slate-300 oled:text-slate-400
            "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* Clear Button (only shows when there's text) */}
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-14 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full transition-all
              text-slate-400 hover:text-slate-800 hover:bg-slate-200
              dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/10
              oled:text-slate-500 oled:hover:text-white oled:hover:bg-white/10
            "
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Focus Indicator (Glow) */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-focus-within:opacity-100 -z-10 transition-opacity duration-300
            bg-linear-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20
            oled:hidden
          "
        />
      </div>

      {/* Search Filters Button */}
      <button
        onClick={showFilters}
        className={`
          relative inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium border shadow-md transition-all duration-200 ease-out shrink-0
          focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 
          
          ${toggleFilters
            ? // ACTIVE STATES
            `
              bg-blue-50 border-blue-300 text-blue-700 shadow-blue-500/20
              dark:border-cyan-400/60 dark:bg-linear-to-br dark:from-cyan-500/20 dark:via-sky-500/10 dark:to-blue-500/20 dark:text-cyan-100 dark:shadow-cyan-500/30
              oled:bg-transparent oled:border-white/50 oled:text-white oled:shadow-none
              `
            : // INACTIVE STATES
            `
              bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 active:scale-[0.97]
              dark:bg-[#0f0f0f] dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:border-white/20 dark:shadow-black/50
              oled:bg-transparent oled:border-white/10 oled:text-slate-400 oled:hover:bg-white/5 oled:hover:text-white oled:shadow-none
              `
          }
        `}
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <span className="hidden sm:inline">Filters</span>

        {/* subtle glow when active - Disabled in OLED to save battery */}
        {toggleFilters && (
          <span className="pointer-events-none absolute inset-0 -z-10 rounded-3xl blur-xl transition-all duration-300
            bg-blue-500/10 dark:bg-cyan-500/10 oled:hidden
          " />
        )}
      </button>

      {/* Voice Search (Mic) Button */}
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="shrink-0 rounded-full transition-all border
          bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border-slate-200
          dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-300 dark:hover:text-white dark:border-white/5
          oled:bg-transparent oled:hover:bg-white/10 oled:text-slate-400 oled:hover:text-white oled:border-white/10
        "
        aria-label="Search with voice"
      >
        <Mic className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default SearchBar;
