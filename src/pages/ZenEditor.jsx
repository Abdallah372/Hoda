import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StudyEditor from "../components/StudyEditor";
import {
  ChevronRight,
  Download,
  Share2,
  Trash2,
  Palette,
  FileText,
  Type,
  Layout as LayoutIcon,
  Sparkles,
} from "lucide-react";

const ZenEditor = () => {
  const [note, setNote] = useState("");
  const [theme, setTheme] = useState("glass"); // 'glass', 'minimal', 'dark-nebula'
  const [title, setTitle] = useState("مذكرة علمية جديدة");

  // Load general notes from local storage
  useEffect(() => {
    const saved = localStorage.getItem("zen-general-note");
    if (saved) setNote(saved);

    const savedTitle = localStorage.getItem("zen-general-title");
    if (savedTitle) setTitle(savedTitle);
  }, []);

  const saveNote = (content) => {
    setNote(content);
    localStorage.setItem("zen-general-note", content);
  };

  const saveTitle = (newTitle) => {
    setTitle(newTitle);
    localStorage.setItem("zen-general-title", newTitle);
  };

  const exportNote = () => {
    const header = `<html dir="rtl"><head><meta charset="utf-8"/><title>${title}</title><style>body{font-family:'Readex Pro', sans-serif; padding: 40px; line-height: 1.8;} h1{color: #0f4c3a; border-bottom: 2px solid #eee; padding-bottom: 10px;}</style></head><body><h1>${title}</h1>`;
    const footer = "</body></html>";
    const sourceHTML = header + note + footer;

    const source =
      "data:application/vnd.ms-word;charset=utf-8," +
      encodeURIComponent(sourceHTML);
    const link = document.createElement("a");
    link.href = source;
    link.download = `${title}.doc`;
    link.click();
  };

  const clearEditor = () => {
    if (window.confirm("هل أنت متأكد من مسح جميع المحتويات؟")) {
      setNote("");
      localStorage.setItem("zen-general-note", "");
    }
  };

  // Background Styles based on theme
  const getBackgroundStyles = () => {
    switch (theme) {
      case "dark-nebula":
        return "bg-slate-950 text-white";
      case "minimal":
        return "bg-white text-slate-900";
      default:
        return "bg-slate-50 dark:bg-slate-900";
    }
  };

  return (
    <div
      className={`min-h-[calc(100vh-4rem)] transition-all duration-700 ${getBackgroundStyles()}`}
    >
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 relative z-10">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 fade-in">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="p-3 bg-white/10 dark:bg-white/5 hover:bg-white/20 rounded-2xl backdrop-blur-xl border border-white/20 shadow-xl transition-all group"
            >
              <ChevronRight
                size={24}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="text-accent animate-spin-slow" size={16} />
                <span className="text-[10px] uppercase font-black tracking-widest text-primary">
                  Zen Workspace
                </span>
              </div>
              <input
                value={title}
                onChange={(e) => saveTitle(e.target.value)}
                className="bg-transparent border-none text-3xl font-black focus:ring-0 p-0 text-slate-900 dark:text-white placeholder:opacity-30"
                placeholder="أدخل عنوان المذكرة..."
              />
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/30 dark:bg-slate-800/30 p-2 rounded-2xl backdrop-blur-2xl border border-white/20 shadow-2xl">
            <button
              onClick={exportNote}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all text-sm"
            >
              <Download size={18} />
              تصدير المذكرة
            </button>
            <button
              onClick={clearEditor}
              className="p-2.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
              title="مسح المحتوى"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </header>

        {/* Action Grid (Mini Toolbar) */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 fade-in"
          style={{ animationDelay: "100ms" }}
        >
          <div className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-white/20 backdrop-blur-md flex items-center gap-4 hover:bg-white/80 dark:hover:bg-slate-800 transition-all cursor-pointer group">
            <div className="p-2 bg-indigo-500/20 text-indigo-500 rounded-lg group-hover:scale-110 transition-transform">
              <Palette size={20} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold">المظهر</p>
              <p className="text-xs font-black">غلاسمورفيزم</p>
            </div>
          </div>

          <div className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-white/20 backdrop-blur-md flex items-center gap-4 hover:bg-white/80 dark:hover:bg-slate-800 transition-all cursor-pointer group">
            <div className="p-2 bg-emerald-500/20 text-emerald-500 rounded-lg group-hover:scale-110 transition-transform">
              <Type size={20} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold">الخط</p>
              <p className="text-xs font-black">Readex Pro</p>
            </div>
          </div>

          <div className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-white/20 backdrop-blur-md flex items-center gap-4 hover:bg-white/80 dark:hover:bg-slate-800 transition-all cursor-pointer group">
            <div className="p-2 bg-amber-500/20 text-amber-500 rounded-lg group-hover:scale-110 transition-transform">
              <LayoutIcon size={20} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold">النمط</p>
              <p className="text-xs font-black">Free Flow</p>
            </div>
          </div>

          <div className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-white/20 backdrop-blur-md flex items-center gap-4 hover:bg-white/80 dark:hover:bg-slate-800 transition-all cursor-pointer group">
            <div className="p-2 bg-primary/20 text-primary rounded-lg group-hover:scale-110 transition-transform">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold">الحالات</p>
              <p className="text-xs font-black">الآن: مسودّة</p>
            </div>
          </div>
        </div>

        {/* Main Editor Surface */}
        <main className="mb-20 fade-in" style={{ animationDelay: "200ms" }}>
          <div className="bg-white/70 dark:bg-slate-900/70 rounded-[2.5rem] border border-white/30 dark:border-slate-800 shadow-2xl backdrop-blur-3xl overflow-hidden min-h-[600px] flex flex-col">
            <StudyEditor
              initialContent={note}
              onSave={saveNote}
              lessonId="general-zen"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ZenEditor;
