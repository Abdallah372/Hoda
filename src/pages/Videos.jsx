import React, { useMemo } from "react";
import { dataService } from "../services/dataService";
import { PlayCircle, Clock, BookOpen, Filter, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Videos = () => {
  const lectures = dataService.getAllLectures();

  return (
    <div className="fade-in pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-primary flex items-center gap-4 mb-2">
            <div className="p-3 bg-red-500/10 rounded-2xl">
              <PlayCircle className="text-red-600" size={32} />
            </div>
            <span>مكتبة مرئيات هدى</span>
          </h1>
          <p className="text-secondary font-bold opacity-80">
            أرشيف شامل لجميع الدروس والمحاضرات العلمية، منظمة حسب الأولوية
            المنهجية.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group flex-grow md:flex-none">
            <Search
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="ابحث في الدروس..."
              className="w-full md:w-64 pr-12 pl-4 py-3 bg-surface border border-border-subtle rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 text-primary font-black bg-primary/10 px-5 py-3 rounded-2xl hover:bg-primary/20 transition-all group active:scale-95">
            <Filter
              size={18}
              className="group-hover:rotate-180 transition-transform duration-500"
            />
            <span>تصفية</span>
          </button>
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {lectures.map((lecture, index) => (
          <motion.div
            key={lecture.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              to={`/lesson/${lecture.courseId}/${lecture.id}`}
              className="group flex flex-col card-layer overflow-hidden h-full border-b-4 border-b-transparent hover:border-b-primary"
            >
              {/* Thumbnail Container */}
              <div className="aspect-video relative overflow-hidden bg-slate-200 dark:bg-slate-800">
                <img
                  src={
                    lecture.youtubeId
                      ? `https://img.youtube.com/vi/${lecture.youtubeId}/mqdefault.jpg`
                      : lecture.thumbnail
                  }
                  alt={lecture.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Play Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-full transform scale-75 group-hover:scale-100 transition-all duration-300 border border-white/30">
                    <PlayCircle
                      className="text-white drop-shadow-2xl"
                      size={32}
                    />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 text-[10px] font-black text-white">
                  <Clock size={10} />
                  {lecture.duration || "15:00"}
                </div>
              </div>

              {/* Content Container */}
              <div className="p-5 flex-grow flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <div className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-md text-[10px] font-black uppercase tracking-tighter">
                    {lecture.courseId === "kitab-at-tawhid"
                      ? "التوحيد"
                      : "منهجية"}
                  </div>
                  <span className="text-[10px] font-bold text-muted truncate">
                    {lecture.courseTitle || "الدورة العلمية"}
                  </span>
                </div>

                <h3 className="text-base font-black text-primary leading-snug line-clamp-2 transition-colors mb-4 min-h-[2.5rem]">
                  {lecture.title}
                </h3>

                <div className="mt-auto flex items-center justify-between text-[11px] font-black text-muted uppercase tracking-widest pt-4 border-t border-border-subtle/50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>متاح الآن</span>
                  </div>
                  <span className="opacity-50">#{lecture.index + 1}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
