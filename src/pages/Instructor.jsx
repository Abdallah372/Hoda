import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useCourses } from "../hooks/useCourses";
import CourseCard from "../components/CourseCard";
import instructorsData from "../data/instructors.json";
import {
  BookOpen,
  Users,
  CheckCircle,
  ArrowRight,
  Share2,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";

const Instructor = () => {
  const { id } = useParams();
  const { courses, loading } = useCourses();

  const instructor = useMemo(
    () => instructorsData.find((inst) => inst.id === id),
    [id],
  );

  const instructorCourses = useMemo(
    () => courses.filter((c) => c.instructorId === id),
    [courses, id],
  );

  if (!instructor) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-black text-primary">المعلم غير موجود</h2>
        <Link
          to="/courses"
          className="mt-4 text-emerald-500 font-bold hover:underline"
        >
          العودة للمتون
        </Link>
      </div>
    );
  }

  return (
    <div className="fade-in pb-20">
      {/* 1. Profile Hero Section */}
      <section className="relative mb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-[3rem] -z-10" />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 p-8 md:p-12">
          {/* Avatar with Glow */}
          <div className="relative shrink-0">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-40 h-40 md:w-52 md:h-52 rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl relative z-10"
            >
              <img
                src={instructor.image || instructor.imageUrl}
                alt={instructor.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-30 rounded-full -z-10" />
            <motion.div
              initial={{ rotate: -20, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              className="absolute -bottom-2 -right-2 bg-primary text-white p-2.5 rounded-2xl border-4 border-bg-app shadow-xl z-20"
            >
              <CheckCircle size={20} strokeWidth={3} />
            </motion.div>
          </div>

          {/* Bio Info */}
          <div className="flex-grow space-y-6 text-center md:text-right">
            <div>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-black tracking-widest uppercase mb-4"
              >
                <Award size={14} />
                عالم وباحث شرعي
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-black text-primary mb-4 leading-tight"
              >
                {instructor.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-secondary leading-loose max-w-3xl font-medium opacity-90"
              >
                {instructor.bio}
              </motion.p>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 pt-8 border-t border-border-subtle">
              <div className="flex flex-col items-center md:items-start gap-1">
                <span className="text-3xl font-black text-primary">
                  {instructorCourses.length}
                </span>
                <span className="text-xs text-muted font-bold uppercase tracking-widest">
                  الدورات العلمية
                </span>
              </div>
              <div className="w-px h-10 bg-border-subtle hidden sm:block" />
              <div className="flex flex-col items-center md:items-start gap-1">
                <span className="text-3xl font-black text-primary">12K+</span>
                <span className="text-xs text-muted font-bold uppercase tracking-widest">
                  مستفيد نشط
                </span>
              </div>
              <div className="w-px h-10 bg-border-subtle hidden sm:block" />
              <button className="mr-auto p-4 bg-surface-elevated rounded-2xl border border-border-subtle text-muted hover:text-primary transition-all active:scale-95 shadow-sm">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Courses Section */}
      <section className="space-y-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-primary flex items-center gap-3">
            <BookOpen className="text-primary" />
            <span>الشروحات والدورات المتاحة</span>
          </h2>
          <Link
            to="/courses"
            className="text-sm font-black text-primary bg-primary/5 px-4 py-2 rounded-xl hover:bg-primary/10 transition-all flex items-center gap-2"
          >
            كل الدورات
            <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="grid-responsive">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-[4/3] bg-surface rounded-3xl animate-pulse border border-subtle"
              />
            ))}
          </div>
        ) : (
          <div className="grid-responsive">
            {instructorCourses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Instructor;
