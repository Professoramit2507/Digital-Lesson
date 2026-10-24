import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  Home,
  LayoutDashboard,
  PlusCircle,
  BookOpen,
  Star,
  User,
  Menu,
  X,
  Crown,
  LogOut,
  Sparkles,
  ExternalLink,
  Shield,
  Layers,
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import logoImg from "../assets/imgaes/logo.jpg";

const Dashboard = () => {
  const { user, dbUser, logOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isPremium =
    dbUser?.role === "premium" ||
    dbUser?.role === "admin" ||
    localStorage.getItem("premiumUser") === "true";

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error(err);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-200 group
     ${
       isActive
         ? "bg-gradient-to-r from-cyan-500/15 to-blue-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-500/10 font-black"
         : "text-zinc-400 hover:text-white hover:bg-zinc-900/80 border border-transparent"
     }`;

  return (
    <div className="min-h-screen bg-[#05070c] text-zinc-100 flex font-sans antialiased selection:bg-cyan-500 selection:text-black">
      {/* 📱 Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 🧭 Sidebar Navigation */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-[#070b14] border-r border-white/5 flex flex-col justify-between transition-transform duration-300 ease-in-out p-5 overflow-y-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="flex items-center justify-between px-2 pt-1 pb-4 border-b border-white/5">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-xs opacity-50 group-hover:opacity-100 transition-opacity" />
                <img
                  src={logoImg}
                  alt="Digital Life Logo"
                  className="relative w-9 h-9 rounded-full object-cover border border-zinc-700 shadow-md"
                />
              </div>
              <div>
                <span className="text-base font-black tracking-tight text-white block leading-none">
                  DIGITAL<span className="text-cyan-400">LIFE</span>
                </span>
                <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                  Management Console
                </span>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-zinc-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Snippet */}
          <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-center gap-3">
            <div className="relative shrink-0">
              <img
                src={
                  user?.photoURL ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"
                }
                alt="User avatar"
                className="w-10 h-10 rounded-xl object-cover border border-zinc-700"
              />
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-zinc-950 rounded-full" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-white truncate">
                {user?.displayName || "Life Learner"}
              </h4>
              <p className="text-[10px] text-zinc-500 truncate font-mono">
                {user?.email}
              </p>
              <div className="mt-1">
                {isPremium ? (
                  <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                    <Crown className="w-2.5 h-2.5 fill-amber-400" /> VIP Member
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded-md">
                    Free Tier
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="space-y-6">
            {/* Overview Links */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase px-3 block">
                // Analytics & Control
              </span>
              <NavLink
                to="/dashboard"
                end
                onClick={() => setSidebarOpen(false)}
                className={navLinkClass}
              >
                <LayoutDashboard className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Dashboard Home</span>
              </NavLink>
            </div>

            {/* Lesson Management Links */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase px-3 block">
                // Content Operations
              </span>
              <NavLink
                to="/dashboard/add-lesson"
                onClick={() => setSidebarOpen(false)}
                className={navLinkClass}
              >
                <PlusCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Add Lesson</span>
              </NavLink>

              <NavLink
                to="/dashboard/my-lesson"
                onClick={() => setSidebarOpen(false)}
                className={navLinkClass}
              >
                <BookOpen className="w-4 h-4 text-sky-400 shrink-0" />
                <span>My Lessons</span>
              </NavLink>

              <NavLink
                to="/dashboard/my-favorite"
                onClick={() => setSidebarOpen(false)}
                className={navLinkClass}
              >
                <Star className="w-4 h-4 text-amber-400 shrink-0" />
                <span>My Favorites</span>
              </NavLink>
            </div>

            {/* Account & Profile */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase px-3 block">
                // Profile & System
              </span>
              <NavLink
                to="/dashboard/profile"
                onClick={() => setSidebarOpen(false)}
                className={navLinkClass}
              >
                <User className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Profile Settings</span>
              </NavLink>

              {dbUser?.role === "admin" && (
                <NavLink
                  to="/dashboard/admin"
                  onClick={() => setSidebarOpen(false)}
                  className={navLinkClass}
                >
                  <Shield className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Admin Console</span>
                </NavLink>
              )}
            </div>

            {/* External Quick Links */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase px-3 block">
                // Quick Portal
              </span>
              <Link
                to="/"
                className="flex items-center justify-between w-full px-4 py-2.5 rounded-2xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900/60 transition-all"
              >
                <span className="flex items-center gap-3">
                  <Home className="w-4 h-4 text-zinc-500" />
                  <span>Main Website</span>
                </span>
                <ExternalLink className="w-3 h-3 text-zinc-600" />
              </Link>
              <Link
                to="/premium-lesson"
                className="flex items-center justify-between w-full px-4 py-2.5 rounded-2xl text-xs font-semibold text-amber-400 hover:bg-amber-500/10 transition-all"
              >
                <span className="flex items-center gap-3">
                  <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>VIP Masterclasses</span>
                </span>
                <Sparkles className="w-3 h-3 text-amber-400" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Sign Out */}
        <div className="pt-6 border-t border-white/5 space-y-2">
          <button
            onClick={handleLogOut}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 🖥️ Main Viewport Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 w-full h-16 bg-[#05070c]/90 backdrop-blur-xl border-b border-white/5 px-6 sm:px-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-all"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-lg hidden sm:inline-block">
                Workspace
              </span>
              <span className="text-xs text-zinc-500 font-medium">/ Personal Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/dashboard/add-lesson"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20"
            >
              <PlusCircle className="w-3.5 h-3.5 text-black" />
              <span>Add Lesson</span>
            </Link>

            <Link to="/" className="text-xs text-zinc-400 hover:text-white px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-xl transition-all">
              Home
            </Link>
          </div>
        </header>

        {/* Dynamic Nested Page Content Router Outlet */}
        <main className="flex-1 p-6 sm:p-10 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
