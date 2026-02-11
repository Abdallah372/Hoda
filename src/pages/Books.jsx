import React from "react";
import { dataService } from "../services/dataService";
import { Book, Download, ExternalLink, Calendar, Hash } from "lucide-react";
import { motion } from "framer-motion";

const Books = () => {
  const books = dataService.getAllBooks();

  return (
    <div className="fade-in pb-12">
      <div className="mb-10 text-center lg:text-right">
        <h1 className="text-3xl font-black text-primary flex items-center justify-center lg:justify-start gap-4 mb-3">
          <div className="p-3 bg-primary/10 rounded-2xl">
            <Book size={32} />
          </div>
          <span>المكتبة العلمية</span>
        </h1>
        <p className="text-secondary max-w-2xl font-bold opacity-80">
          اكتشف مجموعة مختارة من الكتب والمراجع العلمية المصاحبة للدورات، متاحة
          للتحميل المباشر.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {books.map((book, index) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col card-layer group"
          >
            {/* Book Cover Container */}
            <div className="relative p-6 bg-app rounded-t-[1.5rem] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

              {/* Virtual Book Mockup */}
              <div className="relative z-10 w-32 h-44 shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2">
                <img
                  src={
                    book.coverImage ||
                    "https://placehold.co/400x600/064e3b/ffffff?text=Book"
                  }
                  alt={book.title}
                  className="w-full h-full object-cover rounded-sm border-2 border-white/20"
                />
                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]" />
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-black text-primary shadow-sm border border-border-subtle flex items-center gap-1.5 uppercase">
                  <Hash size={10} />
                  {book.pagesCount} صفحة
                </span>
              </div>
            </div>

            {/* Book Content */}
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md uppercase tracking-widest">
                  {book.categoryId === "aqidah" ? "عقيدة" : "فقه"}
                </span>
                <span className="text-[10px] text-muted flex items-center gap-1 font-bold">
                  <Calendar size={10} />
                  {new Date(book.createdAt).getFullYear()}
                </span>
              </div>

              <h3 className="text-lg font-black text-primary leading-tight mb-2 group-hover:text-emerald-500 transition-colors line-clamp-2">
                {book.title}
              </h3>

              <p className="text-xs text-muted font-bold mb-4 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                {book.author}
              </p>

              <p className="text-sm text-secondary line-clamp-2 mb-6 opacity-80 leading-relaxed font-bold">
                {book.description}
              </p>

              <div className="mt-auto flex flex-col gap-3">
                <a
                  href={book.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <Download size={16} />
                  تحميل النسخة الرقمية
                </a>

                <button className="flex items-center justify-center gap-2 w-full py-3 border border-border-default text-muted rounded-xl text-xs font-bold hover:bg-app transition-colors">
                  <ExternalLink size={14} />
                  تفاصيل الكتاب
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Books;
