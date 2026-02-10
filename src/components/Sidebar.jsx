import React from "react";
import { NavLink } from "react-router-dom";
import { Home, BookOpen, Film, Tv, Info, Book } from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { to: "/", icon: Home, label: "الرئيسية" },
    { to: "/lectures", icon: BookOpen, label: "المحاضرات" },
    { to: "/videos", icon: Tv, label: "الفيديوهات" },
    { to: "/shorts", icon: Film, label: "Shorts" },
    { to: "/books", icon: Book, label: "المكتبة" },
    { to: "/about", icon: Info, label: "عن المنصة" },
  ];

  return (
    <aside
      className={`
        fixed top-16 right-0 bottom-0 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800
        transition-all duration-300 z-40 overflow-y-auto px-2 py-4
        ${isOpen ? "w-64 translate-x-0" : "w-0 translate-x-full lg:w-20 lg:translate-x-0"}
      `}
    >
      <div className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => window.innerWidth < 1024 && onClose()} // Close on mobile click
            className={({ isActive }) => `
              flex items-center gap-4 px-3 py-3 rounded-xl transition-all group
              ${
                isActive
                  ? "bg-primary/10 text-primary dark:text-primary-light font-bold"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary"
              }
            `}
          >
            <item.icon size={22} className="min-w-[22px]" />
            <span
              className={`${!isOpen && "lg:hidden"} whitespace-nowrap overflow-hidden transition-all duration-300`}
            >
              {item.label}
            </span>

            {/* Tooltip for collapsed state */}
            {!isOpen && (
              <div className="hidden lg:group-hover:block absolute right-16 bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-50">
                {item.label}
              </div>
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
