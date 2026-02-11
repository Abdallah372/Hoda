import React, { useState } from "react";
import { useFocusMode } from "../contexts/FocusModeContext";
import { AlertTriangle, X, CheckCircle } from "lucide-react";

const ExitConfirmationModal = () => {
  const { showExitModal, confirmExit, cancelExit } = useFocusMode();
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  if (!showExitModal) return null;

  const handleFirstConfirm = () => {
    setStep(2);
  };

  const handleFinalConfirm = () => {
    if (confirmed) {
      confirmExit();
      setStep(1);
      setConfirmed(false);
    }
  };

  const handleCancel = () => {
    cancelExit();
    setStep(1);
    setConfirmed(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
          <div className="relative flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
              <AlertTriangle size={28} className="animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-black">
                {step === 1 ? "هل تريد إنهاء الجلسة؟" : "تأكيد نهائي"}
              </h3>
              <p className="text-sm text-white/90 mt-1">
                {step === 1
                  ? "أنت في وضع تركيز نشط"
                  : "هذا القرار سيُنهي جلسة التركيز"}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 ? (
            <div className="space-y-4">
              <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-4">
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                  <strong className="text-amber-600 dark:text-amber-400">
                    تذكير:
                  </strong>{" "}
                  وضع التركيز مصمم لمساعدتك على البقاء منغمساً في التعلم. الخروج
                  الآن قد يقطع تدفق تركيزك.
                </p>
              </div>

              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  هل أنت متأكد من رغبتك في الخروج؟
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  يمكنك العودة للتركيز في أي وقت
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-4">
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-bold">
                  ⚠️ هذا هو التأكيد النهائي
                </p>
              </div>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-2 border-slate-300 dark:border-slate-600 text-primary focus:ring-2 focus:ring-primary/50 cursor-pointer"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300 select-none group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  أؤكد رغبتي في إنهاء جلسة التركيز والخروج من البيئة التعليمية
                  المغلقة
                </span>
              </label>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-6 pt-0 flex gap-3">
          <button
            onClick={handleCancel}
            className="flex-1 px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <X size={18} />
            البقاء في التركيز
          </button>

          {step === 1 ? (
            <button
              onClick={handleFirstConfirm}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-amber-500/30"
            >
              متابعة الخروج
            </button>
          ) : (
            <button
              onClick={handleFinalConfirm}
              disabled={!confirmed}
              className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2 ${
                confirmed
                  ? "bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white shadow-lg shadow-red-500/30"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
              }`}
            >
              <CheckCircle size={18} />
              تأكيد الخروج
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExitConfirmationModal;
