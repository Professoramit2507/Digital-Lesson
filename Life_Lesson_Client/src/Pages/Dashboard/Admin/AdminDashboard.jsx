import React from "react";
import { Outlet, NavLink } from "react-router";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  AlertTriangle,
  ShieldAlert,
  Sliders,
  Home,
  Terminal,
} from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-10 items-stretch min-h-[calc(100vh-6rem)] w-full py-2 animate-fadeIn">
      {/* ===== VERTICALLY FULL HEIGHT SUB-SIDEBAR PANEL (SPACIOUS) ===== */}
      <div className="w-full lg:w-72 lg:h-auto bg-zinc-950 border border-zinc-900 rounded-3xl p-6 shadow-2xl relative overflow-hidden shrink-0 flex flex-col justify-between lg:sticky lg:top-8">
        {/* Subtle decorative top ambient glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-teal-500/20 to-transparent" />

        <div>
          {/* Header inside Sub-Sidebar (Increased Padding & Text Size) */}
          <div className="mb-8 px-3 pb-5 border-b border-zinc-900 flex items-center gap-3">
            <Sliders className="w-5 h-5 text-teal-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-300">
              Admin Dashboard
            </span>
          </div>

          {/* Navigation Links with Larger Text & More Vertical Gap (gap-3) */}
          <nav className="flex flex-col gap-3">
            {/* 1. Global System Home (ল্যান্ডিং পেজে যাওয়ার জন্য) */}
            <NavLink
              to="/"
              className="flex items-center gap-4 px-5 py-4 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all duration-200 border border-transparent text-zinc-400 hover:text-emerald-400 hover:bg-emerald-500/5 hover:border-emerald-500/10"
            >
              <Home className="w-5 h-5 text-emerald-400 stroke-2" />
              <span>System Home</span>
            </NavLink>

            {/* 2. Dashboard Root/Home (ড্যাশবোর্ডের মেইন হোম/ওভারভিউ) */}
            <NavLink
              end
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all duration-200 border ${
                  isActive
                    ? "bg-zinc-900 border-zinc-800 text-white shadow-inner shadow-black/40 border-l-2 border-l-teal-500"
                    : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30"
                }`
              }
            >
              <Terminal className="w-5 h-5 text-teal-400 stroke-2" />
              <span>Dashboard Home</span>
            </NavLink>

            {/* 3. Overview Nav Link */}
            {/* Note: আপনি চাইলে Dashboard Home এবং Overview একই রাখতে পারেন অথবা রাউটিং আলাদা হলে এটাও রাখতে পারেন */}
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all duration-200 border ${
                  isActive
                    ? "bg-zinc-900 border-zinc-800 text-white shadow-inner shadow-black/40 border-l-2 border-l-purple-500"
                    : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30"
                }`
              }
            >
              <LayoutDashboard className="w-5 h-5 text-purple-400 stroke-2" />
              <span>Overview Matrix</span>
            </NavLink>

            {/* 4. Manage Users Nav Link */}
            <NavLink
              to="/admin/manage-user"
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all duration-200 border ${
                  isActive
                    ? "bg-zinc-900 border-zinc-800 text-white shadow-inner shadow-black/40 border-l-2 border-l-sky-500"
                    : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30"
                }`
              }
            >
              <Users className="w-5 h-5 text-sky-400 stroke-2" />
              <span>Manage Users</span>
            </NavLink>

            {/* 5. Manage Lessons Nav Link */}
            <NavLink
              to="/admin/manage-lesson"
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all duration-200 border ${
                  isActive
                    ? "bg-zinc-900 border-zinc-800 text-white shadow-inner shadow-black/40 border-l-2 border-l-indigo-500"
                    : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30"
                }`
              }
            >
              <BookOpen className="w-5 h-5 text-indigo-400 stroke-2" />
              <span>Manage Lessons</span>
            </NavLink>

            {/* 6. Reported Clusters Nav Link */}
            <NavLink
              to="/admin/reported-lesson"
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all duration-200 border ${
                  isActive
                    ? "bg-zinc-900 border-zinc-800 text-white shadow-inner shadow-black/40 border-l-2 border-l-red-500"
                    : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30"
                }`
              }
            >
              <AlertTriangle className="w-5 h-5 text-red-500 stroke-2" />
              <span>Reported Clusters</span>
            </NavLink>

            {/* 7. Admin Profile Nav Link */}
            <NavLink
              to="/admin/admin-profile"
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all duration-200 border ${
                  isActive
                    ? "bg-zinc-900 border-zinc-800 text-white shadow-inner shadow-black/40 border-l-2 border-l-amber-500"
                    : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30"
                }`
              }
            >
              <ShieldAlert className="w-5 h-5 text-amber-500 stroke-2" />
              <span>Admin Profile</span>
            </NavLink>
          </nav>
        </div>

        {/* Footer info */}
        <div className="mt-auto pt-6 text-center hidden lg:block">
          <span className="text-[10px] font-mono font-bold text-zinc-600 tracking-widest uppercase">
            v2.0.26 Core Terminal
          </span>
        </div>
      </div>

      {/* ===== VERTICALLY FULL HEIGHT MAIN WORKSPACE AREA ===== */}
      <main className="flex-1 lg:h-auto bg-zinc-950/40 border border-zinc-900 rounded-3xl p-8 shadow-2xl relative flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/10 to-transparent rounded-3xl pointer-events-none" />

        {/* Inside Main Workspace Container */}
        <div className="relative z-10 flex-1 flex flex-col leading-relaxed text-zinc-300">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
