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

  // ✨ Clean Light Mode Styling for Links
  const navLinkClass = ({ isActive }) =>
    `relative text-xs font-bold tracking-widest uppercase px-4 py-2.5 transition-all duration-300 group
     ${isActive ? "text-zinc-900" : "text-zinc-600 hover:text-zinc-900"}`;

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
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300
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
            ? "py-3 bg-white/90 backdrop-blur-xl border-zinc-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
            : "py-5 bg-white/60 backdrop-blur-md border-zinc-100"
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        {/* LEFT: Logo & Brand */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              {/* 🔄 Infinite Rotating Glow Ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 rounded-full blur-sm opacity-30 group-hover:opacity-80 group-hover:animate-spin duration-1000"></div>
              <img
                className="relative w-10 h-10 rounded-full object-cover border border-zinc-200 shadow-xs"
                src={logoImg}
                alt="logo"
              />
            </div>
            <span className="text-xl font-black tracking-tighter text-zinc-800 transition-all duration-300">
              DIGITAL<span className="text-cyan-500">LIFE</span>
            </span>
          </Link>
        </div>

        {/* CENTER: Desktop Menu */}
        <div className="hidden lg:flex items-center">
          <ul className="flex items-center gap-2">{links}</ul>
        </div>

        {/* RIGHT: User Profile & Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="relative flex items-center p-0.5 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <img
                  src={user.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                  alt="User"
                  className="w-9 h-9 rounded-full object-cover border border-white"
                />
                {/* 🟢 Online Indicator */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
              </button>

              {/* 🪟 Dropdown Menu */}
              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsDropdownOpen(false)}
                  />

                  <div className="absolute right-0 mt-3 w-60 bg-white border border-zinc-200/80 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] z-20 overflow-hidden backdrop-blur-xl origin-top-right transition-all duration-300 transform scale-100 animate-in zoom-in-95">
                    <div className="px-5 py-4 bg-zinc-50/50 border-b border-zinc-100">
                      <p className="text-sm font-bold text-zinc-800 truncate">
                        {user.displayName}
                      </p>
                      <p className="text-xs text-zinc-400 truncate mt-0.5 font-mono">
                        {user.email}
                      </p>
                    </div>

                    <div className="p-2 space-y-0.5">
                      <Link
                        to="/dashboard/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-4 py-2.5 text-sm text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded-xl transition-all duration-200"
                      >
                        👤 My Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-4 py-2.5 text-sm text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded-xl transition-all duration-200"
                      >
                        📊 Dashboard
                      </Link>
                      <div className="h-px bg-zinc-100 my-1" />
                      <button
                        onClick={() => {
                          handleLogOut();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full flex items-center px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 font-semibold cursor-pointer"
                      >
                        🚪 Log Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Link to="/login">
                <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-bold cursor-pointer uppercase tracking-widest text-zinc-700 rounded-full group bg-gradient-to-br from-cyan-400 to-blue-500 transition duration-300">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-full group-hover:bg-opacity-0 group-hover:text-white">
                    Sign In
                  </span>
                </button>
              </Link>
              <Link to="/register">
                <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-bold cursor-pointer uppercase tracking-widest text-white rounded-full group bg-gradient-to-br from-cyan-400 to-blue-500 transition duration-300 shadow-sm shadow-cyan-500/20 hover:shadow-md hover:shadow-cyan-500/30">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full group-hover:from-cyan-400 group-hover:to-blue-500">
                    Register
                  </span>
                </button>
              </Link>
            </div>
          )}

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-zinc-500 hover:text-zinc-800 lg:hidden focus:outline-none transition duration-300 cursor-pointer"
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

      {/* 📱 Mobile Dropdown Menu (White Theme) */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white/98 border-b border-zinc-200 shadow-xl transition-all duration-500 ease-in-out overflow-hidden
          ${isMobileMenuOpen ? "max-h-100 opacity-100 py-6 px-6" : "max-h-0 opacity-0 pointer-events-none"}`}
      >
        <ul
          className="flex flex-col gap-3"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {links}
          {!user && (
            <div className="pt-4 border-t border-zinc-100 flex flex-col gap-2">
              <Link
                to="/login"
                className="text-center text-sm font-bold text-zinc-700 py-2.5 hover:bg-zinc-50 rounded-xl transition-all"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="text-center text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl shadow-xs"
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