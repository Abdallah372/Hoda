import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Compass, Film, PenTool, Menu } from "lucide-react";

const BottomNav = ({ onMenuClick }) => {
  const navItems = [
    { to: "/", icon: Home, label: "الرئيسية" },
    { to: "/shorts", icon: Film, label: "Shorts" },
    { to: "/lectures", icon: Compass, label: "استكشف" },
    { to: "/editor", icon: PenTool, label: "مفكرتي" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 pb-safe pt-2 px-6 z-50 lg:hidden shadow-lg shadow-slate-900/5">
      <div className="flex justify-between items-center max-w-md mx-auto h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              relative flex flex-col items-center justify-center gap-1.5 w-16 h-full transition-all duration-300
              ${
                isActive
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }
            `}
          >
            {({ isActive }) => (
              <>
                <div
                  className={`
                  p-1.5 rounded-xl transition-all duration-300
                  ${
                    isActive
                      ? "bg-emerald-100/50 dark:bg-emerald-900/20 translate-y-[-4px]"
                      : ""
                  }
                `}
                >
                  <item.icon
                    size={22}
                    className={`transition-all duration-300 ${isActive ? "scale-110 stroke-[2.5]" : "stroke-2"}`}
                  />
                </div>
                <span className="text-[10px] font-bold">{item.label}</span>
                {isActive && (
                  <span className="absolute -top-1 w-1 h-1 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />
                )}
              </>
            )}
          </NavLink>
        ))}

        {/* Menu Button for Sidebar */}
        <button
          onClick={onMenuClick}
          className="flex flex-col items-center justify-center gap-1.5 w-16 h-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          <div className="p-1.5">
            <Menu size={22} strokeWidth={2} />
          </div>
          <span className="text-[10px] font-bold">القائمة</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
