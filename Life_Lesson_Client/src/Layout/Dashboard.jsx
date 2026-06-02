import React from "react";
import { Link, Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Navbar */}
        <nav className="navbar w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-md">
          {/* Drawer Toggle */}
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost text-white hover:bg-white/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="size-5"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
              <path d="M9 4v16" />
              <path d="M14 10l2 2l-2 2" />
            </svg>
          </label>

          {/* Title */}
          <div className="flex-1 px-4 text-lg font-semibold tracking-wide">
            <span className="bg-white/20 px-3 py-1 rounded-lg">Dashboard</span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 pr-4">
            <button className="btn btn-ghost btn-circle hover:bg-white/20"></button>
            <div className="avatar">
              <div className="w-9 rounded-full ring ring-white ring-offset-2 ring-offset-purple-600">
                <img src="https://i.pravatar.cc/100" alt="User" />
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <div className="bg-white rounded-xl shadow-sm p-6 min-h-[calc(100vh-120px)]">
            <Outlet />
          </div>
        </main>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible md:mr-20 mr-0 mt-2">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div
          className="flex flex-col items-start 
  bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-500
  text-white
  is-drawer-close:w-24 is-drawer-open:w-64
  transition-all duration-300"
        >
          {/* Sidebar content */}
          <ul className="menu w-full grow px-2 py-4 space-y-1">
            {/* Home & Dashboard */}
            <li className="space-y-1">
              <Link to="/">
                <button
                  className="flex items-center gap-3 w-full rounded-lg px-3 py-2
          hover:bg-white/20 transition
          is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Home"
                >
                  <span className="text-lg">🏠</span>
                  <span className="is-drawer-close:hidden font-medium">
                    Home
                  </span>
                </button>
              </Link>

              <Link to="/dashboard">
                <button
                  className="flex items-center gap-3 w-full rounded-lg px-3 py-2
          hover:bg-white/20 transition
          is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Dashboard Home"
                >
                  <span className="text-lg">📊</span>
                  <span className="is-drawer-close:hidden font-medium">
                    Dashboard Home
                  </span>
                </button>
              </Link>
            </li>

            <div className="divider divider-neutral opacity-40 my-2" />

            {/* Lessons */}
            <li className="space-y-1">
              <Link to="/dashboard/add-lesson">
                <button
                  className="flex items-center gap-3 w-full rounded-lg px-3 py-2
          bg-emerald-500/20 hover:bg-emerald-500/30 transition
          is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Add Lesson"
                >
                  <span className="text-lg">➕</span>
                  <span className="is-drawer-close:hidden font-medium">
                    Add Lesson
                  </span>
                </button>
              </Link>

              <Link to="/dashboard/my-lesson">
                <button
                  className="flex items-center gap-3 w-full rounded-lg px-3 py-2
          bg-sky-500/20 hover:bg-sky-500/30 transition
          is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My Lesson"
                >
                  <span className="text-lg">📘</span>
                  <span className="is-drawer-close:hidden font-medium">
                    My Lesson
                  </span>
                </button>
              </Link>

              <Link to="/dashboard/my-favorite">
                <button
                  className="flex items-center gap-3 w-full rounded-lg px-3 py-2
          bg-yellow-400/20 hover:bg-yellow-400/30 transition
          is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My Favourite"
                >
                  <span className="text-lg">⭐</span>
                  <span className="is-drawer-close:hidden font-medium">
                    My Favourite
                  </span>
                </button>
              </Link>
            </li>

            <div className="divider divider-neutral opacity-40 my-2" />

            {/* Profile */}
            <li>
              <Link to="/dashboard/profile">
                <button
                  className="flex items-center gap-3 w-full rounded-lg px-3 py-2
          bg-white/10 hover:bg-white/20 transition
          is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Profile"
                >
                  <span className="text-lg">👤</span>
                  <span className="is-drawer-close:hidden font-medium">
                    Profile
                  </span>
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
