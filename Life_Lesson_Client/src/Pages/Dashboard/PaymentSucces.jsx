import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { CheckCircle, Crown, LayoutDashboard, Home, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const PaymentSuccess = () => {
  const { user, refetchUser } = useAuth();
  const axiosSecure = useAxios();
  const [updating, setUpdating] = useState(true);

  useEffect(() => {
    const makePremium = async () => {
      if (user?.email) {
        try {
          // Added await to ensure database updates before refetching user data
          await axiosSecure.patch(`/users/premium/${encodeURIComponent(user.email)}`);
          await refetchUser(user.email);
        } catch (error) {
          console.error("Premium status update failed:", error);
        } finally {
          setUpdating(false);
        }
      }
    };

    makePremium();
  }, [user, axiosSecure, refetchUser]);

  // Infinite floating animation config for the premium crown badge
  const crownFloat = {
    animate: {
      y: [0, -4, 0],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  };

  return (
    <section className="w-full h-screen bg-[#faf7f2] flex items-center justify-center p-4 overflow-hidden font-sans text-slate-800 relative">
      
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Main Success Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-md w-full bg-white rounded-[36px] border border-slate-950/5 shadow-2xl p-8 text-center relative overflow-hidden space-y-6"
      >
        {/* Top luxury multi-gradient accent line */}
        <div className="absolute top-0 inset-x-0 h-2 bg-linear-to-r from-amber-400 via-teal-500 to-emerald-400" />

        {/* Animated Success Checked Mark & Crown */}
        <div className="relative flex justify-center pt-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 relative"
          >
            <CheckCircle className="w-10 h-10" />
            
            {/* Crown icon badge that floats constantly */}
            <motion.div 
              variants={crownFloat}
              animate="animate"
              className="absolute -top-2 -right-1 bg-amber-400 text-slate-950 p-1.5 rounded-xl shadow-md border-2 border-white"
            >
              <Crown className="w-4 h-4 fill-slate-950" />
            </motion.div>
          </motion.div>
        </div>

        {/* Header Text */}
        <div className="space-y-2">
          <h2 className="text-3xl font-serif font-black text-teal-950 tracking-tight">
            Payment Successful!
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-semibold px-4">
            Alhamdulillah, your transactional checkout has been safely processed.
          </p>
        </div>

        {/* Interactive Dynamic Status Banner */}
        <div className="bg-linear-to-br from-amber-50/60 to-orange-50/20 border border-amber-200/40 rounded-2xl p-5 relative overflow-hidden">
          {updating ? (
            <div className="flex flex-col items-center justify-center space-y-2 py-2">
              <Loader2 className="w-5 h-5 text-amber-600 animate-spin" />
              <p className="text-xs font-bold text-amber-800">Upgrading your profile structure...</p>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-1.5"
            >
              <div className="inline-flex items-center gap-1 text-[10px] uppercase font-black tracking-widest text-amber-700">
                <Sparkles className="w-3 h-3 fill-amber-600" /> Account Status Updated
              </div>
              <p className="text-sm font-medium text-slate-700">
                You are now a <span className="font-extrabold text-teal-950 bg-amber-400/30 px-2 py-0.5 rounded-md">Premium User</span>
              </p>
              <p className="text-[11px] text-slate-400 font-medium">All specialized exclusive utilities are now available.</p>
            </motion.div>
          )}
        </div>

        {/* Action Button Navigation Group */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link to="/dashboard" className="w-full">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-teal-950 hover:bg-teal-900 text-teal-50 font-bold py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-xs"
            >
              <LayoutDashboard className="w-4 h-4 text-teal-400" />
              <span>Go to Dashboard</span>
            </motion.button>
          </Link>

          <Link to="/" className="w-full">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 font-bold py-3.5 px-4 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-xs"
            >
              <Home className="w-4 h-4 text-slate-400" />
              <span>Back to Home</span>
            </motion.button>
          </Link>
        </div>

      </motion.div>
    </section>
  );
};

export default PaymentSuccess;