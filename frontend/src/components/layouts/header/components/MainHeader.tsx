import { Button } from "@/components/Ui/forms/index.ts";
import { ArrowLeft, Search } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Header } from "../Header.tsx";
import { GlobalUserActions } from "./GlobalUserActions.tsx";
import { MenuBarAndLogo } from "./MenuBarAndLogo.tsx";
import SearchBar from "./SearchBar.tsx";

export const MainHeader = () => {
    const [search, setSearch] = useState("");
    const [fullWidthSearch, setFullWidthSearch] = useState(false);

    const handleSearchSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Searching for:", search);
    };

    // 1. Left Slot: Hide entirely if mobile search is active
    const leftNode = !fullWidthSearch ? <MenuBarAndLogo /> : null;

    // 2. Center Slot: The Search Form
    const centerNode = (
        <form
            onSubmit={handleSearchSubmit}
            className={`w-full gap-3 items-center ${fullWidthSearch ? "flex" : "hidden md:flex"}`}
        >
            {fullWidthSearch && (
                <Button
                    onClick={() => setFullWidthSearch(false)}
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="shrink-0 rounded-full transition-colors duration-300 text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/10 oled:text-slate-500 oled:hover:text-white oled:hover:bg-white/10"
                    aria-label="Go back"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Button>
            )}
            <div className="flex-1 w-full">
                <SearchBar search={search} setSearch={setSearch} />
            </div>
        </form>
    );

    // 3. Right Slot: Actions + Mobile Search Toggle. Hide if mobile search is active
    const rightNode = !fullWidthSearch ? (
        <>
            <div className="flex md:hidden items-center gap-1">
                <Button
                    onClick={() => setFullWidthSearch(true)}
                    size="icon"
                    variant="ghost"
                    className="rounded-full transition-colors duration-300 text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/10 oled:text-slate-500 oled:hover:text-white oled:hover:bg-white/10"
                    aria-label="Open search"
                >
                    <Search className="w-5 h-5" />
                </Button>
            </div>
            <GlobalUserActions />
        </>
    ) : null;

    // --- RENDER ---
    return (
        <Header
            leftContent={leftNode}
            centerContent={centerNode}
            rightContent={rightNode}
        />
    );
};