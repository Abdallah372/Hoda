import React from "react";
import { useCourses } from "../hooks/useCourses";
import CourseCard from "../components/CourseCard";

const Home = () => {
  const { courses, loading, error } = useCourses();

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="relative bg-primary-dark text-white pt-16 pb-20 sm:pt-24 sm:pb-32 overflow-hidden text-right">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(15,76,58,1)_0%,rgba(8,51,39,1)_90.2%)] z-0" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="inline-block bg-primary-light px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-6 animate-pulse tracking-wide uppercase">
              منصة هدى التعليمية
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.15] mb-6 sm:mb-8">
              اطلب العلم الشرعي <br />
              <span className="text-accent underline decoration-accent/30 underline-offset-8">
                بسهولة وبيسر
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed mb-10 sm:mb-12 max-w-2xl">
              مكتبة تعليمية مرئية منظمة، تجمع لك أهم الشروحات العلمية من سلاسل
              اليوتيوب الموثوقة في واجهة عصرية ومرنة.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
              <button
                onClick={() =>
                  window.scrollTo({ top: 600, behavior: "smooth" })
                }
                className="btn-primary w-full sm:w-auto px-10 py-4 shadow-xl shadow-primary/20"
              >
                استكشف الدورات
              </button>
              <div className="flex items-center gap-6 text-slate-300/80 font-medium">
                <div className="text-sm sm:text-base">
                  <strong className="text-white text-lg">2</strong> كورس أساسي
                </div>
                <div className="w-px h-6 bg-white/20 hidden sm:block" />
                <div className="text-sm sm:text-base">
                  <strong className="text-white text-lg">16</strong> درس علمي
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-24 bg-slate-50">
        <div className="container">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                أحدث الدورات
              </h2>
              <p className="text-slate-500">
                دروس منوعة في العقيدة، الفقه، والتفسير
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-700 p-6 rounded-2xl flex justify-between items-center mb-8">
              <p className="font-semibold">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="underline font-bold"
              >
                إعادة المحاولة
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-slate-200 aspect-video rounded-2xl"
                  />
                ))
              : courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
