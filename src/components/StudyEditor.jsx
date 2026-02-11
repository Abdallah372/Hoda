import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import BubbleMenuExtension from "@tiptap/extension-bubble-menu";
import {
  StickyNote,
  AlertTriangle,
  BookOpen,
  Lightbulb,
  HelpCircle,
  List,
  Bold,
  Trash2,
  Sparkles,
  Highlighter,
  FileText,
} from "lucide-react";

// Simplified Pattern Templates - Fixed Styles
const PATTERNS = [
  {
    id: "benefit",
    label: "📌 فائدة",
    icon: StickyNote,
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "warning",
    label: "⚠️ تنبيه",
    icon: AlertTriangle,
    color: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    id: "evidence",
    label: "📖 دليل",
    icon: BookOpen,
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    id: "summary",
    label: "💡 خلاصة",
    icon: Lightbulb,
    color: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    id: "question",
    label: "❓ سؤال",
    icon: HelpCircle,
    color: "bg-slate-50 text-slate-700 border-slate-200",
  },
];

const StudyEditor = ({ initialContent, onSave, lessonId }) => {
  const [isSummarized, setIsSummarized] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const [lastAnalyzedText, setLastAnalyzedText] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Placeholder.configure({
        placeholder: "ابدأ الكتابة... سأقترح عليك التصنيف المناسب تلقائياً",
      }),
      TaskList,
      TaskItem.configure({ nested: true }),
      BubbleMenuExtension,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onSave(editor.getHTML());
      analyzeContent(editor.getText());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-xl prose-slate dark:prose-invert max-w-none focus:outline-none min-h-[500px] py-6 leading-loose",
      },
    },
  });

  useEffect(() => {
    if (editor && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent);
    }
  }, [lessonId, editor, initialContent]);

  // Smart Pattern Detection
  const analyzeContent = (text) => {
    if (!text || text.length < 10 || text === lastAnalyzedText) return;

    setLastAnalyzedText(text);

    // Question detection
    if (/\?|ما\s+(حكم|معنى|تعريف|الفرق)|هل|كيف|لماذا|متى|أين/.test(text)) {
      setSuggestion(PATTERNS.find((p) => p.id === "question"));
      return;
    }

    // Evidence detection (Quran/Hadith)
    if (
      /قال\s+الله|قال\s+تعالى|قال\s+النبي|قال\s+رسول|صلى\s+الله|عليه\s+وسلم|رواه|أخرجه/.test(
        text,
      )
    ) {
      setSuggestion(PATTERNS.find((p) => p.id === "evidence"));
      return;
    }

    // Warning/Important note detection
    if (/تنبيه|انتبه|احذر|خطأ|لا\s+يجوز|محرم|بدعة|شرك/.test(text)) {
      setSuggestion(PATTERNS.find((p) => p.id === "warning"));
      return;
    }

    // Summary detection
    if (/خلاصة|الخلاصة|باختصار|المهم|الحاصل|وعليه/.test(text)) {
      setSuggestion(PATTERNS.find((p) => p.id === "summary"));
      return;
    }

    // Default: Benefit (for short valuable notes)
    if (text.length < 200 && text.length > 15) {
      setSuggestion(PATTERNS.find((p) => p.id === "benefit"));
    }
  };

  const insertPattern = (pattern) => {
    const symbols = {
      benefit: "📌 [فائدة]: ",
      warning: "⚠️ [تنبيه]: ",
      evidence: "📖 [دليل شرعي]: ",
      summary: "💡 [الخلاصة]: ",
      question: "❓ [سؤال وجواب]: ",
    };

    editor
      .chain()
      .focus()
      .insertContent(
        `<div class="study-pattern pattern-${pattern.id}"><strong>${symbols[pattern.id]}</strong> </div>`,
      )
      .run();

    setSuggestion(null);
  };

  const toggleSummaryMode = () => {
    setIsSummarized(!isSummarized);
  };

  if (!editor) return null;

  return (
    <div
      className={`flex flex-col h-full bg-surface rounded-[2.5rem] border-2 border-subtle overflow-hidden transition-all duration-500 ${isSummarized ? "ring-4 ring-emerald-500/20" : ""}`}
    >
      {/* 1. Patterns Header - Fixed templates for one-click structured notes */}
      <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-50/50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
        <span className="text-[10px] font-black text-slate-400 ml-2 uppercase tracking-widest hidden sm:block">
          أنماط سريعة
        </span>
        {PATTERNS.map((p) => (
          <button
            key={p.id}
            onClick={() => insertPattern(p)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all border border-transparent hover:border-current/20 active:scale-95 text-xs font-bold ${p.color}`}
          >
            <p.icon size={14} />
            <span>{p.label.split(" ")[1]}</span>
          </button>
        ))}
      </div>

      {/* AI Suggestion Banner */}
      {suggestion && (
        <div className="flex items-center justify-between gap-3 px-4 py-2 bg-gradient-to-l from-primary/5 to-transparent border-b border-primary/10 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-primary animate-pulse" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              اقتراح ذكي:
            </span>
            <span className="text-xs text-slate-600 dark:text-slate-400">
              يبدو أن هذا{" "}
              <strong className="text-primary">
                {suggestion.label.split(" ")[1]}
              </strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => insertPattern(suggestion)}
              className="px-3 py-1 bg-primary text-white rounded-lg text-[10px] font-bold hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              تطبيق
            </button>
            <button
              onClick={() => setSuggestion(null)}
              className="px-2 py-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-[10px] transition-colors"
            >
              تجاهل
            </button>
          </div>
        </div>
      )}

      {/* 2. Main Writing Area */}
      <div
        className={`flex-grow overflow-y-auto px-6 py-4 transition-all relative ${isSummarized ? "bg-emerald-50/10" : ""}`}
      >
        {/* Contextual Bubble Menu */}
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex items-center gap-1 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 p-1 rounded-full shadow-2xl backdrop-blur-md">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 rounded-full transition-colors ${editor.isActive("bold") ? "bg-primary text-white" : "hover:bg-slate-700 dark:hover:bg-slate-200"}`}
            >
              <Bold size={16} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-2 rounded-full transition-colors ${editor.isActive("bulletList") ? "bg-primary text-white" : "hover:bg-slate-700 dark:hover:bg-slate-200"}`}
            >
              <List size={16} />
            </button>
            <div className="w-px h-4 bg-slate-700 dark:bg-slate-300 mx-1" />
            <button
              onClick={() =>
                editor.chain().focus().clearNodes().unsetAllMarks().run()
              }
              className="p-2 rounded-full hover:bg-red-500/20 text-red-400"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </BubbleMenu>

        <EditorContent
          editor={editor}
          className={`study-editor-surface ${isSummarized ? "summary-view" : ""}`}
        />
      </div>

      {/* 3. Action Footer */}
      <div className="p-4 bg-slate-50/50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <button
          onClick={toggleSummaryMode}
          className={`flex items-center gap-3 px-8 py-3 rounded-2xl text-sm font-black transition-all shadow-xl ${
            isSummarized
              ? "bg-slate-900 text-white"
              : "bg-primary text-white hover:scale-105 active:scale-95"
          }`}
        >
          <Sparkles size={16} className={isSummarized ? "animate-pulse" : ""} />
          {isSummarized ? "تعديل الملاحظات" : "تحويل لملخص مركّز"}
        </button>

        <div className="flex items-center gap-3 text-[10px] text-muted font-bold bg-surface px-4 py-2 rounded-full border border-subtle">
          <div className="flex items-center gap-1 border-l border-slate-200 dark:border-slate-800 pl-3 ml-3">
            <FileText size={12} />
            <span>{editor.storage.characterCount?.words?.() || 0} كلمة</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            حفظ تلقائي
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyEditor;
