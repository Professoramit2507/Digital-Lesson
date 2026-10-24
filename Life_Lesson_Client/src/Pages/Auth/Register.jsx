import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import {
  Mail,
  Lock,
  User,
  Image,
  Eye,
  EyeOff,
  Sparkles,
  UserPlus,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Loader2,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import logoImg from "../../assets/imgaes/logo.jpg";
import useAxios from "../../hooks/useAxios";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserProfile, googleSignIn, refetchUser } = useAuth();
  const axios = useAxios();
  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  const passwordValue = watch("password", "");
  const redirectPath = location.state?.from || location.state || "/";

  const handleRegister = async (data) => {
    setSubmitting(true);
    try {
      // 1. Create user with Firebase Auth
      const userCredential = await registerUser(data.email, data.password);
      const firebaseUser = userCredential.user;

      // 2. Update Firebase display profile
      if (updateUserProfile && (data.name || data.photo)) {
        await updateUserProfile(data.name, data.photo || "");
      }

      // 3. Save user into MongoDB
      try {
        await axios.post("/users", {
          name: data.name,
          email: data.email,
          photo: data.photo || "",
          role: "user",
        });
      } catch (dbErr) {
        console.error("Database user insert error:", dbErr);
      }

      // 4. Refetch DB user
      if (refetchUser) {
        await refetchUser(data.email);
      }

      toast.success("Account created successfully! Welcome to Digital Life.");
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error("Registration error:", error);
      let errorMsg = "Failed to create account. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        errorMsg = "An account with this email already exists.";
      } else if (error.code === "auth/weak-password") {
        errorMsg = "Password should be at least 6 characters.";
      } else if (error.code === "auth/invalid-email") {
        errorMsg = "Please provide a valid email address.";
      }
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleRegister = async () => {
    setGoogleSubmitting(true);
    try {
      await googleSignIn();
      toast.success("Account linked with Google successfully!");
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error("Google registration error:", error);
      toast.error("Google sign up failed. Please try again.");
    } finally {
      setGoogleSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* 🌌 Cosmic Background Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      {/* 🧭 Top Navigation Bar */}
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
          {/* ⬅️ Left Column: Branded Showcase */}
          <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-zinc-950 via-zinc-900 to-[#07090e] border-r border-zinc-800/80 p-8 flex-col justify-between relative overflow-hidden">
            {/* Ambient Lighting Orbs */}
            <div className="absolute top-10 left-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Header / Intro */}
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 rounded-xl w-max">
                <Sparkles className="w-4 h-4" /> Join The Movement
              </div>

              <h2 className="text-2xl font-black text-white leading-tight">
                Unlock Your Potential With Modern Life Lessons
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Create a free account to personalize your journey, favorite lessons, and join our community of dedicated lifelong learners.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-3 my-6 relative z-10">
              <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl flex items-center gap-3 shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Daily Wisdom Feed</h4>
                  <p className="text-[11px] text-zinc-400">Curated daily lessons on wellness, focus & grit</p>
                </div>
              </div>

              <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl flex items-center gap-3 shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Habit & Goal Tracker</h4>
                  <p className="text-[11px] text-zinc-400">Monitor your daily progress with interactive tools</p>
                </div>
              </div>

              <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl flex items-center gap-3 shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Lifetime Free Membership</h4>
                  <p className="text-[11px] text-zinc-400">Full access to all public community lessons</p>
                </div>
              </div>
            </div>

            {/* Bottom Community Pill */}
            <div className="relative z-10 p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Active Community</span>
                <p className="text-sm font-black text-white">25,000+ Learners</p>
              </div>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-zinc-900 bg-cyan-500 flex items-center justify-center text-[10px] font-black text-black">A</div>
                <div className="w-8 h-8 rounded-full border-2 border-zinc-900 bg-indigo-500 flex items-center justify-center text-[10px] font-black text-white">S</div>
                <div className="w-8 h-8 rounded-full border-2 border-zinc-900 bg-amber-500 flex items-center justify-center text-[10px] font-black text-black">M</div>
              </div>
            </div>
          </div>

          {/* ➡️ Right Column: Register Form */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto space-y-5">
              {/* Header Title */}
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <UserPlus className="w-3 h-3" /> Get Started Free
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Create Your Account
                </h1>
                <p className="text-xs sm:text-sm text-zinc-400 font-medium">
                  Enter your details to create a free account and start your journey.
                </p>
              </div>

              {/* Form Element */}
              <form onSubmit={handleSubmit(handleRegister)} className="space-y-3.5 pt-1">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider pl-1">
                    Full Name
                  </label>
                  <div className="relative flex items-center bg-zinc-950/70 border border-zinc-800 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 rounded-2xl transition-all group px-3.5 py-2.5">
                    <User className="w-4 h-4 text-zinc-500 group-focus-within:text-cyan-400 transition-colors shrink-0" />
                    <input
                      type="text"
                      placeholder="John Doe"
                      {...register("name", {
                        required: "Full Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                      className="w-full pl-3 bg-transparent text-sm font-medium text-white placeholder:text-zinc-600 focus:outline-none"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-rose-400 pl-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider pl-1">
                    Email Address
                  </label>
                  <div className="relative flex items-center bg-zinc-950/70 border border-zinc-800 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 rounded-2xl transition-all group px-3.5 py-2.5">
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

                {/* Photo URL */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider pl-1">
                    Profile Photo URL <span className="text-[10px] text-zinc-500 normal-case">(optional)</span>
                  </label>
                  <div className="relative flex items-center bg-zinc-950/70 border border-zinc-800 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 rounded-2xl transition-all group px-3.5 py-2.5">
                    <Image className="w-4 h-4 text-zinc-500 group-focus-within:text-cyan-400 transition-colors shrink-0" />
                    <input
                      type="url"
                      placeholder="https://example.com/photo.jpg"
                      {...register("photo")}
                      className="w-full pl-3 bg-transparent text-sm font-medium text-white placeholder:text-zinc-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider pl-1">
                      Password
                    </label>
                    <div className="relative flex items-center bg-zinc-950/70 border border-zinc-800 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 rounded-2xl transition-all group px-3.5 py-2.5">
                      <Lock className="w-4 h-4 text-zinc-500 group-focus-within:text-cyan-400 transition-colors shrink-0" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Min 6 characters",
                          },
                        })}
                        className="w-full pl-3 pr-8 bg-transparent text-sm font-medium text-white placeholder:text-zinc-600 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-xs text-rose-400 pl-1">{errors.password.message}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider pl-1">
                      Confirm Password
                    </label>
                    <div className="relative flex items-center bg-zinc-950/70 border border-zinc-800 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 rounded-2xl transition-all group px-3.5 py-2.5">
                      <Lock className="w-4 h-4 text-zinc-500 group-focus-within:text-cyan-400 transition-colors shrink-0" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...register("confirmPassword", {
                          required: "Please confirm password",
                          validate: (val) =>
                            val === passwordValue || "Passwords do not match",
                        })}
                        className="w-full pl-3 pr-8 bg-transparent text-sm font-medium text-white placeholder:text-zinc-600 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-xs text-rose-400 pl-1">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:via-blue-400 hover:to-indigo-500 text-black font-extrabold py-3.5 px-4 rounded-2xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 text-sm mt-4 disabled:opacity-60 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Free Account</span>
                      <UserPlus className="w-4 h-4 text-black" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Divider */}
              <div className="relative flex py-1 items-center">
                <div className="grow border-t border-zinc-800"></div>
                <span className="shrink mx-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
                  Or Register With
                </span>
                <div className="grow border-t border-zinc-800"></div>
              </div>

              {/* Google Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleGoogleRegister}
                type="button"
                disabled={googleSubmitting}
                className="w-full flex items-center justify-center gap-3 bg-zinc-950/80 hover:bg-zinc-800/90 text-white font-bold px-4 py-3 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all text-xs shadow-sm cursor-pointer disabled:opacity-60"
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
                <span>Register with Google</span>
              </motion.button>

              {/* Bottom Switch Link */}
              <p className="text-center text-xs text-zinc-400 font-semibold pt-1">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-cyan-400 hover:text-cyan-300 underline font-bold ml-1 inline-flex items-center gap-1"
                >
                  <span>Login Instead</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </p>
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

export default Register;
