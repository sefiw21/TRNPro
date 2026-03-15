import { MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button.tsx";
import Logo from "../../../components/ui/Logo.tsx";
import { LnavItems } from "./Items.ts";
const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 py-3 backdrop-blur-lg border-none bg-black/70">
      <div className="md:container px-2 mx-auto relative text-sm">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center shrink-0">
            <Logo />
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {LnavItems.map((item, index) => (
              <li key={index}>
                <a href={item.href}>{item.lable}</a>
              </li>
            ))}
          </ul>
          <div className="hidden md:flex md:ml-12 items-center gap-4">
            {/* Log In - Subtle Border & Hover Glow */}
            <Link
              to="/logIn"
              className="px-5 py-2 text-sm font-medium text-gray-300 transition-all duration-200 border
               border-white/10 rounded-lg hover:bg-white/5 hover:text-white hover:border-white/30 whitespace-pre"
            >
              Log In
            </Link>

            {/* Create Account - High Contrast Gradient */}
            <Link
              to="/signUp"
              className="px-5 py-2 text-sm font-medium text-white transition-all duration-300 rounded-lg whitespace-pre bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 active:scale-95"
            >
              Create an account
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-4">
            <Button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              variant="ghost" // Assuming a shadcn-like button, otherwise use transparent classes
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
        {mobileMenuOpen && (
          <div className="fixed mp-20 right-0 mx-12 lg:hidden p-6 bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <nav className="flex flex-col gap-6 justify-end items-end">
              <ul className="flex flex-col space-y-2">
                {LnavItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.href}
                      className="w-full p-3 gap-4 flex items-center justify-center text-lg font-medium text-gray-300 hover:text-white hover:bg-white/20 rounded-xl transition-colors"
                      onClick={() => setMobileMenuOpen(false)} // Close on click
                    >
                      {item.lable}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />

              {/* Auth Actions */}
              <div className="flex md:hidden flex-col gap-3">
                <Link
                  to="/logIn"
                  className="flex items-center justify-center w-full py-3.5 text-sm font-semibold bg-black/55 text-white border border-white/20 rounded-xl hover:bg-white/20 transition-all"
                >
                  Log In
                </Link>
                <Link
                  to="/signUp"
                  className="flex items-center justify-center w-full px-2 py-3.5 text-sm font-semibold text-white bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20 active:bg-blue-700 transition-all"
                >
                  Create an account
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
