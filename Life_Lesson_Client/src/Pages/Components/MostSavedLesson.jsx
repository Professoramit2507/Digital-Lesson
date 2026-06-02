import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MostSavedLesson = () => {
  const [lessons, setLessons] = useState([]);

  const dummyLessons = [
    { _id: 1, title: "React for Beginners", instructor: "John Doe", savedCount: 120 },
    { _id: 2, title: "Advanced JavaScript", instructor: "Jane Smith", savedCount: 98 },
    { _id: 3, title: "Node.js Crash Course", instructor: "Rahim Khan", savedCount: 75 },
    { _id: 4, title: "CSS Animations", instructor: "Karim Ali", savedCount: 60 },
    { _id: 5, title: "Fullstack with MERN", instructor: "Sakib Ahmed", savedCount: 50 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLessons(dummyLessons);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Framer Motion কনফিগারেশন
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 90, damping: 14 },
    },
  };

  return (
    <section className="py-20 bg-[#070b14] mt-2 rounded-2xl text-white relative overflow-hidden">
      {/* 🌌 Background Magic Aura */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[130px] pointer-events-none" />

      {/* 🔄 দুই পাশ থেকে সমান দূরত্বে রাখার কন্টেইনার */}
      <div className="max-w-5xl mx-auto px-8 md:px-12 relative z-10">
        
        {/* 🏷️ Tagline & Header */}
        <div className="text-center mb-14">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase mb-3 block font-mono"
          >
            // Hot & Trending Content
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl md:text-4xl font-black tracking-tight uppercase"
          >
            🔖 Most Saved <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.15)]">Lessons</span>
          </motion.h2>
        </div>

        {/* 🎴 Cards Grid Space */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {lessons.map((lesson) => (
            <motion.div
              key={lesson._id}
              variants={cardVariants}
              whileHover={{ 
                y: -6, 
                borderColor: "rgba(34, 211, 238, 0.25)",
                boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.5)"
              }}
              className="relative p-6 bg-[#0f1424]/50 border border-white/5 rounded-2xl backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              {/* Top Abstract Laser Line Effect */}
              <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div>
                {/* Badge Row */}
                <div className="flex justify-between items-center mb-4">
                  {/* Technology Micro-Tag */}
                  <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">
                    Code // Lesson
                  </span>
                  {/* Dynamic Hot Badge */}
                  <span className="flex items-center gap-1 text-[10px] font-bold tracking-wider text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-full uppercase">
                    <span className="w-1 h-1 rounded-full bg-rose-400 animate-ping" />
                    Popular 🔥
                  </span>
                </div>

                {/* Lesson Title */}
                <h3 className="text-lg font-bold text-white tracking-wide leading-snug group-hover:text-cyan-400 transition-colors duration-300 mb-2">
                  {lesson.title}
                </h3>
                
                {/* Instructor Name with modern profile icon wrapper */}
                <p className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
                  <span className="text-gray-600 font-mono">by</span> {lesson.instructor}
                </p>
              </div>

              {/* Bottom Row: Counters */}
              <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono tracking-wider text-gray-500 uppercase">Saved By</span>
                  {/* Glowing Counter */}
                  <span className="text-lg font-black font-mono text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {lesson.savedCount} users
                  </span>
                </div>

                {/* Cyber Action Minimalist Icon */}
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-300">
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default MostSavedLesson;