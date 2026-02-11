import React, { useState, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  BookOpen,
  XCircle,
} from "lucide-react";
import { useCourses } from "../hooks/useCourses";
import CourseCard from "../components/CourseCard";
import FilterSidebar from "../components/FilterSidebar";
import instructorsData from "../data/instructors.json";
import { motion, AnimatePresence } from "framer-motion";

const Courses = () => {
  const { courses, loading, error } = useCourses();

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");

  const [filters, setFilters] = useState({
    categories: [],
    instructors: [],
    level: null,
  });

  // Unique Categories/Levels Extraction
  const categories = useMemo(
    () =>
      [...new Set(courses.map((c) => c.categoryTitle || c.categoryId))].filter(
        Boolean,
      ),
    [courses],
  );

  const levels = useMemo(
    () => [...new Set(courses.map((c) => c.level))].filter(Boolean),
    [courses],
  );

  // Filtering Logic
  const filteredCourses = useMemo(() => {
    return courses
      .filter((course) => {
        const matchesSearch =
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.instructorName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          course.description?.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        if (filters.categories.length > 0) {
          if (!filters.categories.includes(course.categoryTitle)) return false;
        }

        if (filters.instructors.length > 0) {
          if (!filters.instructors.includes(course.instructorId)) return false;
        }

        if (filters.level && course.level !== filters.level) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortOrder === "newest") return b.id.localeCompare(a.id);
        if (sortOrder === "shortest")
          return (a.lessonsCount || 0) - (b.lessonsCount || 0);
        return 0;
      });
  }, [courses, searchQuery, filters, sortOrder]);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      if (type === "categories") {
        const newCats = prev.categories.includes(value)
          ? prev.categories.filter((c) => c !== value)
          : [...prev.categories, value];
        return { ...prev, categories: newCats };
      }
      if (type === "instructors") {
        const newInsts = prev.instructors.includes(value)
          ? prev.instructors.filter((i) => i !== value)
          : [...prev.instructors, value];
        return { ...prev, instructors: newInsts };
      }
      if (type === "level") {
        return { ...prev, level: prev.level === value ? null : value };
      }
      return prev;
    });
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center p-40">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
        <p className="text-muted font-bold">جاري تحميل المكتبة العلمية...</p>
      </div>
    );

  return (
    <div className="fade-in pb-20">
      {/* 1. Header & Stats Section */}
      <header className="mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-3">
            <h1 className="text-fluid-h1 text-primary">متون هدى العلمية</h1>
            <p className="text-fluid-body text-secondary opacity-80 border-r-4 border-primary pr-4">
              دليلك الشامل لمتون العقيدة، الفقه، والحديث بمنهجية مؤصلة.
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm font-bold text-muted bg-surface px-8 py-5 rounded-[2.5rem] border border-subtle shadow-sm hidden md:flex">
            <div className="flex flex-col text-center">
              <span className="text-primary font-black text-2xl leading-none">
                {filteredCourses.length}
              </span>
              <span className="text-[10px] uppercase tracking-widest mt-1">
                مادة معروضة
              </span>
            </div>
            <div className="w-px h-10 bg-subtle" />
            <div className="flex flex-col text-center">
              <span className="text-primary font-black text-2xl leading-none">
                100%
              </span>
              <span className="text-[10px] uppercase tracking-widest mt-1">
                مجانية للطلبة
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Controls Row */}
      <div className="flex flex-col lg:flex-row gap-6 mb-12 sticky top-20 z-30 py-4 bg-app/80 backdrop-blur-xl border-b border-subtle/50">
        <div className="relative group flex-grow">
          <Search
            className="absolute right-5 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-all"
            size={20}
          />
          <input
            type="text"
            placeholder="ابحث عن متن، شيخ، أو موضوع..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 pr-14 pl-6 bg-surface border-2 border-border-subtle rounded-2xl focus:border-primary focus:outline-none transition-all font-bold text-primary shadow-sm"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden h-14 px-8 flex items-center gap-3 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 active:scale-95 transition-all"
          >
            <SlidersHorizontal size={20} />
            <span>فلترة</span>
          </button>

          <button
            onClick={() =>
              setSortOrder((prev) =>
                prev === "newest" ? "shortest" : "newest",
              )
            }
            className="h-14 px-8 flex items-center gap-3 bg-surface border-2 border-border-subtle rounded-2xl text-sm font-black text-secondary hover:border-primary hover:text-primary transition-all active:scale-95"
          >
            <ArrowUpDown size={18} />
            <span className="hidden sm:inline">
              {sortOrder === "newest" ? "الأحدث أولاً" : "الأقل دروساً"}
            </span>
          </button>
        </div>
      </div>

      {/* 3. Main Body */}
      <div className="flex gap-10 items-start">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block w-72 shrink-0 sticky top-44">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            instructors={instructorsData}
            categories={categories}
            levels={levels}
            isOpen={true}
          />
        </div>

        {/* Mobile Filter Sidebar Wrapper */}
        <AnimatePresence>
          {isFilterOpen && (
            <div className="lg:hidden fixed inset-0 z-50 pointer-events-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFilterOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute inset-y-0 right-0 w-[85%] bg-surface shadow-2xl overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-subtle">
                    <h2 className="text-xl font-black text-primary">
                      تصفية النتائج
                    </h2>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="p-2 bg-app rounded-full text-muted"
                    >
                      <XCircle size={24} />
                    </button>
                  </div>
                  <FilterSidebar
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    instructors={instructorsData}
                    categories={categories}
                    levels={levels}
                    isOpen={true}
                    onClose={() => setIsFilterOpen(false)}
                  />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Results Grid: The "Elastic" Area */}
        <div className="flex-grow w-full min-w-0">
          {filteredCourses.length > 0 ? (
            <div className="grid-responsive">
              {filteredCourses.map((course, idx) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % 3) * 0.1 }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 bg-surface rounded-[3rem] border-2 border-dashed border-subtle"
            >
              <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6 text-primary">
                <Search size={40} />
              </div>
              <h3 className="text-2xl font-black text-primary mb-2">
                لا توجد نتائج مطابقة
              </h3>
              <p className="text-secondary opacity-60 font-medium max-w-sm text-center px-4">
                جرب تغيير كلمات البحث أو إعادة ضبط محددات البحث لاستكشاف متون
                أخرى.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilters({ categories: [], instructors: [], level: null });
                }}
                className="mt-8 flex items-center gap-2 text-primary font-black px-8 py-4 bg-primary/10 rounded-2xl hover:bg-primary/20 transition-all"
              >
                <XCircle size={18} />
                إعادة ضبط البحث
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
