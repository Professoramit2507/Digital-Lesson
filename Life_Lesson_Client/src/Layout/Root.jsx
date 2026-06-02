import React, { useState, useEffect } from "react";
import Navber from "../Pages/Shared/Navber";
import { Outlet } from "react-router";
import Footer from "../Pages/Shared/Footer";
import Lottie from "lottie-react";
import loaderAnimation from "../../public/loader.json";
import { motion, AnimatePresence } from "framer-motion";

const Root = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-black">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }} 
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#070b14]"
          >
            {/* 🌌 Background Aura Glows */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-[120px] animate-pulse delay-700" />

            <div className="flex flex-col items-center relative z-10">
              {/* Lottie Animation Wrapper with Glow */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="relative p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_50px_rgba(34,211,238,0.15)]"
              >
                <Lottie animationData={loaderAnimation} loop={true} className="w-36 h-36" />
              </motion.div>

              {/* ⚡ Futuristic Loading Text & Tech Subtitle */}
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg font-black uppercase tracking-[0.4em] bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent mt-6 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"
              >
                Initializing
              </motion.h2>
              
              <p className="text-[10px] font-mono tracking-[0.2em] text-gray-500 uppercase mt-1">
                Loading Digital Life Core...
              </p>

              {/* 📊 Cyberpunk Progress Bar Line */}
              <div className="w-40 h-0.5 bg-white/5 rounded-full mt-4 overflow-hidden relative border border-white/5">
                <motion.div 
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="absolute top-0 bottom-0 w-1/2 bg-linear-to-r from-transparent via-cyan-400 to-blue-500"
                />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

    
      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="flex-1 flex flex-col"
        >
          <header>
            <Navber />
          </header>

          <main className="flex-1">
            <Outlet />
          </main>

          <footer>
            <Footer />
          </footer>
        </motion.div>
      )}
    </div>
  );
};

export default Root;