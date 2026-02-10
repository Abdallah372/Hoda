import React from "react";
import { dataService } from "../services/dataService";
import { Book, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Lectures = () => {
  const lectures = dataService.getAllLectures();

  return (
    <div className="fade-in max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">فهرس المحاضرات</h1>
        <p className="text-slate-500">تصفح جميع الدروس مرتبة حسب الدورات</p>
      </div>

      <div className="space-y-4">
        {lectures.map((lecture) => (
          <Link
            key={lecture.id}
            to={`/lesson/${lecture.courseId}/${lecture.id}`}
            className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all hover:shadow-md group"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
              <span className="font-bold font-mono">{lecture.index + 1}</span>
            </div>

            <div className="flex-grow">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                {lecture.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Book size={14} />
                <span>{lecture.courseTitle}</span>
              </p>
            </div>

            <div className="flex items-center gap-2 text-slate-400 group-hover:text-primary transition-colors">
              <span className="text-sm font-semibold">مشاهدة</span>
              <ChevronRight size={20} className="rtl:rotate-180" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Lectures;
