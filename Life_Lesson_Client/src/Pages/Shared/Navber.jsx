import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import logoImg from "../../assets/imgaes/logo.jpg";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, dbUser, logOut, loading } = useAuth();
  console.log(user)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 🔴 Auth loading থাকলে navbar দেখাবে না
  if (loading) return null;

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm px-3 py-3 font-bold uppercase mr-4 rounded-md
     transition duration-500
     ${
       isActive
         ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-[#040426]"
         : "bg-[#0E0E1A] text-[#EAEAEA]"
     }
     hover:text-[#040426]
     hover:bg-cyan-400
     active:scale-95`;

  const links = (
    <>
      <li>
        <NavLink to="/" end className={navLinkClass}>
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/public-lesson" className={navLinkClass}>
          Public Lessons
        </NavLink>
      </li>

      <li>
        <NavLink to="/premium-lesson" className={navLinkClass}>
          Premium Lessons
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
        </li>
      )}

      {/* ✅ Admin role check from dbUser */}
      {dbUser?.role === "admin" && (
        <li>
          <NavLink to="/dashboard/admin" className={navLinkClass}>
            Admin Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* LEFT */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            ☰
          </div>
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>

        <Link to="/" className="flex items-center gap-2">
          <img className="w-10 h-10 rounded-full" src={logoImg} alt="logo" />
          <span className="text-xl font-bold">Digital Life Lessons</span>
        </Link>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal">{links}</ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end gap-4">
        {user ? (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="rounded-full"
            >
              <img
                src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt="User"
                className="w-9 h-9 rounded-full border"
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-20">
                <div className="px-3 py-2 border-b">
                  <p className="font-semibold">{user.displayName}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>

                <NavLink
                  to="/dashboard/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Profile
                </NavLink>

                <NavLink
                  to="/dashboard"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Dashboard
                </NavLink>

                <button
                  onClick={handleLogOut}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="btn btn-outline btn-primary">Login</button>
            </Link>
            <Link to="/register">
              <button className="btn btn-primary">Register</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
