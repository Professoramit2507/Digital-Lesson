import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // ===== PREMIUM CYBER SPINNER ON LOADING =====
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden font-mono">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none animate-pulse" />

        <div className="relative flex flex-col items-center gap-6 z-10">
          {/* Futuristic Double Ring Spinner */}
          <div className="relative w-16 h-16">
            {/* Outer Teal Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-t-teal-400 border-r-transparent border-b-zinc-900 border-l-transparent animate-spin" />
            
            {/* Inner Indigo Ring (Reverse Spin) */}
            <div className="absolute inset-2 rounded-full border-2 border-t-transparent border-r-indigo-400 border-b-transparent border-l-zinc-900 animate-spin [animation-direction:reverse] [animation-duration:0.8s]" />
          </div>

          {/* Loading System Matrix Diagnostics Text */}
          <div className="text-center space-y-1.5">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest animate-pulse">
              Authenticating Credentials
            </p>
            <p className="text-[10px] text-zinc-600 uppercase tracking-wider">
              Verifying root authorization matrix...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ইউজার লগইন করা থাকলে ড্যাশবোর্ড অ্যাক্সেস করতে দেবে
  if (user) {
    return children;
  }

  // লগইন করা না থাকলে হোমপেজে রিডাইরেক্ট করবে
  return <Navigate to="/" replace />;
};

export default AdminRoute;