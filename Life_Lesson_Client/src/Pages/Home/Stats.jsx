import React from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, Star, Award, TrendingUp, Sparkles } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "25,000+",
    label: "Active Learners",
    sub: "Growing together worldwide",
    color: "from-cyan-400 to-blue-500",
    shadow: "shadow-cyan-500/10",
  },
  {
    icon: BookOpen,
    value: "1,200+",
    label: "Documented Lessons",
    sub: "Curated real-life wisdom",
    color: "from-blue-400 to-indigo-500",
    shadow: "shadow-blue-500/10",
  },
  {
    icon: Star,
    value: "4.9 / 5.0",
    label: "Community Rating",
    sub: "From 10,000+ verified reviews",
    color: "from-amber-400 to-orange-500",
    shadow: "shadow-amber-500/10",
  },
  {
    icon: Award,
    value: "99.4%",
    label: "Perspective Shift",
    sub: "Learners report positive mindset change",
    color: "from-emerald-400 to-teal-500",
    shadow: "shadow-emerald-500/10",
  },
];

const Stats = () => {
  return (
    <section className="w-full bg-[#070b14] py-16 relative overflow-hidden border-t border-white/5">
      {/* Subtle Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[250px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className={`bg-zinc-900/60 border border-white/10 hover:border-cyan-500/30 rounded-2xl p-6 backdrop-blur-xl transition-all shadow-xl ${stat.shadow} group`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${stat.color} p-0.5 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <div className="w-full h-full bg-[#0a0e1a] rounded-[10px] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-cyan-400/80 uppercase tracking-widest bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    <TrendingUp className="w-3 h-3 text-cyan-400" /> Live
                  </span>
                </div>

                <h3 className="text-3xl font-extrabold text-white tracking-tight mb-1">
                  {stat.value}
                </h3>
                <h4 className="text-sm font-bold text-zinc-300 mb-1">
                  {stat.label}
                </h4>
                <p className="text-xs text-zinc-500 font-medium">
                  {stat.sub}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
