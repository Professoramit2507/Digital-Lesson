import React from "react";
import img from '../../assets/imgaes/logo.jpg';
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="w-full bg-[#070b14] text-gray-400 py-16 border-t border-white/5 relative overflow-hidden">
      {/* 🌌 Background Glow Ring */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* 🔄 Full Screen Fluid Container (w-full + wide padding) */}
      <div className="w-full px-6 md:px-16 lg:px-24 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        
        {/* 1. BRAND COL: Logo & Website Name */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 group cursor-pointer w-fit">
            <div className="relative">
              {/* Infinite Rotating Glow Ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 rounded-full blur-sm opacity-40 group-hover:opacity-100 group-hover:animate-spin duration-1000"></div>
              <img
                src={img}
                alt="Logo"
                className="relative w-10 h-10 rounded-full object-cover border border-white/10"
              />
            </div>
            <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
              DIGITAL<span className="text-cyan-400">LIFE</span>
            </span>
          </div>
          <p className="text-xs leading-relaxed text-gray-500 max-w-sm">
            Learning from real life experiences that create lasting impact. Overcome limits and build your futuristic digital ecosystem.
          </p>
        </div>

        {/* 2. CONTACT COL: Info with Subtle Cyber Icons */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-5 font-mono">// Contact Center</h3>
          <ul className="space-y-3 text-xs">
            <li className="flex items-center gap-2 group">
              <span className="text-cyan-500 font-mono">✉</span>
              <span className="text-gray-400 group-hover:text-cyan-400 transition-colors duration-200 cursor-pointer">support@digitallife.com</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-500 font-mono">⚡</span>
              <span className="text-gray-400">+1 234 567 890</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-indigo-500 font-mono">📍</span>
              <span className="text-gray-400">New York, USA</span>
            </li>
          </ul>
        </div>

        {/* 3. LINKS & SOCIAL COL: Legal Links + Modern SVGs */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-4 font-mono">// Core Directory</h3>
            <ul className="grid grid-cols-1 gap-2.5 text-xs">
              {["Terms & Conditions", "Privacy Policy", "FAQ"].map((item, idx) => (
                <li key={idx} className="w-fit">
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition-all duration-300 flex items-center gap-1 group">
                    <span className="w-0 h-[1px] bg-cyan-400 group-hover:w-2 transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex gap-3.5">
              {[
                { path: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z", label: "Facebook" },
                { path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z", label: "Instagram" },
                { path: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z", label: "Twitter" }
              ].map((icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500/10 hover:border-cyan-500/30 text-gray-400 hover:text-cyan-400 transition-all duration-200"
                  aria-label={icon.label}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={icon.path} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 📜 Full Screen Bottom Copyright Bar */}
      <div className="w-full px-6 md:px-16 lg:px-24 mt-16">
        <div className="text-center md:text-left md:flex md:justify-between md:items-center pt-8 border-t border-white/5 text-[11px] font-mono tracking-wider text-gray-600">
          <p>© {new Date().getFullYear()} DIGITAL LIFE — All Rights Reserved.</p>
          <p className="mt-2 md:mt-0 text-cyan-500/50 hover:text-cyan-400 transition-colors duration-300 cursor-pointer">// SECURE CONNECTION ENCRYPTED</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;