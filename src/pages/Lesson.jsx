import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useLesson } from "../hooks/useLesson";
import { dataService } from "../services/dataService";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  BookOpen,
  Settings,
  Type,
  Download,
  Share2,
  FileText,
  Youtube,
  Menu,
} from "lucide-react";

const Lesson = () => {
  const { courseId, lessonId } = useParams();
  const { course, lesson, prevLesson, nextLesson, loading, error } = useLesson(
    courseId,
    lessonId,
  );

  // Viewer State
  const [activeTab, setActiveTab] = useState("text"); // 'text', 'pdf', 'notes'
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.8);
  const [maxWidth, setMaxWidth] = useState(800);

  // Split Pane State
  const [leftWidth, setLeftWidth] = useState(50); // Percentage
  const [isDragging, setIsDragging] = useState(false);

  // Notes State
  const [note, setNote] = useState("");

  // UI State
  const [showToolbar, setShowToolbar] = useState(true);

  // Reader Settings Persistence
  useEffect(() => {
    const savedSize = localStorage.getItem("reader-font-size");
    const savedHeight = localStorage.getItem("reader-line-height");
    const savedWidth = localStorage.getItem("reader-max-width");

    if (savedSize) setFontSize(parseInt(savedSize));
    if (savedHeight) setLineHeight(parseFloat(savedHeight));
    if (savedWidth) setMaxWidth(parseInt(savedWidth));
  }, []);

  useEffect(() => {
    localStorage.setItem("reader-font-size", fontSize);
    localStorage.setItem("reader-line-height", lineHeight);
    localStorage.setItem("reader-max-width", maxWidth);
  }, [fontSize, lineHeight, maxWidth]);

  useEffect(() => {
    const saved = localStorage.getItem(`note-${lessonId}`);
    if (saved) setNote(saved);
    else setNote("");
  }, [lessonId]);

  const saveNote = (text) => {
    setNote(text);
    localStorage.setItem(`note-${lessonId}`, text);
  };

  const exportNote = () => {
    // HTML based export for Word
    const header =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    const footer = "</body></html>";
    const sourceHTML =
      header + document.getElementById("note-content").value + footer;

    const source =
      "data:application/vnd.ms-word;charset=utf-8," +
      encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = `notes-${lessonId}.doc`;
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  // Resizing Logic
  const handleMouseDown = (e) => {
    setIsDragging(true);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const newWidth = (e.clientX / window.innerWidth) * 100;
      // Clamp between 20% and 80%
      if (newWidth > 20 && newWidth < 80) {
        setLeftWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto";
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  if (loading) return <div className="p-20 text-center">جاري التحميل...</div>;
  if (error || !lesson)
    return <div className="p-20 text-center text-red-500">حدث خطأ</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden bg-slate-50 dark:bg-slate-900 fade-in select-none">
      {/* Top Bar */}
      <div className="h-12 sm:h-14 shrink-0 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-3 sm:px-4 z-20">
        <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
          <Link
            to={`/course/${courseId}`}
            className="p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <ChevronRight size={18} className="rtl:rotate-180 sm:w-5" />
          </Link>
          <div className="flex flex-col min-w-0">
            <h1 className="font-bold text-xs sm:text-sm md:text-base truncate text-slate-900 dark:text-white leading-tight">
              {lesson.title}
            </h1>
            <span className="text-[9px] sm:text-[10px] text-slate-500 truncate">
              {course.title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Toolbar Toggle in Top Bar */}
          {activeTab === "text" && (
            <button
              onClick={() => setShowToolbar(!showToolbar)}
              className={`p-1.5 sm:p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 sm:gap-2 ${
                showToolbar
                  ? "bg-primary/10 text-primary"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500"
              }`}
              title={showToolbar ? "إخفاء الأدوات" : "إظهار الأدوات"}
            >
              <Settings size={14} className={showToolbar ? "" : "opacity-60"} />
              <span className="hidden md:inline">
                {showToolbar ? "إخفاء الأدوات" : "إظهار الأدوات"}
              </span>
            </button>
          )}

          <button
            className="btn-secondary text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 flex items-center gap-1.5 sm:gap-2"
            onClick={() =>
              navigator.share?.({
                title: lesson.title,
                url: window.location.href,
              })
            }
          >
            <Share2 size={14} />
            <span className="hidden sm:inline">مشاركة</span>
          </button>
        </div>
      </div>

      {/* Split Content */}
      <div className="flex-grow flex flex-col lg:flex-row overflow-hidden relative">
        {/* RIGHT PANE: Video */}
        <div
          style={{
            width: window.innerWidth >= 1024 ? `${leftWidth}%` : "100%",
            height: window.innerWidth < 1024 ? "35vh" : "100%",
          }}
          className="bg-black flex flex-col relative shrink-0 transition-all duration-75 lg:order-last"
        >
          <iframe
            src={`https://www.youtube.com/embed/${
              lesson.youtubeId ||
              (course.playlistId
                ? `videoseries?list=${course.playlistId}&index=${lesson.index}`
                : "")
            }&rel=0&modestbranding=1`}
            className="w-full h-full object-contain"
            allowFullScreen
            title={lesson.title}
          />
          {/* Video Nav Overlay */}
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex gap-2 pointer-events-none">
            {nextLesson && (
              <Link
                to={`/lesson/${courseId}/${nextLesson.id}`}
                className="pointer-events-auto bg-black/50 hover:bg-black/70 text-white px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs backdrop-blur-md flex items-center gap-1 transition-all"
              >
                التالي <ChevronLeft size={12} className="sm:w-3.5" />
              </Link>
            )}
          </div>
        </div>

        {/* RESIZER HANDLE */}
        <div
          className="hidden lg:flex w-4 bg-slate-100 dark:bg-slate-800 hover:bg-primary/20 cursor-col-resize items-center justify-center z-10 -ml-2 -mr-2 relative"
          onMouseDown={handleMouseDown}
        >
          <div className="w-1 h-8 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
        </div>

        {/* LEFT PANE: Content (Book/Notes) */}
        <div
          style={{
            width: window.innerWidth >= 1024 ? `${100 - leftWidth}%` : "100%",
          }}
          className="flex-grow flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-hidden relative"
        >
          {/* Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 shrink-0 bg-slate-50 dark:bg-slate-950 px-2 sm:px-0">
            {[
              { id: "text", icon: BookOpen, label: "المتن" },
              { id: "pdf", icon: FileText, label: "PDF" },
              { id: "notes", icon: Type, label: "ملاحظاتي" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 sm:py-3 text-[11px] sm:text-sm font-bold flex items-center justify-center gap-1.5 sm:gap-2 border-b-2 transition-all ${activeTab === tab.id ? "border-primary text-primary bg-white dark:bg-slate-900" : "border-transparent text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
              >
                <tab.icon size={14} className="sm:w-4" /> {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-grow overflow-hidden relative bg-[var(--reading-bg)] scroll-smooth">
            {/* TEXT MODE */}
            {activeTab === "text" && (
              <div className="h-full flex flex-col overflow-hidden relative">
                {/* Enhanced Toolbar with Animation */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-10 shadow-sm ${
                    showToolbar
                      ? "max-h-40 opacity-100 py-2 sm:py-3 px-3 sm:px-4"
                      : "max-h-0 opacity-0 py-0 px-3 sm:px-4 border-none pointer-events-none"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 transition-colors">
                    <div className="flex items-center gap-1 p-0.5 sm:p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      <button
                        title="تصغير الخط"
                        onClick={() => setFontSize((f) => Math.max(14, f - 2))}
                        className="p-1 sm:p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded-md text-slate-600 dark:text-slate-300 transition-all active:scale-95"
                      >
                        <Type size={12} className="sm:w-3.5" />
                      </button>
                      <span className="text-[10px] font-bold w-5 sm:w-6 text-center text-slate-500 tabular-nums">
                        {fontSize}
                      </span>
                      <button
                        title="تكبير الخط"
                        onClick={() => setFontSize((f) => Math.min(36, f + 2))}
                        className="p-1 sm:p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded-md text-slate-600 dark:text-slate-300 transition-all active:scale-95"
                      >
                        <Type size={16} className="sm:w-4.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1 p-0.5 sm:p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      <button
                        title="تباعد الأسطر"
                        onClick={() =>
                          setLineHeight((l) => (l >= 2.4 ? 1.6 : l + 0.2))
                        }
                        className="p-1 sm:p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded-md text-slate-600 dark:text-slate-300 transition-all"
                      >
                        <Menu size={14} className="sm:w-4" />
                      </button>
                    </div>

                    <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />

                    <button
                      onClick={() =>
                        setMaxWidth((w) => (w <= 700 ? 1100 : 700))
                      }
                      className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all flex items-center gap-1.5 sm:gap-2 ${
                        maxWidth <= 700
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-transparent"
                      }`}
                    >
                      <Settings size={12} className="sm:w-3.5" />
                      {maxWidth <= 700 ? "وضع القراءة" : "عرض كامل"}
                    </button>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-grow overflow-y-auto px-4 py-8 sm:px-8 md:px-12 bg-[var(--matn-bg)] transition-colors">
                  <div
                    className="mx-auto transition-all duration-300 ease-in-out"
                    style={{
                      maxWidth: `${maxWidth}px`,
                      fontSize: `${fontSize}px`,
                      lineHeight: lineHeight,
                      color: "var(--matn-text)",
                      fontFamily: "'Readex Pro', sans-serif",
                    }}
                  >
                    {/* Lesson Benefits Section */}
                    {lesson.benefits && (
                      <div className="mb-8 sm:mb-12 p-5 sm:p-8 bg-[var(--benefit-bg)] border-2 border-[var(--benefit-border)] rounded-2xl sm:rounded-3xl shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110" />
                        <h3 className="text-[var(--benefit-title)] font-black text-lg mb-6 flex items-center gap-3">
                          <CheckCircle size={22} className="shrink-0" />
                          فوائد ومنتقيات الدرس
                        </h3>
                        <ul className="space-y-4 relative z-10">
                          {lesson.benefits.map((benefit, idx) => (
                            <li
                              key={idx}
                              className="flex gap-3 text-slate-800 dark:text-slate-100 text-[0.95em] leading-relaxed"
                            >
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--benefit-title)] shrink-0 opacity-40" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Matn / Text Section */}
                    <div className="matn-content space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                      <div className="border-b-2 border-primary/10 pb-6 mb-10">
                        <span className="text-primary/60 text-xs font-black tracking-widest uppercase mb-2 block">
                          نص المتن المشروح
                        </span>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                          {lesson.title}
                        </h2>
                      </div>

                      <article className="prose prose-slate dark:prose-invert max-w-none text-justify">
                        <p className="mb-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl italic text-[var(--sharh-text)] border-r-4 border-primary/20 leading-loose">
                          (هنا يتم عرض المتن الأصلي للكتاب، محاطاً بالعناية
                          والتمييز البصري)
                          <br />
                          هذا النص تجريبي لمعاينة شكل المتن مع خيارات التنسيق
                          الجديدة. منصة "هدى" مصممة لتجربة تعليمية هادئة.
                        </p>

                        <div className="space-y-6 text-[var(--matn-text)]">
                          <p>
                            قال المصنف رحمه الله: "هذا هو المتن الذي يتم شرحه في
                            الدرس". إن طالب العلم يحتاج إلى بيئة قراءة صافية،
                            تماماً كما يحتاج إلى التركيز مع المعلم. لذلك وفرنا
                            أدوات التحكم في حجم الخط والمسافات لضمان راحة العين
                            أثناء الجلسات المطولة.
                          </p>
                          <p>
                            نحن نؤمن بأن "الجمال يخدم العلم"، فالتصميم الجيد ليس
                            مجرد ألوان، بل هو وظيفة تسهل الوصول للمعلومة وترسخها
                            في الذهن.
                          </p>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PDF MODE */}
            {activeTab === "pdf" &&
              (course.pdfUrl || (course.book && course.book.pdfUrl) ? (
                <iframe
                  key={lessonId}
                  src={`${course.pdfUrl || course.book.pdfUrl}#page=${lesson.pdfPage || 1}&toolbar=0&navpanes=0&view=FitH`}
                  className="w-full h-full"
                  title="PDF Viewer"
                />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4">
                  <FileText size={64} className="opacity-20" />
                  <p>لا يوجد ملف PDF مرتبط بهذا الكورس</p>
                </div>
              ))}

            {/* NOTES MODE */}
            {activeTab === "notes" && (
              <div className="h-full flex flex-col p-6 lg:p-10 max-w-3xl mx-auto w-full animate-in slide-in-from-left-4 duration-500">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl">
                      <Type size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-black text-xl text-slate-900 dark:text-white">
                        مفكرتي الخاصة
                      </h3>
                      <p className="text-xs text-slate-500">
                        دون فوائدك ومرئياتك حول الدرس
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={exportNote}
                    className="btn-primary py-2 px-6 text-xs flex items-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-all"
                  >
                    <Download size={14} /> تصدير Word
                  </button>
                </div>

                <div className="flex-grow flex flex-col gap-4">
                  <textarea
                    id="note-content"
                    className="flex-grow w-full bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-3xl p-8 text-slate-800 dark:text-slate-200 resize-none focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none leading-relaxed shadow-sm transition-all"
                    placeholder="سجّل خواطرك وفوائدك هنا... يتم الحفظ تلقائياً في متصفحك"
                    value={note}
                    onChange={(e) => saveNote(e.target.value)}
                    style={{ fontSize: "1.1rem" }}
                  />
                  <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 px-4 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-full w-fit mx-auto">
                    <CheckCircle size={10} className="text-emerald-500" />
                    تم الحفظ التلقائي في الذاكرة المحلية
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
