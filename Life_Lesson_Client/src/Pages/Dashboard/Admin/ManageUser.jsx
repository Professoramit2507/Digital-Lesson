import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { ShieldCheck, UserCog, Mail, BookMarked, User } from "lucide-react";

const ManageUser = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    if (!user?.email) return;
    try {
      const token = await user.getIdToken();
      const res = await axios.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [user?.email]);

  const handleMakeAdmin = async (id) => {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      await axios.patch(`/users/admin/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role: "admin" } : u))
      );
    } catch (error) {
      console.error("Failed to update role", error);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* ===== PAGE HEADER ===== */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight flex items-center gap-3">
          User Database Management
        </h1>
        <p className="text-xs font-medium text-zinc-500 mt-1">
          Review systemic privileges, track synchronization nodes, and authorize root access.
        </p>
      </div>

      {/* ===== TABLE CONTAINER PANEL ===== */}
      <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-2 sm:p-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-sky-500/10 to-transparent" />
        
        <div className="overflow-x-auto rounded-2xl">
          <table className="w-full text-left border-collapse">
            
            {/* Table Head */}
            <thead>
              <tr className="border-b border-zinc-900 bg-zinc-900/30 text-zinc-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-4 px-5 font-bold">#</th>
                <th className="py-4 px-5 font-bold">Name</th>
                <th className="py-4 px-5 font-bold">Email</th>
                <th className="py-4 px-5 font-bold text-center">Role</th>
                <th className="py-4 px-5 font-bold text-center">Total Lessons</th>
                <th className="py-4 px-5 font-bold text-right">Status</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-zinc-900/60 font-mono text-xs text-zinc-300">
              {users.map((u, index) => {
                const role = u.role || "user";
                const lessonsCount = u.savedLessons?.length || 0;

                return (
                  <tr key={u._id} className="hover:bg-zinc-900/40 transition-colors duration-150 group">
                    
                    {/* Index */}
                    <td className="py-5 px-5 text-zinc-600 font-bold">{index + 1}</td>
                    
                    {/* User Name */}
                    <td className="py-5 px-5 font-sans font-semibold text-zinc-200 group-hover:text-white transition-colors">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-zinc-600" />
                        <span>{u.name}</span>
                      </div>
                    </td>
                    
                    {/* Email */}
                    <td className="py-5 px-5 text-zinc-400">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-zinc-700" />
                        <span>{u.email}</span>
                      </div>
                    </td>

                    {/* Role Badge */}
                    <td className="py-5 px-5 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                          role === "admin"
                            ? "bg-teal-500/5 text-teal-400 border-teal-500/20 shadow-sm shadow-teal-500/5"
                            : "bg-zinc-900/60 text-zinc-500 border-zinc-800"
                        }`}
                      >
                        {role}
                      </span>
                    </td>

                    {/* Total Lessons */}
                    <td className="py-5 px-5 text-center text-zinc-400 font-bold">
                      <div className="flex items-center justify-center gap-1.5">
                        <BookMarked className="w-3.5 h-3.5 text-zinc-600" />
                        <span>{lessonsCount}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-5 px-5 text-right">
                      {role === "admin" ? (
                        <div className="inline-flex items-center gap-1.5 text-teal-400/90 font-bold text-[11px] uppercase tracking-wider bg-teal-500/5 border border-teal-500/10 px-3 py-1.5 rounded-xl">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Root Admin</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleMakeAdmin(u._id)}
                          className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-sky-950/40 border border-zinc-800 hover:border-sky-500/30 text-zinc-300 hover:text-sky-400 px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md shadow-black/20"
                        >
                          <UserCog className="w-3.5 h-3.5" />
                          <span>Grant Admin</span>
                        </button>
                      )}
                    </td>

                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};

export default ManageUser;
