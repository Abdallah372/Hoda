import React, { useState } from "react";
import { useFocusMode } from "../contexts/FocusModeContext";
import { Focus, Clock, Plus, X, Shield, Zap } from "lucide-react";

const FocusModeSettings = ({ onClose }) => {
  const { activate, allowedDomains, saveSettings } = useFocusMode();
  const [duration, setDuration] = useState(30);
  const [domains, setDomains] = useState(allowedDomains);
  const [newDomain, setNewDomain] = useState("");

  const handleAddDomain = () => {
    if (newDomain.trim() && !domains.includes(newDomain.trim())) {
      const updated = [...domains, newDomain.trim()];
      setDomains(updated);
      setNewDomain("");
    }
  };

  const handleRemoveDomain = (domain) => {
    setDomains(domains.filter((d) => d !== domain));
  };

  const handleActivate = () => {
    saveSettings(domains);
    activate(duration);
    onClose();
  };

  const presetDurations = [
    { value: 15, label: "15 دقيقة", icon: "⚡" },
    { value: 30, label: "30 دقيقة", icon: "🎯" },
    { value: 45, label: "45 دقيقة", icon: "🔥" },
    { value: 60, label: "ساعة كاملة", icon: "💪" },
    { value: 90, label: "ساعة ونصف", icon: "🚀" },
  ];

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -ml-20 -mt-20" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mb-16" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                <Focus size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-black">إعدادات وضع التركيز</h2>
                <p className="text-sm text-white/90 mt-1">
                  اختر المدة وحدد المواقع المسموحة
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Duration Selection */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock size={20} className="text-primary" />
              <h3 className="font-black text-lg text-slate-900 dark:text-white">
                مدة الجلسة
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {presetDurations.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setDuration(preset.value)}
                  className={`p-4 rounded-xl border-2 transition-all hover:scale-105 active:scale-95 ${
                    duration === preset.value
                      ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                      : "border-slate-200 dark:border-slate-700 hover:border-primary/50"
                  }`}
                >
                  <div className="text-2xl mb-2">{preset.icon}</div>
                  <div
                    className={`text-sm font-bold ${
                      duration === preset.value
                        ? "text-primary"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {preset.label}
                  </div>
                </button>
              ))}
            </div>

            {/* Custom Duration */}
            <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                أو حدد مدة مخصصة (بالدقائق):
              </label>
              <input
                type="number"
                min="5"
                max="180"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value) || 30)}
                className="w-full px-4 py-2 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* Allowed Domains */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield size={20} className="text-emerald-500" />
              <h3 className="font-black text-lg text-slate-900 dark:text-white">
                المواقع المسموحة
              </h3>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-4">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong className="text-blue-600 dark:text-blue-400">
                  ملاحظة:
                </strong>{" "}
                سيتم حظر جميع الروابط الخارجية ما عدا المواقع التي تضيفها هنا.
                YouTube مسموح افتراضياً لعرض المحاضرات.
              </p>
            </div>

            {/* Add Domain */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddDomain()}
                placeholder="مثال: wikipedia.org"
                className="flex-1 px-4 py-2 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
              <button
                onClick={handleAddDomain}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold transition-all active:scale-95 flex items-center gap-2"
              >
                <Plus size={18} />
                إضافة
              </button>
            </div>

            {/* Domains List */}
            {domains.length > 0 && (
              <div className="space-y-2">
                {domains.map((domain) => (
                  <div
                    key={domain}
                    className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700"
                  >
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {domain}
                    </span>
                    <button
                      onClick={() => handleRemoveDomain(domain)}
                      className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 rounded transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {domains.length === 0 && (
              <div className="text-center py-8 text-slate-400">
                <Shield size={48} className="mx-auto mb-3 opacity-20" />
                <p className="text-sm">لم تضف أي مواقع بعد</p>
                <p className="text-xs mt-1">جميع الروابط الخارجية محظورة</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold transition-all active:scale-95"
          >
            إلغاء
          </button>
          <button
            onClick={handleActivate}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 text-white rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
          >
            <Zap size={18} />
            تفعيل وضع التركيز
          </button>
        </div>
      </div>
    </div>
  );
};

export default FocusModeSettings;
