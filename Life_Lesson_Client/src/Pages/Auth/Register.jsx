import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { Mail, Lock, User, Image, Sparkles, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, googleSignIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const unsplashImageUrl =
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop";

  const handleRegister = (data) => {
    registerUser(data.email, data.password)
      .then(() => navigate(location.state || "/"))
      .catch(console.error);
  };

  const handleGoogleRegister = () => {
    googleSignIn()
      .then(() => navigate(location.state || "/"))
      .catch(console.error);
  };

  // Continuous floating animation config
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
        {/* ⬅️ LEFT PANEL: FULL SCREEN IMAGE WITH STEADY ANIMATION */}
        <div className="hidden md:flex w-1/2 h-full relative bg-teal-950 items-center justify-center overflow-hidden border-r border-slate-950/5">
          {/* soft glow */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl" />

          {/* image */}
          <motion.div
            variants={infiniteFloating}
            animate="animate"
            className="w-full h-full p-6"
          >
            <div className="w-full h-full rounded-3xl overflow-hidden relative shadow-2xl">
              <img
                src={unsplashImageUrl}
                alt="Team collaboration"
                className="w-full h-full object-cover scale-105"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* text */}
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="text-2xl font-bold">Build Smarter Systems</h3>
                <p className="text-sm text-white/80 mt-2">
                  Join and start organizing your workflow efficiently.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ➡️ RIGHT PANEL: REGISTRATION FORM PANEL */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white overflow-y-auto"
        >
          <div className=" max-w-sm w-full mx-auto">
            {/* Context Heading */}
            <div className="space-y-2 mt-10 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5
               bg-teal-950/5 border border-teal-900/10 px-3 py-1 rounded-full text-[11px] font-bold text-teal-900 tracking-wide">
                <Sparkles className="w-3 h-3 text-teal-600 animate-pulse" /> Get
                Started
              </div>
              <h2 className="text-3xl lg:text-3xl font-serif font-black text-teal-950 tracking-tight">
                Create Account
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">
                Join us to manage your habits and maintain consistency every
                day.
              </p>
            </div>

            {/* Standard React-Hook-Form Structure */}
            <form
              onSubmit={handleSubmit(handleRegister)}
              className="space-y-4 pt-2"
            >
              {/* Name Element */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">
                  Full Name
                </label>
                <div className="relative flex items-center bg-slate-50 border border-slate-200/80 focus-within:border-teal-500 focus-within:bg-white rounded-2xl transition-all group px-3.5 py-3.5">
                  <User className="w-4 h-4 text-slate-400 group-focus-within:text-teal-600 transition-colors shrink-0" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    {...register("name", { required: "Name is required" })}
                    className="w-full pl-3 bg-transparent text-sm font-medium focus:outline-none"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs pl-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

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
                    {...register("email", { required: "Email is required" })}
                    className="w-full pl-3 bg-transparent text-sm font-medium focus:outline-none"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs pl-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Photo URL Element */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">
                  Photo URL
                </label>
                <div className="relative flex items-center bg-slate-50 border border-slate-200/80 focus-within:border-teal-500 focus-within:bg-white rounded-2xl transition-all group px-3.5 py-3.5">
                  <Image className="w-4 h-4 text-slate-400 group-focus-within:text-teal-600 transition-colors shrink-0" />
                  <input
                    type="text"
                    placeholder="https://example.com/photo.jpg"
                    {...register("photo")}
                    className="w-full pl-3 bg-transparent text-sm font-medium focus:outline-none"
                  />
                </div>
              </div>

              {/* Password Element */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">
                  Password
                </label>
                <div className="relative flex items-center bg-slate-50 border border-slate-200/80 focus-within:border-teal-500 focus-within:bg-white rounded-2xl transition-all group px-3.5 py-3.5">
                  <Lock className="w-4 h-4 text-slate-400 group-focus-within:text-teal-600 transition-colors shrink-0" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Min 6 characters" },
                    })}
                    className="w-full pl-3 bg-transparent text-sm font-medium focus:outline-none"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs pl-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Native Account Register Button */}
              <motion.button
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full bg-teal-950 hover:bg-teal-900 text-teal-50 font-bold py-3.5 px-4 rounded-2xl transition-all shadow-md shadow-teal-950/10 flex items-center justify-center gap-2 text-sm mt-6 group"
              >
                <span>Sign Up</span>
                <UserPlus className="w-4 h-4 text-teal-400 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </form>

            {/* Middle Divider Text */}
            <div className="relative flex py-2 items-center text-xs text-slate-300 font-bold uppercase tracking-widest">
              <div className="grow border-t border-slate-100"></div>
              <span className="shrink mx-4 text-slate-400">
                Or Register With
              </span>
              <div className="grow border-t border-slate-100"></div>
            </div>

            {/* Google Authentication Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleGoogleRegister}
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
              <span>Register with Google</span>
            </motion.button>

            {/* Alternating Subtext */}
            <p className="text-center text-xs text-slate-400 font-semibold pt-2">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-teal-600 hover:underline font-bold ml-0.5"
              >
                Login Instead
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Register;
