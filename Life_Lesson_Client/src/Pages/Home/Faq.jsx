import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

const faqData = [
  {
    q: "What is Digital Life, and what makes it unique?",
    a: "Digital Life is an interactive digital wisdom repository designed to replace surface-level motivational quotes with grounded, practical lessons derived from real setbacks, career transitions, and emotional breakthroughs.",
  },
  {
    q: "Are the community lessons free to read and share?",
    a: "Yes! All public lessons published in the public repository are 100% free for everyone to browse, read, like, and share. You can also sign up for a free account to favorite lessons and participate in discussions.",
  },
  {
    q: "What does the Lifetime Premium Membership ($15.00) unlock?",
    a: "Our one-time $15 Lifetime Premium grants permanent VIP access to all present and future exclusive masterclasses, guided meditations, structured mental blueprints, private lesson authoring, and VIP contributor badges.",
  },
  {
    q: "How can I document and publish my own life lesson?",
    a: "Once signed in, head over to your Dashboard and click 'Add New Lesson'. You can choose a category, emotional tone, upload an image cover, and set privacy states. Premium users can also designate lessons as Premium Masterclasses.",
  },
  {
    q: "Can I edit or delete lessons that I have published?",
    a: "Absolutely! You maintain total sovereignty over your content. You can manage, update privacy, or permanently delete any lesson at any time directly from your 'My Lessons' repository or the lesson details page.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="w-full bg-[#070b14] py-24 text-white relative overflow-hidden border-t border-white/5">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-[11px] font-bold font-mono tracking-[0.3em] text-cyan-400 uppercase bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full inline-block">
            // Knowledge Base
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Frequently Asked <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Everything you need to know about our philosophy, platform access, and community standards.
          </p>
        </div>

        {/* Accordion Stack */}
        <div className="space-y-4">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700/80 rounded-2xl overflow-hidden backdrop-blur-xl transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {item.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-cyan-500/20 text-cyan-400 border-cyan-500/30" : "text-zinc-400"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/50">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
