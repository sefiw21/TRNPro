import { ArrowLeft, Bell, Search, Upload } from "lucide-react";
import { useState, type FormEvent } from "react";
// import { useAuth } from "../../../providers/AuthProvider.tsx";
import Button from "../../ui/Button.tsx";
import Profile from "../../ui/Profile.tsx";
import SearchBar from "../../ui/SearchBar.tsx";
import { MenuBarAndLogo } from "./MenuBarAndLogo.tsx";

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
    <header className="sticky top-0 z-50 h-16 md:h-20 px-4 md:px-6 flex gap-4 justify-between items-center bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">

      {/* LEFT SECTION: Menu & Logo */}
      <div className={`flex items-center shrink-0 ${fullWidthSearch ? "hidden" : "flex"}`}>
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
            className="shrink-0 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}

        <div className="flex flex-1 gap-2 items-center w-full">
          <div className="flex-1 w-full">
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
            className="text-slate-400 hover:text-white hover:bg-white/10 rounded-full"
            aria-label="Open search"
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-1.5">
          <Button
            size="icon"
            variant="ghost"
            className="text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Upload video"
          >
            <Upload className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="relative text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {/* Unread Notification Indicator */}
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-amber-500 rounded-full border border-[#020617]"></span>
          </Button>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block h-8 w-px bg-white/10 mx-2" />

        {/* Profile (FIX: added shrink-0 so it never squishes) */}
        <div className="shrink-0">
          <Profile />
        </div>
      </div>
    </header>
  );
};