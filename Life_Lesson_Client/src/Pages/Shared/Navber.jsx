import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import logoImg from "../../assets/imgaes/logo.jpg";
import useAuth from "../../hooks/useAuth";
import { Crown, Sparkles, LogOut, User, LayoutDashboard, Shield, Menu, X, ArrowUpRight } from "lucide-react";

const Navbar = () => {
  const { user, dbUser, logOut, loading } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return null;

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `relative text-xs sm:text-[13px] font-bold tracking-wider uppercase px-4 py-2.5 transition-all duration-300 rounded-xl group flex items-center gap-2
     ${
       isActive
         ? "text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 shadow-xs font-black"
         : "text-zinc-400 hover:text-white hover:bg-white/5"
     }`;

  const navItems = [
    { to: "/", label: "Home", end: true },
    { to: "/public-lesson", label: "Public Lessons" },
    { to: "/premium-lesson", label: "Premium Lessons", isPremiumBadge: true },
    ...(user ? [{ to: "/dashboard", label: "Dashboard" }] : []),
    ...(dbUser?.role === "admin"
      ? [{ to: "/dashboard/admin", label: "Admin Panel" }]
      : []),
  ];

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-500 border-b ${
        isScrolled
          ? "py-3 bg-[#05070c]/95 backdrop-blur-2xl border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.6)]"
          : "py-4 bg-[#05070c]/80 backdrop-blur-md border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12">
        {/* LEFT: Brand Logo */}
        <div className="flex items-center shrink-0">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 rounded-full blur-xs opacity-50 group-hover:opacity-100 group-hover:animate-spin duration-1000 transition-opacity" />
              <img
                className="relative w-10 h-10 rounded-full object-cover border border-zinc-700 shadow-md"
                src={logoImg}
                alt="Digital Life Logo"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tighter text-white leading-none">
                DIGITAL<span className="text-cyan-400">LIFE</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase mt-0.5">
                Wisdom Hub
              </span>
            </div>
          </Link>
        </div>

        {/* CENTER: Spaced-Out Desktop Menu Options (option gula dure) */}
        <div className="hidden lg:flex items-center">
          <ul className="flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <li key={item.to} className="relative list-none">
                <NavLink to={item.to} end={item.end} className={navLinkClass}>
                  {({ isActive }) => (
                    <>
                      {item.isPremiumBadge && (
                        <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                      )}
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse ml-0.5" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT: User Profile & Actions */}
        <div className="flex items-center gap-4 shrink-0">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="relative flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer group"
              >
                <div className="relative">
                  <img
                    src={
                      user.photoURL ||
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"
                    }
                    alt="User avatar"
                    className="w-8 h-8 rounded-full object-cover border border-zinc-700"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-zinc-950 rounded-full" />
                </div>
                <span className="hidden sm:inline text-xs font-bold text-zinc-200 group-hover:text-white max-w-28 truncate">
                  {user.displayName || user.email?.split("@")[0]}
                </span>
              </button>

              {/* Dark Glass Dropdown Menu */}
              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsDropdownOpen(false)}
                  />

                  <div className="absolute right-0 mt-3 w-64 bg-zinc-950/95 border border-zinc-800 rounded-2xl shadow-2xl z-20 overflow-hidden backdrop-blur-2xl origin-top-right transition-all animate-in zoom-in-95">
                    <div className="px-5 py-4 bg-zinc-900/60 border-b border-zinc-800/80">
                      <p className="text-xs font-bold text-white truncate">
                        {user.displayName || "Learner"}
                      </p>
                      <p className="text-[11px] text-zinc-400 truncate mt-0.5 font-mono">
                        {user.email}
                      </p>
                      {dbUser?.role === "premium" && (
                        <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                          <Crown className="w-3 h-3 fill-amber-400" /> VIP Member
                        </span>
                      )}
                    </div>

                    <div className="p-2 space-y-1">
                      <Link
                        to="/dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-xl transition-all"
                      >
                        <LayoutDashboard className="w-4 h-4 text-cyan-400" />
                        <span>My Dashboard</span>
                      </Link>

                      <Link
                        to="/dashboard/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-xl transition-all"
                      >
                        <User className="w-4 h-4 text-blue-400" />
                        <span>Profile Settings</span>
                      </Link>

                      {dbUser?.role === "admin" && (
                        <Link
                          to="/dashboard/admin"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-xl transition-all"
                        >
                          <Shield className="w-4 h-4 text-purple-400" />
                          <span>Admin Console</span>
                        </Link>
                      )}

                      <div className="h-px bg-zinc-900 my-1" />

                      <button
                        onClick={() => {
                          handleLogOut();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-semibold text-red-400 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-red-400" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Link to="/login">
                <button className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-all cursor-pointer">
                  Sign In
                </button>
              </Link>
              <Link to="/register">
                <button className="px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 rounded-xl transition-all shadow-lg shadow-cyan-500/20 cursor-pointer">
                  Register Free
                </button>
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-white lg:hidden focus:outline-none transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-cyan-400" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dark Dropdown */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-[#05070c]/98 border-b border-zinc-800 shadow-2xl transition-all duration-300 ease-in-out overflow-hidden
          ${isMobileMenuOpen ? "max-h-96 opacity-100 py-6 px-6" : "max-h-0 opacity-0 pointer-events-none"}`}
      >
        <ul
          className="flex flex-col gap-3"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item) => (
            <li key={item.to} className="list-none">
              <NavLink to={item.to} end={item.end} className={navLinkClass}>
                {item.isPremiumBadge && (
                  <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                )}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
          {!user && (
            <div className="pt-4 border-t border-zinc-800 flex flex-col gap-2">
              <Link
                to="/login"
                className="text-center text-xs font-bold text-zinc-300 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="text-center text-xs font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-black py-2.5 rounded-xl font-extrabold"
              >
                Register Free
              </Link>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
