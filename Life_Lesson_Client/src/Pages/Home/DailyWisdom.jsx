import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw, Quote, Heart, Bookmark, Share2 } from "lucide-react";
import { toast } from "react-toastify";

const wisdomPills = [
  {
    category: "Mindset & Focus",
    quote: "You do not rise to the level of your goals. You fall to the level of your systems.",
    author: "James Clear",
    tag: "Discipline",
    action: "Write down 1 micro-habit you can perform in under two minutes today.",
  },
  {
    category: "Overcoming Anxiety",
    quote: "We suffer more often in imagination than in reality. Separate what is happening from what you fear.",
    author: "Seneca",
    tag: "Inner Peace",
    action: "Take 3 deep box breaths right now and release control over outcomes you cannot command.",
  },
  {
    category: "Healing & Forgiveness",
    quote: "Holding onto anger is like drinking poison and expecting the other person to perish.",
    author: "Buddha",
    tag: "Emotional Healing",
    action: "Forgive someone in your thoughts today, not for their sake, but to liberate your own peace.",
  },
  {
    category: "Career & Resilience",
    quote: "The impediment to action advances action. What stands in the way becomes the way.",
    author: "Marcus Aurelius",
    tag: "Resilience",
    action: "Identify the friction point currently blocking your work. Treat it as the training ground itself.",
  },
];

const DailyWisdom = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const current = wisdomPills[selectedIndex];

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % wisdomPills.length);
  };

  const handleBookmark = () => {
    toast.success("Wisdom saved to your daily reflection board!");
  };

  return (
    <section className="w-full bg-[#070b14] py-20 text-white relative overflow-hidden border-t border-white/5">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center space-y-3 mb-10">
          <span className="text-[11px] font-bold font-mono tracking-[0.3em] text-cyan-400 uppercase bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full inline-block">
            // Interactive Life Compass
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Daily Wisdom & Action Prompt
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
            Choose what you need most right now and receive a timeless grounding principle.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {wisdomPills.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                selectedIndex === idx
                  ? "bg-cyan-500 text-black border-cyan-400 shadow-lg shadow-cyan-500/20 scale-105"
                  : "bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
              }`}
            >
              {item.category}
            </button>
          ))}
        </div>

        {/* Dynamic Card Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 sm:p-12 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
          >
            {/* Top Cyan Accent */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500" />

            <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
              <div className="space-y-6 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
                    {current.tag}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">
                    Wisdom Stream
                  </span>
                </div>

                <div className="space-y-3">
                  <Quote className="w-8 h-8 text-cyan-500/30" />
                  <p className="text-xl sm:text-2xl font-serif font-black text-white leading-relaxed italic">
                    "{current.quote}"
                  </p>
                  <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
                    — {current.author}
                  </p>
                </div>

                <div className="p-4 bg-zinc-950/70 border border-zinc-800/80 rounded-2xl space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                    <Sparkles className="w-3.5 h-3.5" /> Action Prompt:
                  </div>
                  <p className="text-xs text-zinc-300 font-medium">
                    {current.action}
                  </p>
                </div>
              </div>

              {/* Action Buttons Column */}
              <div className="flex md:flex-col gap-2 shrink-0 self-center md:self-start">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  title="Next Wisdom"
                >
                  <RefreshCw className="w-4 h-4 text-cyan-400" />
                  <span className="hidden sm:inline">Shuffle</span>
                </button>

                <button
                  onClick={handleBookmark}
                  className="flex items-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  title="Save Wisdom"
                >
                  <Bookmark className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Save</span>
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DailyWisdom;
