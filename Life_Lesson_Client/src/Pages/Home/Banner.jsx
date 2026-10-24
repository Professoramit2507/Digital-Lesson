import React, { useState } from "react";
import { Link } from "react-router";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ArrowRight, Sparkles, Crown, BookOpen, Star, ShieldCheck } from "lucide-react";

import i1 from "../../assets/imgaes/john-2FPjlAyMQTA-unsplash.jpg";
import i2 from "../../assets/imgaes/kenny-eliason-1-aA2Fadydc-unsplash.jpg";
import i3 from "../../assets/imgaes/marvin-meyer-SYTO3xs06fU-unsplash.jpg";
import i4 from "../../assets/imgaes/vitaly-gariev-KOTQ96r2m6E-unsplash.jpg";

const slidesData = [
  {
    img: i1,
    tag: "Next-Gen Wisdom Hub",
    title: "Master Digital Life & Emotional Clarity",
    desc: "Transform real-world friction and struggles into structured mental blueprints, actionable daily disciplines, and lifelong resilience.",
    btnPrimary: "Explore Lessons",
    btnPrimaryLink: "/public-lesson",
    btnSecondary: "Go Premium ($15)",
    btnSecondaryLink: "/premium-lesson",
  },
  {
    img: i2,
    tag: "VIP Mentorship & Masterclasses",
    title: "Unlock Curated Guidance From World-Class Mentors",
    desc: "Gain lifetime access to high-impact guided meditations, downloadable psychological workbooks, and deep personal mastery frameworks.",
    btnPrimary: "Unlock Premium Access",
    btnPrimaryLink: "/premium-lesson",
    btnSecondary: "Browse Free Guides",
    btnSecondaryLink: "/public-lesson",
  },
  {
    img: i3,
    tag: "Collaborative Mindset Community",
    title: "Document Your Journey & Empower Thousands",
    desc: "Join 25,000+ proactive learners worldwide sharing authentic insights, building habits, and supporting one another through life transitions.",
    btnPrimary: "Join Community Free",
    btnPrimaryLink: "/register",
    btnSecondary: "Browse Lessons",
    btnSecondaryLink: "/public-lesson",
  },
  {
    img: i4,
    tag: "Structured Self-Mastery",
    title: "Step Up Your Mental Blueprint & Daily Focus",
    desc: "Track daily reflections, favorite transformative lessons, and organize your habits through our intuitive interactive dashboard.",
    btnPrimary: "Start Free Journey",
    btnPrimaryLink: "/register",
    btnSecondary: "Sign In",
    btnSecondaryLink: "/login",
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="w-full relative overflow-hidden bg-[#05070c] pt-4 pb-10">
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-[500px] h-[300px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Social Proof Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                className="w-7 h-7 rounded-full border-2 border-zinc-950 object-cover"
                alt="Member"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                className="w-7 h-7 rounded-full border-2 border-zinc-950 object-cover"
                alt="Member"
              />
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
                className="w-7 h-7 rounded-full border-2 border-zinc-950 object-cover"
                alt="Member"
              />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-medium">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-white">4.9/5</span>
              <span className="text-zinc-500">• 25,000+ active learners</span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Curated Experiences
          </div>
        </div>

        {/* Carousel Container */}
        <div className="mt-6 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950 relative group">
          <Carousel
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            interval={5500}
            transitionTime={900}
            stopOnHover={true}
            emulateTouch={true}
            onChange={(index) => setCurrentSlide(index)}
            renderIndicator={(clickHandler, isSelected, index) => (
              <span
                onClick={clickHandler}
                className={`inline-block mx-1.5 h-1.5 rounded-full cursor-pointer transition-all duration-500 bottom-6 relative z-30 ${
                  isSelected
                    ? "w-8 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]"
                    : "w-2 bg-zinc-600 hover:bg-zinc-400"
                }`}
                key={index}
              />
            )}
          >
            {slidesData.map((slide, index) => (
              <div
                key={index}
                className="relative h-[480px] sm:h-[540px] md:h-[600px] w-full overflow-hidden flex items-center"
              >
                {/* Background Image with Zoom */}
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover brightness-[0.38] transition-transform duration-7000 scale-105 group-hover:scale-100"
                />

                {/* Cyber Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070c] via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#05070c] via-[#05070c]/70 to-transparent hidden md:block" />

                {/* Slide Text Content */}
                <div className="relative z-20 max-w-2xl px-6 sm:px-12 md:px-16 text-left space-y-5">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 backdrop-blur-md"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{slide.tag}</span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.15]"
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xs sm:text-sm md:text-base text-zinc-300 font-medium leading-relaxed max-w-xl"
                  >
                    {slide.desc}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-wrap items-center gap-3 pt-2"
                  >
                    <Link to={slide.btnPrimaryLink}>
                      <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer">
                        <span>{slide.btnPrimary}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-black" />
                      </button>
                    </Link>

                    <Link to={slide.btnSecondaryLink}>
                      <button className="px-6 py-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 font-bold text-xs uppercase tracking-wider backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer">
                        {slide.btnSecondary.includes("Premium") && (
                          <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        )}
                        <span>{slide.btnSecondary}</span>
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Banner;
