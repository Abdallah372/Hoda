import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import SearchAutocomplete from "./SearchAutocomplete";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ onToggleSidebar }) => {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 header-glass transition-all duration-300">
      <div className="container h-full max-w-full flex items-center justify-between gap-4">
        {/* Left: Menu & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors text-primary"
          >
            <Menu size={20} />
          </button>

          <Link to="/" className="flex items-center gap-2 group">
            <motion.span whileHover={{ rotate: 15 }} className="text-2xl">
              🕌
            </motion.span>
            <span className="text-xl font-black bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent">
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
          <AnimatePresence mode="wait">
            <motion.button
              key={isDark ? "moon" : "sun"}
              initial={{ y: 10, opacity: 0, rotate: -45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -10, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
              onClick={toggleTheme}
              className="p-2.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors text-primary"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </AnimatePresence>

          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white font-black text-xs ring-2 ring-white dark:ring-slate-900 shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all">
            ط
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
