import React, { useRef, useState, useEffect } from "react";
import { dataService } from "../services/dataService";
import { Link } from "react-router-dom";
import { ArrowUp, Share2, Info, BookOpen } from "lucide-react";

const Shorts = () => {
  const shorts = dataService.getAllShorts();
  const [activeShortId, setActiveShortId] = useState(shorts[0]?.id);

  // Intersection Observer to detect active video
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveShortId(entry.target.dataset.id);
          }
        });
      },
      { threshold: 0.6 },
    );

    document.querySelectorAll(".short-container").forEach((el) => {
      observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="h-[calc(100vh-6rem)] w-full max-w-md mx-auto overflow-y-scroll snap-y snap-mandatory bg-black rounded-3xl no-scrollbar">
      {shorts.map((short) => (
        <div
          key={short.id}
          data-id={short.id}
          className="short-container h-full w-full snap-start relative flex items-center justify-center bg-slate-900"
        >
          {/* Video Placeholder or Iframe */}
          <div className="absolute inset-0 w-full h-full bg-slate-800">
            <iframe
              src={`${short.videoUrl}?autoplay=${activeShortId === short.id ? 1 : 0}&mute=0&controls=0&loop=1`}
              className="w-full h-full object-cover pointer-events-none"
              title={short.title}
              allow="autoplay; encrypted-media"
            />
            {/* Overlay for interaction blocking if needed, but we want play/pause */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />
          </div>

          {/* Controls / Info */}
          <div className="absolute bottom-6 right-4 left-16 z-10 text-white pointer-events-auto">
            <h3 className="text-lg font-bold mb-2 drop-shadow-md">
              {short.title}
            </h3>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-primary/80 px-2 py-1 rounded text-xs backdrop-blur-sm">
                {short.views} مشاهدة
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Link
                to={`/lesson/${short.courseId}/${short.lectureId}`}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold transition-colors text-white"
              >
                <BookOpen size={16} />
                <span>الدرس الكامل</span>
              </Link>
            </div>
          </div>

          {/* Sidebar Actions */}
          <div className="absolute bottom-20 left-2 flex flex-col gap-4 items-center z-10">
            <button className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition text-white">
              <Share2 size={24} />
            </button>
            <button className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition text-white">
              <Info size={24} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shorts;
