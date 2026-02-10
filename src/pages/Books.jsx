import React from "react";
import { dataService } from "../services/dataService";
import { Book, Download } from "lucide-react";

const Books = () => {
  // We need to implement getAllBooks in dataService roughly or just filter courses
  // Actually dataService.search uses booksData, so I can import booksData directly or add a getter.
  // I will add a getter to dataService in next step or just import here for speed.
  // Better: import booksData directly for now as I didn't add getAllBooks to service yet.
  // Wait, I did import booksData in dataService but only exposed it via getCourseById or search.
  // I should add getAllBooks to dataService. for now I will use a direct import to avoid editing service again if possible,
  // BUT the right way is to add it to service. I'll do that.

  // Actually, let's just use the search function with empty string? No, search implementation filters by query.
  // I will just mock it or import JSON directly. Direct import is fine for "private" components.
  // But wait, I can just extend the service quickly.

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <Book className="text-primary" />
        <span>المكتبة العلمية</span>
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder Books */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center shadow-sm">
          <div className="w-32 h-44 bg-slate-200 mb-6 shadow-lg rotate-1 transition-transform hover:rotate-0 rounded-sm"></div>
          <h3 className="font-bold text-lg mb-2">الأصول الثلاثة</h3>
          <p className="text-slate-500 text-sm mb-6">محمد بن عبد الوهاب</p>
          <button className="btn-primary w-full flex items-center justify-center gap-2">
            <Download size={18} />
            <span>تحميل PDF</span>
          </button>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center shadow-sm">
          <div className="w-32 h-44 bg-slate-200 mb-6 shadow-lg rotate-1 transition-transform hover:rotate-0 rounded-sm"></div>
          <h3 className="font-bold text-lg mb-2">القواعد الأربع</h3>
          <p className="text-slate-500 text-sm mb-6">محمد بن عبد الوهاب</p>
          <button className="btn-primary w-full flex items-center justify-center gap-2">
            <Download size={18} />
            <span>تحميل PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Books;
