import React from "react";
import { FaBook, FaFlag, FaHome, FaUsers, FaUserShield } from "react-icons/fa";
import { NavLink, Outlet } from "react-router";

const AdminDashboard = () => {
  return (
   <div className="min-h-screen flex bg-gray-100">

      {/* ===== SIDEBAR ===== */}
      <aside className="w-64 bg-gradient-to-b from-indigo-600 to-purple-700 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">
          Admin Panel
        </h2>

        <nav className="space-y-3">
          <NavLink to="/dashboard/admin" className="flex items-center gap-3 p-2 rounded hover:bg-white hover:text-indigo-600">
            <FaHome /> Dashboard
          </NavLink>

          <NavLink to="/dashboard/admin/manage-user" className="flex items-center gap-3 p-2 rounded hover:bg-white hover:text-indigo-600">
            <FaUsers /> Manage Users
          </NavLink>

          <NavLink to="/dashboard/admin/manage-lesson" className="flex items-center gap-3 p-2 rounded hover:bg-white hover:text-indigo-600">
            <FaBook /> Manage Lessons
          </NavLink>

          <NavLink to="/dashboard/admin/reported-lesson" className="flex items-center gap-3 p-2 rounded hover:bg-white hover:text-indigo-600">
            <FaFlag /> Reported Lessons
          </NavLink>

          <NavLink to="/dashboard/admin/admin-profile" className="flex items-center gap-3 p-2 rounded hover:bg-white hover:text-indigo-600">
            <FaUserShield /> Admin Profile
          </NavLink>
        </nav>
      </aside>

      {/* ===== CONTENT ===== */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
