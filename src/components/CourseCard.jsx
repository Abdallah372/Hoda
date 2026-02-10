import React from "react";
import { Link } from "react-router-dom";
import { PlayCircle, User, BookOpen } from "lucide-react";

const CourseCard = ({ course }) => {
  if (!course) return null;

  return (
    <Link
      to={`/course/${course.id}`}
      className="group relative flex flex-col bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 fade-in shadow-sm"
    >
      <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-primary/20 dark:bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
          <div className="bg-white/20 dark:bg-black/20 p-4 rounded-full backdrop-blur-md shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500">
            <PlayCircle size={48} className="text-white fill-primary" />
          </div>
        </div>
        {course.lessonsCount > 0 && (
          <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-2.5 py-1 rounded-xl text-[10px] font-black flex items-center gap-1.5 shadow-md">
            <BookOpen size={12} className="text-primary" />
            <span className="text-slate-800 dark:text-slate-100">
              {course.lessonsCount} درس
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-[10px] mb-4 font-black uppercase tracking-widest">
          <User size={12} />
          <span>{course.instructor}</span>
        </div>
        <h3 className="text-slate-900 dark:text-white text-lg font-black mb-2 group-hover:text-primary transition-colors line-clamp-1 leading-tight">
          {course.title}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed mb-6 flex-grow">
          {course.description}
        </p>

        <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-slate-700/50">
          <span className="bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-lg text-[10px] uppercase font-black tracking-tighter">
            دورة مرئية
          </span>
          <span className="text-primary font-black text-sm">مجاني</span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
