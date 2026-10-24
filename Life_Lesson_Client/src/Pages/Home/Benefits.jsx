import React from "react";
import { motion } from "framer-motion";
import { Compass, Shield, Zap, Sparkles, TrendingUp } from "lucide-react";

const benefits = [
  {
    title: "Real-World Problem Solving",
    description:
      "Life teaches you how to think, adapt, and solve real challenges — not just memorize theories.",
    icon: Compass,
    color: "from-amber-400 to-orange-500",
  },
  {
    title: "Confidence & Independence",
    description:
      "Direct experiences cultivate self-trust, emotional clarity, and uncompromising decision-making.",
    icon: Shield,
    color: "from-cyan-400 to-blue-500",
  },
  {
    title: "Accelerated Skill Growth",
    description:
      "Hands-on realizations make skills stick — communication, emotional control, leadership, and grit.",
    icon: Zap,
    color: "from-rose-400 to-red-500",
  },
  {
    title: "Lifelong Perspective",
    description:
      "Structured life lessons shape your core mindset, giving enduring meaning to daily struggles.",
    icon: Sparkles,
    color: "from-emerald-400 to-teal-500",
  },
];

const Benefits = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 90, damping: 14 },
    },
  };

  return (
    <section className="w-full bg-[#05070c] py-24 text-white relative overflow-hidden border-t border-white/5">
      {/* Background Soft Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Unified Max-Width Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
        {/* Cyber Tagline */}
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[11px] font-bold tracking-[0.3em] text-cyan-400 uppercase mb-3 inline-block font-mono bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full"
        >
          // Core Value Matrix
        </motion.span>

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black mb-4 tracking-tight"
        >
          Why <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Learning From Life</span> Matters
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-zinc-400 max-w-2xl mx-auto mb-16 text-sm sm:text-base leading-relaxed"
        >
          Real experiences shape who we are. Here’s why grounded life lessons are more powerful than rigid, abstract classroom theories.
        </motion.p>

        {/* 4 Futuristic Benefit Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  borderColor: "rgba(34, 211, 238, 0.35)",
                  boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.6)",
                }}
                className="relative p-7 bg-zinc-900/60 border border-white/10 rounded-3xl backdrop-blur-xl transition-all duration-300 text-left group overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Glowing Icon Container */}
                  <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-white/5 border border-white/10 group-hover:scale-105 transition-transform">
                    <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-20 blur-md group-hover:opacity-50 transition-opacity`} />
                    <Icon className="w-5 h-5 text-white relative z-10" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold mb-2 tracking-wide text-white group-hover:text-cyan-400 transition-colors">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-medium">
                    {benefit.description}
                  </p>
                </div>

                {/* Bottom Laser Line */}
                <div className={`mt-6 pt-4 border-t border-white/5 flex items-center justify-between`}>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    Principle #{index + 1}
                  </span>
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${benefit.color}`} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
