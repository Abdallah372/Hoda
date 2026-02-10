import React from "react";
import { useParams, Link } from "react-router-dom";
import { useCourseDetail } from "../hooks/useCourseDetail";
import { useCourseProgress } from "../hooks/useCourseProgress";
import Skeleton from "../components/Skeleton";
import {
  CheckCircle,
  ArrowRight,
  User,
  BookOpen,
  ExternalLink,
  PlayCircle,
} from "lucide-react";

const Course = () => {
  const { id } = useParams();
  const { course, loading, error } = useCourseDetail(id);
  const { progressPercent, completedCount, total, completedLessons } =
    useCourseProgress(id, course ? course.lessons : []);

  if (loading)
    return (
      <div className="container py-24">
        <Skeleton height="400px" borderRadius="1.5rem" />
      </div>
    );

  if (error || !course) {
    return (
      <div className="container py-32 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          عذراً، حدث خطأ في تحميل الكورس
        </h2>
        <Link to="/" className="text-primary font-bold underline">
          العودة للرئيسية
        </Link>
      </div>
    );
  }

  return (
    <div className="fade-in pb-24">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-10 sm:py-12 lg:py-16">
        <div className="container grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-8 flex flex-col items-start gap-5 sm:gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-slate-400 font-bold hover:text-primary transition-colors text-sm sm:text-base"
            >
              <ArrowRight size={18} />
              <span>العودة للرئيسية</span>
            </Link>

            <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-400">
              <span className="flex items-center gap-1.5 underline decoration-slate-200 dark:decoration-slate-700 underline-offset-4">
                <User size={14} /> {course.instructor}
              </span>
              <span className="opacity-30">•</span>
              <span>دورة مرئية</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-[1.2]">
              {course.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
              {course.description}
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex justify-between items-end mb-4">
                <h3 className="font-black text-slate-900 dark:text-white">
                  تقدمك الحالي
                </h3>
                <span className="text-xl sm:text-2xl font-black text-primary">
                  {progressPercent}%
                </span>
              </div>
              <div className="h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-primary transition-all duration-1000"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-bold mb-8 text-center uppercase tracking-wider">
                أكملت {completedCount} من أصل {total} درس
              </p>

              {course.lessons && course.lessons.length > 0 && (
                <Link
                  to={`/lesson/${course.id}/${course.lessons[0].id}`}
                  className="btn-primary w-full flex items-center justify-center gap-3 py-4 shadow-lg shadow-primary/10"
                >
                  {progressPercent === 0 ? (
                    <PlayCircle size={22} className="fill-current" />
                  ) : (
                    <CheckCircle size={22} className="fill-current" />
                  )}
                  <span>
                    {progressPercent === 0
                      ? "بدء الدورة الآن"
                      : "متابعة التعلم"}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Curriculum */}
      <section className="pt-24 container max-w-4xl">
        <div className="text-center mb-16">
          <BookOpen
            size={40}
            className="text-primary mx-auto mb-4 opacity-20"
          />
          <h2 className="text-3xl font-black text-slate-900">منهج الدورة</h2>
        </div>

        <div className="space-y-3">
          {course.lessons &&
            course.lessons.map((lesson, idx) => {
              const completed = completedLessons.includes(lesson.id);
              return (
                <Link
                  key={lesson.id}
                  to={`/lesson/${course.id}/${lesson.id}`}
                  className={`relative group flex items-center gap-5 p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden ${
                    completed
                      ? "bg-emerald-50/50 border-emerald-100 dark:border-emerald-900/30"
                      : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-primary hover:shadow-lg hover:-translate-y-1"
                  }`}
                >
                  {/* Hover Background Effect */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <span
                    className={`text-2xl font-black transition-colors tabular-nums min-w-[3rem] z-10 ${
                      completed
                        ? "text-emerald-300"
                        : "text-slate-200 dark:text-slate-600 group-hover:text-primary/40"
                    }`}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-grow z-10">
                    <h4
                      className={`text-lg font-bold transition-colors ${
                        completed
                          ? "text-emerald-800 dark:text-emerald-400"
                          : "text-slate-700 dark:text-slate-200 group-hover:text-primary"
                      }`}
                    >
                      {lesson.title}
                    </h4>
                  </div>

                  <div className="z-10 bg-white dark:bg-slate-900 rounded-full p-2 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                    {completed ? (
                      <CheckCircle size={20} className="text-emerald-500" />
                    ) : (
                      <PlayCircle
                        size={20}
                        className="text-slate-300 dark:text-slate-500 group-hover:text-primary fill-current group-hover:fill-primary/20"
                      />
                    )}
                  </div>
                </Link>
              );
            })}
        </div>
      </section>
    </div>
  );
};

export default Course;
