import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Award, Sparkles, Star, ShieldCheck } from "lucide-react";

const dummyData = [
  { _id: 1, name: "Rahim Khan", email: "rahim@gmail.com", totalLessons: 14, badge: "Master Mentor" },
  { _id: 2, name: "Karim Ali", email: "karim@gmail.com", totalLessons: 11, badge: "Wisdom Guide" },
  { _id: 3, name: "Sakib Ahmed", email: "sakib@gmail.com", totalLessons: 9, badge: "Thought Leader" },
  { _id: 4, name: "Farhan Tanvir", email: "farhan@gmail.com", totalLessons: 6, badge: "Contributor" },
  { _id: 5, name: "Riya Chowdhury", email: "riya@gmail.com", totalLessons: 4, badge: "Contributor" },
];

const Top = () => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setContributors(dummyData);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const getRankBadge = (actualIndex) => {
    switch (actualIndex) {
      case 0:
        return {
          badge: "🥇",
          crown: "text-amber-400",
          glow: "from-amber-500/20 to-orange-500/0",
          border: "border-amber-500/40 shadow-lg shadow-amber-500/10",
          scale: "md:scale-105 z-10",
          pill: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        };
      case 1:
        return {
          badge: "🥈",
          crown: "text-slate-300",
          glow: "from-slate-400/15 to-slate-500/0",
          border: "border-slate-400/30",
          scale: "scale-100",
          pill: "bg-slate-500/20 text-slate-300 border-slate-500/30",
        };
      case 2:
        return {
          badge: "🥉",
          crown: "text-amber-700",
          glow: "from-amber-800/15 to-amber-900/0",
          border: "border-amber-700/30",
          scale: "scale-100",
          pill: "bg-amber-800/20 text-amber-500 border-amber-800/30",
        };
      default:
        return {
          badge: `#${actualIndex + 1}`,
          crown: "text-cyan-400",
          glow: "from-white/5 to-transparent",
          border: "border-white/10",
          scale: "scale-100",
          pill: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        };
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

  const getPodiumOrder = (items) => {
    if (items.length < 3) return items.map((item, idx) => ({ ...item, actualIndex: idx }));
    const withIndices = items.map((item, idx) => ({ ...item, actualIndex: idx }));
    return [withIndices[1], withIndices[0], withIndices[2]];
  };

  const topThreePodium = getPodiumOrder(contributors.slice(0, 3));
  const remaining = contributors.slice(3);

  return (
    <section className="w-full bg-[#05070c] py-24 text-white relative overflow-hidden border-t border-white/5">
      {/* Cyber Glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-bold font-mono tracking-[0.3em] text-cyan-400 uppercase mb-3 inline-block bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full"
          >
            // Hall of Wisdom
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black tracking-tight"
          >
            🏆 Top <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Contributors</span> of the Week
          </motion.h2>

          <p className="text-zinc-400 text-xs sm:text-sm">
            Honoring the thinkers and mentors who have shared the most transformative life lessons.
          </p>
        </div>

        {/* Podium Layout (Top 3) */}
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
                whileHover={{ y: -6 }}
                className={`relative p-8 bg-zinc-900/60 border ${rank.border} ${rank.scale} rounded-3xl backdrop-blur-xl transition-all duration-300 text-center group overflow-hidden`}
              >
                {/* Glow Layer */}
                <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b ${rank.glow} transition-opacity duration-300`} />

                {/* Badge Icon */}
                <div className="relative text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {rank.badge}
                </div>

                {/* Name & Identity */}
                <h3 className="text-xl font-bold text-white mb-1 tracking-wide group-hover:text-cyan-400 transition-colors">
                  {user.name}
                </h3>
                <p className="text-xs text-zinc-500 font-medium mb-4 font-mono truncate px-4">{user.email}</p>

                {/* Badge Tag */}
                <div className="mb-5">
                  <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${rank.pill}`}>
                    {user.badge}
                  </span>
                </div>

                {/* Score Counter */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-cyan-400 tracking-wide uppercase">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  {user.totalLessons} Published Lessons
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Remaining Users Streamlined List */}
        {remaining.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-3 bg-zinc-900/40 border border-white/5 p-5 rounded-3xl backdrop-blur-md max-w-3xl mx-auto"
          >
            {remaining.map((user, index) => {
              const actualIndex = index + 3;
              return (
                <div
                  key={user._id}
                  className="flex items-center justify-between p-4 bg-zinc-950/60 border border-white/5 rounded-2xl hover:border-cyan-500/20 transition-all group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs text-zinc-400 font-mono group-hover:text-cyan-400 group-hover:border-cyan-500/20 transition-all">
                      #{actualIndex + 1}
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white tracking-wide truncate">{user.name}</h4>
                      <p className="text-[11px] text-zinc-500 font-mono truncate hidden sm:block">{user.email}</p>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0 pl-4">
                    <span className="text-xs font-bold font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 rounded-xl tracking-wide">
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
