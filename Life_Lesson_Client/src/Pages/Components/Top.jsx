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

  // র‍্যাঙ্ক অনুযায়ী মেডেল, কালার ও ব্যাকগ্রাউন্ড গ্লো সেট করার হেল্পার ফাংশন
  const getRankBadge = (index) => {
    switch (index) {
      case 0:
        return { badge: "🥇", text: "text-amber-400", glow: "from-amber-500/20 to-orange-500/0", border: "border-amber-500/30" };
      case 1:
        return { badge: "🥈", text: "text-slate-300", glow: "from-slate-400/20 to-slate-500/0", border: "border-slate-400/30" };
      case 2:
        return { badge: "🥉", text: "text-amber-700", glow: "from-amber-800/20 to-amber-900/0", border: "border-amber-700/30" };
      default:
        return { badge: `#${index + 1}`, text: "text-cyan-400 font-mono text-sm", glow: "from-white/5 to-transparent", border: "border-white/5" };
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

 
  const topThree = contributors.slice(0, 3);
  const remaining = contributors.slice(3);

  return (
    <section className="py-24 bg-[#070b14] mt-2 rounded-2xl text-white relative overflow-hidden">
      {/* 🌌 Background Glow Effect */}
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      
      <div className="max-w-5xl mx-auto px-8 md:px-12 relative z-10">
        
        {/* 🏷️ Tagline */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase mb-3 block font-mono"
          >
            // Elite Contributors
          </motion.span>

          {/* 🎯 Section Title */}
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

        {/* 🎴 1. Podium / Cards Layout for TOP 3 */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {topThree.map((user, index) => {
            const rank = getRankBadge(index);
            return (
              <motion.div
                key={user._id}
                variants={itemVariants}
                whileHover={{ y: -6, borderColor: "rgba(34,211,238,0.25)" }}
                className={`relative p-6 bg-[#0f1424]/50 border ${rank.border} rounded-2xl backdrop-blur-xl transition-all duration-300 text-center group overflow-hidden`}
              >
              
                <div className={`absolute top-0 inset-x-0 h-24 bg-gradient-to-b ${rank.glow} transition-opacity duration-300`} />

              
                <div className="relative text-4xl mb-4 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-300">
                  {rank.badge}
                </div>

             
                <h3 className="text-lg font-bold text-white mb-1 tracking-wide group-hover:text-cyan-400 transition-colors">
                  {user.name}
                </h3>
                <p className="text-xs text-gray-500 font-medium mb-4 font-mono truncate px-2">{user.email}</p>

               
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-cyan-400 tracking-wide uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  {user.totalLessons} Lessons
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 📋 2. Elegant List Layout for Remaining Users */}
        {remaining.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-3 bg-[#0f1424]/30 border border-white/5 p-4 rounded-2xl backdrop-blur-md"
          >
            {remaining.map((user, index) => {
              const actualIndex = index + 3; 
              const rank = getRankBadge(actualIndex);
              return (
                <div
                  key={user._id}
                  className="flex items-center justify-between p-4 bg-[#0a0e1a]/60 border border-white/5 rounded-xl hover:border-cyan-500/20 hover:bg-[#0f1424]/40 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                  
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs text-gray-400 font-mono group-hover:text-cyan-400 transition-colors">
                      #{actualIndex + 1}
                    </div>
                    
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white tracking-wide truncate">{user.name}</h4>
                      <p className="text-[11px] text-gray-500 font-mono truncate hidden sm:block">{user.email}</p>
                    </div>
                  </div>

                  
                  <div className="text-right flex-shrink-0 pl-4">
                    <span className="text-xs font-bold font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-md">
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