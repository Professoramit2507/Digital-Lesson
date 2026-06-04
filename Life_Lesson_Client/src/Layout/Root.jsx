import React, { useState, useEffect } from "react";
import Navber from "../Pages/Shared/Navber";
import { Outlet } from "react-router";
import Footer from "../Pages/Shared/Footer";
import { motion, AnimatePresence } from "framer-motion";

const Root = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-black bg-black">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 0.98, 
              filter: "blur(8px)",
              transition: { duration: 0.5, ease: "linear" } 
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#05070c]"
          >
            {/* 🌌 Ambient Grid Overlay & Deep Space Glows */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] animate-pulse" />
            <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] animate-pulse delay-700" />

            <div className="flex flex-col items-center relative z-10 font-mono">
              
              {/* ⚛️ Geometric Cyber Grid Loader (3 Overlapping Rotating Rings) */}
              <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
                {/* Outer Hex/Circle Tracker */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                  className="absolute inset-0 rounded-3xl border-2 border-dashed border-cyan-500/30 p-1"
                />
                
                {/* Middle Tech Ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                  className="absolute w-20 h-20 rounded-full border-2 border-t-cyan-400 border-r-transparent border-b-indigo-500 border-l-transparent"
                />

                {/* Inner Core Pulse */}
                <motion.div
                  animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-500 shadow-[0_0_30px_rgba(34,211,238,0.6)] rotate-45"
                />
              </div>

              {/* ⚡ Status Text Diagnostics */}
              <div className="text-center space-y-2">
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm font-black uppercase tracking-[0.5em] bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                >
                  SYSTEM CORE
                </motion.h2>
                
                <div className="flex items-center justify-center gap-1.5 text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
                  <span>Configuring Main Workspace Nexus...</span>
                </div>
              </div>

              {/* 📊 Modern Segmented Tech Loading Line */}
              <div className="w-44 h-1  rounded-full mt-6 overflow-hidden relative border border-zinc-800/40 p-[1px]">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                  className="absolute top-0 bottom-0 w-1/3 bg-linear-to-r from-transparent via-cyan-400 to-transparent"
                />
              </div>

            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* ===== CORE APPLICATION MAIN ENTRY ===== */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0, scale: 1.01 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
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