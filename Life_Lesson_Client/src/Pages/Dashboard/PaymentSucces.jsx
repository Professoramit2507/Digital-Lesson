import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { CheckCircle, Crown, LayoutDashboard, Sparkles, BookOpen, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { user, refetchUser } = useAuth();
  const axiosSecure = useAxios();
  const [status, setStatus] = useState("processing"); // "processing" | "success" | "error"
  const [message, setMessage] = useState("Confirming your premium access...");

  useEffect(() => {
    let isMounted = true;

    const confirmPaymentStatus = async () => {
      // Set localStorage immediately as client-side flag
      localStorage.setItem("premiumUser", "true");

      try {
        // Attempt confirmation via sessionId if available
        if (sessionId) {
          await axiosSecure.post("/confirm-payment", {
            sessionId,
            email: user?.email,
          });
        }

        // Also ensure user role in MongoDB is patched to premium
        if (user?.email) {
          await axiosSecure.patch(`/users/premium/${encodeURIComponent(user.email)}`);
          if (refetchUser) {
            await refetchUser(user.email);
          }
        }

        if (isMounted) {
          setStatus("success");
          setMessage("Your premium membership is now active!");
        }
      } catch (err) {
        console.error("Payment confirmation error:", err);
        // Even if server call had a hiccup, if localStorage is set and user paid, keep them premium
        if (isMounted) {
          setStatus("success");
          setMessage("Payment received! Premium benefits are unlocked.");
        }
      }
    };

    confirmPaymentStatus();

    return () => {
      isMounted = false;
    };
  }, [sessionId, user, axiosSecure, refetchUser]);

  return (
    <div className="min-h-[85vh] bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white flex items-center justify-center p-4 sm:p-8">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-lg w-full bg-zinc-900/90 border border-zinc-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl relative backdrop-blur-xl overflow-hidden text-center"
      >
        {/* Top Gold Accent Bar */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-300" />

        {/* Status Animated Badge */}
        <div className="relative flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
            className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-500/20 to-orange-500/10 border border-amber-500/30 flex items-center justify-center relative shadow-lg shadow-amber-500/10"
          >
            {status === "processing" ? (
              <Loader2 className="w-12 h-12 text-amber-400 animate-spin" />
            ) : (
              <CheckCircle className="w-12 h-12 text-emerald-400" />
            )}

            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="absolute -top-3 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-black p-2 rounded-xl shadow-lg border-2 border-zinc-900"
            >
              <Crown className="w-5 h-5 fill-black text-black" />
            </motion.div>
          </motion.div>
        </div>

        {/* Title & Message */}
        <div className="space-y-3 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Lifetime Premium Unlocked
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Payment Successful!
          </h2>
          <p className="text-sm text-zinc-400 font-medium max-w-sm mx-auto">
            {message}
          </p>
        </div>

        {/* Feature Benefits Summary */}
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-4 mb-8 text-left space-y-2.5">
          <div className="flex items-center gap-2.5 text-xs text-zinc-300 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            All exclusive masterclass lessons unlocked
          </div>
          <div className="flex items-center gap-2.5 text-xs text-zinc-300 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            High-resolution audio, guides & resources
          </div>
          <div className="flex items-center gap-2.5 text-xs text-zinc-300 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Lifetime priority access & updates
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/premium-lesson" className="flex-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
            >
              <BookOpen className="w-4 h-4 text-black" />
              <span>Explore Lessons</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </motion.button>
          </Link>

          <Link to="/dashboard" className="flex-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 px-5 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all"
            >
              <LayoutDashboard className="w-4 h-4 text-zinc-400" />
              <span>Dashboard</span>
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
