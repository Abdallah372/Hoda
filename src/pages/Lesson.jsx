import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
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
  Maximize2,
  Minimize2,
  Focus,
  Play,
} from "lucide-react";
import StudyEditor from "../components/StudyEditor";
import StoryView from "../components/StoryView";
import { useFocusMode } from "../contexts/FocusModeContext";
import FocusModeSettings from "../components/FocusModeSettings";
import ExitConfirmationModal from "../components/ExitConfirmationModal";

const Lesson = () => {
  const { courseId, lessonId } = useParams();
  const { course, lesson, prevLesson, nextLesson, loading, error } = useLesson(
    courseId,
    lessonId,
  );

  // Viewer State
  const [activeTab, setActiveTab] = useState("text"); // 'text', 'pdf', 'notes'
  const [fontSize, setFontSize] = useState(20); // Larger default for Arabic
  const [lineHeight, setLineHeight] = useState(2.0); // Looser leading
  const [maxWidth, setMaxWidth] = useState(680); // Optimal reading width

  // Split Pane State
  const [leftWidth, setLeftWidth] = useState(50); // Percentage
  const [isDragging, setIsDragging] = useState(false);

  // Notes State
  const [note, setNote] = useState("");

  // UI State
  const [showToolbar, setShowToolbar] = useState(true);
  const [showFocusSettings, setShowFocusSettings] = useState(false);
  const [isBenefitsHidden, setIsBenefitsHidden] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [showStoryMode, setShowStoryMode] = useState(false);

  // Focus Mode
  const { isActive: isFocusModeActive } = useFocusMode();

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
    const header =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export Notes</title></head><body>";
    const footer = "</body></html>";
    const sourceHTML = header + note + footer;

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
    <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden bg-app fade-in select-none">
      {/* Top Bar */}
      <div className="h-12 sm:h-14 shrink-0 border-b border-subtle bg-surface flex items-center justify-between px-3 sm:px-4 z-20">
        <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
          <Link
            to={`/course/${courseId}`}
            className="p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <ChevronRight size={18} className="rtl:rotate-180 sm:w-5" />
          </Link>
          <div className="flex flex-col min-w-0">
            <h1 className="font-bold text-xs sm:text-sm md:text-base truncate text-primary leading-tight">
              {lesson.title}
            </h1>
            <span className="text-[9px] sm:text-[10px] text-muted truncate">
              {course.title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Theater Mode Button */}
          <button
            onClick={() => setIsTheaterMode(!isTheaterMode)}
            className={`p-1.5 sm:p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 sm:gap-2 ${
              isTheaterMode
                ? "bg-primary text-white shadow-lg shadow-primary/30 ring-2 ring-primary/20"
                : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
            title={isTheaterMode ? "إظهار النص" : "تكبير الفيديو"}
          >
            {isTheaterMode ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            <span className="hidden md:inline">
              {isTheaterMode ? "الوضع العادي" : "تكبير الفيديو"}
            </span>
          </button>

          {/* Focus Mode Button */}
          {!isFocusModeActive && (
            <button
              onClick={() => setShowFocusSettings(true)}
              className="btn-primary text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 flex items-center gap-1.5 sm:gap-2 shadow-lg shadow-primary/20 animate-pulse-subtle"
              title="تفعيل وضع التركيز"
            >
              <Focus size={14} />
              <span className="hidden sm:inline">وضع التركيز</span>
            </button>
          )}

          {/* Toolbar Toggle in Top Bar */}
          {activeTab === "text" && !isTheaterMode && (
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

      {/* Split Content: Elastic Layout */}
      <div className="flex-grow flex flex-col lg:flex-row overflow-hidden relative">
        {/* RIGHT PANE: Video (Takes priority on mobile) */}
        <div
          style={{
            width: isTheaterMode
              ? "100%"
              : window.innerWidth >= 1024
                ? `${leftWidth}%`
                : "100%",
            height:
              window.innerWidth < 1024 && !isTheaterMode ? "30vh" : "100%",
            maxHeight: window.innerWidth < 1024 ? "400px" : "none",
          }}
          className="bg-black flex flex-col relative shrink-0 transition-all duration-300 ease-in-out lg:order-last z-10 shadow-2xl"
        >
          <div className="relative w-full h-full bg-slate-900 group">
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

            {/* Playback Controls Overlay (Mobile optimized) */}
            <div className="absolute top-4 left-4 flex gap-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              {nextLesson && (
                <Link
                  to={`/lesson/${courseId}/${nextLesson.id}`}
                  className="pointer-events-auto bg-black/60 hover:bg-black text-white px-4 py-2 rounded-full text-xs backdrop-blur-md flex items-center gap-2 transition-all shadow-lg"
                >
                  التالي <ChevronLeft size={14} />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* RESIZER HANDLE: Desktop Only */}
        {!isTheaterMode && (
          <div
            className="hidden lg:flex w-2 bg-subtle hover:bg-primary/30 cursor-col-resize items-center justify-center z-20 relative active:bg-primary transition-colors"
            onMouseDown={handleMouseDown}
          >
            <div className="w-1 h-12 bg-muted/30 rounded-full" />
          </div>
        )}

        {/* LEFT PANE: Content (The Elastic Reader) */}
        <div
          style={{
            width: window.innerWidth >= 1024 ? `${100 - leftWidth}%` : "100%",
          }}
          className={`flex-grow flex flex-col min-h-0 bg-surface border-subtle overflow-hidden relative transition-all duration-300 ${
            isTheaterMode ? "hidden" : "flex"
          }`}
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
                className={`flex-1 py-2 sm:py-3 text-[11px] sm:text-sm font-bold flex items-center justify-center gap-1.5 sm:gap-2 border-b-2 transition-all ${activeTab === tab.id ? "border-primary text-primary bg-surface" : "border-transparent text-muted hover:bg-black/5 dark:hover:bg-white/5"}`}
              >
                <tab.icon size={14} className="sm:w-4" /> {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-grow overflow-hidden relative bg-[var(--reading-bg)] scroll-smooth">
            {/* TEXT MODE */}
            {activeTab === "text" && (
              <div className="h-full flex flex-col overflow-hidden relative bg-white dark:bg-slate-900">
                {/* Modern Floating Toolbar */}
                <div
                  className={`transition-all duration-300 border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-20 ${
                    showToolbar
                      ? "translate-y-0 opacity-100 py-2 sm:py-3 px-4"
                      : "-translate-y-full opacity-0 py-0 h-0 overflow-hidden"
                  }`}
                >
                  <div className="flex items-center justify-between max-w-3xl mx-auto w-full gap-4">
                    <div className="flex items-center gap-2 bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-full">
                      <button
                        onClick={() => setFontSize((f) => Math.max(14, f - 2))}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all"
                      >
                        <Type size={12} />
                      </button>
                      <span className="text-[10px] font-bold w-6 text-center text-slate-400 tabular-nums">
                        {fontSize}
                      </span>
                      <button
                        onClick={() => setFontSize((f) => Math.min(36, f + 2))}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all"
                      >
                        <Type size={16} />
                      </button>
                    </div>

                    <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-2 hidden sm:block" />

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setLineHeight((l) => (l >= 2.4 ? 1.6 : l + 0.2))
                        }
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-all"
                        title="تباعد الأسطر"
                      >
                        <Menu size={18} />
                      </button>
                      <button
                        onClick={() =>
                          setMaxWidth((w) => (w <= 700 ? 1100 : 700))
                        }
                        className={`p-2 rounded-full transition-all ${
                          maxWidth <= 700
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                        }`}
                        title={maxWidth <= 700 ? "وضع القراءة" : "عرض كامل"}
                      >
                        {maxWidth <= 700 ? (
                          <Maximize2 size={16} />
                        ) : (
                          <Settings size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-grow overflow-y-auto px-4 py-8 sm:px-6 bg-white dark:bg-slate-900 transition-colors">
                  <div
                    className="mx-auto transition-all duration-300 ease-in-out"
                    style={{
                      maxWidth: `${maxWidth}px`,
                    }}
                  >
                    {/* Collapsible Benefits Section */}
                    {lesson.benefits && (
                      <>
                        <div
                          className={`mb-8 transition-all duration-300 ease-in-out overflow-hidden ${
                            isBenefitsHidden
                              ? "bg-indigo-50 dark:bg-indigo-900/10 rounded-xl"
                              : "bg-indigo-50/50 dark:bg-slate-800/50 rounded-3xl"
                          }`}
                        >
                          <div className="flex items-center justify-between p-4">
                            <button
                              onClick={() =>
                                setIsBenefitsHidden(!isBenefitsHidden)
                              }
                              className="flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:opacity-80 transition-opacity"
                            >
                              {isBenefitsHidden ? (
                                <>
                                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                                  إظهار الفوائد
                                </>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <CheckCircle size={18} />
                                  <span className="text-slate-900 dark:text-white">
                                    فوائد الدرس
                                  </span>
                                </div>
                              )}
                            </button>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setShowStoryMode(true)}
                                className="text-[10px] font-bold text-white px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg shadow-purple-500/30 flex items-center gap-1 transition-all animate-pulse-subtle"
                              >
                                <Play size={10} className="fill-current" />
                                عرض كـ Story
                              </button>
                              {!isBenefitsHidden && (
                                <button
                                  onClick={() => setIsBenefitsHidden(true)}
                                  className="text-[10px] font-bold text-slate-400 hover:text-red-500 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                                >
                                  إخفاء
                                </button>
                              )}
                            </div>
                          </div>

                          {!isBenefitsHidden && (
                            <div className="px-5 pb-6 animate-in slide-in-from-top-2 duration-200">
                              <ul className="space-y-3">
                                {lesson.benefits.map((benefit, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-[0.95em] leading-relaxed"
                                  >
                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 opacity-60" />
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    {/* Minimalist Header */}
                    <div className="mb-10 text-center">
                      <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
                        {lesson.title}
                      </h2>
                      <div className="h-1 w-20 bg-primary/20 mx-auto rounded-full" />
                    </div>

                    {/* Matn Content */}
                    <article
                      className="prose prose-xl prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:leading-loose prose-p:text-slate-800 dark:prose-p:text-slate-200 prose-li:text-slate-800 dark:prose-li:text-slate-200"
                      style={{
                        fontSize: `${fontSize}px`,
                        lineHeight: lineHeight,
                        fontFamily: "'Readex Pro', sans-serif",
                      }}
                    >
                      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
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
                  <Link
                    to="/editor"
                    className="p-2 bg-accent/10 text-accent hover:bg-accent hover:text-white rounded-xl transition-all flex items-center gap-2 text-xs font-bold animate-pulse-subtle"
                  >
                    <Maximize2 size={14} /> وضع الـ Zen
                  </Link>
                </div>

                <div className="flex-grow flex flex-col gap-4">
                  <div className="flex-grow flex flex-col gap-4 overflow-hidden">
                    <StudyEditor
                      lessonId={lessonId}
                      initialContent={note}
                      onSave={saveNote}
                    />
                  </div>
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

      {/* Focus Mode Components */}
      {showFocusSettings && (
        <FocusModeSettings onClose={() => setShowFocusSettings(false)} />
      )}

      <AnimatePresence>
        {showStoryMode && lesson.benefits && (
          <StoryView
            items={lesson.benefits}
            title={lesson.title}
            onClose={() => setShowStoryMode(false)}
          />
        )}
      </AnimatePresence>

      <ExitConfirmationModal />
    </div>
  );
};

export default Lesson;
