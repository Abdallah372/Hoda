import React from "react";
import { Link } from "react-router-dom";
import { Play, BookOpen, Clock, User } from "lucide-react";

const CourseCard = ({ course }) => {
  if (!course) return null;

  return (
    <Link
      to={`/course/${course.id}`}
      className="group relative flex flex-col card-layer overflow-hidden h-full transition-all hover:shadow-card hover:-translate-y-1 active:scale-[0.98]"
    >
      {/* Thumbnail: Absolute aspect ratio control */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-all shadow-xl border border-white/20">
            <Play className="fill-white text-white translate-x-1" size={24} />
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 right-3 z-20 flex gap-2">
          <span className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black text-white flex items-center gap-1.5 uppercase tracking-wider">
            <BookOpen size={10} className="text-emerald-400" />
            {course.lessonsCount} درس
          </span>
        </div>
      </div>

      {/* Content: Elastic Container */}
      <div className="p-5 flex-1 flex flex-col min-w-0">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <User size={12} />
          </div>
          <span className="text-[11px] font-bold text-muted truncate">
            {course.instructorName || course.instructor}
          </span>
        </div>

        <h3 className="text-lg font-black text-primary leading-tight mb-2 group-hover:text-amber-500 transition-colors line-clamp-2 min-h-[3.5rem] overflow-hidden">
          {course.title}
        </h3>

        <p className="text-sm text-secondary line-clamp-2 leading-relaxed mb-6 opacity-80 min-h-[2.5rem]">
          {course.description}
        </p>

        {/* Footer: Pushed to bottom */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-subtle">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-muted">
            <Clock size={14} />
            <span className="truncate">مدة الدراسة</span>
          </div>

          <span className="text-[10px] sm:text-xs font-black text-white bg-primary px-4 py-2 rounded-xl shadow-lg shadow-primary/20 transition-all group-hover:px-6">
            ابدأ الآن
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
