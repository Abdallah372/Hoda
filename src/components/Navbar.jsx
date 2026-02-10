import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, Moon, Sun, X } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import SearchAutocomplete from "./SearchAutocomplete";

const Navbar = ({ onToggleSidebar }) => {
  const { isDark, toggleTheme } = useTheme();
  // const [searchQuery, setSearchQuery] = useState(""); // Removed as it's handled in Autocomplete
  const navigate = useNavigate();

  // handleSearch removed as it's handled in Autocomplete

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="container h-full max-w-full px-4 flex items-center justify-between gap-4">
        {/* Left: Menu & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <Menu className="text-slate-600 dark:text-slate-300" />
          </button>

          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl group-hover:scale-110 transition-transform">
              🕌
            </span>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
              هدى
            </span>
          </Link>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-2xl hidden md:block">
          <SearchAutocomplete />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Toggle (Optional - For now hidden) */}
          <button className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-600">
            <Search size={20} />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-600 dark:text-slate-300"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-emerald-400 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white dark:ring-slate-900 shadow-sm cursor-pointer hover:scale-105 transition-transform">
            ط
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
