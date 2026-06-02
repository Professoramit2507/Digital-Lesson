import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import logoImg from "../../assets/imgaes/logo.jpg";
import useAuth from "../../hooks/useAuth";

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

  // ✨ Futuristic Hover Line & Glow Animation for Links
  const navLinkClass = ({ isActive }) =>
    `relative text-xs font-bold tracking-widest uppercase px-4 py-2.5 transition-all duration-300 group
     ${isActive ? "text-black" : "text-black hover:text-white"}`;

  const links = (
    <>
      {[
        { to: "/", label: "Home", end: true },
        { to: "/public-lesson", label: "Public Lessons" },
        { to: "/premium-lesson", label: "Premium Lessons" },
        ...(user ? [{ to: "/dashboard", label: "Dashboard" }] : []),
        ...(dbUser?.role === "admin"
          ? [{ to: "/dashboard/admin", label: "Admin Panel" }]
          : []),
      ].map((link) => (
        <li key={link.to} className="relative list-none">
          <NavLink to={link.to} end={link.end} className={navLinkClass}>
            {({ isActive }) => (
              <>
                <span className="relative z-10">{link.label}</span>
                {/* 🌟 Bottom Animated Sliding Line */}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-cyan-500 to-blue-500 transition-all duration-300
                    ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </>
            )}
          </NavLink>
        </li>
      ))}
    </>
  );

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-500 border-b
        ${
          isScrolled
            ? "py-3 bg-[#070b14]/95 backdrop-blur-xl border-cyan-500/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            : "py-5 bg-[#0A0E1A]/40 backdrop-blur-md border-white/5"
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        {/* LEFT: Logo & Brand (Pulse Hover Effect) */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              {/* 🔄 Infinite Rotating Glow Ring */}
              <div className="absolute -inset-1 bg-linear-to-r from-blue-600 via-cyan-400 to-indigo-500 rounded-full blur-sm opacity-40 group-hover:opacity-100 group-hover:animate-spin duration-1000"></div>
              <img
                className="relative w-10 h-10 rounded-full object-cover border-2 border-white/10 group-hover:border-cyan-400 transition-all duration-300"
                src={logoImg}
                alt="logo"
              />
            </div>
            <span className="text-xl font-black tracking-tighter bg-linear-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent group-hover:tracking-normal transition-all duration-300">
              DIGITAL<span className="text-cyan-400">LIFE</span>
            </span>
          </Link>
        </div>

        {/* CENTER: Desktop Menu */}
        <div className="hidden lg:flex items-center">
          <ul className="flex items-center gap-4">{links}</ul>
        </div>

        {/* RIGHT: User Profile & Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="relative flex items-center p-0.5 rounded-full bg-linear-to-tr from-cyan-500 to-purple-600 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <img
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="User"
                  className="w-9 h-9 rounded-full object-cover border border-[#0A0E1A]"
                />
                {/* 🟢 Online Pulse Indicator */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#0A0E1A] rounded-full animate-pulse" />
              </button>

              {/* 🪟 Micro-Interaction Dropdown Menu */}
              {isDropdownOpen && (
                <>
                  {/* Click outside overlay */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsDropdownOpen(false)}
                  />

                  <div className="absolute right-0 mt-3 w-60 bg-[#0F1424]/95 border border-cyan-500/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] z-20 overflow-hidden backdrop-blur-2xl origin-top-right transition-all duration-300 transform scale-100 animate-in zoom-in-95">
                    <div className="px-5 py-4 bg-linear-to-b from-white/5 to-transparent border-b border-white/5">
                      <p className="text-sm font-bold text-white truncate">
                        {user.displayName}
                      </p>
                      <p className="text-xs text-cyan-400/70 truncate mt-0.5 font-mono">
                        {user.email}
                      </p>
                    </div>

                    <div className="p-2 space-y-1">
                      <Link
                        to="/dashboard/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-cyan-500/10 rounded-xl transition-all duration-200"
                      >
                        👤 My Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-cyan-500/10 rounded-xl transition-all duration-200"
                      >
                        📊 Dashboard
                      </Link>
                      <div className="h-px bg-white/5 my-1" />
                      <button
                        onClick={() => {
                          handleLogOut();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full flex items-center px-4 py-2.5 text-sm text-rose-400 hover:text-white hover:bg-rose-500/20 rounded-xl transition-all duration-200 font-semibold"
                      >
                        🚪 Log Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-4">
               <Link to="/login">
                {/* 🤖 Cyberpunk Neon Button */}
                <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-bold cursor uppercase tracking-widest text-white rounded-full group bg-linear-to-br from-cyan-500 to-blue-600 group-hover:from-cyan-500 group-hover:to-blue-600 hover:text-white focus:ring-2 focus:outline-none focus:ring-cyan-800 transition duration-300">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-[#0A0E1A] rounded-full group-hover:bg-opacity-0">
                    Sign In
                  </span>
                </button>
              </Link>
              <Link to="/register">
                {/* 🤖 Cyberpunk Neon Button */}
                <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-bold cursor uppercase tracking-widest text-white rounded-full group bg-linear-to-br from-cyan-500 to-blue-600 group-hover:from-cyan-500 group-hover:to-blue-600 hover:text-white focus:ring-2 focus:outline-none focus:ring-cyan-800 transition duration-300">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-[#0A0E1A] rounded-full group-hover:bg-opacity-0">
                    Register
                  </span>
                </button>
              </Link>
            </div>
          )}

          {/* Hamburger Menu Toggle with Animation */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-400 hover:text-cyan-400 lg:hidden focus:outline-none transition duration-300"
          >
            <div className="w-6 h-5 flex flex-col justify-between items-end relative">
              <span
                className={`h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`}
              />
              <span
                className={`h-0.5 bg-current transition-all duration-200 ${isMobileMenuOpen ? "w-0 opacity-0" : "w-4"}`}
              />
              <span
                className={`h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-5"}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* 📱 Mobile Dropdown Menu (Smooth Slide Down) */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-[#070b14]/98 border-b border-cyan-500/10 shadow-2xl transition-all duration-500 ease-in-out overflow-hidden
          ${isMobileMenuOpen ? "max-h-100 opacity-100 py-6 px-6" : "max-h-0 opacity-0 pointer-events-none"}`}
      >
        <ul
          className="flex flex-col gap-4"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {links}
          {!user && (
            <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
              <Link
                to="/login"
                className="text-center text-sm font-semibold text-blue-400 py-2"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="text-center text-sm font-bold bg-linear-to-r from-cyan-500 to-blue-600 text-black py-3 rounded-xl shadow-[0_4px_15px_rgba(6,182,212,0.3)]"
              >
                Register
              </Link>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
