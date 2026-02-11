import React, { useState, useMemo } from "react";
import { Search, Filter, X, Check, ChevronDown } from "lucide-react";

const FilterSidebar = ({
  filters,
  onFilterChange,
  instructors,
  categories,
  levels,
  isOpen,
  onClose,
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
        fixed inset-y-0 right-0 w-80 bg-surface border-l border-subtle z-50 transform transition-transform duration-300 overflow-y-auto
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        lg:relative lg:translate-x-0 lg:w-full lg:block lg:z-0 lg:h-auto lg:sticky lg:top-44 rounded-2xl shadow-xl lg:shadow-none
      `}
      >
        <div className="p-6 space-y-8 flex flex-col h-full">
          <div className="flex items-center justify-between lg:hidden">
            <h2 className="text-xl font-bold">تصفية النتائج</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              التصنيف
            </h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div
                    className={`
                    w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all
                    ${
                      filters.categories.includes(cat)
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : "border-slate-300 dark:border-slate-700 group-hover:border-emerald-500"
                    }
                  `}
                  >
                    {filters.categories.includes(cat) && (
                      <Check size={14} strokeWidth={3} />
                    )}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={filters.categories.includes(cat)}
                    onChange={() => onFilterChange("categories", cat)}
                  />
                  <span className="text-sm text-secondary font-bold group-hover:text-emerald-500 transition-colors">
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Instructors */}
          <div className="space-y-4">
            <h3 className="font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
              الشيخ
            </h3>
            <div className="space-y-2">
              {instructors.map((inst) => (
                <label
                  key={inst.id}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div
                    className={`
                    w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all
                    ${
                      filters.instructors.includes(inst.id)
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "border-slate-300 dark:border-slate-700 group-hover:border-blue-500"
                    }
                  `}
                  >
                    {filters.instructors.includes(inst.id) && (
                      <Check size={14} strokeWidth={3} />
                    )}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={filters.instructors.includes(inst.id)}
                    onChange={() => onFilterChange("instructors", inst.id)}
                  />
                  <span className="text-sm text-secondary font-bold group-hover:text-blue-500 transition-colors">
                    {inst.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Levels */}
          <div className="space-y-4">
            <h3 className="font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-amber-500 rounded-full" />
              المستوى
            </h3>
            <div className="flex flex-wrap gap-2">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => onFilterChange("level", level)}
                  className={`
                    px-4 py-2 rounded-xl text-xs font-bold transition-all border
                    ${
                      filters.level === level
                        ? "bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-500/30"
                        : "bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700 hover:border-amber-500 hover:text-amber-500"
                    }
                  `}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;
