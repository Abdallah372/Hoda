import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronRight,
  ChevronLeft,
  Share2,
  Heart,
  Sparkles,
} from "lucide-react";

const StoryView = ({ items = [], onClose, title = "قصة اليوم" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance logic
  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(() => {
      if (currentIndex < items.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        // End of stories
        // onClose?.(); // Optional: close on finish
      }
    }, 50000000); // 5 seconds per slide (Long for reading, maybe make it dependent on text length if we want)
    // Actually for text content, auto-advance can be annoying. Let's make it manual or very long.
    // Let's stick to manual for now as per "Snackable Content" but user controlled.

    return () => clearTimeout(timer);
  }, [currentIndex, isPaused, items.length]);

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onClose?.();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const currentContent = items[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center font-sans"
      style={{ fontFamily: "'Readex Pro', sans-serif" }}
    >
      {/* Container simulating a mobile screen */}
      <div className="relative w-full max-w-md h-full sm:h-[90vh] sm:rounded-3xl bg-[#0f1012] overflow-hidden flex flex-col shadow-2xl border border-white/5">
        {/* Progress Bars */}
        <div className="absolute top-4 left-0 right-0 flex gap-1 px-4 z-20">
          {items.map((_, idx) => (
            <div
              key={idx}
              className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{
                  width:
                    idx < currentIndex
                      ? "100%"
                      : idx === currentIndex
                        ? "100%"
                        : "0%",
                }}
                transition={{
                  duration: idx === currentIndex ? 5 : 0,
                  ease: "linear",
                }} // Simulating timer
              />
            </div>
          ))}
        </div>

        {/* Top Controls */}
        <div className="absolute top-8 left-0 right-0 px-4 flex justify-between items-center z-20 text-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center">
              <Sparkles size={14} className="text-white" />
            </div>
            <span className="font-bold text-sm tracking-wide">{title}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Main Content Area */}
        <div
          className="flex-grow relative flex items-center justify-center p-8 text-center"
          onClick={(e) => {
            // Clever tap detection: left side = back, right side = next, center = pause?
            const width = e.currentTarget.offsetWidth;
            const x = e.nativeEvent.offsetX;
            if (x < width * 0.3) handlePrev();
            else handleNext();
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col items-center gap-8"
            >
              {/* Decorative Element */}
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50 mb-4" />

              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-relaxed">
                {currentContent}
              </h3>

              {/* Action Prompt */}
              {currentIndex === items.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 px-8 py-3 bg-white text-black rounded-full font-bold shadow-lg shadow-white/10 flex items-center gap-2"
                  onClick={onClose}
                >
                  إتمام الدرس <ChevronLeft size={18} />
                </motion.button>
              ) : (
                <div className="text-white/40 text-sm mt-8 animate-pulse">
                  اضغط للمتابعة
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-8 left-0 right-0 px-6 flex justify-between items-center z-20">
          <div className="flex gap-4">
            <button className="p-3 bg-white/5 rounded-full backdrop-blur-md text-white hover:bg-white/10 hover:scale-110 transition-all border border-white/5">
              <Heart
                size={20}
                className={
                  currentIndex % 2 === 0 ? "text-red-500 fill-red-500" : ""
                }
              />
            </button>
            <button className="p-3 bg-white/5 rounded-full backdrop-blur-md text-white hover:bg-white/10 hover:scale-110 transition-all border border-white/5">
              <Share2 size={20} />
            </button>
          </div>

          <div className="text-xs text-white/30 font-mono">
            {currentIndex + 1} / {items.length}
          </div>
        </div>

        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-tr from-emerald-900/20 to-teal-900/20 blur-3xl transition-colors duration-1000 ${currentIndex % 2 === 0 ? "from-emerald-900/20" : "from-indigo-900/20"}`}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default StoryView;
