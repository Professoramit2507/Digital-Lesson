import React from "react";
import { motion } from "framer-motion";

const benefits = [
  {
    title: "Real-World Problem Solving",
    description:
      "Life teaches you how to think, adapt, and solve real challenges — not just memorize theories.",
    icon: "💡",
    color: "from-amber-400 to-orange-500", 
  },
  {
    title: "Confidence & Independence",
    description:
      "Experiences build self-trust, decision-making ability, and emotional strength.",
    icon: "🚀",
    color: "from-cyan-400 to-blue-500",
  },
  {
    title: "Faster Skill Growth",
    description:
      "Hands-on learning makes skills stick — communication, leadership, discipline, creativity.",
    icon: "🎯",
    color: "from-rose-400 to-red-500",
  },
  {
    title: "Lifelong Perspective",
    description:
      "Life lessons shape your mindset, give meaning, and help you grow as a better human.",
    icon: "🌱",
    color: "from-emerald-400 to-teal-500",
  },
];

const Benefits = () => {
 
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15, 
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  return (
    <section className="w-full bg-[#070b14] py-24 text-white relative overflow-hidden border-t border-white/5">
      {/* 🌌 Background Soft Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* 🔄 Full Width Fluid Container */}
      <div className="w-full px-6 md:px-16 lg:px-24 text-center relative z-10">
        
        {/* 🏷️ Cyber Matrix Tagline */}
        <motion.span 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase mb-3 block font-mono"
        >
          // Value Core Matrix
        </motion.span>

        {/* 🎯 Section Title */}
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-5xl font-black mb-4 tracking-tight uppercase"
        >
          Why <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.2)]">Learning From Life</span> Matters
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 max-w-2xl mx-auto mb-20 text-sm md:text-base leading-relaxed"
        >
          Real experiences shape who we are. Here’s why life lessons are more
          powerful than any rigid traditional classroom.
        </motion.p>

        {/* 🎴 4 Futuristic Benefit Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                borderColor: "rgba(34, 211, 238, 0.35)",
                boxShadow: "0px 25px 50px rgba(0, 0, 0, 0.5)"
              }}
              className="relative p-8 bg-[#0f1424]/40 border border-white/5 rounded-2xl backdrop-blur-xl transition-all duration-300 text-left group overflow-hidden"
            >
              {/* ⚡ Card Background Subtle Hover Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-[0.02] rounded-2xl transition-opacity duration-500`} />

              {/* 🔮 Glowing Icon Container */}
              <div className="relative w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-7 bg-white/5 border border-white/10 group-hover:scale-105 transition-transform duration-300">
                {/* Icon Backlight */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-15 blur-md group-hover:opacity-40 transition-opacity`} />
                <span className="relative z-10">{benefit.icon}</span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold mb-3 tracking-wide text-white group-hover:text-cyan-400 transition-colors duration-300">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed font-medium">
                {benefit.description}
              </p>

              {/* 🧬 Corner Tech Accent Line */}
              <div className={`absolute bottom-0 right-0 w-0 h-[2px] bg-gradient-to-r ${benefit.color} group-hover:w-1/2 transition-all duration-500 rounded-bl-full`} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;