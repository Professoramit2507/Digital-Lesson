import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Crown, CheckCircle2, ShieldCheck } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const CallToAction = () => {
  const { user } = useAuth();

  return (
    <section className="w-full bg-[#070b14] py-24 text-white relative overflow-hidden border-t border-white/5">
      {/* Ambient Pulsing Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative bg-gradient-to-br from-zinc-900/90 via-zinc-950/90 to-[#0a0e1a]/90 border border-white/10 rounded-3xl p-8 sm:p-14 text-center backdrop-blur-2xl shadow-2xl overflow-hidden"
        >
          {/* Top Laser Accent */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500" />

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Transform Your Trajectory
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 max-w-2xl mx-auto leading-tight">
            Ready to Build Your Personal{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Wisdom Blueprint?
            </span>
          </h2>

          <p className="text-xs sm:text-base text-zinc-400 max-w-lg mx-auto mb-8 leading-relaxed">
            Join 25,000+ proactive individuals tracking lessons, mastering emotional clarity, and sharing insights with an authentic global community.
          </p>

          {/* Feature Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-zinc-300 mb-8">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free Lifetime Access
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Curated By Experts
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> No Intrusive Ads
            </span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={user ? "/public-lesson" : "/register"}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-black font-extrabold text-xs uppercase tracking-widest shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{user ? "Explore Lessons Now" : "Get Started Free"}</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </motion.button>
            </Link>

            <Link to="/premium-lesson">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-amber-400 border border-amber-500/30 hover:border-amber-400/50 font-extrabold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Crown className="w-4 h-4 fill-amber-400" />
                <span>Unlock VIP Access ($15)</span>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
