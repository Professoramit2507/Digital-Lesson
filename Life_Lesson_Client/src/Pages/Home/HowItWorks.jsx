import React from "react";
import { motion } from "framer-motion";
import { Compass, BookCheck, Sparkles, ArrowRight, Layers, ShieldCheck, Heart } from "lucide-react";
import { Link } from "react-router";

const steps = [
  {
    step: "01",
    title: "Browse Tested Real-World Wisdom",
    desc: "Cut through shallow advice. Explore hundreds of categorized life experiences written by real people who endured and overcame real friction.",
    icon: Compass,
    tag: "Exploration",
    color: "from-cyan-400 to-blue-500",
  },
  {
    step: "02",
    title: "Reflect & Build Daily Resilience",
    desc: "Internalize practical principles. Save lessons to your personal repository, practice emotional grounding exercises, and track your daily habits.",
    icon: BookCheck,
    tag: "Internalization",
    color: "from-blue-400 to-indigo-500",
  },
  {
    step: "03",
    title: "Masterclass Access & Share Your Voice",
    desc: "Unlock VIP masterclasses curated by therapists & coaches. Once ready, document your own hard-won lessons to guide the next generation.",
    icon: Sparkles,
    tag: "Mastery",
    color: "from-amber-400 to-orange-500",
  },
];

const HowItWorks = () => {
  return (
    <section className="w-full bg-[#070b14] py-24 text-white relative overflow-hidden border-t border-white/5">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-bold font-mono tracking-[0.3em] text-cyan-400 uppercase bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full inline-block"
          >
            // The Growth Framework
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black tracking-tight"
          >
            How <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Digital Life</span> Transforms You
          </motion.h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            A simple, progressive system designed to help you transform painful life setbacks into profound personal breakthroughs.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -6 }}
                className="bg-zinc-900/60 border border-white/10 hover:border-cyan-500/30 rounded-3xl p-8 backdrop-blur-xl transition-all shadow-xl relative flex flex-col justify-between group"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-4xl font-black font-mono text-zinc-700 group-hover:text-cyan-400/80 transition-colors">
                    {item.step}
                  </span>
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} p-0.5 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <div className="w-full h-full bg-[#0a0e1a] rounded-[14px] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase font-mono">
                    {item.tag}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-8 mt-auto">
                  <div className="h-0.5 w-full bg-gradient-to-r from-cyan-500/20 to-transparent group-hover:from-cyan-400 transition-all" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Action Button below */}
        <div className="text-center mt-12">
          <Link to="/public-lesson">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all cursor-pointer">
              <span>Start Exploring Free Lessons</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
