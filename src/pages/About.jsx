import React from "react";
import {
  BookOpen,
  Award,
  CheckCircle,
  Heart,
  Shield,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="fade-in max-w-5xl mx-auto space-y-24 py-12 px-4 md:px-0">
      {/* Hero Section */}
      <section className="text-center space-y-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded-full font-bold text-xs tracking-wide border border-emerald-100 dark:border-emerald-800"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          منهجية راسخة • واجهة عصرية
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.2] tracking-tight"
        >
          نحن نبني <br />
          <span className="text-emerald-600 dark:text-emerald-400 relative inline-block">
            جيل التأصيل
            <svg
              className="absolute w-full h-3 -bottom-1 left-0 text-emerald-200 dark:text-emerald-800 -z-10"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path
                d="M0 5 Q 50 10 100 5"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
              />
            </svg>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium"
        >
          منصة هدى ليست مجرد موقع تعليمي، بل هي محاولة جادة لتقريب ميراث النبوة
          لجيل التقنية، بمنهجية السلف الصالح، بعيداً عن الغلو والتمييع.
        </motion.p>
      </section>

      {/* Core Values Grid */}
      <section className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: BookOpen,
            title: "العلم المؤصل",
            desc: "لا نعتمد على الثقافة العامة، بل نربطك بمتون العقيدة والفقه مباشرة.",
            color: "text-blue-500",
            bg: "bg-blue-50 dark:bg-blue-900/20",
          },
          {
            icon: Shield,
            title: "المنهج الصافي",
            desc: "ننتقي الشروحات من كبار العلماء الراسخين لنضمن لك سلامة المعتقد.",
            color: "text-emerald-500",
            bg: "bg-emerald-50 dark:bg-emerald-900/20",
          },
          {
            icon: Heart,
            title: "التزكية والتربية",
            desc: "العلم الذي لا يورث الخشية لا نفع فيه، لذا نركز على أعمال القلوب.",
            color: "text-rose-500",
            bg: "bg-rose-50 dark:bg-rose-900/20",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-2 transition-transform duration-300 group"
          >
            <div
              className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
            >
              <item.icon size={28} strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
              {item.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </section>

      {/* Story/Origins Section */}
      <section className="relative overflow-hidden rounded-[3rem] bg-slate-900 text-white p-8 md:p-20 text-center md:text-right">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px]"></div>

        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-black leading-tight">
              لماذا أنشأنا <br />
              <span className="text-emerald-400">منصة هدى؟</span>
            </h2>
            <div className="space-y-4 text-slate-300 text-lg leading-relaxed">
              <p>
                في عالم يضج بالمشتتات، وتختلط فيه المفاهيم، وجدنا أن الشباب
                المسلم (ونحن منهم) يواجه صعوبة في الوصول للعلم الشرعي الصافي.
              </p>
              <p>
                الدروس طويلة، المنصات معقدة، والمحتوى مشتت بين يوتيوب وتيليجرام.
              </p>
              <p className="font-bold text-white border-r-4 border-emerald-500 pr-4">
                لذا قررنا بناء "هدى": لتكون المنصة التي تمنينا وجودها حين بدأنا
                طلب العلم.
              </p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-emerald-500 rounded-full text-white">
                <Users size={24} />
              </div>
              <div>
                <h4 className="font-bold text-xl">لمن هذه المنصة؟</h4>
              </div>
            </div>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-center gap-3">
                <CheckCircle size={18} className="text-emerald-400 shrink-0" />
                <span>للمبتدئ الذي لا يعرف من أين يبدأ.</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={18} className="text-emerald-400 shrink-0" />
                <span>للمشغول الذي يريد استغلال أوقات الفراغ.</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={18} className="text-emerald-400 shrink-0" />
                <span>للباحث عن بيئة آمنة نظيفة من الشبهات.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer Quote */}
      <div className="text-center max-w-2xl mx-auto opacity-60">
        <p className="font-serif text-xl italic text-slate-500">
          "من يُرِدِ اللهُ به خيرًا يُفَقِّهْهُ في الدين"
        </p>
      </div>
    </div>
  );
};

export default About;
