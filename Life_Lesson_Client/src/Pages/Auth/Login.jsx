import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { Mail, Lock, Eye, EyeOff, Sparkles, LogIn, Home } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { signInUser, googleSignIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // High-resolution Unsplash image featuring minimalist premium Islamic geometric patterns
  const unsplashImageUrl =
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop";

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((res) => {
        console.log(res);
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((res) => {
        console.log(res);
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Continuous floating animation config for the vector frame
  const infiniteFloating = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4.5,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <section className="w-full h-screen bg-[#faf7f2] flex items-center justify-center p-0 md:p-6 overflow-hidden font-sans text-slate-800 relative">
      {/* FULL DISPLAY APPLICATION CONTAINER */}
      <div className="w-full h-full md:max-w-325 md:h-[90vh] bg-white md:rounded-[40px] border border-slate-950/5 md:shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* LEFT PANEL: AUTH INPUTFILTERS */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 h-full p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white overflow-y-auto"
        >
          <div className="space-y-6 max-w-sm w-full mx-auto">
            {/* Context Heading */}
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 bg-teal-950/5 border border-teal-900/10 px-3 py-1 rounded-full text-[11px] font-bold text-teal-900 tracking-wide">
                <Sparkles className="w-3 h-3 text-teal-600 animate-pulse" />{" "}
                Welcome Back
              </div>
              <h2 className="text-3xl lg:text-4xl font-serif font-black text-teal-950 tracking-tight">
                Sign In to Account
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">
                Log in to keep track of your daily spiritual progress and
                metrics.
              </p>
            </div>

            {/* Standard React-Hook-Form Structure */}
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="space-y-4 pt-2"
            >
              {/* Email Element */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">
                  Email Address
                </label>
                <div className="relative flex items-center bg-slate-50 border border-slate-200/80 focus-within:border-teal-500 focus-within:bg-white rounded-2xl transition-all group px-3.5 py-3.5">
                  <Mail className="w-4 h-4 text-slate-400 group-focus-within:text-teal-600 transition-colors shrink-0" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    {...register("email", { required: true })}
                    className="w-full pl-3 bg-transparent text-sm font-medium focus:outline-none"
                  />
                </div>
              </div>

              {/* Password Element */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center pl-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-bold text-teal-600 hover:underline"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative flex items-center bg-slate-50 border border-slate-200/80 focus-within:border-teal-500 focus-within:bg-white rounded-2xl transition-all group px-3.5 py-3.5">
                  <Lock className="w-4 h-4 text-slate-400 group-focus-within:text-teal-600 transition-colors shrink-0" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password", { required: true })}
                    className="w-full pl-3 pr-8 bg-transparent text-sm font-medium focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Native Account Login Button */}
              <motion.button
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full bg-teal-950 hover:bg-teal-900 text-teal-50 font-bold py-3.5 px-4 rounded-2xl transition-all shadow-md shadow-teal-950/10 flex items-center justify-center gap-2 text-sm mt-6 group"
              >
                <span>Sign In</span>
                <LogIn className="w-4 h-4 text-teal-400 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </form>

            {/* Middle Divider Text */}
            <div className="relative flex py-2 items-center text-xs text-slate-300 font-bold uppercase tracking-widest">
              <div className="grow border-t border-slate-100"></div>
              <span className="shrink mx-4 text-slate-400">
                Or Continue With
              </span>
              <div className="grow border-t border-slate-100"></div>
            </div>

            {/* Google Authentication Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleGoogleSignIn}
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-white text-slate-700 font-bold px-4 py-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all text-xs shadow-sm"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                viewBox="0 0 512 512"
                className="shrink-0"
              >
                <g>
                  <path fill="#fff" d="m0 0H512V512H0" />
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  />
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  />
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  />
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  />
                </g>
              </svg>
              <span>Login with Google</span>
            </motion.button>

            {/* Alternating Subtext */}
            <p className="text-center text-xs text-slate-400 font-semibold pt-2">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-teal-600 hover:underline font-bold ml-0.5"
              >
                Register Free
              </Link>
            </p>
          </div>
        </motion.div>

        {/* RIGHT PANEL: FULL SCREEN IMAGE WITH STEADY ANIMATION */}
        <div className="hidden md:flex w-1/2 h-full relative bg-teal-950 p-6 items-center justify-center overflow-hidden border-l border-slate-950/5">
          {/* Ambient Blurred Background Softlights */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

          {/* Floating Canvas Module */}
          <motion.div
            variants={infiniteFloating}
            animate="animate"
            className="w-full h-full relative z-10"
          >
            <div className="w-full h-full rounded-4xl overflow-hidden border border-white/10 shadow-2xl relative">
              <img
                src={unsplashImageUrl}
                alt="Premium Elegant Islamic Mosaic Architecture"
                className="w-full h-full object-cover rounded-4xl"
              />
              <div className="absolute inset-0 bg-linear-to-t from-teal-950/80 via-teal-950/20 to-transparent pointer-events-none" />

              {/* Dynamic Overlay Text Widget */}
              <div className="absolute bottom-10 left-10 right-10 text-white space-y-3">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex items-center gap-1.5 text-[10px] uppercase font-black tracking-widest text-teal-300"
                >
                  {/* CONTENT */}
                  <div className="relative text-white text-center p-10 space-y-4">
                    <h3 className="text-3xl font-bold">
                      Build Your Digital Life
                    </h3>

                    <p className="text-sm text-white/80">
                      Organize habits, boost focus, and improve your daily
                      workflow with smart tracking.
                    </p>

                    <div className="text-xs opacity-80">
                      “Consistency creates transformation.”
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Login;
