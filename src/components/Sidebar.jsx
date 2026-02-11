import React from "react";
import { NavLink } from "react-router-dom";
import { Home, BookOpen, Film, Tv, Info, Book, PenTool } from "lucide-react";
import { motion } from "framer-motion";

const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { to: "/", icon: Home, label: "الرئيسية" },
    { to: "/courses", icon: BookOpen, label: "المتون العلمية" },
    { to: "/videos", icon: Tv, label: "الفيديوهات" },
    { to: "/shorts", icon: Film, label: "Shorts" },
    { to: "/books", icon: Book, label: "المكتبة" },
    { to: "/editor", icon: PenTool, label: "مساحة التدوين", spotlight: true },
    { to: "/about", icon: Info, label: "عن المنصة" },
  ];

  return (
    <aside
      className={`
        fixed top-16 right-0 bottom-0 bg-surface border-l border-subtle
        transition-all duration-300 z-40 overflow-y-auto px-3 py-4
        ${isOpen ? "w-64 translate-x-0" : "w-0 translate-x-full lg:w-20 lg:translate-x-0"}
      `}
    >
      <div className="flex flex-col gap-1.5">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => window.innerWidth < 1024 && onClose()} // Close on mobile click
            className={({ isActive }) => `
              relative flex items-center gap-4 px-3 py-3 rounded-2xl transition-all group
              ${
                isActive
                  ? "bg-primary/10 text-primary font-black"
                  : item.spotlight
                    ? "bg-accent-soft text-accent font-black animate-pulse-subtle"
                    : "text-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-primary"
              }
            `}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeBar"
                    className="absolute right-0 w-1 h-6 bg-primary rounded-l-full"
                  />
                )}
                <item.icon size={22} className="min-w-[22px]" />
                <span
                  className={`${!isOpen && "lg:hidden"} whitespace-nowrap overflow-hidden transition-all duration-300 font-bold`}
                >
                  {item.label}
                </span>

                {/* Tooltip for collapsed state */}
                {!isOpen && (
                  <div className="hidden lg:group-hover:block absolute right-16 bg-slate-900 border border-slate-800 text-white text-[10px] font-black px-3 py-1.5 rounded-xl shadow-2xl whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div className={`mt-auto pt-8 px-4 ${!isOpen && "lg:hidden"}`}>
        <p className="text-xs text-slate-400 text-center leading-relaxed">
          منصة هدى التعليمية <br />
          وقف لله تعالى
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
