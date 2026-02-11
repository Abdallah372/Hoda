import React, { useRef } from "react";
import { useCourses } from "../hooks/useCourses";
import CourseCard from "../components/CourseCard";
import { ArrowDown, Sparkles, Play } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const Home = () => {
  const { courses, loading, error } = useCourses();
  const heroRef = useRef(null);
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <div className="bg-slate-50 dark:bg-[#0f1012] min-h-screen">
      {/* Dynamic Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] md:h-[90vh] flex items-center justify-center overflow-hidden pb-16 pt-20 md:py-0"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[#022c22] z-0">
          <motion.div
            style={{ y: y1, opacity: 0.4 }}
            className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-emerald-500 rounded-full blur-[80px] md:blur-[120px] mix-blend-screen"
          />
          <motion.div
            style={{ y: y2, opacity: 0.3 }}
            className="absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-teal-600 rounded-full blur-[100px] md:blur-[140px] mix-blend-screen"
          />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
        </div>

        <div className="container relative z-10 px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-emerald-300 text-[10px] md:text-xs font-bold mb-6 md:mb-8 shadow-2xl"
          >
            <Sparkles size={12} className="animate-pulse" />
            <span>منصة هدى - العلم النافع</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-black text-white tracking-tighter mb-6 md:mb-8 leading-[1.1] md:leading-tight"
          >
            العلم الشرعي <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              على منهج السلف
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-2xl text-slate-300 max-w-2xl mx-auto mb-8 md:mb-12 font-medium leading-relaxed px-4 md:px-0"
          >
            منصة علمية مؤصلة، تقرب لك ميراث النبوة بفهم الصحابة والتابعين، في
            قالب عصري ميسر لطلاب العلم.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 w-full sm:w-auto px-6 sm:px-0"
          >
            <button
              onClick={() =>
                document
                  .getElementById("courses-grid")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="w-full sm:w-auto px-6 py-3.5 md:px-8 md:py-4 bg-white text-emerald-950 font-black rounded-full shadow-xl shadow-white/10 hover:scale-105 active:scale-95 transition-all text-base md:text-lg flex items-center justify-center gap-2"
            >
              <Play size={18} className="fill-current" />
              ابدأ التعلم الآن
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <ArrowDown size={24} className="md:w-8 md:h-8" />
        </motion.div>
      </section>

      {/* Stats Ticker (Optional for Gen Z Logic: Social Proof) */}
      <div className="bg-[#0f1012] border-y border-white/5 py-4 md:py-8 overflow-hidden">
        <div className="container flex justify-between items-center text-slate-500 font-bold text-[10px] sm:text-xs md:text-base opacity-60 px-4 md:px-6 overflow-x-auto whitespace-nowrap md:whitespace-normal gap-8 no-scrollbar">
          <span className="shrink-0">+100 درس مؤصل</span>
          <span className="shrink-0">منهجية علمية</span>
          <span className="shrink-0">صفاء المعتقد</span>
          <span className="shrink-0">مجاني لوجه الله</span>
        </div>
      </div>

      {/* Courses Grid */}
      <section
        id="courses-grid"
        className="py-16 md:py-32 container px-4 md:px-6"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-2 md:mb-4">
              المتون العلمية
            </h2>
            <p className="text-sm md:text-lg text-slate-500 dark:text-slate-400">
              اختر المتن المناسب لمستواك وابدأ بالتأصيل
            </p>
          </div>
        </div>

        {error && (
          <div className="p-6 md:p-8 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl md:rounded-3xl text-center mb-8 md:mb-12 text-sm md:text-base">
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-slate-200 dark:bg-slate-800 aspect-video md:aspect-[4/3] rounded-[1.5rem] md:rounded-[2rem]"
                />
              ))
            : courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
