import React, { useMemo } from "react";
import { dataService } from "../services/dataService";
import { PlayCircle, Clock, BookOpen, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const Videos = () => {
  const lectures = dataService.getAllLectures();

  // Group lectures by course for better visualization or just show all
  // The user wants a "YouTube-like Grid"

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <PlayCircle className="text-red-600" />
          <span>مكتبة الفيديو</span>
        </h1>
        <button className="flex items-center gap-2 text-slate-500 hover:text-primary transition bg-white dark:bg-slate-800 px-4 py-2 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <Filter size={18} />
          <span>تصفية</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {lectures.map((lecture) => (
          <Link
            to={`/lesson/${lecture.courseId}/${lecture.id}`}
            key={lecture.id}
            className="group block bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-100 dark:border-slate-700"
          >
            {/* Thumbnail Placeholder - Mocking YouTube Thumbnail */}
            <div className="aspect-video bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
              <img
                src={
                  lecture.youtubeId
                    ? `https://img.youtube.com/vi/${lecture.youtubeId}/mqdefault.jpg`
                    : lecture.thumbnail
                }
                alt={lecture.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-colors">
                <PlayCircle
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity scale-75 group-hover:scale-100 transform duration-300 drop-shadow-lg"
                  size={48}
                />
              </div>
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                {lecture.duration || "15:00"}
              </span>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-slate-900 dark:text-white line-clamp-2 mb-2 group-hover:text-primary transition-colors text-sm">
                {lecture.title}
              </h3>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full line-clamp-1 max-w-[70%]">
                  {lecture.courseTitle || "دورة منهجية"}
                </span>
                <span className="text-xs text-slate-400">
                  {lecture.index + 1} #
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Videos;
