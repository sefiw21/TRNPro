import { ArrowLeft, Search } from "lucide-react";
import { useState, type FormEvent } from "react";
// import { useAuth } from "../../../providers/AuthProvider.tsx";
import { Button } from "../../Ui/forms/Button.tsx";
import { GlobalUserActions } from "./GlobalUserActions.tsx";
import { MenuBarAndLogo } from "./MenuBarAndLogo.tsx";
import SearchBar from "./SearchBar.tsx";

export const Header = () => {
  // const { isAuthenticated } = useAuth();
  const [search, setSearch] = useState("");
  const [fullWidthSearch, setFullWidthSearch] = useState(false);

  // Form submission handler to prevent page reloads
  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", search);
    // TODO: Navigate to search results page
  };

  return (
    <header className="sticky top-0 z-50 h-16 md:h-20 px-2 md:px-3 flex gap-4 justify-between items-center backdrop-blur-xl border-b transition-all duration-500
      /* 1. Light Mode: Frosty white glass */
      bg-white/80 border-slate-200
      /* 2. Theme Mode: Deep blue glass */
      dark:bg-[#020610]/80 dark:border-white/5
      /* 3. OLED Mode: Pure black glass */
      oled:bg-black/90 oled:border-white/5
    ">

      {/* LEFT SECTION: Menu & Logo */}
      <div className={`${fullWidthSearch ? "hidden" : "flex"}`}>
        <MenuBarAndLogo hidden={fullWidthSearch} />
      </div>

      {/* CENTER SECTION: Search Form */}
      <form
        onSubmit={handleSearchSubmit}
        className={`flex-1 max-w-[720px] mx-auto gap-3 justify-center items-center ${fullWidthSearch ? "flex w-full" : "hidden md:flex"
          }`}
      >
        {fullWidthSearch && (
          <Button
            onClick={() => setFullWidthSearch(false)}
            type="button"
            size="icon"
            variant="ghost"
            className="shrink-0 rounded-full transition-colors duration-300
              text-slate-500 hover:text-slate-900 hover:bg-slate-200/50
              dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/10
              oled:text-slate-500 oled:hover:text-white oled:hover:bg-white/10
            "
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}

        <div className="flex flex-1 gap-2 items-center w-full">
          <div className="flex-1 w-full">
            {/* Make sure your SearchBar component is imported and used here! */}
            <SearchBar search={search} setSearch={setSearch} />
          </div>
        </div>
      </form>

      {/* RIGHT SECTION: Action Icons */}
      <div
        className={`flex items-center gap-2 md:gap-3 shrink-0 ${fullWidthSearch ? "hidden" : "flex"
          }`}
      >
        {/* Mobile-only Search Toggle */}
        <div className="flex md:hidden items-center gap-1">
          <Button
            onClick={() => setFullWidthSearch(true)}
            size="icon"
            variant="ghost"
            className="rounded-full transition-colors duration-300
              text-slate-500 hover:text-slate-900 hover:bg-slate-200/50
              dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/10
              oled:text-slate-500 oled:hover:text-white oled:hover:bg-white/10
            "
            aria-label="Open search"
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>
        <GlobalUserActions />
      </div>
    </header >
  );
};