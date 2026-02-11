import React, { useState, useEffect } from "react";
import { useFocusMode } from "../contexts/FocusModeContext";
import { Focus, Clock, X } from "lucide-react";

const FocusModeBar = () => {
  const { isActive, getRemainingTime, requestExit } = useFocusMode();
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!isActive) return;

    const updateTime = () => {
      const remaining = getRemainingTime();
      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      setTimeLeft(`${minutes}:${seconds.toString().padStart(2, "0")}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [isActive, getRemainingTime]);

  if (!isActive) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-lg animate-in slide-in-from-top duration-500">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* اليمين: أيقونة ونص */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-white/30 rounded-full animate-ping" />
            <div className="relative bg-white/20 backdrop-blur-sm p-2 rounded-full">
              <Focus size={18} className="animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-sm tracking-wide">
              وضع التركيز مفعّل
            </span>
            <span className="text-xs text-white/80">
              أنت في بيئة تعليمية مغلقة
            </span>
          </div>
        </div>

        {/* الوسط: العداد الزمني */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          <Clock size={16} />
          <span className="font-mono font-bold text-lg tabular-nums">
            {timeLeft}
          </span>
        </div>

        {/* اليسار: زر الخروج الطارئ */}
        <button
          onClick={requestExit}
          className="group flex items-center gap-2 bg-white/10 hover:bg-red-500/90 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:border-red-400 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <X
            size={16}
            className="group-hover:rotate-90 transition-transform duration-300"
          />
          <span className="text-sm font-bold hidden sm:inline">خروج طارئ</span>
        </button>
      </div>

      {/* شريط التقدم */}
      <div className="h-1 bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-1000 ease-linear"
          style={{
            width: `${(getRemainingTime() / (60 * 1000 * 30)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default FocusModeBar;
