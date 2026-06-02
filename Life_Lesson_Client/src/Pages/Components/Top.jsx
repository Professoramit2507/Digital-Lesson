import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Top = () => {
  const [contributors, setContributors] = useState([]);

  const dummyData = [
    { _id: 1, name: "Rahim", email: "rahim@gmail.com", totalLessons: 12 },
    { _id: 2, name: "Karim", email: "karim@gmail.com", totalLessons: 9 },
    { _id: 3, name: "Sakib", email: "sakib@gmail.com", totalLessons: 7 },
    { _id: 4, name: "Farhan", email: "farhan@gmail.com", totalLessons: 5 },
    { _id: 5, name: "Riya", email: "riya@gmail.com", totalLessons: 3 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setContributors(dummyData);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const getRankBadge = (actualIndex) => {
    switch (actualIndex) {
      case 0:
        return { badge: "🥇", text: "text-amber-400", glow: "from-amber-500/20 to-orange-500/0", border: "border-amber-500/30", scale: "md:scale-105 z-10 border-amber-500/40" };
      case 1:
        return { badge: "🥈", text: "text-slate-300", glow: "from-slate-400/15 to-slate-500/0", border: "border-slate-400/20", scale: "scale-100" };
      case 2:
        return { badge: "🥉", text: "text-amber-700", glow: "from-amber-800/15 to-amber-900/0", border: "border-amber-700/20", scale: "scale-100" };
      default:
        return { badge: `#${actualIndex + 1}`, text: "text-cyan-400 font-mono text-sm", glow: "from-white/5 to-transparent", border: "border-white/5", scale: "scale-100" };
    }
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  // 🥇 🥈 🥉 ট্র্যাডিশনাল লিডারবোর্ড পজিশন ম্যাপিং: [২য়, ১ম, ৩য়]
  const getPodiumOrder = (items) => {
    if (items.length < 3) return items.map((item, idx) => ({ ...item, actualIndex: idx }));
    
    const withIndices = items.map((item, idx) => ({ ...item, actualIndex: idx }));
    // ডেক্সটপে দেখাবে: [১ম রানার আপ (২য়), চ্যাম্পিয়ন (১ম), ২য় রানার আপ (৩য়)]
    return [withIndices[1], withIndices[0], withIndices[2]];
  };

  const topThreePodium = getPodiumOrder(contributors.slice(0, 3));
  const remaining = contributors.slice(3);

  return (
    <section className="w-full bg-[#070b14] py-24 text-white relative overflow-hidden border-t border-white/5">
      {/* 🌌 Cyber Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

      {/* 🔄 Full Screen Fluid Container */}
      <div className="w-full px-6 md:px-16 lg:px-24 relative z-10">
        
        {/* 🏷️ Header Section */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase mb-3 block font-mono"
          >
            // Elite Contributors
          </motion.span>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl md:text-4xl font-black tracking-tight uppercase"
          >
            🏆 Top <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.15)]">Contributors</span> of the Week
          </motion.h2>
        </div>

        {/* 🎴 1. Visual Podium Layout (Top 3) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mb-12"
        >
          {topThreePodium.map((user) => {
            const rank = getRankBadge(user.actualIndex);
            return (
              <motion.div
                key={user._id}
                variants={itemVariants}
                whileHover={{ y: -6, borderColor: "rgba(34,211,238,0.3)" }}
                className={`relative p-8 bg-[#0f1424]/40 border ${rank.border} ${rank.scale} rounded-2xl backdrop-blur-xl transition-all duration-300 text-center group overflow-hidden`}
              >
                {/* Visual Glow Layer */}
                <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b ${rank.glow} transition-opacity duration-300`} />

                {/* Badge Crown */}
                <div className="relative text-5xl mb-5 filter drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] group-hover:scale-110 transition-transform duration-300">
                  {rank.badge}
                </div>

                {/* Name & Identity */}
                <h3 className="text-lg font-bold text-white mb-1 tracking-wide group-hover:text-cyan-400 transition-colors">
                  {user.name}
                </h3>
                <p className="text-xs text-gray-500 font-medium mb-5 font-mono truncate px-4">{user.email}</p>

                {/* Score Counter */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-cyan-400 tracking-wide uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  {user.totalLessons} Lessons
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 📋 2. Streamlined List Layout (Remaining Users) */}
        {remaining.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-3 bg-[#0f1424]/20 border border-white/5 p-5 rounded-2xl backdrop-blur-md"
          >
            {remaining.map((user, index) => {
              const actualIndex = index + 3; 
              return (
                <div
                  key={user._id}
                  className="flex items-center justify-between p-4 bg-[#0a0e1a]/40 border border-white/5 rounded-xl hover:border-cyan-500/20 hover:bg-[#0f1424]/40 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Index Counter */}
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs text-gray-500 font-mono group-hover:text-cyan-400 group-hover:border-cyan-500/20 transition-all">
                      #{actualIndex + 1}
                    </div>
                    
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white tracking-wide truncate">{user.name}</h4>
                      <p className="text-[11px] text-gray-500 font-mono truncate hidden sm:block">{user.email}</p>
                    </div>
                  </div>

                  {/* Badging Row */}
                  <div className="text-right flex-shrink-0 pl-4">
                    <span className="text-xs font-bold font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 rounded-lg tracking-wide">
                      {user.totalLessons} Lessons
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default Top;