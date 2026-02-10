import React from "react";
import { BookOpen, Award, CheckCircle } from "lucide-react";

const About = () => {
  return (
    <div className="fade-in max-w-4xl mx-auto space-y-16 py-8">
      {/* Header */}
      <div className="text-center space-y-6">
        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full font-bold text-sm tracking-wide">
          منهجية راسخة • واجهة عصرية
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
          تعلم العلم الشرعي <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500">
            بأعلى معايير الجودة
          </span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          منصة هدى هي مشروع وقفي يجمع بين أصالة المحتوى العلمي وجمال التجربة
          البصرية، مصمم ليناسب طالب العلم المعاصر.
        </p>
      </div>

      {/* Grid Features */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all text-center group">
          <div className="w-16 h-16 mx-auto bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
            <BookOpen size={32} />
          </div>
          <h3 className="text-xl font-bold mb-3">متون علمية</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            ربط مباشر بين الفيديو والمتن المشروح مع أدوات تصفح متقدمة.
          </p>
        </div>

        <div className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all text-center group">
          <div className="w-16 h-16 mx-auto bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
            <CheckCircle size={32} />
          </div>
          <h3 className="text-xl font-bold mb-3">منهجية منضبطة</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            اختيار دقيق للشروحات من كبار العلماء لضمان سلامة المنهج.
          </p>
        </div>

        <div className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all text-center group">
          <div className="w-16 h-16 mx-auto bg-amber-50 dark:bg-amber-900/20 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform">
            <Award size={32} />
          </div>
          <h3 className="text-xl font-bold mb-3">تركيز كامل</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            بيئة خالية من المشتتات الاجتماعية (لا لايكات، لا تعليقات).
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10"></div>
        <div className="relative z-10 text-center">
          <h2 className="text-3xl font-bold mb-6">المنهجية العلمية</h2>
          <div className="grid md:grid-cols-2 gap-8 text-right">
            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
              <h4 className="font-bold text-lg mb-2 text-primary-light">
                التدرج في الطلب
              </h4>
              <p className="text-slate-300 text-sm">
                نبدأ بصغار العلم قبل كباره، عبر سلاسل مرتبة تراعي مستوى الطالب
                المبتدئ.
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
              <h4 className="font-bold text-lg mb-2 text-primary-light">
                الحفظ والفهم
              </h4>
              <p className="text-slate-300 text-sm">
                الجمع بين حفظ المتون وفهم شرحها عبر وسائل مساعدة بصرية.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
