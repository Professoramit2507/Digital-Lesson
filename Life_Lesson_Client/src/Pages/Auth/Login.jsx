import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  LogIn,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Star,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import logoImg from "../../assets/imgaes/logo.jpg";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser, googleSignIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  const redirectPath = location.state?.from || location.state || "/";

  const handleLogin = async (data) => {
    setSubmitting(true);
    try {
      await signInUser(data.email, data.password);
      toast.success("Welcome back! Signed in successfully.");
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error("Sign in error:", error);
      let errorMsg = "Failed to sign in. Please check your credentials.";
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        errorMsg = "Invalid email or password.";
      } else if (error.code === "auth/too-many-requests") {
        errorMsg = "Too many failed attempts. Please try again later.";
      }
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleSubmitting(true);
    try {
      await googleSignIn();
      toast.success("Signed in with Google successfully!");
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error("Google sign in error:", error);
      toast.error("Google authentication failed. Please try again.");
    } finally {
      setGoogleSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* 🌌 Ambient Cosmic Background Lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      {/* 🧭 Minimal Top Header */}
      <header className="relative z-10 max-w-7xl w-full mx-auto px-6 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-xs opacity-50 group-hover:opacity-100 transition-opacity" />
            <img
              src={logoImg}
              alt="Digital Life Logo"
              className="relative w-9 h-9 rounded-full object-cover border border-zinc-700 shadow-md"
            />
          </div>
          <span className="text-lg font-black tracking-tighter text-white">
            DIGITAL<span className="text-cyan-400">LIFE</span>
          </span>
        </Link>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 px-4 py-2 rounded-full transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>
      </header>

      {/* 🌟 Center Auth Card Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-5xl bg-zinc-900/70 border border-zinc-800/80 rounded-[32px] backdrop-blur-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
        >
          {/* ⬅️ Left Column: Sign In Form */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto space-y-6">
              {/* Header Title */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Sparkles className="w-3 h-3" /> Welcome Back
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Sign In to Your Account
                </h1>
                <p className="text-xs sm:text-sm text-zinc-400 font-medium">
                  Enter your credentials to continue tracking your daily lessons and habits.
                </p>
              </div>

              {/* Form Element */}
              <form onSubmit={handleSubmit(handleLogin)} className="space-y-4 pt-1">
                {/* Email Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider pl-1">
                    Email Address
                  </label>
                  <div className="relative flex items-center bg-zinc-950/70 border border-zinc-800 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 rounded-2xl transition-all group px-3.5 py-3">
                    <Mail className="w-4 h-4 text-zinc-500 group-focus-within:text-cyan-400 transition-colors shrink-0" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className="w-full pl-3 bg-transparent text-sm font-medium text-white placeholder:text-zinc-600 focus:outline-none"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-rose-400 pl-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center pl-1">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                      Password
                    </label>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.info("Password reset link will be sent to your email.");
                      }}
                      className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative flex items-center bg-zinc-950/70 border border-zinc-800 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 rounded-2xl transition-all group px-3.5 py-3">
                    <Lock className="w-4 h-4 text-zinc-500 group-focus-within:text-cyan-400 transition-colors shrink-0" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      className="w-full pl-3 pr-10 bg-transparent text-sm font-medium text-white placeholder:text-zinc-600 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none cursor-pointer"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-rose-400 pl-1">{errors.password.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:via-blue-400 hover:to-indigo-500 text-black font-extrabold py-3.5 px-4 rounded-2xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 text-sm mt-5 disabled:opacity-60 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <LogIn className="w-4 h-4 text-black" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Divider */}
              <div className="relative flex py-1 items-center">
                <div className="grow border-t border-zinc-800"></div>
                <span className="shrink mx-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
                  Or Continue With
                </span>
                <div className="grow border-t border-zinc-800"></div>
              </div>

              {/* Google Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleGoogleSignIn}
                type="button"
                disabled={googleSubmitting}
                className="w-full flex items-center justify-center gap-3 bg-zinc-950/80 hover:bg-zinc-800/90 text-white font-bold px-4 py-3.5 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all text-xs shadow-sm cursor-pointer disabled:opacity-60"
              >
                {googleSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12 5c1.54 0 2.94.55 4.04 1.45l3.03-3.03C17.24 1.7 14.81 1 12 1 7.42 1 3.51 3.58 1.57 7.34l3.65 2.83C6.1 7.21 8.81 5 12 5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.71 2.87c2.16-2 3.71-4.94 3.71-8.69z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.22 14.83A7.04 7.04 0 0 1 4.86 12c0-.99.17-1.95.48-2.83L1.69 6.34A11.96 11.96 0 0 0 0 12c0 1.92.46 3.74 1.28 5.36l3.94-2.53z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c3.24 0 5.95-1.08 7.93-2.91l-3.71-2.87c-1.08.73-2.47 1.16-4.22 1.16-3.19 0-5.9-2.21-6.87-5.17L1.47 16c1.94 3.86 5.92 7 10.53 7z"
                    />
                  </svg>
                )}
                <span>Sign in with Google</span>
              </motion.button>

              {/* Bottom Switch Link */}
              <p className="text-center text-xs text-zinc-400 font-semibold pt-2">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-cyan-400 hover:text-cyan-300 underline font-bold ml-1 inline-flex items-center gap-1"
                >
                  <span>Register Free</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </p>
            </div>
          </div>

          {/* ➡️ Right Column: Branded Showcase Side */}
          <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-zinc-950 via-zinc-900 to-[#07090e] border-l border-zinc-800/80 p-8 flex-col justify-between relative overflow-hidden">
            {/* Ambient Lighting Orbs */}
            <div className="absolute top-10 right-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-48 h-48 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Top Badges */}
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 rounded-xl w-max">
                <ShieldCheck className="w-4 h-4" /> Trusted Learning Platform
              </div>

              <h2 className="text-2xl font-black text-white leading-tight">
                Empower Your Mind With Curated Life Wisdom
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Join over 25,000 learners structuring their habits, learning emotional resilience, and mastering self-growth daily.
              </p>
            </div>

            {/* Middle Feature Highlights Card */}
            <div className="space-y-3 my-6 relative z-10">
              <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl flex items-center gap-3 shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 fill-cyan-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">4.9 / 5.0 Average Rating</h4>
                  <p className="text-[11px] text-zinc-400">From thousands of active life learners</p>
                </div>
              </div>

              <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl flex items-center gap-3 shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">100% Verified Masterclasses</h4>
                  <p className="text-[11px] text-zinc-400">Practical guides by verified mentors</p>
                </div>
              </div>
            </div>

            {/* Bottom Testimonial Snippet */}
            <div className="relative z-10 p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80">
              <p className="text-xs text-zinc-300 italic leading-relaxed">
                "Digital Life transformed how I organize my thoughts and build lasting daily habits. Truly a game-changer!"
              </p>
              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-zinc-800">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center text-black font-black text-[10px]">
                  AK
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-white">Arif Khan</h5>
                  <p className="text-[10px] text-zinc-500">Mastery Member</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* 🛡️ Footer Note */}
      <footer className="relative z-10 text-center py-4 text-[11px] text-zinc-600">
        &copy; {new Date().getFullYear()} Digital Life Lessons. All rights reserved.
      </footer>
    </div>
  );
};

export default Login;
