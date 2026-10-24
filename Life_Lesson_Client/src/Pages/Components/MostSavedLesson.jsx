import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bookmark, Heart, Sparkles, BookOpen, ArrowRight, User } from "lucide-react";
import { Link } from "react-router";
import { toast } from "react-toastify";

const curatedLessons = [
  {
    _id: "101",
    title: "Finding Inner Peace – Mastery Edition",
    author: "Peter Black",
    category: "Spirituality",
    emotionalTone: "Deeply Peaceful",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800",
    savedCount: 342,
    shortDescription: "A deep journey into lasting emotional grounding, breathwork, and self-acceptance.",
  },
  {
    _id: "1",
    title: "How to Overcome Fear of Judgment",
    author: "John Doe",
    category: "Personal Growth",
    emotionalTone: "Empowering",
    image: "https://images.unsplash.com/photo-1625674967351-655dfa7362c7?q=80&w=800",
    savedCount: 289,
    shortDescription: "Timeless strategies to detach your self-worth from external validation.",
  },
  {
    _id: "102",
    title: "Emotional Healing & Release Blueprint",
    author: "Sarah Collins",
    category: "Emotional Wellness",
    emotionalTone: "Healing",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800",
    savedCount: 254,
    shortDescription: "Practical therapeutic exercises to process lingering grief and past friction.",
  },
  {
    _id: "2",
    title: "The Transformative Power of Gratitude",
    author: "Jane Smith",
    category: "Mental Health",
    emotionalTone: "Positive",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800",
    savedCount: 218,
    shortDescription: "Rewiring the brain's baseline perception through intentional daily gratefulness.",
  },
  {
    _id: "103",
    title: "Mindfulness for High Performers",
    author: "Daniel Wright",
    category: "Mindfulness",
    emotionalTone: "Focused",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=800",
    savedCount: 195,
    shortDescription: "Sustaining peak clarity and strategic execution without sacrificing inner balance.",
  },
  {
    _id: "6",
    title: "The Art of Stoic Focus in Noise",
    author: "Sophia Alex",
    category: "Personal Growth",
    emotionalTone: "Inspirational",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=800",
    savedCount: 184,
    shortDescription: "Ancient philosophical habits to cultivate unbroken attention amidst modern chaos.",
  },
];

const MostSavedLesson = () => {
  const [savedStates, setSavedStates] = useState({});

  const handleSaveToggle = (id) => {
    setSavedStates((prev) => {
      const next = !prev[id];
      if (next) {
        toast.success("Saved to your personal favorites repository!");
      } else {
        toast.info("Removed from saved collection.");
      }
      return { ...prev, [id]: next };
    });
  };

  return (
    <section className="w-full bg-[#05070c] py-24 text-white relative overflow-hidden border-t border-white/5">
      {/* Background Magic Glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-bold font-mono tracking-[0.3em] text-cyan-400 uppercase bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full inline-block"
          >
            // Community Highlights
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black tracking-tight"
          >
            Most Saved <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Life Lessons</span>
          </motion.h2>

          <p className="text-zinc-400 text-xs sm:text-sm">
            The most bookmarked, impactful lessons recommended by tens of thousands of members.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {curatedLessons.map((lesson) => {
            const isSaved = !!savedStates[lesson._id];
            const currentCount = isSaved ? lesson.savedCount + 1 : lesson.savedCount;

            return (
              <motion.div
                key={lesson._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-zinc-900/60 border border-white/10 hover:border-cyan-500/30 rounded-3xl overflow-hidden backdrop-blur-xl transition-all shadow-xl flex flex-col justify-between group"
              >
                <div>
                  {/* Image Cover */}
                  <div className="h-44 w-full relative overflow-hidden bg-zinc-900 border-b border-zinc-800">
                    <img
                      src={lesson.image}
                      alt={lesson.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                      <span className="bg-zinc-950/80 backdrop-blur-md text-cyan-400 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-zinc-800">
                        {lesson.category}
                      </span>

                      <button
                        onClick={() => handleSaveToggle(lesson._id)}
                        className={`p-2 rounded-xl backdrop-blur-md border transition-all cursor-pointer ${
                          isSaved
                            ? "bg-amber-500 text-black border-amber-400"
                            : "bg-zinc-950/80 text-zinc-400 border-zinc-800 hover:text-white"
                        }`}
                        title={isSaved ? "Remove from saved" : "Save lesson"}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-black" : ""}`} />
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-400">
                      <span>Tone: <strong className="text-zinc-200">{lesson.emotionalTone}</strong></span>
                      <span className="text-amber-400/90 font-mono">🔖 {currentCount} saves</span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                      {lesson.title}
                    </h3>

                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                      {lesson.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="p-6 pt-0 mt-2">
                  <div className="h-px bg-zinc-800/80 w-full mb-4" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500 font-medium">By {lesson.author}</span>
                    <Link
                      to={`/public-lesson/${lesson._id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/public-lesson">
            <button className="px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700/80 text-xs font-extrabold uppercase tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg">
              <span>View All Public Lessons</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MostSavedLesson;
