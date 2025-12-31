import React from "react";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

const MyLesson = ({ userr }) => {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const isPremium = userr?.isPremium === true;

  
  const { data: lessons = [] } = useQuery({
    queryKey: ["my-lesson", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-lesson?email=${user?.email}`);

      return res.data;
    },
  });
  console.log("User Email:", user?.email);

  
  const handlePrivacyChange = async (id, value) => {
    try {
      await axiosSecure.patch(`/lessons/privacy/${id}`, {
        privacy: value,
      });
      toast.success("Privacy updated");
      queryClient.invalidateQueries(["my-lesson", user?.email]);
    } catch {
      toast.error("Failed to update privacy");
    }
  };

  
  const handleAccessChange = async (id, value) => {
    if (!isPremium) {
      toast.error("Premium required");
      return;
    }

    try {
      await axiosSecure.patch(`/lessons/access/${id}`, {
        accessLevel: value,
      });
      toast.success("Access level updated");
      queryClient.invalidateQueries(["my-lesson", user?.email]);
    } catch {
      toast.error("Failed to update access level");
    }
  };


  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this lesson?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/lessons/${id}`);
          toast.success("Lesson deleted");
          queryClient.invalidateQueries(["my-lesson", user?.email]);
        } catch {
          toast.error("Failed to delete lesson");
        }
      }
    });
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">
         My Lessons : {lessons.length}
      </h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-xl">
        <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th>Privacy</th>
              <th>Access</th>
              <th>Created</th>
              <th>Reactions</th>
              <th>Saves</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {lessons.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No lessons found
                </td>
              </tr>
            ) : (
              lessons.map((lesson) => (
                <tr
                  key={lesson._id}
                  className="border-b hover:bg-indigo-50 transition"
                >
                  <td className="p-4 font-semibold text-indigo-700">
                    {lesson.title}
                  </td>

                  <td>
                    <select
                      value={lesson.privacy}
                      onChange={(e) =>
                        handlePrivacyChange(lesson._id, e.target.value)
                      }
                      className="border rounded-lg px-2 py-1"
                    >
                      <option value="Public">Public</option>
                      <option value="Private">Private</option>
                    </select>
                  </td>

                  <td>
                    <select
                      value={lesson.accessLevel}
                      disabled={!isPremium}
                      onChange={(e) =>
                        handleAccessChange(lesson._id, e.target.value)
                      }
                      className="border rounded-lg px-2 py-1 disabled:bg-gray-200"
                    >
                      <option value="Free">Free</option>
                      <option value="Premium">Premium</option>
                    </select>
                  </td>

                  <td>
                    {lesson.createdAt
                      ? new Date(lesson.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="text-rose-500 font-semibold">
                    {lesson.reactions || 0}
                  </td>

                  <td className="text-yellow-500 font-semibold">
                    {lesson.saves || 0}
                  </td>

                  <td className="flex gap-3 p-3">
                    <FaEye className="text-sky-600 cursor-pointer" />
                    <FaEdit className="text-emerald-600 cursor-pointer" />
                    <FaTrash
                      onClick={() => handleDelete(lesson._id)}
                      className="text-red-500 cursor-pointer"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyLesson;
