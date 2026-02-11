import React, { useRef, useState, useEffect } from "react";
import { dataService } from "../services/dataService";
import { Link } from "react-router-dom";
import {
  ArrowUp,
  Share2,
  Info,
  BookOpen,
  Heart,
  Play,
  Pause,
  MoreVertical,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Shorts = () => {
  const shorts = dataService.getAllShorts();
  const [activeShortId, setActiveShortId] = useState(shorts[0]?.id);
  const [isPlaying, setIsPlaying] = useState(true);
  const [likedShorts, setLikedShorts] = useState({});

  // Intersection Observer to detect active video
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveShortId(entry.target.dataset.id);
            setIsPlaying(true); // Auto-play when scrolled to
          }
        });
      },
      { threshold: 0.7 }, // Higher threshold for center focus
    );

    const containers = document.querySelectorAll(".short-container");
    containers.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [shorts]);

  const toggleLike = (id) => {
    setLikedShorts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = async (short) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: short.title,
          text: `شاهد هذا المقطع: ${short.title}`,
          url: window.location.href,
        });
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] w-full bg-black flex justify-center overflow-hidden relative fade-in">
      <div
        ref={containerRef}
        className="w-full max-w-md h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
      >
        {shorts.map((short) => {
          const isActive = activeShortId === short.id;
          const isLiked = likedShorts[short.id];

          return (
            <div
              key={short.id}
              data-id={short.id}
              className="short-container w-full h-full snap-start relative flex items-center justify-center bg-zinc-900 overflow-hidden"
            >
              {/* Video Layer */}
              <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <iframe
                  src={`${short.videoUrl}?autoplay=${isActive && isPlaying ? 1 : 0}&mute=0&controls=0&loop=1&playlist=${short.videoUrl.split("/").pop()}&modestbranding=1&rel=0`}
                  className="w-full h-full object-cover scale-[1.35] opacity-80" // Slighly zoomed for immersive feel
                  title={short.title}
                  allow="autoplay; encrypted-media"
                />
                {/* Cinematic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />
              </div>

              {/* Interaction & Info Layer */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end pb-24 sm:pb-8 px-4 pointer-events-none">
                <div className="flex items-end justify-between pointer-events-auto w-full">
                  {/* Right Side: Info */}
                  <div className="flex flex-col gap-3 text-white max-w-[80%]">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        y: isActive ? 0 : 20,
                      }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <span className="bg-white/10 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold border border-white/10 flex items-center gap-1">
                        <Play size={10} className="fill-white" /> {short.views}
                      </span>
                      <span className="bg-emerald-500/80 px-2 py-0.5 rounded text-[10px] font-bold shadow-lg shadow-emerald-500/20">
                        جديد 🔥
                      </span>
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, x: 20 }}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        x: isActive ? 0 : 20,
                      }}
                      className="text-2xl font-black leading-tight drop-shadow-lg"
                    >
                      {short.title}
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isActive ? 1 : 0 }}
                      className="text-sm text-gray-300 line-clamp-2 opacity-90 font-medium"
                    >
                      فائدة علمية مركزة من دورة شرح الأصول الثلاثة...
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        y: isActive ? 0 : 20,
                      }}
                      transition={{ delay: 0.3 }}
                    >
                      <Link
                        to={`/lesson/${short.courseId}/${short.lectureId}`}
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold w-fit transition-all active:scale-95 shadow-lg shadow-emerald-900/50 mt-2 hover:pl-6 group"
                      >
                        <BookOpen
                          size={14}
                          className="group-hover:rotate-12 transition-transform"
                        />
                        شاهد الدرس الكامل
                      </Link>
                    </motion.div>
                  </div>

                  {/* Left Side: Actions */}
                  <div className="flex flex-col gap-6 items-center pb-2">
                    <motion.div className="relative group cursor-pointer">
                      <div className="w-10 h-10 rounded-full border-2 border-emerald-500 p-0.5 overflow-hidden">
                        <img
                          src={
                            short.thumbnail || "https://github.com/shadcn.png"
                          }
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-500 rounded-full p-0.5 text-white shadow-sm">
                        <div className="w-3 h-3 flex items-center justify-center font-bold text-[8px]">
                          +
                        </div>
                      </div>
                    </motion.div>

                    <div className="flex flex-col items-center gap-1">
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => toggleLike(short.id)}
                        className={`p-3 rounded-full backdrop-blur-md transition-all ${isLiked ? "bg-red-500/20 text-red-500" : "bg-black/30 text-white hover:bg-white/10"}`}
                      >
                        <Heart
                          size={28}
                          className={isLiked ? "fill-red-500" : ""}
                        />
                      </motion.button>
                      <span className="text-[10px] font-bold text-white shadow-black drop-shadow-md">
                        {isLiked ? 1432 : 1431}
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {}}
                        className="p-3 bg-black/30 rounded-full text-white hover:bg-white/10 backdrop-blur-md transition-all"
                      >
                        <div className="relative">
                          <Info size={26} />
                        </div>
                      </motion.button>
                      <span className="text-[10px] font-bold text-white shadow-black drop-shadow-md">
                        تفاصيل
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleShare(short)}
                        className="p-3 bg-black/30 rounded-full text-white hover:bg-white/10 backdrop-blur-md transition-all"
                      >
                        <Share2 size={26} />
                      </motion.button>
                      <span className="text-[10px] font-bold text-white shadow-black drop-shadow-md">
                        مشاركة
                      </span>
                    </div>

                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 8,
                        ease: "linear",
                      }}
                      className="mt-4 w-10 h-10 rounded-full bg-linear-to-tr from-emerald-900 to-black border-4 border-zinc-900 flex items-center justify-center overflow-hidden"
                    >
                      <img
                        src={short.thumbnail}
                        className="w-full h-full object-cover opacity-80"
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shorts;
