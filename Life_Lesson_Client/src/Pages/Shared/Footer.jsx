import React, { useState } from "react";
import img from "../../assets/imgaes/logo.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Send, Heart, Sparkles, Mail, Shield, CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Thank you for subscribing to our Weekly Wisdom Digest!");
    setEmail("");
  };

  return (
    <footer className="w-full bg-[#04060a] text-zinc-400 py-16 border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/5">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 rounded-full blur-xs opacity-50 group-hover:opacity-100 group-hover:animate-spin duration-1000" />
                <img
                  src={img}
                  alt="Logo"
                  className="relative w-10 h-10 rounded-full object-cover border border-white/10"
                />
              </div>
              <span className="text-xl font-black tracking-tighter text-white">
                DIGITAL<span className="text-cyan-400">LIFE</span>
              </span>
            </Link>

            <p className="text-xs leading-relaxed text-zinc-400 max-w-sm">
              An interactive wisdom hub where real-world setbacks, career transitions, and emotional breakthroughs become structured lifelong lessons.
            </p>

            <div className="flex items-center gap-2 text-xs text-zinc-500 pt-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Platform Online • Serving 25,000+ Thinkers</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white font-mono">
              // Navigation
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/public-lesson" className="hover:text-cyan-400 transition-colors">
                  Public Wisdom Library
                </Link>
              </li>
              <li>
                <Link to="/premium-lesson" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span>VIP Masterclasses</span>
                  <span className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.2 rounded font-bold">
                    $15
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-cyan-400 transition-colors">
                  Learner Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Weekly Wisdom Newsletter Signup */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white font-mono">
              // Weekly Digest
            </h3>
            <p className="text-xs text-zinc-400">
              Receive 1 curated, practical life lesson in your inbox every Sunday morning. No spam.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2 pt-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-cyan-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none transition-all"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-cyan-500/20"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Join</span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>&copy; {new Date().getFullYear()} Digital Life Lessons. Built with purpose for lifelong learners.</p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Community Guidelines
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
