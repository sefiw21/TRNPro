import { MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../components/layouts/header/Logo.tsx";
import { Button } from "../../../components/Ui/forms/Button.tsx";
import { LnavItems } from "../utils/Items.ts";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Helper function to close menu when any link is clicked
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <div className="sticky top-0 z-50 py-3 backdrop-blur-xl border-b border-white/5 bg-[#020617]/80">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex items-center justify-between">

          {/* 1. Logo */}
          <div className="flex gap-2 items-center shrink-0">
            <Logo />
          </div>

          {/* 2. Desktop Navigation (Hidden on screens smaller than 'lg') */}
          {/* FIX: Changed <a> to <Link> to prevent page reloads */}
          <ul className="hidden lg:flex items-center ml-14 space-x-8 xl:space-x-12">
            {LnavItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.href}
                  className="text-gray-300 hover:text-white font-medium transition-colors"
                >
                  {item.lable}
                </Link>
              </li>
            ))}
          </ul>

          {/* 3. Desktop Auth Buttons (Hidden on screens smaller than 'lg') */}
          {/* FIX: Aligned breakpoint to 'lg' so it matches the links */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/logIn"
              className="px-5 py-2 text-sm font-medium text-gray-300 transition-all duration-200 border border-white/10 rounded-lg hover:bg-white/5 hover:text-white hover:border-white/30 whitespace-pre"
            >
              Log In
            </Link>
            <Link
              to="/signUp"
              className="px-5 py-2 text-sm font-medium text-white transition-all duration-300 rounded-lg whitespace-pre bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 active:scale-95"
            >
              Create an account
            </Link>
          </div>

          {/* 4. Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-4">
            <Button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              variant="ghost"
              className="relative z-50 p-2 text-white hover:bg-white/10 transition-all duration-300 rounded-full active:scale-90"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* =========================================
            MOBILE MENU DROPDOWN
            ========================================= */}
        {mobileMenuOpen && (
          <>
            {/* Invisible Overlay: Clicking anywhere outside the menu closes it */}
            <div
              className="fixed inset-0 h-screen w-screen z-40 lg:hidden"
              onClick={closeMenu}
            />

            {/* The actual dropdown box */}
            {/* FIX: Removed invalid 'mp-20', positioned absolute below header */}
            <div className="absolute top-16 right-4 w-[260px] lg:hidden p-6 bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200 z-50">
              <nav className="flex flex-col gap-5">

                {/* Mobile Links */}
                <ul className="flex flex-col space-y-1">
                  {LnavItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.href}
                        className="w-full py-2.5 px-4 flex items-center text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                        onClick={closeMenu} // FIX: Close menu on click
                      >
                        {item.lable}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Divider */}
                <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />

                {/* Mobile Auth Actions */}
                <div className="flex flex-col gap-3">
                  <Link
                    to="/logIn"
                    onClick={closeMenu} // FIX: Close menu on click
                    className="flex items-center justify-center w-full py-3 text-sm font-semibold bg-white/5 text-white border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signUp"
                    onClick={closeMenu} // FIX: Close menu on click
                    className="flex items-center justify-center w-full py-3 text-sm font-semibold text-white bg-linear-to-r from-blue-600 to-blue-500 rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
                  >
                    Create an account
                  </Link>
                </div>

              </nav>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;