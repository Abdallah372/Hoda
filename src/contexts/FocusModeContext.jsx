import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";

const FocusModeContext = createContext();

export const useFocusMode = () => {
  const context = useContext(FocusModeContext);
  if (!context) {
    throw new Error("useFocusMode must be used within FocusModeProvider");
  }
  return context;
};

export const FocusModeProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState(30); // بالدقائق
  const [startTime, setStartTime] = useState(null);
  const [allowedDomains, setAllowedDomains] = useState([]);
  const [lockedPath, setLockedPath] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // تحميل الإعدادات من localStorage
  useEffect(() => {
    const saved = localStorage.getItem("focus-mode-settings");
    if (saved) {
      const settings = JSON.parse(saved);
      setAllowedDomains(settings.allowedDomains || []);
    }
  }, []);

  // حفظ الإعدادات
  const saveSettings = useCallback((domains) => {
    localStorage.setItem(
      "focus-mode-settings",
      JSON.stringify({
        allowedDomains: domains,
      }),
    );
    setAllowedDomains(domains);
  }, []);

  // تفعيل وضع التركيز
  const activate = useCallback(
    (durationMinutes = 30) => {
      setIsActive(true);
      setDuration(durationMinutes);
      setStartTime(Date.now());
      setLockedPath(location.pathname);

      // منع الرجوع للخلف
      window.history.pushState(null, "", window.location.href);

      // عرض تحذير للمستخدم
      setTimeout(() => {
        alert(
          "✅ تم تفعيل وضع التركيز\n\n" +
            "🔒 سيتم منع:\n" +
            "• فتح تبويبات جديدة\n" +
            "• فتح روابط خارجية\n" +
            "• الانتقال لصفحات أخرى\n\n" +
            "⏱️ المدة: " +
            durationMinutes +
            " دقيقة\n\n" +
            "🚨 للخروج: استخدم زر 'خروج طارئ'",
        );
      }, 500);
    },
    [location.pathname],
  );

  // إلغاء التفعيل
  const deactivate = useCallback(() => {
    setIsActive(false);
    setStartTime(null);
    setLockedPath(null);
    setShowExitModal(false);
  }, []);

  // محاولة الخروج
  const requestExit = useCallback(() => {
    setShowExitModal(true);
  }, []);

  // تأكيد الخروج
  const confirmExit = useCallback(() => {
    deactivate();
  }, [deactivate]);

  // إلغاء الخروج
  const cancelExit = useCallback(() => {
    setShowExitModal(false);
  }, []);

  // حساب الوقت المتبقي
  const getRemainingTime = useCallback(() => {
    if (!startTime) return 0;
    const elapsed = Date.now() - startTime;
    const remaining = duration * 60 * 1000 - elapsed;
    return Math.max(0, remaining);
  }, [startTime, duration]);

  // مراقبة انتهاء الوقت
  useEffect(() => {
    if (!isActive || !startTime) return;

    const interval = setInterval(() => {
      const remaining = getRemainingTime();
      if (remaining <= 0) {
        deactivate();
        alert(
          "⏰ انتهى وقت التركيز!\n\n" + "أحسنت! لقد أكملت جلسة التركيز بنجاح.",
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, startTime, getRemainingTime, deactivate]);

  // منع التنقل خارج الصفحة المقفلة
  useEffect(() => {
    if (!isActive || !lockedPath) return;

    if (location.pathname !== lockedPath) {
      navigate(lockedPath, { replace: true });
      alert("⚠️ وضع التركيز مفعّل\n\nلا يمكنك الانتقال لصفحات أخرى.");
    }
  }, [isActive, lockedPath, location.pathname, navigate]);

  // منع الرجوع للخلف
  useEffect(() => {
    if (!isActive) return;

    const handlePopState = (e) => {
      e.preventDefault();
      window.history.pushState(null, "", window.location.href);
      requestExit();
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isActive, requestExit]);

  // منع فتح روابط خارجية
  useEffect(() => {
    if (!isActive) return;

    const handleClick = (e) => {
      const target = e.target.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // السماح بالروابط الداخلية فقط
      if (href.startsWith("#")) {
        return; // روابط داخل نفس الصفحة مسموحة
      }

      if (href.startsWith("/")) {
        // منع التنقل إلى صفحات أخرى
        if (href !== lockedPath) {
          e.preventDefault();
          e.stopPropagation();
          alert(
            "⚠️ وضع التركيز مفعّل\n\n" +
              "لا يمكنك الانتقال لصفحات أخرى أثناء وضع التركيز.\n" +
              "استخدم زر 'خروج طارئ' إذا كنت تريد إنهاء الجلسة.",
          );
        }
        return;
      }

      // فحص الروابط الخارجية
      try {
        const url = new URL(href, window.location.origin);

        // السماح بـ YouTube
        if (
          url.hostname.includes("youtube.com") ||
          url.hostname.includes("youtu.be")
        ) {
          return;
        }

        const isAllowed = allowedDomains.some((domain) =>
          url.hostname.includes(domain),
        );

        if (!isAllowed) {
          e.preventDefault();
          e.stopPropagation();
          alert(
            `🚫 رابط محظور\n\n` +
              `الموقع "${url.hostname}" غير مسموح به في وضع التركيز.\n\n` +
              `يمكنك إضافة هذا الموقع للقائمة المسموحة من إعدادات وضع التركيز.`,
          );
        }
      } catch (err) {
        e.preventDefault();
        e.stopPropagation();
        alert("🚫 رابط غير صالح\n\nهذا الرابط محظور في وضع التركيز.");
      }
    };

    // استخدام capture phase للتأكد من اعتراض الحدث قبل أي معالج آخر
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [isActive, allowedDomains, lockedPath]);

  // منع فتح تبويب جديد
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e) => {
      // منع Ctrl+T, Ctrl+N, Ctrl+W
      if (e.ctrlKey || e.metaKey) {
        if (["t", "n", "w"].includes(e.key.toLowerCase())) {
          e.preventDefault();
          e.stopPropagation();
          alert(
            "⚠️ وضع التركيز مفعّل\n\n" +
              "لا يمكنك فتح تبويبات أو نوافذ جديدة أثناء وضع التركيز.",
          );
          return false;
        }
      }

      // منع Ctrl+Shift+N (نافذة خاصة)
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        e.key.toLowerCase() === "n"
      ) {
        e.preventDefault();
        e.stopPropagation();
        alert(
          "⚠️ وضع التركيز مفعّل\n\n" +
            "لا يمكنك فتح نوافذ جديدة أثناء وضع التركيز.",
        );
        return false;
      }

      // منع F5 و Ctrl+R (تحديث الصفحة)
      if (
        e.key === "F5" ||
        ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "r")
      ) {
        e.preventDefault();
        const confirmed = confirm(
          "⚠️ تحديث الصفحة سيُنهي وضع التركيز\n\nهل تريد المتابعة؟",
        );
        if (confirmed) {
          deactivate();
          window.location.reload();
        }
        return false;
      }
    };

    // منع النقر بالزر الأوسط (فتح في تبويب جديد)
    const handleMouseDown = (e) => {
      if (e.button === 1) {
        // الزر الأوسط
        const target = e.target.closest("a");
        if (target) {
          e.preventDefault();
          e.stopPropagation();
          alert(
            "⚠️ وضع التركيز مفعّل\n\n" + "لا يمكنك فتح روابط في تبويبات جديدة.",
          );
          return false;
        }
      }
    };

    // منع النقر بالزر الأيمن على الروابط
    const handleContextMenu = (e) => {
      const target = e.target.closest("a");
      if (target) {
        e.preventDefault();
        alert(
          "⚠️ وضع التركيز مفعّل\n\n" +
            "قائمة السياق معطلة على الروابط أثناء وضع التركيز.",
        );
        return false;
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("mousedown", handleMouseDown, true);
    window.addEventListener("contextmenu", handleContextMenu, true);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("mousedown", handleMouseDown, true);
      window.removeEventListener("contextmenu", handleContextMenu, true);
    };
  }, [isActive, deactivate]);

  // منع window.open
  useEffect(() => {
    if (!isActive) return;

    const originalOpen = window.open;
    window.open = function (...args) {
      alert(
        "⚠️ وضع التركيز مفعّل\n\n" +
          "لا يمكنك فتح نوافذ جديدة أثناء وضع التركيز.",
      );
      return null;
    };

    return () => {
      window.open = originalOpen;
    };
  }, [isActive]);

  // تحذير عند محاولة إغلاق التبويب
  useEffect(() => {
    if (!isActive) return;

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "وضع التركيز مفعّل. هل تريد حقاً إنهاء الجلسة؟";
      return e.returnValue;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isActive]);

  const value = {
    isActive,
    duration,
    startTime,
    allowedDomains,
    showExitModal,
    activate,
    deactivate,
    requestExit,
    confirmExit,
    cancelExit,
    getRemainingTime,
    saveSettings,
  };

  return (
    <FocusModeContext.Provider value={value}>
      {children}
    </FocusModeContext.Provider>
  );
};
