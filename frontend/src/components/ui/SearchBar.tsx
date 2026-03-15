import { Mic } from "lucide-react";
import Button from "./Button";

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
    <div className="flex justify-center items-center max-w-2xl mx-auto">
      {/* Search Container */}
      <div className="relative w-full group">
        {/* Search Input */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full bg-[#0f0f0f] text-gray-100 px-6 py-3 pr-12 rounded-full 
                border border-gray-700 focus:border-blue-500 focus:outline-none 
                focus:ring-2 focus:ring-blue-500/30 transition-all duration-300
                placeholder:text-gray-400 text-lg hover:bg-[#1a1a1a]"
        />

        {/* Search Icon */}
        <button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 
                       bg-gray-800 hover:bg-gray-700 w-10 h-10 flex items-center 
                       justify-center rounded-full transition-all duration-300
                       group-focus-within:bg-blue-600 hover:scale-105 active:scale-95"
        >
          <svg
            className="w-5 h-5 text-gray-300 group-focus-within:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>

        {/* Clear Button (only shows when there's text) */}
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-14 top-1/2 transform -translate-y-1/2 
                   text-gray-400 hover:text-white w-8 h-8 flex items-center 
                   justify-center rounded-full hover:bg-gray-800 transition-all"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Focus Indicator */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-focus-within:opacity-100 
                    bg-linear-to-r from-blue-500/10 to-purple-500/10 -z-10 
                    transition-opacity duration-300"
        />
      </div>

      {/* Optional: Search Filters Button (like YouTube) */}
      <button
        onClick={showFilters}
        className={`
                              relative ml-3 inline-flex items-center justify-center gap-2
                              rounded-2xl px-4 py-2.5 text-sm font-medium
                              border shadow-md
                              transition-all duration-200 ease-out
                              focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-black
                              ${toggleFilters
            ? "border-cyan-400/60 bg-linear-to-br from-cyan-500/20 via-sky-500/10 to-blue-500/20 text-cyan-100 shadow-cyan-500/30"
            : "border-zinc-700/70 bg-zinc-900/90 text-zinc-200 hover:border-zinc-500 hover:bg-zinc-800/90 hover:shadow-lg hover:shadow-zinc-900/60 active:scale-[0.97]"
          }
                            `}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
        <span className="hidden sm:inline">Filters</span>

        {/* subtle glow when active */}
        {toggleFilters && (
          <span className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-cyan-500/10 blur-xl" />
        )}
      </button>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="shrink-0 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-full transition-all border border-white/5"
        aria-label="Search with voice"
      >
        <Mic className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default SearchBar;
