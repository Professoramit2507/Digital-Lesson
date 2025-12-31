import { FaUserShield } from "react-icons/fa";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";

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

  // Make a user admin
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
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Total Lessons</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u, index) => {
              const role = u.role || "user"; 
              const lessonsCount = u.savedLessons?.length || 0;

              return (
                <tr key={u._id} className="hover:bg-gray-100 transition">
                  <td>{index + 1}</td>
                  <td className="font-medium">{u.name}</td>
                  <td>{u.email}</td>

                 
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        role === "admin"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </span>
                  </td>

                 
                  <td>{lessonsCount}</td>

                 
                  <td>
                    {role === "admin" ? (
                      <span className="text-green-600 font-semibold">Admin</span>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(u._id)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
                      >
                        <FaUserShield />
                        Make Admin
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
  );
};

export default ManageUser;
